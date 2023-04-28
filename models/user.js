'use strict'
const mongoose = require('mongoose')
/** @class user
 * @description
 */
const User = mongoose.Schema({
    name: { type: String },
    username: { type: String },
    password: { type: String },
    color: { type: String }
}, { versionKey: false, timestamps: true })

/**@memberOf User*/
User.statics.objectId = function (id) {
    return mongoose.Types.ObjectId(id)
}

module.exports = {
    User: mongoose.model('user', User),
}