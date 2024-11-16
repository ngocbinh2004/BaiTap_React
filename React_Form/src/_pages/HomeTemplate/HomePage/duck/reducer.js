import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listStudent: [],
};

const studentReducer = createSlice({
  name: "studentReducer",
  initialState,
  reducers: {
    addStudent: (state, action) => {
      console.log("Payload received in addStudent:", action.payload);
      state.listStudent.push(action.payload);
    },
    updateStudent: (state, action) => {
      const index = state.listStudent.findIndex(
        (student) => student.id === action.payload.id
      );
      if (index !== -1) {
        state.listStudent[index] = action.payload;
      }
    },
  },
});

export const { addStudent, updateStudent } = studentReducer.actions;

export default studentReducer.reducer;
