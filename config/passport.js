require('dotenv').config();
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const tables = require("../src/sequelize");
const User = tables[0];

module.exports = function(passport){
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = 'secret';

    passport.use(new JwtStrategy(opts, function(jwt_payload, done){
        console.log(jwt_payload);
        User.findOne({where:{
            id:jwt_payload.id
        }}).then((user) => {
            if(user){
                return done(null, user);
            }else{
                return done(null, false);
            }
        });
    }));
};
