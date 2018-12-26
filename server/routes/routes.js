var express = require('express');
var router = express.Router();
var controllers=require('.././controllers');

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
}
return res.redirect('/auth/signin');
}

router.get("/",isLoggedIn, controllers.homeController.index);

//User routes
router.get('/auth/signup',controllers.userController.getSignUp);
router.post('/auth/signup',controllers.userController.postSignUp);
router.get('/auth/signin',controllers.userController.getSignIn);
router.post('/auth/signin',controllers.userController.passportAutentication);
router.get('/auth/logout',controllers.userController.logout);
//project routes
router.get('/project/',isLoggedIn,controllers.projectsController.getProject);
router.get('/newproject',isLoggedIn,controllers.projectsController.getnewProject);
router.post('/newproject',isLoggedIn,controllers.projectsController.postMyProyect);
router.get('/allMyprojects',isLoggedIn,controllers.projectsController.getMyProject);
router.get('/project/:id',isLoggedIn,controllers.projectsController.getMyProjectInside);
module.exports = router;
