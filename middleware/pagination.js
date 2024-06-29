const characterModel = require('../models/characterModel')

const pagination = async (request, response, next) => {
    const page = parseInt(request.query.page < 1 ? 1 : request.query.page || 1)
    const limit = parseInt(request.query.limit || 5)

    const baseUrl = "/api/v1"
    const startIndex = (page - 1) * limit
    const resultCharacters = {}

    const characters = await characterModel.aggregate(
        [
            {
              $facet: {
                metadata: [{ $count: "total" }],
                data: [ 
                    { $sort: { id: 1 } }, 
                    { $skip: startIndex },
                    { $limit: limit }, 
                ],
              },
            },
            {
              $unwind: "$metadata",
            },
            {
                $addFields: {
                    pages: {
                        $ceil: {
                            $divide: ["$metadata.total", limit]
                        }
                    }
                }
            },
            {
              $project: {
                info: {
                    count: "$metadata.total",
                    pages: "$pages",
                    next: {
                        $cond: {
                            if: { $lt: [page, "$pages"] },
                            then: `${baseUrl}/${page + 1}`,
                            else: ""
                        }
                    },
                    prev: {
                        $cond: {
                            if: { $gt: [page, 1] },
                            then: `${baseUrl}/${page - 1}`,
                            else: ""
                        }
                    },
                  },
                results: "$data",
                
              },
            },
          ]
    )

    if (characters.length > 0) {
        resultCharacters.info = characters[0].info
        resultCharacters.results = characters[0].results
    } else {
        resultCharacters.info = {
            count: 0
        }
        resultCharacters.results = []
    }

    request.characters = resultCharacters 

    next()
}

module.exports = pagination