const express = require('express')
const mongoose = require('mongoose')
const { MONGO_IP, MONGO_PORT, MONGO_PASSWORD , MONGO_USER } = require('./config/config')
const postRouter = require('./routes/postRoutes')
const userRouter = require('./routes/userRoutes')


const app = express() 

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
const conenctWithRetry = () => {
mongoose.connect(mongoURL).then(() => {
    console.log(`Successfully connected to Databse on port ${MONGO_PORT}`)  
    }).catch((e) => {
        console.log(e)
        setTimeout(conenctWithRetry , 5000)
        // conenct to mongodb again after 5 seconds
    })
}

// call the function
conenctWithRetry()

app.use(express.json())
// this makes sure that the body gets attached to the request object
// for req.body

 
const port = process.env.PORT || 3000

// passing a middlware to the api-endpoint "/api/v1/posts"
app.use("/api/v1/posts" , postRouter)

// passing a middleware to hte api-endpoint 
app.use('/api/v1/users' , userRouter)

// setting up routes 
app.get('/' , (req , res) => {
    res.send('<h2>Hi yo!!</h2>')
})


app.listen(port , () => {
    console.log(`Server is listening on port : ${port}`)
}) 