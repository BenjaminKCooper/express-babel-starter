import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

// create a schema for posts with a field
const UserSchema = new Schema({
  fullName: String,
  email: { type: String, unique: true, lowercase: true },
  password: String,
});

UserSchema.set('toJSON', {
  virtuals: true,
});


UserSchema.pre('save', function beforeyYourModelSave(next) {
  const user = this;

  // generate a salt then run callback
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }

  // hash (encrypt) our password using the salt
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }

    // overwrite plain text password with encrypted password
      user.password = hash;
      return next();  // if (!user.isModified('password'))
    });
  });
});

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
};


// create model class
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
