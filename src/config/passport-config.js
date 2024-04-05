const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/Users.js');
const Admin = require('../models/Admins.js');

function configurePassport(passport) {
    async function authenticateUser(req, email, password, done) {
        try {
            const accountType = req.body['user-type'];
            const account =  (accountType == 'admin') ? await Admin.findOne({ email }).lean() : await User.findOne({ email }).lean();
            // console.log(account)
            if (!account)
                return done(null, false, { message: 'Email is not registered' });
    
            if (await bcrypt.compare(password, account.password))
                return done(null, account);
            else
                return done(null, false, { message: 'Incorrect Password' });
        
        } catch(err) {
            return done(err);
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true  }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user._id)); // extracts the user's ID and stores it in the session
    passport.deserializeUser(async (id, done) => { // retrieves the user's ID from the session, fetches the corresponding user object, and attaches it to the request object
        // console.log(id);
        try {
            done(null, (await User.findById(id).lean() || await Admin.findById(id).lean()));
        } catch(err) {
            return done(err);
        }
    });
}

module.exports = configurePassport;
