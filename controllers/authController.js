const User = require('../models/userModel')

const bcrypt = require('bcryptjs')

exports.signup = async ( req ,res , next) => {
    const {username , password} = req.body
    // obtaining the username and password from the body
    try{
        const hashedPassword = await bcrypt.hash(password , 12)
        // 12 -> this is the strength of the hash
        const  newUser = await User.create({
            username : username,
            password : hashedPassword
        })
        res.status(201).json({
            status : 'Success',
            data : {
                user : newUser
            }
        })
    }catch(e){
        res.status(400).json({
            status : 'fail'
        })
        
    }
}

// login 
exports.login = async (req , res , next) => {
    const {username , password } = req.body
    
    try{
        const hashedPassword = await bcrypt.hash(password , 12)
        // 12 -> this is the strength of the hash
        const  user = await User.findOne({username})

        if(!user){
            // if the user is not found
            res.status(404).json({
                status: 'fail',
                message : "User not found"
            })
        }

        // if we find the user
        // check to see if the password is correct
        const isCorrect = await bcrypt.compare(password , user.password)
        if(isCorrect){
            res.status(200).json({
                status : 'Success'
            })
        }

        res.status(400).json({
            status : 'fail',
            data : {
                message : 'Incorrect username or password'
            }
        })
        
    }catch(e){
        res.status(400).json({
            status : 'fail'
        })
        
    }
}

