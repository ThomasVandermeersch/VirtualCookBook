const bcrypt = require('bcrypt')
module.exports = async function register(reqQuery){
    const hashedPassword = await bcrypt.hash(reqQuery.password,10)
    const date = Date()
    return {email:reqQuery.email, password:hashedPassword, created:date,updated:date,type:'local',name:reqQuery.name}
}