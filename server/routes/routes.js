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
router.get('/auth/signup',controllers.userController.getSignUp); //Route to get Sing Up form 
router.post('/auth/signup',controllers.userController.postSignUp); //Route to store the data of Sing Up form 
router.get('/auth/signin',controllers.userController.getSignIn); //Route to get Sing In form 
router.post('/auth/signin',controllers.userController.passportAutentication); //Route to store the session if success authentication  
router.get('/auth/logout',controllers.userController.logout); //Route to quit session 

//project routes
router.get('/project/',isLoggedIn,controllers.projectsController.getProject); //Route to get the first page
router.get('/newproject',isLoggedIn,controllers.projectsController.getnewProject); //Route to get the new project form
router.post('/newproject',isLoggedIn,controllers.projectsController.postMyProyect); //Route to store the data of new project form
router.get('/allMyprojects',isLoggedIn,controllers.projectsController.getMyProject); //Route to get the list of all my projects
router.get('/searchp',isLoggedIn,controllers.projectsController.getSearchProjects); // Route to get the form to search projects
router.post('/searchp',isLoggedIn,controllers.projectsController.postSearchProjects); // Route to get the list of projects searched
router.get('/project/:id',isLoggedIn,controllers.projectsController.getMyProjectInside); // Route to get Add to group of projects,Users contributing on this project,Add Users to project
router.get('/project/:id/users',isLoggedIn,controllers.projectsController.getMyProjectUsers); //Route to get the users that are on the project with id 
router.get('/project/:id/users/search',isLoggedIn,controllers.projectsController.getSearchUsers); //Route to get the view search for users to add to my project
router.post('/project/:id/users/search',isLoggedIn,controllers.projectsController.postSearchUsers); //Route to get the results of searching for users to add to my project
router.get('/project/:id/users/add/:iduser',isLoggedIn,controllers.projectsController.addUsersProject); //Route to add to my project the users

//Group of projects routes 

router.get('/newgroup',isLoggedIn,controllers.groupsController.getnewGroup); //Route to get the new group form
router.post('/newgroup',isLoggedIn,controllers.groupsController.postgroup); //Route to store the data of new group form
router.get('/project/:id/groups',isLoggedIn,controllers.groupsController.getGroups); //Route to get the list of all groups
router.get('/project/:id/groups/:id',isLoggedIn,controllers.groupsController.projtoGroup); //Route to add to my group a project 
router.get('/groups',isLoggedIn,controllers.groupsController.getmyGroups); //Route to get the list of all my groups
router.get('/groups/:id',isLoggedIn,controllers.groupsController.getmyGroupsproject); //Route to get one of all my groups
router.get('/searchg',isLoggedIn,controllers.groupsController.getSearchGroups); //Route to get the form to search for groups
router.post('/searchg',isLoggedIn,controllers.groupsController.postSearchGroups); //Route to get the results of searching for groups of projects  
module.exports = router;
