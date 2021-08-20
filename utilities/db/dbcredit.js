const {client} = require('./connect')
async function addCredit(clientsChat, role, credit) {
    const res = await client.query('INSERT INTO credit(roleid, credit) VALUES ($1 , $2) ON CONFLICT (roleid) DO UPDATE SET credit = Excluded.credit + $3',
             [role, credit, credit],
            function (err, result) {
                if (result == null) {
                    clientsChat.reply(err)
                } 
                else {
                    if(credit>0){
                        clientsChat.reply('Berhasil menambah social credit glory to people republic of china :chink: :chink: :chink: :cn_flag https://media.discordapp.net/attachments/734074292870053969/878216890776977418/FB_IMG_1629453606896.jpg')
                    }
                    else {
                        clientsChat.reply('Berhasil mengurangi social credit glory to people republic of china :chink: :chink: :chink: :cn_flag https://media.discordapp.net/attachments/734074292870053969/878216890776977418/FB_IMG_1629453606896.jpg')
                    }
                }
            })
            return res
    } 
async function getCredit(role) {
    const res = await client.query('SELECT * FROM credit where roleid = $1', [role]).then(result => {
        return result.rows
    }).catch(e => console.error(e.stack))
    return res
}

async function getAllCredit() {
    const res = await client.query('SELECT * FROM credit ').then(result => {
        return result.rows
    }).catch(e => console.error(e.stack))
    return res
}

module.exports = {
    addCredit,
    getCredit,
    getAllCredit
}