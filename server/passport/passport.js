//* The methods with a 'T' were for testing purposes only. It should be changed to the Vue view when it's done *
var LocalStrategy =require("passport-local").Strategy;
var mysql=require("mysql");
var bcrypt=require("bcryptjs");

/*This module works with the user sesion: 
 1. serializeUser: Serialize the object user so that it's active all the time he is logged in
 2. passport.use: To compare the  username and password that it is on the db to the one the user is giving
 3. deserialize user: To delete the user information on the req of the HTTP when user logout
*/

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