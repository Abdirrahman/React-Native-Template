import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Button,
  Image,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/RootStackParams";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";

type addScreenProp = StackNavigationProp<RootStackParamList, "Add">;

export default function AddScreen() {
  const navigation = useNavigation<addScreenProp>();

  const [hasCameraPermission, setHasCameraPermission] = useState<any>(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState<any>(null);
  const [camera, setCamera] = useState<any>(null);
  const [image, setImage] = useState<any>(null);
  const [type, setType] = useState<any>(CameraType.back);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      console.log(data.uri);
      setImage(data.uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets);
    }
  };

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");

      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === null || hasGalleryPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={"1:1"}
        />
      </View>
      <View style={styles.btt}>
        <Ionicons
          name="arrow-redo-circle"
          size={32}
          color="blue"
          onPress={() => {
            setType(
              type === CameraType.back ? CameraType.front : CameraType.back
            );
          }}
        />
        <Ionicons name="camera" size={32} color="blue" onPress={takePicture} />

        <Ionicons name="image" size={32} color="blue" onPress={pickImage} />

        <Ionicons
          name="save"
          size={32}
          color="blue"
          onPress={() => navigation.navigate("Save", { image })}
        />
      </View>

      {/* <Button
        title="Save"
        onPress={() => navigation.navigate("Save", { image })}
      /> */}
      {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  button: {
    marginTop: "110%",
    color: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  btt: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
