const router = require('express').Router()

// MIDDLEWARES

const auth = require('./middlewares/auth')

// CONTROLLERS

const userController = require('./controllers/user-controller')
const recipeController = require('./controllers/recipe-controller')
const categoryController = require('./controllers/category-controller')

// ROUTES
// USER
router.post('/auth/login', userController.login)
router.post('/auth/signup', userController.signup)
router.post('/auth/refresh-token', auth.authAdmin, userController.refreshToken)

router.patch('/user/:id',  auth.authAdmin, userController.update)

// RECIPE
router.get('/recipe/:id', recipeController.get)
router.get('/recipe', recipeController.getAll)

router.post('/recipe', auth.authAdmin, recipeController.create)
router.patch('/recipe/:id', auth.authAdmin, recipeController.update)
router.delete('/recipe/:id', auth.authAdmin, recipeController.remove)

// CATEGORY
router.get('/category/:id', categoryController.get)
router.get('/category', categoryController.getAll)

router.post('/category', auth.authAdmin, categoryController.create)
router.patch('/category/:id', auth.authAdmin, categoryController.update)
router.delete('/category/:id', auth.authAdmin, categoryController.remove)

module.exports = router
