var mysql=require("mysql");
module.exports ={
getProject: function(req,res,next){
        return res.render('projects/project');

},
getnewProject: function(req,res,next){
    return res.render('projects/newproject');

},
postMyProyect: function(req,res,next){
    //name, creation_date, last_modification, public,owner

    var id=req.user.id_user
    var name = req.body.project_name
    var public=req.body.public   
    if(public=="on"){
        var publicint=1
    } else{
        var publicint=0
    }
    var config=require("../database/config");
    var db= mysql.createConnection(config);
    db.connect();
    db.query("INSERT INTO bioblocks.project (name, creation_date, last_modification,public,owner) VALUES( ? , current_date() , now(),?,?)", [name,publicint,id],function (err,rows,fields){
        if (err) throw err;
         
    });
    db.query("SELECT project.id_project FROM project WHERE project.id_project = (SELECT MAX( id_project )  FROM project)",function(err,rows,fields){
        if (err) throw err;
        if(rows.length>0){
        var id_project=rows[0].id_project
        
    }
    
    db.query("INSERT INTO user_belongs_project (id_user,id_project) VALUES (?,?)",[id,id_project],function (err,rows,fields){
        if (err) throw err;
        db.end();
    });
});
    return res.send("Proyect Created")
   
},
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
        console.log(projectList)
        return res.render("projects/myprojects",{projectList,ids}) 
    });
      
},
getMyProjectInside:  function(req,res,next){
    return res.render('projects/especific_proj');
}   


}