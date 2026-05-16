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

router.get(
    '/isAuthenticated',
    UserController.isAuthenticated
);

router.get(
    '/isAdmin',
    AuthRequestValidator.validateIsAdminRequest,
    UserController.isAdmin
)

module.exports = router;