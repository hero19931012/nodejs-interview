const path = require('path')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('../../models')
const { SECRET } = process.env
const { Member, Todo } = db

const option = {
  root: path.join(__dirname, '../views')
}

const userController = {
  loginPage: (req, res) => {
    res.sendFile('login.html', option)
  },

  handleLogin: async (req, res) => {
    const { account, passwd } = req.body;
    if (!account || !passwd) {
      return res.status(400).json({
        message: "account and password required"
      })
    }

    const member = await Member.findOne({ where: { account } })
    if (member === null) {
      console.log("login error: member not exist");
      return res.status({
        message: "member not exist"
      })
    }

    bcrypt.compare(passwd, member.passwd, (err, result) => {
      if (err || !result) {
        console.log("login error: account or password incorrect");
        return res.status(401).json({
          message: "account or password incorrect"
        })
      }

      const payload = { account }
      const options = { expiresIn: "1 day" }

      jwt.sign(payload, SECRET, options, (err, token) => {
        if (err || !token) {
          console.log(`jwt sign error: ${err.toString()}`);
          return res.status(500).json({
            message: err.toString()
          })
        }

        res
          .cookie('token', token, { maxAge: 1000 * 60 * 60, httpOnly: true }) // expired in 1 hr
          .status(200)
          .json({
            message: "ok",
            token,
            redirect: "/index"
          })
      })
    })
  },

  index: (req, res) => {
    res.render('welcome', {
      member: req.user
    })
  },
  handleLogout: (req, res) => {
    return res.clearCookie('token').status(204).redirect("/")
  },

  getAll: (req, res) => {

  }
}

module.exports = userController