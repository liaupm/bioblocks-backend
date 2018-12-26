var mysql=require("mysql");
var bcrypt=require("bcryptjs");
var passport=require("passport");
module.exports ={
    getSignUp: function(req,res,next){
        return res.render('users/signup');
    },    
    postSignUp: function(req,res,next){
        var salt = bcrypt.genSaltSync(10); 
        var password= bcrypt.hashSync(req.body.password,salt);

        var user ={
            full_name: req.body.fullName,
            username: req.body.username,
            password: password,
            email: req.body.email,
            
           
        };
       
        var config=require(".././database/config");
        var db= mysql.createConnection(config);
        db.connect();
        db.query("INSERT INTO bioblocks.user SET ? , `creation_date` = current_date()", user, (err,rows,fields)=>{
            if (err) throw err;
            db.end();
        });

        return res.redirect("/auth/signin");
    },
    getSignIn: function(req,res,next){
        
        return res.render('users/signin');
    },
    passportAutentication: passport.authenticate("local",{
        successRedirect:'/',
        failureRedirect:'/auth/signin',
        failureFlash:false        
    }),
    logout: function (req,res,next){
        req.logout(); //Logout de modulo passport
        res.redirect("/auth/signin");
    }
    
};
