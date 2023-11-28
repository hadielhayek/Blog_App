import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import bcrypt from 'bcrypt'
import User from './Schema/User.js'
import { nanoid } from 'nanoid';
import jwt from 'jsonwebtoken';

const app = express();
const port = 3000;

let emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;
app.use(express.json())

mongoose.connect(process.env.DB_CONNECTION, {
    autoIndex: true
})


const formDatatoSend = (user) => {
    const access_token = jwt.sign({ id: user._id }, process.env.SECRET_ACCESS_KEY)
    return {
        access_token,
        profile_img: user.personal_info.profile_img,
        username: user.personal_info.username,
        fullname: user.personal_info.fullname,

    }
}

const generateUsername = async (email) => {
    let username = email.split("@")[0];

    let isUsernameExists = await User.exists({ 'personal_info.username': username }).then((result) => result)
    isUsernameExists ? username += nanoid().substring(0, 5) : "";

    return username
}

app.post('/signup', (req, res) => {

    let { fullname, email, password } = req.body;
    if (fullname.length < 3) {
        return res.status(403).json({ 'error': "Fullname must be at least 3 letters" })
    }
    if (!email.length) {
        return res.status(403).json({ 'error': " Email cannot be empty" })
    }
    if (!emailRegex.test(email)) {
        return res.status(403).json({ 'error': "Email is invalid" })

    }
    if (!passwordRegex.test(password)) {
        return res.status(403).json({ 'error': "Password must be 8+ characters with at least 1 uppercase, 1 lowercase, 1 digit, and 1 special character " })

    }

    bcrypt.hash(password, 10, async (err, hashed_pass) => {
        let username = await generateUsername(email);
        let user = new User({
            personal_info: { fullname, email, password: hashed_pass, username }
        })

        user.save().then((u) => {
            return res.status(200).json(formDatatoSend(u))
        })
            .catch(err => {

                if (err.code = 11000) {
                    return res.status(500).json({ "error": 'Email already exists' })

                }

                return res.status(500).json({ "error": err.message })
            })
    })
})



app.post('/signin', (req, res) => {
    let { email, password } = req.body;
    User.findOne({ 'personal_info.email': email })
        .then((user) => {
            if (!user) {
                return res.status(403).json({ 'error': 'Email not found' })
            }
             bcrypt.compare(password,user.personal_info.password,(err,result)=>{
      
                 if(err){
                    return res.status(403).json({'error':'Error occured while login'})
                 }
                 if(!result){
                    return res.status(403).json({'error':'Incorrect password'})


                 }

                 else{
                    return res.status(200).json(formDatatoSend(user))
                 }
             })

        })
        .catch(err => {
            console.log(err.message)
            return res.status(500).json({ 'error': err.message })
        })
})


app.listen(port, () => {
    console.log('Running on port' + port)
})