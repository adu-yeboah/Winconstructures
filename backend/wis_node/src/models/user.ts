import mongoose from "mongoose";

interface User {
    email: string,
    password: string,
}
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "email required"],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model<User>("User", userSchema);
export default User