const express = require('express');
const projects = require('../models/Project');

const router = express.Router();

router.get('/:id',(req,res) =>{
    // res.render('../views/specific.ejs');
    
    projects.findOne({_id: req.params.id}, (err,result) => {
        if(err) console.log(err);
        else res.render('../views/specific.ejs',{name: req.name,tasks: req.tasks, value: req.value, description: req.description, id: req.id,completeValue: req.completeValue, project: result});
    });
});

module.exports = router;