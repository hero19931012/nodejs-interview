const jwt = require('jsonwebtoken')
const { SECRET } = process.env
const db = require('./models')
const { Member } = db

function auth(req, res, next) {
  const { token } = req.cookies

  if (token === undefined) {
    console.log("token unavailable");
    return res.status(401).json({
      message: "unauthenticated"
    })
  }

  jwt.verify(token, SECRET, (err, decodedToken) => {
    if (err) {
      console.log(err.tostring());
      return res
        .clearCookie('token')
        .status(401)
        .json({
          message: "invalid token"
        })
    }

    Member.findOne({ where: { account: decodedToken.account } })
      .then(member => {
        if (member === null) {
          console.log('member not exist');
          return res
            .clearCookie('token')
            .status(401)
            .json({
              message: "member not exist"
            })
        }
        req.user = decodedToken.account
        next()
      })
      .catch(err => {
        console.log(`server side error: ${err.toString()}`);
        res.status(500).json({
          messgae: err.toString()
        })
      })

  })
}

module.exports = auth