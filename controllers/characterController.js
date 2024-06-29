const getCharacters = async (request, response) => {
    const { characters } = request
    if(characters.results.length == 0) {
        return response.status(404).send({ message: "Page not found"})
    }

    response.status(200).send(request.characters)
}

module.exports = {
    getCharacters
}