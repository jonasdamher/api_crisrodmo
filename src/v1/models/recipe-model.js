const mongoose = require('mongoose')
const moment = require('moment')
const schema = mongoose.Schema
const ObjectIdSchema = schema.ObjectId;

const recipeSchema = mongoose.Schema({
    title: {
        type: String,
        min: 4,
        unique: true,
        required: true
    },
    description: {
        type: String,
        maxlength: 400
    },
    image: {
        type: String,
        required: true
    },
    elaboration: 
    [{
        id: ObjectIdSchema,
        section: {
            type: String,
            required: true
        },
        steps: [{
            id: ObjectIdSchema,
            text: {
                type: String,
                required: true
            }
        }],
        note: {
            type: String,
            default: null
        },
        image: {
            type: String,
            default: null
        }
    }]
    ,
    ingredients: [{
        id: ObjectIdSchema,
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: String,
            required: true
        }
    }],
    categories: [{
        type: schema.Types.ObjectId,
        ref: 'categories',
        required: true
    }],
    tags: [
        {
            id: ObjectIdSchema,
            name: {
                type: String
            }
        }
    ],
    createAt: {
        type: Number,
        default: moment().unix()
    },
    updateAt: {
        type: Number,
        default: null
    },
    video: {
        type: String,
        default: null
    },
    creator: {
        type: schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    nameLink: {
        type: String,
        unique: true,
        required: true
    }
})

module.exports = mongoose.model('recipes', recipeSchema)
