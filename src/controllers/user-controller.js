const UserService = require('../services/user-service');
const userService = new UserService();

const create = async (req, res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password 
        });
        return res.status(201).json({
            data : response,
            success: true,
            message: "Successfully created a user",
            err: {}
        });
    } catch (error) {
        console.log("Something went wrong in the controller layer");
        return res.status(500).json({
            data : {},
            success: false,
            message: "Something went wrong",
            err: error
        });
    }
};

const signIn = async (req, res) => {
    try{
        const response = await userService.signIn(req.body.email, req.body.password); // since it's sensitive data, sent in bodyparams
        return res.status(200).json({
            data : response,
            success: true,
            message: "Successfully signed in",
            err: {}
        });
    }
    catch (error) {
        console.log("Something went wrong in the controller layer");
        return res.status(500).json({
            data : {},
            success: false,
            message: "Something went wrong",
            err: error
        });
    }
};

const isAuthenticated = async (req, res) => {
    try{
        const token = req.headers['x-access-token']; // since it's sensitive data, sent in header params
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            data : response,
            success: true,
            message: "User is authenticated and token is valid",
            err: {}
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            data : {},
            success: false,
            message: "Something went wrong",
            err: error
        });
    }
};

module.exports = {
    create,
    signIn,
    isAuthenticated
}
