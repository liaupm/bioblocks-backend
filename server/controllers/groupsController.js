//* The methods with a 'T' were for testing purposes only. It should be changed to the Vue view when it's done */
var mysql=require("mysql");
module.exports={
    //*T: Page created to test the form to create a new group of projects*/
    getnewGroup: function(req,res,next){
        return res.render('groups/newgroup');
    },
    /*Creating a new group of projects */
    postgroup:function(req,res,next){
    var name=req.body.group_name //Getting the name of the group from the form 
    var config=require("../database/config");
    var db= mysql.createConnection(config);
    db.connect();
    db.query("INSERT INTO bioblocks.projects_group (name) VALUES( ? )", [name],function (err,rows,fields){
        if (err) throw err;
     
       
    });
    db.end()
    return res.send("Group  created")
    },
    //Getting a list of  all groups
    getGroups: function(req,res,next){
    names=[]
    ids=[]
    i=0
    var config=require("../database/config");
    var db= mysql.createConnection(config);
    db.connect();
    db.query("SELECT * FROM bioblocks.projects_group" ,function (err,rows,fields){
        if (err) throw err;
        if(rows.length>0){
            while(rows[i]!=null){    
            names.push(rows[i].name)  
            ids.push(rows[i].id_group) 
            i++;
            }
        }
        db.end()
        return res.render("groups/groupsList",{names,ids}) 
    }); 
    
    },
    //Getting a list of  all my groups
    getmyGroups:function(req,res,next){
        names=[]
        ids=[]
        i=0
        var config=require("../database/config");
        var db= mysql.createConnection(config);
        db.connect();
        db.query ("SELECT name,id_group FROM projects_group WHERE id_group IN (SELECT DISTINCT id_group FROM project_belongs_group where id_project IN (SELECT id_project FROM user_belongs_project where id_user=?))" 
        ,[req.user.id_user],function (err,rows,fields){
               
            if (err) throw err;
            if(rows.length>0){
                while(rows[i]!=null){    
                names.push(rows[i].name)
                ids.push(rows[i].id_group)  
                i++;
                }
            }
            
          
        db.end()
          
        return res.render("groups/mygroups",{names,ids}) 
        });


    },
    /*Getting the projects associated to my groups */
    getmyGroupsproject:function(req,res,next){
        var id_group=req.path.substr(8,1)
        var i=0
        var project_names=[]
        var config=require("../database/config");
        var db= mysql.createConnection(config);
        db.connect();
        db.query("SELECT name FROM project WHERE id_project IN (SELECT id_project from project_belongs_group WHERE id_group=?)",[id_group],function (err,rows,fields){
            if(rows.length>0){
                while(rows[i]!=null){    
                    project_names.push(rows[i].name)
                      
                    i++;
                    
                    }
            }
            return res.render("groups/projgrouplist",{project_names})
        });
    },
    /*Adding the project to a group */
    projtoGroup: function(req,res,next){
        
            var id_project=req.path.substr(9,1)
            var id=req.path.substr(18,1)
            var config=require("../database/config");
            var db= mysql.createConnection(config);
            db.query("INSERT INTO project_belongs_group (id_project,id_group) VALUES (?,?)",[id_project,id],function (err,rows,fields){
                if (err) throw err;
                db.end();
            });
            return res.send("Project added to group  ")
        },
    
    /*T: Page created to test the search of groups of projects*/ 
    getSearchGroups:  function(req,res,next){
        return res.render("groups/search_group")
    },
    /*Searching for groups of projects following the pattern user tap  */
    postSearchGroups:  function(req,res,next){
        var patron=req.body.search_group
        var id_group=[]
        var names=[] 
        var i=0; 
        var config=require("../database/config");
        var db= mysql.createConnection(config);
        db.connect();
          
       db.query("SELECT * from projects_group where projects_group.name LIKE '%"+ patron + "%'",function (err,rows,fields){ 
            if (err) throw err;
            if(rows.length>0){
                while(rows[i]!=null){    
                names.push(rows[i].name)  
                id_group.push(rows[i].id_group) 
                i++;
                }
            }
            db.end()
            return res.render("groups/search_list",{names,id_group})
        })
    
    }
    }


