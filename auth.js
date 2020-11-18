module.exports = {
    'facebookAuth':{
        'clientID': process.env.FACEBOOKAPPID,
        'clientSecret': process.env.FACEBOOKAPPSECRET,
        'callbackURL': 'http://localhost:8000/auth/facebook/callback',
    }
}