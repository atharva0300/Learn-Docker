const express = require('express')

const app = express() 

const port = process.env.PORT || 3000

// setting up routes 
app.get('/' , (req , res) => {
    res.send('<h2>Hi yo!!</h2>')
})


app.listen(port , () => {
    console.log(`Server is listening on port : ${port}`)
})