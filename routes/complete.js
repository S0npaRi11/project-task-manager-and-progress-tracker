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
                            // console.log(falseValue);
                            //console.log(falseValue);
                            if(result.tasks.length == 1 || result.tasks.length == 0){
                                completeValue = 0;
                            }else{
                                if(trueValue == falseValue){
                                    completeValue = 100 / 2;
                                }else{
                                    completeValue = trueValue / result.tasks.length * 100;
                                }
                                
                            }

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