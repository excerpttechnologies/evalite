// import mongoose from 'mongoose';

// export interface IUser extends mongoose.Document {
//   name: string;
//   email: string;
//   password: string;
//   createdAt: Date;
// }

// const UserSchema = new mongoose.Schema<IUser>({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);



//aravind

import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' }, // ✅ added
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);