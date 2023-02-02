import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get("http://localhost:3004/users");

//   DEVELOPMENT PURPOSE ONLY
  await pause(2000);
  return response.data;
});

//   DEVELOPMENT PURPOSE ONLY
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};
// Thunk automatically creates these
// fetchUsers.pending === users/fetch/pending
// fetchUsers.fulfilled === users/fetch/fulfilled
// fetchUsers.rejected === users/fetch/rejected

export { fetchUsers };
