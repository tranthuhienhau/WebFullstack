import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

const Profile = {
    verifyToken: async (req, res, next)=>{
        const token = req.headers.token;
        if(token){
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, SECRET_KEY, (err, users) =>{
                if(err){
                    res.status(403).send("Token is not valid");
                }
                req.user = users;
                next();
            });

        }
        else{
            res.status(403).send("YOU ARE NOT AUTHENTICATED!")
        }
    },

};

export default Profile;
