'use strict'

const User = require('../models/user').User
const JWT = require('jsonwebtoken')
const CONFIG = require('../config')

function UserController() {
    const SELF = {}
    return {
        login: async (req, res) => {
            try {
                const data = req.body
                const user = await User.findOne({ username: data.username, password: data.password }).catch(err => {
                    console.log(`Get find user by username and password fail: ${user}`);
                })
                if (!user) {
                    return res.json({ s: 404, msg: "User not found" })
                }
                // let token = JWT.sign({ username: user.username }, CONFIG.SIGN_KEY)
                // await User.updateOne({ _id: data._id }, { $set: { token: token } }).catch(err => console.log(`Update token fail: ${err}`))
                // res.setHeader("Cookie", `session=${token} HttpOnly;`)
                let session = req.session
                session.name = user.username
                session.color = user.color
                return res.redirect('/')
            } catch (error) {
                console.log(`Login err: ${error}`);
            }
        }
    }
}

module.exports = { UserController: new UserController() }