import mongoose from 'mongoose';
import users from '../model/users.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const userController = {
    register: async (req, res) => {
        const { username, password } = req.body;
        // Kiểm tra xem người dùng đã tồn tại chưa
        const testUser = await users.findOne({ username });
        if (testUser) {
            return res.status(400).send({
                message: 'Tài khoản đã tồn tại!'
            });
        }
        // Tạo một `profile_id` mới tự động bằng cách tạo một đối tượng `ObjectId`
        const profile_id = new mongoose.Types.ObjectId();
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt)
        const newUser = new users({
            username,
            password: hashPassword,
            profile_id
        });

        try {
            await newUser.save();
            return res.status(201).send({
                message: 'Người dùng đã được tạo thành công',
                user: newUser
            });
        } catch (error) {
            return res.status(500).send({
                message: 'Đã xảy ra lỗi khi tạo người dùng',
                error: error.message
            });
        }
    },
    login: async (req, res) =>{
        const {username, password} = req.body;
        const findUser = await users.findOne({username});
        if (!findUser){
            return res.status(401).send("Tài khoản hoặc mật khẩu bạn nhập chưa chính xác!")
        }
        const testPass = await bcrypt.compare(password, findUser.password)
        if (!testPass){
            return res.status(401).send("Tài khoản hoặc mật khẩu bạn nhập chưa chính xác!")
        }
        const SECRET_KEY = process.env.SECRET_KEY
        const token = jwt.sign({ userId: findUser._id }, SECRET_KEY, {expiresIn: "30s"})
        return res.status(200).send({
            message: "Login is successfull",
            token: token
        })

    },
    logout: async (req, res)=>{
        res.status(201).send("Đăng xuất thành công!")
    }
};

export default userController;
