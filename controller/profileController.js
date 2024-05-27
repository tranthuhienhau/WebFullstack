
import profile from "../model/profile.js";
import ProfileModel from "../model/profile.js";

const profileController = {
    postProfile: async (req, res)=>{
        const {fullName, dob, nation, education, owner} = req.body;
        const testProfile = await profile.findOne({fullName})
        if(testProfile){
            res.status(404).send("Tài khoản đã tồn tại")
        }
        const newProfile = new profile({
            fullName: fullName,
            dob: new Date(dob),
            nation: nation,
            education: education,
            owner
        })
        try{
           await newProfile.save();
           res.status(200).send({
               message: "Tạo hồ sơ thành công!",
               profile: newProfile
           })
        }catch (err){
            res.status(500).send(err)
        }
    },
    updateProfile: async (req, res) => {
        try {
            const { id } = req.params
            const crrUser = req.crrUser
            if (id !== crrUser._id) throw {
                message: "Bạn không có quyền chỉnh sửa",
                status: 403
            }
            const existed = await profile.findOne({ userId: crrUser._id })
            const data = req.body
            if (!existed) {
                const createdProfile = await profile.create({
                    ...data,
                    userId: id
                })
                res.status(201).send({
                    data: createdProfile,
                    message: "Thêm thông tin cá nhân thành công"
                })
            } else {
                await profile.findOneAndUpdate({ userId: id }, {
                    ...data
                })
                res.status(201).send({
                    // data: data,
                    message: "Cập nhật thành công"
                })
            }

        } catch (error) {
            res.status(error.status ?? 401).send({
                message: error.message ?? 'Bạn không thể thực hiện hành động!',
                data: null
            });
        }
    },
    getProfile: async (req, res) => {
        try {
            const { id } = req.params;
            const dataUserProfile = await profile.findOne({ userId: id })
            console.log(dataUserProfile);
            res.status(200).send({
                data: dataUserProfile,
                message: 'Thành công'
            })
        } catch (error) {
            res.status(error.status ?? 401).send({
                message: error.message ?? 'Bạn không thể thực hiện hành động!',
                data: null
            });
        }
    },
    deleteProfile: async (req, res) => {

        try{
            const profile = await ProfileModel.findByIdAndDelete(req.params.id)
            res.status(200).send("Xóa thành công")
        }catch(err){
            res.status(500).send(err)
        }
    }
};

export default profileController;
