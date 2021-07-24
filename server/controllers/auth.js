import Mongoose from 'mongoose'
import User from '../models/users.js'
import jwt from 'jsonwebtoken'

// const jwt = require('jsonwebtoken')

export const gLogin = async (req, res) => {
    console.log("Google Login", req.body)

    try {
        const {googleId, imageUrl, name} = req.body
        console.log("GoogleID", googleId)

        const user = await User.findOne({ userID: googleId})
        // User already in DB
        if(user) {
            jwt.sign(
                {id: googleId},
                process.env.jwtSecret,
                { expiresIn: 3600},
                (error, token) => {
                    if (error) throw error
                    res.json({
                    status: "Re-Login",
                    user: {
                        name: user.name,
                        icon: user.icon,
                        jwt: token,
                        }
                    })
                }
            )
        } else {
            //New user
            const newUser = new User({
                userID: googleId,
                icon: imageUrl,
                name,
            })
            newUser.save()
                .then(user => {
                    jwt.sign(
                        {id: googleId},
                        process.env.jwtSecret,
                        { expiresIn: 3600},
                        (error, token) => {
                            if (error) throw error
                            res.json({
                            status: "New-User",
                            user: {
                                name: user.name,
                                icon: user.icon,
                                jwt: token,
                                }
                            })
                        }
                    )
            })
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
