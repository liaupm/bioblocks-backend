//Serializar un objeto:  Convertir objeto a string
//Deserializar el objeto 
//Autenticación
var LocalStrategy =require("passport-local").Strategy;
var mysql=require("mysql");
var bcrypt=require("bcryptjs");
module.exports=function(passport){
    
    passport.serializeUser(function(user,done){
       done(null,user); 
    });

    passport.deserializeUser(function(obj,done){
        done(null,obj); 
     });
     passport.use(new LocalStrategy({
         passReqToCallback: true } ,
            function(req,username, password,done){
                var config=require(".././database/config");
                var db= mysql.createConnection(config);
                db.connect();
               db.query("SELECT * FROM bioblocks.user WHERE username= ?", username, function(err,rows,fields){
                    
                    if (err) throw err;
                    db.end();

                    if(rows.length>0){
                        var user= rows[0];
                        if(bcrypt.compareSync(password,user.password)){
                            return done(null, user);
                        }
                    }
                    return done(null,false,null) ;
                });
              
            }
      ));
      
}