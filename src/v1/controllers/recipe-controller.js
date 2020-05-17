const moment = require('moment')

const RECIPE = require('../models/recipe-model')

module.exports = {
    get,
    getAll,
    create,
    update,
    remove
}

async function get(req, res) {

    RECIPE.findOne({"nameLink": req.params.id})
    .populate('creator', 'name email')
    .populate('categories', 'name nameLink')
    .then(recipeResponse => {

        if(!recipeResponse) {
            return res.status(404).json({ error: "Recipe does not exist" })
        }

        return res.status(200).json(recipeResponse)

    }).catch(err => {
        
        return res.status(404).json(err)
    })
}

async function getAll(req, res) {

    RECIPE.find().then(recipeResponse => {

        return res.status(200).json(recipeResponse)

    }).catch(err => {
        
        return res.status(404).json({ 
            message: "Don't exists recipes.", 
            error: err
        })
    })
}

async function create(req, res) {

    let nameLink = req.body.title.replace(/ /g, '-').toLowerCase()
    nameLink = nameLink.normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    req.body.nameLink = nameLink

    RECIPE.create(req.body).then(recipeResponse => {
            
        return res.status(201).json(recipeResponse)

    }).catch(err => {

        return res.status(400).json(err)
    })
}

async function update(req, res) {

    req.body.updateAt = moment().unix()

    RECIPE.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(recipeResponse => {
            
        return res.status(200).json(recipeResponse)

    }).catch(err => {

        return res.status(400).json(err)
    })
}

async function remove(req, res) {

    RECIPE.findByIdAndDelete(req.params.id)
    .then(recipeResponse => {
            
        return res.status(200).json(recipeResponse)

    }).catch(err => {

        return res.status(400).json(err)
    })
}
