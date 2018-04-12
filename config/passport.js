const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt
const Company = require("../models/company").Company
const config = require("../config/database")

module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        Company.getCompanyById(jwt_payload._doc._id, (err, company) => {
            if(err){
                return done(err, false);
            }
    
            if (user) {
                return done(null, user);
            } else {
                return done (null, false);
            } 
        });
    }));
};