import jwt from 'jwt-simple';
import User from '../models/user_model';


// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.API_SECRET); // config.secret);
}

export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => {
  const newEmail = req.body.email;
  const newPassword = req.body.password;

  if (!newEmail || !newPassword) {
    return res.status(422).send('You must provide email and password');
  }

  User.find({ email: newEmail })
  .then(result => {
    const newUser = new User();

    newUser.email = newEmail;
    newUser.password = newPassword;

    newUser.save()
    .then(nextResult => {
      res.json({ message: 'user created!' });
      res.send({ token: tokenForUser(newUser) });
    })
    .catch(error => {
      res.json({ error });
    });
  }).catch(error => { res.json('User already exists. Please log in.'); });
};
