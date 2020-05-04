const express = require('express');
const projects = require('../models/Project');

const router = express.Router();

router.get('/', (req,res) => {
    projects.find({}, (err,result) => {
        if(err) console.log('error');
        else  res.render('../views/index.ejs',{name: req.name, description: req.description, value:req.completeValue,id:req.id,project: result});
    });   
});

module.exports = router;