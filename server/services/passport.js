import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import LocalStrategy from 'passport-local';
import jwt from 'jwt-simple';

import User from '../models/user';
import Config from '../core/config';

const localOptions = {
    usernameField: 'name'
};
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: Config.secret
};
export const tokenForUser = (user) => {
    const timestamp = new Date().getTime();
    return jwt.encode({
        sub: user.id,
        iat: timestamp
    }, Config.secret);
}
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
    User.findOne({
        'email': email 
    }, function(err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }

        user.comparePassword(password, function(err, isMatch) {
            if (err) {
                return done(err);
            }
            if (!isMatch) {
                return done(null, false);
            }

            return done(null, user);
        });
    });
});
const jwtLogin = new Strategy(jwtOptions, function(payload, done) {
    User.findById(payload.sub).exec(function(err, user) {
        if (err) {
            return done(err, false);
        }

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
});

passport.use(jwtLogin);
passport.use(localLogin);
