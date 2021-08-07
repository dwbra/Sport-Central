import Mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/users.js'


export const signin = async (req, res) => {
    // Destructuring the email and password as the request body
    const {email, password} = req.body

    try {
        // Finding within the database whether an existing user exists with that email
        const existingUser = await User.findOne({email})

        // If no existing user, return message
        if(!existingUser) return res.json({message: "User doesn't exist."}).status(404)

        // Using bcrypt to compare whether a password for the existing user is correct
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        // If the password is incorrect, return the message
        if(!isPasswordCorrect) return res.json({message: "Invalid credentials"}).status(400)

        // Creating a token through json web token for the signing in user with the users filled in details
        // Creating extra parameters whereby the token expires in 1 hour
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: '1h'})

        // Returning the result in json along with their token
        res.json({result: existingUser, token}).status(200)
    } catch (error) {
        res.json({message: 'Something went wrong.'}).status(500)
    }
}

export const signup = async (req, res) => {
    // Destructuring the variables within the request body
    const {email, password, confirmPassword, firstName, lastName} = req.body

    try {
        // Check whether or not the user already exists
        const existingUser = await User.findOne({email}) 
        
        // If the user already exists, return the message
        if(existingUser) return res.json({message: "User already exists."}).status(404)

        // Check if the passwords match, otherwise return the message
        if(password !== confirmPassword) return res.json({message: "Passwords don't match."}).status(404)

        // Using bycrypt to hash the entered password, with a hashed string of 12 characters
        const hashedPassword = await bcrypt.hash(password, 12)

        // Creating a new user based on the details provided
        const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`})

        // Creating a token that allows the user to be logged in once signed up
        const token = jwt.sign({email: result.email, id: result._id}, 'test', {expiresIn: '1h'})

        // Returning the new user and their allocated token
        res.json({result, token}).status(200)
    } catch (error) {
        res.json({message: 'Something went wrong.'}).status(500)
    }
}
