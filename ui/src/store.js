import { configureStore } from "@reduxjs/toolkit";
import dateReducer from "./features/dateSlice";

export default configureStore({
    reducer: {
        date: dateReducer,
    },
})