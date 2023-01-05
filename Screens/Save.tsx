import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./RootStackParams";
import { Text, Image, TextInput, View, Button } from "react-native";
import { User } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

type addScreenProp = StackNavigationProp<RootStackParamList, "Save">;

export default function Save(props: any) {
  const navigation = useNavigation<addScreenProp>();

  const user: User | null = auth.currentUser;

  const [caption, setCaption] = useState("");
  const PostCollectionRef = collection(db, "userPosts");
  const imagesRef = ref(storage, "posts");

  const uploadImage = async () => {
    const uri = props.route.params.image;

    const response = await fetch(uri);
    const blob = await response.blob();

    if (user !== null) {
      const uploadTask = uploadBytesResumable(imagesRef, blob);
      console.log("uploadTask?");

      uploadTask.on(
        "state_changed",
        (snapshot: any) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error: any) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            savePostData(downloadURL);
          });
        }
      );
    }
  };

  const savePostData = async (downloadURL: any) => {
    if (user !== null) {
      await addDoc(PostCollectionRef, {
        caption,
        downloadURL,
        creation: serverTimestamp(),
      }).then(function () {
        props.navigation.popToTop();
      });
    }
  };

  return (
    <View>
      <Image source={{ uri: props.route.params.image }} />
      <TextInput
        placeholder="Caption..."
        onChangeText={(caption) => setCaption(caption)}
      />
      <Button title="Save" onPress={uploadImage} />
    </View>
  );
}
