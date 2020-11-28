const { Client } = require('pg')
require('dotenv').config()

// use these to connect to heroku postgres db on local (might change, contact me if it did)
var connectionString = 'postgres://ggjyddlnmfepns:37c2a5762e38648e7ce0eafacce3162f8c2b09139a8468b62babe0722d02ca9c@ec2-107-21-201-57.compute-1.amazonaws.com:5432/dkfsc40oli0ag'

// var connectionString = process.env.DATABASE_URL

const client = new Client({
    //   connectionString: process.env.DATABASE_URL,
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
})

client.connect()
exports.client = client
