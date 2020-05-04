const express = require('express');
const mongoose = require('mongoose');
const projects = require('../models/Project');

const router = express.Router();



// project addition routes here
router.get('/project',(req,res) =>{
    res.render('../views/addTsk.ejs');
});

router.post('/project',(req,res) => {
    try{
        
        const newProject = new projects({
            name: req.body.name,
            description: req.body.description
        });

        newProject.save();

        res.redirect('/');
    }catch{
        res.redirect('/')
        
    }
});




//task addition routes here
router.post('/task/:id', (req,res) => {
    // res.send("addition of tasks initiated");
    let i = new Date();
    let completeValue = 0;

    projects.findById(req.params.id, (err,result) => {
        if(err) console.log(err);
        else{
            eachValue = result.value / result.tasks.length;

            projects.findOneAndUpdate({_id:req.params.id}, {$push:{tasks:{body:req.body.task,value:0,isComplete: false,i:i.getTime()}}}, err => {
                if(err) console.log(err);
                else{
                    projects.findById(req.params.id, (err,result) => {
                        if(err) console.log(err);
                        else{
                            let falseValue = 0;
                            let trueValue = 0;
                            result.tasks.forEach((task) => {
                                if(task.isComplete == false){
                                     falseValue += 1;
                                }else if(task.isComplete == true){
                                    trueValue += 1;
                                }
                            });
                            // console.log(falseValue);

                            if(result.tasks.length == 1 || result.tasks.length == 0){
                                completeValue = 0;
                            }else{
                                completeValue = trueValue / result.tasks.length * 100;
                            }
                            // console.log(completeValue);
                            projects.findByIdAndUpdate(req.params.id,{completeValue: completeValue}, (err) => {
                                if(err) console.log(err);
                                else{
                                    res.redirect('/specific/' + req.params.id);
                                }
                            });
                        }
                    });
                }
            });
        }
   
    });
});


module.exports = router;