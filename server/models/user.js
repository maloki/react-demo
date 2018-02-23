import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const { Schema } = mongoose;

const schemaOptions = {
    toObject: {
      virtuals: true
    }
    ,toJSON: {
      virtuals: true
    }
  };

const schema = new Schema({
  name: String,
  email: String,
  password: String,
  dateRegistered: {type: Date, default: new Date(1970,1,1)},
  role: {type: Number, default: 0}
}, schemaOptions);

const h = (pw, cb) => {
  bcrypt.genSalt(10, function(err, salt) {
      if (err) {
          return cb(err);
      }

      bcrypt.hash(pw, salt, null, function(err, hash) {
          if (err) {
              return cb(err);
          }
          cb(hash);
      });
  });
}
schema.pre('save', function(next) {
    const user = this;
    if(user.password.length > 16) return next();
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

schema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
          return callback(err);
        }
        callback(null, isMatch);
    });
}

const model = mongoose.model('User', schema);

export default model;
