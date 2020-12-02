const LocalStategy = require("passport-local").Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcrypt')
var configAuth = require('./auth');



function initialize(passport, getUserByEmail, getUserById, getFacebookUser, insertFacebookUser) {
    const authenticateLocalUser = async (email, password,done)=> {
        const user = await getUserByEmail(email)
        if(user == null){
            return done(null, false, {message:'No user with that email'})
        }

        try{
            if(await bcrypt.compare(password,user.password)){
                done(null, user)
            }
            else{
               done(null, false, {message : 'Password is incorrect'}) 
            }
        }catch(e){
            return done(e)

        }
    }
    
    const authenticateFacebookUser = (accessToken, refreshToken, profile, done)=>{
        process.nextTick(async function () {
            const facebookUser =  await getFacebookUser(profile.id)
            if (facebookUser)
                    return done(null, facebookUser);
            
            else {
                var newUser = {};
                newUser["type"] = "facebook";
                newUser["facebook.id"] = profile.id;
                newUser["facebook.token"] = accessToken;
                newUser["name"] = profile.displayName
                const date = Date()
                newUser["created"] = date;
                newUser["updated"] = date;

                // newUser["facebook.email"] = profile.emails[0].value;

                insertFacebookUser(newUser)
                return done(null,newUser)
            }
        });
    }
    
    passport.use(new LocalStategy({
        usernameField:'email'
    } ,
    authenticateLocalUser))

    passport.use(new FacebookStrategy({
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
    },
    authenticateFacebookUser))


    passport.serializeUser((user,done)=> done(null,user.name))
    
    passport.deserializeUser((_id,done)=> {
        return done(null, getUserById(_id))
    } )
}

module.exports = initialize 