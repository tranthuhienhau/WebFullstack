import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

const Profile = {
    generateToken: (userData) => {
        try {
            const token = jwt.sign(userData, SECRET_KEY, { expiresIn: '1h' });
            return token;
        } catch (error) {
            console.error('Error generating token:', error);
            return null;
        }
    },

    verifyToken: (token) => {
        try {
            if (!token) {
                throw new Error('Bạn chưa đăng nhập');
            }
            const decodedToken = jwt.verify(token, SECRET_KEY);
            return decodedToken;
        } catch (error) {
            console.error('Error verifying token:', error);
            return null;
        }
    }
};

export default Profile;
