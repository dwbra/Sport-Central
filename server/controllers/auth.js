import Mongoose from 'mongoose'
import User from '../models/users.js'
import jwt from 'jsonwebtoken'
import axios from "axios"

export const gLogin = async (req, res) => {
    // console.log("Google Login", req.body.profileObj)
    // console.log("tokenId", req.body.tokenId)
    // console.log("accesstoken", req.body.tokenObj.access_token)

    try {
        const {googleId, imageUrl, name} = req.body.profileObj
        const access_token = req.body.tokenObj.access_token
        const tokenId = req.body.tokenId

        const googleUser = await axios
            .get(
                `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
                {
                    headers: {
                    Authorization: `Bearer ${tokenId}`,
                    },
                },
            )
            .then(res => res.data)
            .catch(error => {     
            });

            //console.log("googleUser", googleUser)

            const token = jwt.sign(googleUser, process.env.JWT_SECRET);
            
            //console.log("token", token)

            res.cookie(process.env.COOKIE_NAME, token, {
                maxAge: 900000,
                httpOnly: true,
                secure: false,
                sameSite: 'none',
                crosssitecookie: 'whatever',
            });
            
            res.status(200).json({
                message: name,
                status: "login",
                user: {
                    name: name,
                    icon: imageUrl,
                    jwt: token,
                }
            })
            
        const user = await User.findOne({ userID: googleId})

        if(user) {
            // User already in DB
        } else {
            //New user
            const newUser = new User({
                userID: googleId,
                icon: imageUrl,
                name,
            })
            newUser.save()
        }



    } catch (error) {
        res.status(404).json({ message: error });
    }
};

export const gLogout = async (req, res) => {
    console.log("Google Logout", req.body)
    res.json({
        action: "sign_out"
        })

};
