const { createClient } = require('redis');
const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));
client.connect().then(
    () => {
        console.log("Redis connected ");
    }).catch((err) => {
        console.log("Redis connection error", err);
    });


module.exports = client;

