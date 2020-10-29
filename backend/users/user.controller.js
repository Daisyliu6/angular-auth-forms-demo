// // define all user routes for the api
// // Express is the web server used by the api
// // routes that use the authorize middleware are restricted to authenticated users

// const express = require('express');
// const router = express.Router();
// const userService = require('./user.service');
// const authorize = require('_helpers/authorize')
// const User = require('./user.model');

// // ROUTES 
// // public routes 
// router.post('/authenticate', authenticate);  
// router.post('/register', register);  
// // admin only to get all users and delete users
// router.get('/', authorize(User.role == 'Admin'), getAll);
// router.delete('/:id', authorize(User.role == 'Admin'), _delete);
// // all users 
// router.get('/current', getCurrent);
// router.get('/:id', authorize(), getById);
// router.put('/:id', update);

// module.exports = router;

// function authenticate(req, res, next) {
//     userService.authenticate(req.body)
//         .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
//         .catch(err => next(err));
// }

// function register(req, res, next) {
//     userService.create(req.body)
//         .then(() => res.json({}))
//         .catch(err => next(err));
// }
 
// function getAll(req, res, next) {
//     userService.getAll()
//     .then(users => res.json(users))
//     .catch(err => next(err));
// }

// function getById(req, res, next) {
//     const currentUser = req.user;
//     const id = req.params.id;

//     if (id !== currentUser.sub && currentUser.role !== 'Admin') {
//         return res.status(401).json({ message: 'Unauthorized'});
//     }

//     userService.getById(req.params.id)
//       .then(user => user ? res.json(user) : res.sendStatus(404))
//       .catch(err => next(err));
// }

// // current user's id is req.user.sub
// function getCurrent(req, res, next) {
//     userService.getById(req.user.sub)
//         .then(user => user ? res.json(user) : res.sendStatus(404))
//         .catch(err => next(err));
// }

// // the user's id is req.params.id 
// function update(req, res, next) {
//     userService.update(req.params.id, req.body)
//         .then(() => res.json({}))
//         .catch(err => next(err));
// }

// function _delete(req, res, next) {
//     userService.delete(req.params.id)
//         .then(() => res.json({}))
//         .catch(err => next(err));
// }


// define all user routes for the api
// Express is the web server used by the api
// routes that use the authorize middleware are restricted to authenticated users

const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const authorize = require('_helpers/authorize')
const User = require('./user.model');

// ROUTES 
// public routes 
router.post('/authenticate', authenticate);  
router.post('/register', register);  
// admin only to get all users and delete users
router.get('/', authorize(User.role == 'Admin'), getAll);
router.delete('/:id', authorize(User.role == 'Admin'), _delete);
// all users 
router.get('/current', getCurrent);
router.get('/:id', authorize(), getById);
router.put('/:id', update);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
 
function getAll(req, res, next) {
    userService.getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
}

function getById(req, res, next) {
    const currentUser = req.user;
    const id = req.params.id;

    if (id !== currentUser.sub && currentUser.role !== 'Admin') {
        return res.status(401).json({ message: 'Unauthorized'});
    }

    userService.getById(req.params.id)
      .then(user => user ? res.json(user) : res.sendStatus(404))
      .catch(err => next(err));
}

// current user's id is req.user.sub
function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

// the user's id is req.params.id 
function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
