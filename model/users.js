import mongoose from "mongoose";
// khởi tạo schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required: true
    }

})
const UsersModel = mongoose.model('users', userSchema);
export default UsersModel;