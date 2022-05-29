const fs=require('fs')

const get_host = ()=>{
  fs.readFile('app/config/cfg','utf-8',(err,data)=>{
    if(err){
      console.log(err)
      return "";
    }
    return data;
  })
}

module.exports = get_host;