import mongoose from "mongoose";
const profileSchema = new mongoose.Schema({
    fullName: String,
    dob: Date,
    nation: String,
    education: [
        {
            school: String,
            yearStart: Number,
            yearEnd: Number
        }
    ],
    id: String,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});
const ProfileModel = mongoose.model("profiles", profileSchema);
export default ProfileModel;