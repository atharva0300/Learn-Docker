const express = require('express')
const mongoose = require('mongoose')
const { MONGO_IP, MONGO_PORT, MONGO_PASSWORD , MONGO_USER } = require('./config/config')

const app = express() 

const conenctWithRetry = () => {
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
mongoose.connect(mongoURL).then(() => {
    console.log(`Successfully connected to Databse on port ${MONGO_PORT}`)  
    }).catch((e) => {
        console.log(e)
        setTimeout(conenctWithRetry , 5000)
        // conenct to mongodb again after 5 seconds
    })
}

 
const port = process.env.PORT || 3000

// setting up routes 
app.get('/' , (req , res) => {
    res.send('<h2>Hi yo!!</h2>')
})


app.listen(port , () => {
    console.log(`Server is listening on port : ${port}`)
}) 