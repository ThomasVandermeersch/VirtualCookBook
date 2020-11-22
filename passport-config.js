const LocalStategy = require("passport-local").Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password,done)=> {
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
    passport.use(new LocalStategy({usernameField:'email'} ,
    authenticateUser))
    passport.serializeUser((user,done)=> done(null,user))
    passport.deserializeUser((_id,done)=> {
        return done(null, getUserById(_id))
    } )
}

module.exports = initialize 