//* The methods with a 'T' were for testing purposes only. It should be changed to the Vue view when it's done */
var mysql=require("mysql");
var bcrypt=require("bcryptjs");    //module to encrypt password
var passport=require("passport"); // module to manage ssesions
module.exports ={
    /*T: Getting a view to insert the data of the register*/
    getSignUp: function(req,res,next){
        return res.render('users/signup');
    },
    /*Storing the data of the register on the db */    
    postSignUp: function(req,res,next){
        var salt = bcrypt.genSaltSync(10); //10 rounds to apply with the hash function module bcrypt provides. View module bcrypt docs on npm  
        var password= bcrypt.hashSync(req.body.password,salt); //Passport encrypted 
        //Getting the params user taps and storing in a json object 
        var user ={
            full_name: req.body.fullName,
            username: req.body.username,
            password: password,
            email: req.body.email,
                
        };
       /*Inserting data on the db */
        var config=require(".././database/config");
        var db= mysql.createConnection(config);
        db.connect();
        db.query("INSERT INTO bioblocks.user SET ? , `creation_date` = current_date()", user, (err,rows,fields)=>{
            if (err) throw err;
            db.end();
        });

        return res.redirect("/auth/signin");
    },
    /*T: Getting a view to insert the data of the login form*/
    getSignIn: function(req,res,next){
        
        return res.render('users/signin');
    },
    //Passport.authenticate follows the local strategy view the module passport docs on npm 
    passportAutentication: passport.authenticate("local",{
        successRedirect:'/',
        failureRedirect:'/auth/signin',
        failureFlash:false        
    }),
    logout: function (req,res,next){
        req.logout(); //Logout of passport module
        res.redirect("/auth/signin");
    }
    
};
