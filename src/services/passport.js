const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const lib = require('../libs/config');

module.exports = app => {

    const User = app.db.models.Users;

    passport.serializeUser((user, done) => {
        done(null, user.id)
    });

    passport.deserializeUser((id, done) => {
        User.findById(id).then(user => {
            done(null, user);
        });
    });

    passport.use(
        new GoogleStrategy({
                clientID: lib.googleClientID,
                clientSecret: lib.googleClientSecret,
                callbackURL: '/auth/google/callback',
                proxy: true
            },
            async (accessToken, refreshToken, profile, done) => {
                const existingUser = await User.findOne({googleId: profile.id});

                if (existingUser) {
                    return done(null, existingUser);
                }

                const user = await new User({googleId: profile.id}).save();
                done(null, user);
            }
        ));

};