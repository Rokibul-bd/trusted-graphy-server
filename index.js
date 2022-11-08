const express = require('express');
const cors = require('cors');
const port = process.env.port || 5000
const app = express()


//Midleware 
app.use(cors())
app.use(express())

app.get('/', (req, res) => {
    res.send('your Server is Running')
})




app.listen(port, (req, res) => {
    console.log(`your server is running on port ${port}`)
})