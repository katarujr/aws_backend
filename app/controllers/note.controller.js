const db = require("../models");
const Note = db.note;
const fs = require('fs');
const { uploadFile, deleteFile, getFile, getContentObject } = require("./s3.controller");


exports.createNote = async (req, res) => {
    if(req.body.username === undefined || req.body.name === undefined){
        return res.status(403).send({message:"Bad Arguments",bool:false});
    }
    const note_exists = await Note.findAll({
        where:{
            username: req.body.username,
            name:req.body.name
        }
    })
    if(note_exists.length !== 0){
     return res.status(200).send({message:"Note Already exists, please change note name",bool:false});
    }

    await Note.create({
        username: req.body.username,
        name: req.body.name
      })
      .catch(err => {
        return res.status(500).send({ message: err.message,bool:false});
      });
      const path = `${req.body.username}/${req.body.name}` //a modifer lorsque sur s3
      //fs.writeFile(req.body.name,req.body.data,(err)=>{
      //  if(err) throw err;
      //})
      uploadFile(req.body.data,path)
      //fs.unlink(req.body.name,(err)=>{
      //  if(err){
      //      console.log(err)
      //  }
    //})
    return res.status(200).send({message:"Note Created.",bool:true});
  };

  exports.getNotes= async (req, res) => {
    if(req.query.username === undefined){
        return res.status(403).send({message:"Bad Arguments",bool:false});
    }
    const notes = await Note.findAll({
        where:{
            username: req.query.username
        }
    });
    return res.status(200).send(notes);
  };

  exports.getNote = async(req, res) => {
    if(req.query.username === undefined || req.query.name === undefined){
        return res.status(403).send({message:"Bad Arguments",bool:false});
    }
    const note = await Note.findAll({
        where:{
            username: req.query.username,
            name: req.query.name
        }
    })
    if(note.length === 0){
        return res.status(200).send({message:"File don't exist",bool:false}); 
    }
    const path = `${req.query.username}/${req.query.name}` 
    const data = await getContentObject(path)
    console.log(data)
    return res.status(200).send(data)
  };

  exports.modifyNote = async (req, res) => {
    if(req.body.username === undefined || req.body.name === undefined){
        return res.status(403).send({message:"Bad Arguments",bool:false});
    }
    const note_exists = await Note.findAll({
        where:{
            username: req.body.username,
            name:req.body.name
        }
    })
    if(note_exists.length !== 0){
      const path = `${req.body.username}/${req.body.name}` //a modifer lorsque sur s3
      //fs.writeFile(req.body.name,req.body.data,(err)=>{
      //  if(err) throw err;
      //})
      uploadFile(req.body.data,path)
      //fs.writeFile(req.body.name,req.body.data,(err)=>{
      //  if(err) throw err;
      //})
      return res.status(200).send({message:"Note Modified with the new text.",bool:true});
    }
    return res.status(200).send({message:"Note does not exist",bool:false});
    
  };
  exports.deleteNote = async(req, res) => {
    if(req.query.username === undefined || req.query.name === undefined){
        return res.status(403).send({message:"Bad Arguments",bool:false});
    }
    const note_exists = await Note.findAll({
        where:{
            username: req.query.username,
            name:req.query.name
        }
    })
    if(note_exists.length === 0){
        return res.status(403).send({message:"File does not exist",bool:false});
    }
      await Note.destroy({
          where: {
              name: req.query.name,
              username: req.query.username
        },
      }).catch(err => {
        return res.status(500).send({ message: err.message,bool:false});
      });
      const path = `${req.query.username}/${req.query.name}` //a modifer lorsque sur s3
      deleteFile(path)
    return res.status(200).send({message: "Delete Note.",bool:true});
  };