var express=require('express');
const {postUser, getUserDetails, loginUserController} = require('../Controller/userController');
const { verify } = require('../Middleware/VerifyMiddleware');
var router=express.Router();


router.post('/createUser', postUser);
router.get('/getUserDetails',verify,getUserDetails);
router.post('/login', loginUserController);
module.exports=router;