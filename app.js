const express = require('express')
const app = express()

const cors = require('cors')
const bodyParser = require('body-parser')

const {PORT} = require('./configuration/config')
const connect = require('./database/connection')

const characterRoute = require('./routes/characterRoute')

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}))

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (request, response) => {
    response.status(200).send({ message: "It's working"})
})

app.use('/api/v1/characters', characterRoute)

connect() 
    .then( () => {
        try{
            app.listen(PORT, console.log(`Server is running at http://localhost:${PORT}`))
        } 
        catch(error) {
            console.log(`Can't connect to database : ${error}`)
        }
    })
    .catch(error => {
        console.log(`Error while connecting to database : ${error}`)
    })