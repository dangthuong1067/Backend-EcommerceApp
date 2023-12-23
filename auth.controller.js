const jwt = require('jsonwebtoken');

const { users } = require('./data');
const nextId = require('./helpers/nextId');

exports.signup = (req, res) => {
  const {
    username,
    email,
    password,
    confirmPassword,
    role
  } = req.body;

  const user = {
    id: nextId(users),
    username,
    email,
    password,
    confirmPassword,
    role
  }
  console.log('users', users);
  users.forEach(item => {
    if (item.username === user.username || item.email === user.email) {
      return
    } else {
      users.push(user);
    }
  });


  res
    .status(201)
    .json({
      status: 'success',
    });
};

exports.login = (req, res) => {
  const {
    // username,
    email,
    password,
  } = req.body;

  const user = users.find(
    item => item.username === username && item.password === password
  );

  if (!user) {
    return res
      .status(401)
      .json({
        status: 'fail',
      });
  }

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES }
  );

  res
    .status(200)
    .json({
      status: 'success',
      data: {
        token,
      }
    });
}