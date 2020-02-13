// 28 added
const express = require('express');
const router = express.Router();
const authorize = require('_helpers/authorize');
const roleService = require('./role.service');
const User = require('../users/user.model');

router.get('/', authorize(User.role == 'Admin'), getAllRole);
router.post('/', authorize(User.role == 'Admin'), addRole);
router.delete('/:id', authorize(User.role == 'Admin'), deleteRole);

module.exports = router;
 
 function getAllRole(req, res, next) {
   roleService.getAllRole(req)
   .then(roles => res.json(roles))
   .catch(err => next(err));
 }

 function addRole(req, res, next) {
  roleService.addRole(req.body)
  .then(() => res.json(req.body.role))
  .catch(err => next(err));
}

 function deleteRole(req, res, next) {
  roleService.deleteRole(req.params.id)
      .then(() => res.json({}))
      .catch(err => next(err));
}