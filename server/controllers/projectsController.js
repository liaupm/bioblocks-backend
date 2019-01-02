//* The methods with a 'T' were for testing purposes only. It should be changed to the Vue view when it's done */
var mysql=require("mysql");
module.exports ={
//*T: First Page after Login*/
getProject: function(req,res,next){
        return res.render('projects/project');

},
//*T: Form needed to create a new project */
getnewProject: function(req,res,next){
    return res.render('projects/newproject');

},
/*Creating a new project*/
postMyProyect: function(req,res,next){
    var id=req.user.id_user //user is a variable that is on the request of the HTTP with this params: id_user, username, password and full_name 
    /*Getting the params that the user type onn the form*/
    var name = req.body.project_name   
    var public=req.body.public //'Public' has two values 0 or 1, so the best way of doing this is with a checkbox   
    if(public=="on"){
        var publicint=1
    } else{
        var publicint=0
    }
    /*When creating a project, the owner is automatically added on the project ('user_belongs_project' table)*/
    var config=require("../database/config");
    var db= mysql.createConnection(config);
    db.connect();
    /* Storing the new project in the db */
    db.query("INSERT INTO bioblocks.project (name, creation_date, last_modification,public,owner) VALUES( ? , current_date() , now(),?,?)", [name,publicint,id],function (err,rows,fields){
        if (err) throw err;
         
    });
    /*Getting the id of the project we just created*/
    db.query("SELECT project.id_project FROM project WHERE project.id_project = (SELECT MAX( id_project )  FROM project)",function(err,rows,fields){
        if (err) throw err;
        if(rows.length>0){
        var id_project=rows[0].id_project
        
    }
    /*Storing the owner of the project in user_belongs_project */
    db.query("INSERT INTO user_belongs_project (id_user,id_project) VALUES (?,?)",[id,id_project],function (err,rows,fields){
        if (err) throw err;
        db.end();
    });
});
    return res.send("Proyect Created")
   
},
//Getting a list of all my projects
getMyProject: function(req,res,next){
    var id=req.user.id_user  
    var projectList=[] 
    var ids=[]
    var i=0; 
    var config=require("../database/config");
    var db= mysql.createConnection(config);
    db.connect();
    db.query("SELECT project.id_project,project.name FROM project WHERE project.id_project  IN (SELECT id_project FROM bioblocks.user_belongs_project WHERE id_user=?)",[id],function (err,rows,fields){ 
        if (err) throw err;
        if(rows.length>0){
            while(rows[i]!=null){    
            projectList.push(rows[i].name)   
            ids.push(rows[i].id_project)
            i++;
            }
        }
        db.end();
        
        return res.render("projects/myprojects",{projectList,ids}) 
    });
      
},
/*T: View vreated to test Add to group of projects,Users contributing on this project,Add Users to project*/
getMyProjectInside:  function(req,res,next){
    var id_project=req.path.substr(9)
    return res.render('projects/especific_proj',{id_project});
},
/*Getting the list of user that belongs to a project */   
getMyProjectUsers:  function(req,res,next){
    var id_project=req.path.substr(9,9) //id_project obtained from the URL
    var names=[] 
    var i=0; 
    var config=require("../database/config");
    var db= mysql.createConnection(config);
    db.connect();
    
    
    db.query("SELECT user.username from user where user.id_user IN ( SELECT user_belongs_project.id_user FROM user_belongs_project where id_project =?)",[id_project],function (err,rows,fields){ 
        if (err) throw err;
        if(rows.length>0){
            while(rows[i]!=null){    
            names.push(rows[i].username)   
            i++;
            }
        }
        db.end()
        return res.render("projects/user_list",{names, id_project})
    })
},
/*T: Page created to test the search of users and adding them to a project*/
getSearchUsers: function(req,res,next){
    var id_project=req.path.substr(9,9)
    return res.render("projects/addUsers",{id_project})
},
/*Searching for users to add to my project following the pattern user tap  */
postSearchUsers: function(req,res,next){
    var patron=req.body.search_user
    var id_project=req.path.substr(9,9)
    var names=[] 
    var id_user=[]
    var i=0; 
    var config=require("../database/config");
    var db= mysql.createConnection(config);
    db.connect();
   db.query("SELECT user.id_user,user.username from user where user.username LIKE '%"+ patron + "%'",function (err,rows,fields){ 
        if (err) throw err;
        if(rows.length>0){
            while(rows[i]!=null){    
            names.push(rows[i].username)  
            id_user.push(rows[i].id_user) 
            i++;
            }
        }
        db.end()
        return res.render("projects/user_listadd",{names,id_project,id_user})
    })

},
/*Adding user to my project previously searched */
addUsersProject: function(req,res,next){
    var id_project=req.path.substr(9,1)
    var id=req.path.substr(21,1)
    var config=require("../database/config");
    var db= mysql.createConnection(config);
    db.query("INSERT INTO user_belongs_project (id_user,id_project) VALUES (?,?)",[id,id_project],function (err,rows,fields){
        if (err) throw err;
        db.end();
    });
    return res.send("User added to project ")
},
/*T: Page created to test the search of projects*/
getSearchProjects:function(req,res,next){    
    return res.render("projects/search_project")


},
/*Searching for projects following the pattern user tap and that they are public */
postSearchProjects:function(req,res,next){
    var patron=req.body.search_project
    var id_project=[]
    var names=[] 
    var i=0; 
    var config=require("../database/config");
    var db= mysql.createConnection(config);
    db.connect();
      
   db.query("SELECT id_project,name from project where project.name LIKE '%"+ patron + "%' AND public=1",function (err,rows,fields){ 
        if (err) throw err;
        if(rows.length>0){
            while(rows[i]!=null){    
            names.push(rows[i].name)  
            id_project.push(rows[i].id_project) 
            i++;
            }
        }
        db.end()
        return res.render("projects/search_list",{names,id_project})
    })
}
}
