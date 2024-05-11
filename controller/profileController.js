import Profile from "../model/profile.js";

const profileController = {
    updateProfile: async (req, res) => {
        const { id } = req.params;
        const updatedProfileData = req.body;
        Profile.findByIdAndUpdate(id, updatedProfileData, (error) => {
            if (error) {
                console.error('Lỗi cập nhật hồ sơ:', error);
                res.status(500).json({ message: 'Đã xảy ra lỗi khi cập nhật hồ sơ' });
            } else {
                res.json({ message: 'Hồ sơ đã được cập nhật thành công' });
            }
        });
    },

    getProfile: async (req, res) => {
        try {
            const { id } = req.params;
            const userProfile = await Profile.findOne({ userId: id });
            if (!userProfile) throw { message: "Hồ sơ không tồn tại", status: 404 };
            res.status(200).json({ data: userProfile, message: 'Thành công' });
        } catch (error) {
            res.status(error.status ?? 401).json({ message: error.message ?? 'Không thể thực hiện hành động!', data: null });
        }
    },

    deleteProfile: async (req, res) => {
        try {
            const { id } = req.params;
            const currentUser = req.crrUser;

            if (id !== currentUser._id) throw { message: "Không có quyền xóa", status: 403 };

            await Profile.findOneAndDelete({ userId: id });

            res.status(201).json({ message: 'Xóa hồ sơ thành công' });
        } catch (error) {
            res.status(error.status ?? 401).json({ message: error.message ?? 'Không thể thực hiện hành động!', data: null });
        }
    }
}

export default profileController;
