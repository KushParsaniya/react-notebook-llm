import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    userChats: JSON.parse(localStorage.getItem("userChats")),
    uploadedFiles: JSON.parse(localStorage.getItem("uploadedFiles")),
}


const chatSlice = createSlice({
    name: 'chat',
    initialState: initialState,
    reducers: {
        addUserChat: (state, action) => {
            state.userChats.push(action.payload);
        },
        removeUserChat: (state, action) => {
            state.userChats = [];
        },
        updateUserChats: (state, action) => {
            state.userChats = action.payload;
        },
        addUploadedFile: (state, action) => {
            state.uploadedFiles.push(action.payload);
        },
        removeUploadedFile: (state, action) => {
            state.uploadedFiles = [];
        },
        updateUploadedFile: (state, action) => {
            state.uploadedFiles = action.payload;
        }
    }
});

export const {
    addUserChat, removeUserChat, updateUserChats,
    addUploadedFile, removeUploadedFile, updateUploadedFile
} = chatSlice.actions;
export default chatSlice.reducer;