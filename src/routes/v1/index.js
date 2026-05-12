const express = require('express');
const router = express.Router();

const UserController = require('../../controllers/user-controller');
const {AuthRequestValidator} = require('../../middlewares/index');

router.post(
    '/signup', 
    AuthRequestValidator.validateUserAuth,
    UserController.create
);
router.post( // since you are generating token, so post request is more suitable here.
    '/signin',
    AuthRequestValidator.validateUserAuth,
    UserController.signIn
); 

module.exports = router;