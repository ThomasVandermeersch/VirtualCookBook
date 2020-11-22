const LocalStategy = require("passport-local").Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password,done)=> {
        const user = await getUserByEmail(email)
        console.log(user)
        if(user == null){
            console.log("User not found")
            return done(null, false, {message:'No user with that email'})
        }
        console.log("User found")

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
    passport.serializeUser((user,done)=> done(null,user._id))
    passport.deserializeUser((_id,done)=> {
        return done(null, getUserById(_id))
    } )
}

module.exports = initialize 