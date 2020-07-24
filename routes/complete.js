const express = require('express');
const projects = require('../models/Project');

const router = express.Router();

router.get('/task/:id/:task', (req,res) => {
    // res.send('completion initiated');
    let totalTasks = 0;
    let completeValue = 0;
    let eachValue = 0;


    projects.findById(req.params.id, (err,result) => {
        if(err) console.log(err);
        else{
            // result.tasks.forEach((task) => {
            //     totalTasks += 1;
            // });
            // eachValue = (result.value / totalTasks);

            totalTasks = result.tasks.length;
            eachValue = (result.value / totalTasks);

            projects.findOneAndUpdate({'tasks.body': req.params.task}, {$set:{'tasks.$.isComplete': true}}, err => {
                if(err) console.log(err);
                // else res.redirect('/specific/' + req.params.id);
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
                           
                            completeValue = trueValue / result.tasks.length * 100;

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

router.get('/task2/:id/:task2', (req,res) => {
    projects.findOneAndUpdate({'task2.body': req.params.task2},{$set:{'task2.$.isComplete': true}}, err => {
        if(err) console.log(err);
        else{
            // evaluation here

            res.redirect('/specific/' + req.params.id);
        }
    });
})

router.get('/task3/:id/:task3', (req,res) => {
    projects.findOneAndUpdate({'task3.body': req.params.task3},{$set:{'task3.$.isComplete': true}}, err => {
        if(err) console.log(err);
        else{
            // evaluation here

            res.redirect('/specific/' + req.params.id);
        }
    });
})

module.exports = router;