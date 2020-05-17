const CATEGORY = require('../models/category-model')
const RECIPE = require('../models/recipe-model')

module.exports = {
    get,
    getAll,
    create,
    update,
    remove
}

async function get(req, res) {

    CATEGORY.findOne({"nameLink": req.params.id})
    .select('name')
    .exec((err, categoryResponse) => {

        if (err || !categoryResponse) {
            return res.status(401).json({ error: "Category does not exist" })
        }

        RECIPE.find({'categories': categoryResponse._id})
        .select('title description nameLink image').then(recipeResponse => {

            return res.status(200).json({recipes: recipeResponse, category: categoryResponse})
    
        }).catch(err => {
            return res.status(404).json({ 
                message: "Don't exist recipe.", 
                error: err
            })
        })
    })
}

async function getAll(req, res) {

    CATEGORY.find().then(categoryResponse => {

        return res.status(200).json(categoryResponse)

    }).catch(err => {
        
        return res.status(404).json({ 
            message: "Don't exists recipes.", 
            error: err
        })
    })
}

async function create(req, res) {

    let nameLink = req.body.name.replace(/ /g, '-').toLowerCase()
    nameLink = nameLink.normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    req.body.nameLink = nameLink

    CATEGORY.create(req.body).then(categoryResponse => {
            
        return res.status(201).json(categoryResponse)

    }).catch(err => {

        return res.status(400).json(err)
    })
}

async function update(req, res) {

    CATEGORY.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(categoryResponse => {
            
        return res.status(200).json(categoryResponse)

    }).catch(err => {

        return res.status(400).json(err)
    })
}

async function remove(req, res) {

    CATEGORY.findByIdAndDelete(req.params.id)
    .then(categoryResponse => {
            
        return res.status(200).json(categoryResponse)

    }).catch(err => {

        return res.status(400).json(err)
    })
}
