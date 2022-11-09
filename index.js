const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const port = process.env.port || 5000
const app = express()


//Midleware 
app.use(cors())
app.use(express())

app.get('/', (req, res) => {
    res.send('your Server is Running')
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0mrh6im.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const servicesCollactions = client.db('trustedGrapy').collection('services');

        app.get('/services', async (req, res) => {
            const query = {}
            const cursor = servicesCollactions.find(query)
            const services = await cursor.limit(4).toArray()
            res.send(services)
        })
        app.get('/allservices', async (req, res) => {
            const query = {}
            const cursor = servicesCollactions.find(query)
            const services = await cursor.toArray()
            res.send(services)
        })
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const service = await servicesCollactions.findOne(query)
            res.send(service)
        })
    }
    finally {

    }
}

run().catch(err => console.error(err))

// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });





app.listen(port, (req, res) => {
    console.log(`your server is running on port ${port}`)
})