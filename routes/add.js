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




//tasks addition routes here
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

                            completeValue = trueValue / result.tasks.length * 100;
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

        // new evaluation scheme

        // first iterate through each task to find out if its subtask exists

            // let taskWt = 0;
            // let trueValueForTask2 = 0;
            // let trueValueForTask3 = 0;
            // projects.findById(req.params.id, (err,project) => {
            //     if(err) console.log(err);
            //     else{
            //         project.completeValue = 0;
            //         taskWt = 100/project.tasks.length;
            //         project.tasks.forEach(t1 => {
            //             let relativeTask2 = 0;
            //             if(project.task2.pbody == t1.body){
            //                 // found the task 2
            //                     // now check if task 2 has a task 3
            //                   relativeTask2 += 1;
            //                     project.task2.forEach(t2 => {
            //                         if(project.tsak2.pbody == t2.body){
            //                             // found the task 3

            //                                 // check if task 3 is complete
            //                             if(project.task3.isComplete == true){
            //                                 trueValueForTask3 += 1;
            //                             }
            //                             project.completeValue += taskWt * trueValueForTask3 * (1/project.task2.length)
            //                         }else{
            //                             // task 2 dosen't have a task 3
            //                                 // check if the task 2 is complete

            //                             if(t2.isComplete == true){
            //                                trueValueForTask2 += 1;
            //                             }
            //                             project.completeValue += taskWt * (1/trueValueForTask2) * (1/project.task2.length);
            //                         }
            //                     });
            //             }else{
            //                 // task has no subtask means it is singular
            //                     // check if the task is marked completed
            //                 if(t1.isComplete == true){
            //                     project.completeValue += taskWt;
            //                 }
            //             }
            //         });
            //     }
            // })


        }
     });
});

//task2 addition route (without evaluation)


router.post('/task2/:id/:pbody', (req,res) => {
    //id is the project id and pbody is the parent body it belongs to

    projects.findById(req.params.id, (err,result) => {
        if(err) console.log(err);
        else{
            projects.findByIdAndUpdate(req.params.id, {$push:{task2:{parentBody: req.params.pbody, body:req.body.task, value: 0, isComplete: 'false'}}}, err => {
                if(err) console.log(err);
                else{
                    // evaluation goes here

                    res.redirect('/specific/' + req.params.id);
                }
            });
        }
    });
});

//task3 addition route (without evaluation)


router.post('/task3/:id/:pbody', (req,res) => {
    //id is the project id and pbody is the parent body it belongs to

    projects.findById(req.params.id, (err,result) => {
        if(err) console.log(err);
        else{
            projects.findByIdAndUpdate(req.params.id, {$push:{task3:{parentBody: req.params.pbody, body:req.body.task, value: 0, isComplete: 'false'}}}, err => {
                if(err) console.log(err);
                else{
                    // evaluation goes here

                    res.redirect('/specific/' + req.params.id);
                }
            });
        }
    });
});

module.exports = router;