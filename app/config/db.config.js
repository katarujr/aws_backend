const fs=require('fs')

const get_host = ()=>{
  fs.readFile('app/config/cfg','utf-8',(err,data)=>{
    if(err){
      console.log(err)
      return "";
    }
    return data
  })
}

module.exports = {
    HOST: get_host(),
    USER: "postgres",
    PASSWORD: "freshnugget",
    DB: "awsdb",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };