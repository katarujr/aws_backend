const AWS = require('aws-sdk')
const config = require('../config/s3.config')

const s3Config = {
    apiVersion: '2006-03-01',
    region: config.region,
   }
   const s3 = new AWS.S3(s3Config)

   module.exports.uploadFile = (file, serverPath) => {
    return s3.upload({
     Bucket: config.bucket,
     ACL: 'private',
     Key: serverPath,
     Body: file,
    }).promise()
   }

   module.exports.deleteFile = (serverPath) => s3.deleteObject({
    Bucket: config.bucket,
    Key: serverPath,
   }).promise()


   module.exports.getContentObject = (key) =>{
    return new Promise(function(resolve, reject) {
        // Only `delay` is able to resolve or reject the promise
        s3.getObject({ Bucket: config.bucket, Key: key}, (err, data) => {
            if (err){ 
                console.log(err, err.stack); 
                resolve(null);
            }    
            else {
                resolve(data.Body.toString('utf-8'));
            }
        });   
    });
}

   module.exports.getFile = (serverPath) => s3.getObject({
       Bucket: config.bucket,
       Key: serverPath
   },(err,data)=>{
    if(err){
        return err;
    }
    return data.Body;
   }).promise()