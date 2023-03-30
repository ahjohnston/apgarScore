import { createSlice } from "@reduxjs/toolkit";

export const dateSlice = createSlice({
    name: 'selectedDate',
    initialState: {
        value: new Date(),
    },
    reducers: {
        changeDate: (state, newDate) => {
            console.log('this is my reducer!')
            state.value = newDate
        }
    }
})

export const {} = dateSlice.actions

export default dateSlice.reducer