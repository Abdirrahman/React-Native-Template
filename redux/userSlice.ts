// Need to setup Redux for statemangement.

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define a type for the slice state
interface userState {
  currentUser: any;
  posts: any;
  following: any;
}
// Define the initial state using that type
const initialState: userState = {
  currentUser: null,
  posts: [],
  following: [],
};

export const userSlice = createSlice({
    name: "user",
    initialState,

    reducers: {
        setUser: (state, action) => {
            state.currentUser = action.payload
        },
        setPosts: (state, action) => {
          state.posts = action.payload
        },
        setFollowing: (state, action) => {
          state.following = action.payload
        },
        resetUserState(state) {
          state.currentUser = initialState.currentUser
          state.posts = initialState.posts
          state.following = initialState.following
        }

        
    }

})

export const {
  setUser,
  setPosts,
  setFollowing,
  resetUserState,
} = userSlice.actions
  
// export const useUserState = () => useAppSelector((state) => state.user);

// export const user = (state: initialStateI = initialState, action: any) => {
//     switch (action.type) {
//       case USER_STATE_CHANGE:
//         return {
//           ...state,
//           currentUser: action.currentUser,
//         };
//       case USER_POSTS_STATE_CHANGE:
//         return {
//           ...state,
//           posts: action.posts,
//         };
  
//       case USER_FOLLOWING_STATE_CHANGE:
//         return {
//           ...state,
//           following: action.following,
//         };
//       case CLEAR_DATA:
//         return initialState;
//       default:
//         return state;
//     }
//   };
