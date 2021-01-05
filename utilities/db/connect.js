const { Client } = require('pg')
require('dotenv').config()
// use these to connect to heroku postgres db on local (might change, contact me if it did)
var connectionString = process.env.DATABASE_URL

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
})
client.connect()
exports.client = client
