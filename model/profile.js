import mongoose from "mongoose";
const profileSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    dob: { type: Date, required: true },
    nation: { type: String, required: true },
    education: [
        {
            school: { type: String, required: true },
            yearStart: { type: Number, required: true },
            yearEnd: { type: Number, required: true }
        }
    ],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const ProfileModel = mongoose.model("profile", profileSchema);
export default ProfileModel;
