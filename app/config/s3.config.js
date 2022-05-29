
require('dotenv').config();

module.exports = {
    accessKeyId: process.env.KEY_ID,
    secretAccessKey:process.env.KEY,
    region:process.env.REGION,
    bucket:process.env.BUCKET
  };