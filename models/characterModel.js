const { default: mongoose } = require("mongoose");

const characterSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: [true, "Character Id is mandatory field"]
        },
        name: {
            type: String,
            required: [true, "Name is mandatory field"]
        },

        status: {
            type: String,
            enum: ["Alive", "Dead", "unknown"]
        },

        species: {
            type: String,
            required: [true, "Species is mandatory field"]
        },

        type: {
            type: String,
        },

        gender: {
            type: String,
            enum: ["Male", "Female", "Genderless", "unknown"]
        },

        origin: {
            name: {
                type: String,
                required: [true, "Origin name is mandatory field"]
            },

            link: {
                type: String, 
                required: [true, "Origin link is mandatory field"]
            }
        },

        location: {
            name: {
                type: String,
                required: [true, "Location name is mandatory field"]
            },

            url: {
                type: String, 
                required: [true, "Location url is mandatory field"]
            }
        },

        image: {
            type: String,
            required: [true, "Image is mandatory field"]
        },

        episode: {
            type: [ String ],
            required: [true, "Episodes is a mandatory field"]
        },

        url: {
            type: String,
            required: [true, "URL is a mandatory field"]
        },

        created: {
            type: Date,
            required: [true, "Date is mandatory filed"]
        }

    },
    {
        collection: 'characters'
    }
)

module.exports = mongoose.model.characterSchema || mongoose.model('characterSchema', characterSchema)