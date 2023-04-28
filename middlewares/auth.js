'use strict'

function Auth() {
    const SELF = {}
    return {
        checkLogin: (req, res, next) => {
            if (req.url === `/login`) return next()
            let session = req.session;
            if (session.name) {
                return next()
            }
            return res.redirect('/login')
        }
    }
}

module.exports = { Auth: new Auth() }