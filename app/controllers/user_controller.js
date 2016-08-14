import jwt from 'jwt-simple';
import User from '../models/user_model';
import dotenv from 'dotenv';
dotenv.config({ silent: true });

// encodes a new token for a user object
function tokenForUser(user) {
  console.log(process.env.API_SECRET);
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.API_SECRET); // config.secret);
}

export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  console.log(email, password);

  if (!email || !password) {
    return res.status(422).send('You must provide email and password');
  }

  console.log(email, password);

  User.findOne({ email })
  .then(result => {
    console.log(1);
    if (result) { return res.status(422).send('account already exists'); }

    const newUser = new User();

    newUser.email = email;
    newUser.password = password;
    console.log('whereeaaaaa');
    newUser.save()
      .then(nextResult => {
        console.log('stuff' + nextResult);
        res.send({ token: tokenForUser(newUser) });
      });
      // .catch(error => {
      //   console.log('error' + error);
      //   res.json({ error });
      // });

    // return res.status(422).send('account already exists');
    // if (!result) {
    //   console.log(result);
      // return res.status(422).send('account already exists');
    // }
  }).catch(error => { console.log(error); res.json({ error }); });
};
