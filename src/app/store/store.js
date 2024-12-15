import {configureStore} from "@reduxjs/toolkit";
import chatReducer from "@/app/store/slice/chatSlice.js";


export const store = configureStore({
    reducer: {
        chat: chatReducer
    }
})