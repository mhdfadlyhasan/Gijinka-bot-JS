
const lo = require('lodash')

module.exports = {
    name: 'addcredit',
    description: 'Glory to CCP',
    usage: 'addcredit Username credit',
    async execute(msg, args) {
        var [_, role, credit] = args    
            var role = role.replace(/[^a-zA-Z0-9 ]/g, "");
            const res = await msg.client.addCredit(msg,role, credit)
    }
}