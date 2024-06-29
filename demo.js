const express = require('express')
const app = express()
const PORT = 3500
const userModel = require('./demoModel')
const { default: mongoose, mongo } = require('mongoose')

const users = [
    { id: 1, name: "user1"},
    { id: 2, name: "user2"},
    { id: 3, name: "user3"},
    { id: 4, name: "user4"},
    { id: 5, name: "user5"},
    { id: 6, name: "user6"},
    { id: 7, name: "user7"},
    { id: 8, name: "user8"},
    { id: 9, name: "user9"},
    { id: 10, name: "user10"},
]

mongoose.connect('mongodb+srv://thiruthanikaiarasu:FMqeqO1zA0IyNdNO@cluster0.ig9l6vq.mongodb.net/demo')
const db = mongoose.connection 
db.once( 'open', async () => {
    if(await userModel.countDocuments().exec() > 0) {
        return Promise.all([
            userModel.create({ name: "user 1"}),
            userModel.create({ name: "user 2"}),
            userModel.create({ name: "user 3"}),
            userModel.create({ name: "user 4"}),
            userModel.create({ name: "user 5"}),
            userModel.create({ name: "user 6"}),
            userModel.create({ name: "user 7"}),
            userModel.create({ name: "user 8"}),
            userModel.create({ name: "user 9"}),
            userModel.create({ name: "user 10"}),
            userModel.create({ name: "user 11"}),
            userModel.create({ name: "user 12"}),
        ]).then( () => {
            console.log("added user")
        })
    }
})

app.get('/users', async (request, response) => {

    const page = parseInt(request.query.page)
    const limit = parseInt(request.query.limit)

    const startIndex = (page - 1) * limit
    const endIndex = page*limit

    const results = {}

    if(page > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        }
    }

    if(page < users.length) {
        results.next = {
            page: page + 1,
            limit: limit
        }
    }
    
    results.data = await userModel.find().limit(limit).skip(startIndex).exec()
    response.status(200).send({results})
})

app.listen(PORT, console.log(`Server is running at http://localhost:3500`))
