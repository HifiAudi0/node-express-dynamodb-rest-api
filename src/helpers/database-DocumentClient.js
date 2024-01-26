var AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: process.env.region,
    endpoint: process.env.endpoint,
});

// When do we need DocumentClient and when do we not?
// YES, need it for update function (patch)
const db = new AWS.DynamoDB.DocumentClient({ convertEmptyValues: true });

//const db = new AWS.DynamoDB();

module.exports = db;
