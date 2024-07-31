import mongoose from "mongoose";

import Highscore from "./highscore";
import Temp from "./temporary";

const connectDb = () => {
  return mongoose.connect(process.env.MONGODB_URI);
};

const models = { Highscore, Temp };

export { connectDb };

export default models;

// let users = {
//     1: {
//       id: '1',
//       username: 'Robin Wieruch',
//     },
//     2: {
//       id: '2',
//       username: 'Dave Davids',
//     },
//   };

//   let messages = {
//     1: {
//       id: '1',
//       text: 'Hello World',
//       userId: '1',
//     },
//     2: {
//       id: '2',
//       text: 'By World',
//       userId: '2',
//     },
//   };

//   export default {
//     users,
//     messages,
//   };
