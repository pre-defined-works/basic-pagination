const express = require('express')
const router = express.Router()

const { getCharacters } = require('../controllers/characterController')
const pagination = require('../middleware/pagination')

router.get(
    '/',

    pagination,

    getCharacters
)

module.exports = router