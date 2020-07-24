const express = require('express');
const projects = require('../models/Project');

const router = express.Router();

router.get('/:id', (req,res) => {
    // res.send('deleting the project is initiated')

    projects.findOneAndRemove({_id:req.params.id}, (err) => {
        if(err) console.log(err);
        else res.redirect('/');
    });
});

router.get('/task/:id/:task', (req,res) => {
    // res.send('deleting the task is initiated')

    projects.findOneAndUpdate({_id:req.params.id}, {$pull: {tasks: {body: req.params.task}}},(err) => {
        if(err) console.log(err);
        else{
            projects.findById(req.params.id, (err,result) => {
                if(err) console.log(err);
                else{
                    let trueValue = 0;
                    let completeValue = 0;

                    result.tasks.forEach( task => {
                        if(task.isComplete == true){
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
});

//delete task2 subtask

router.get('/task2/:id/:task2', (req,res) => {
    projects.findByIdAndUpdate(req.params.id, {$pull:{task2:{body: req.params.task2}}},(err) => {
        if(err) console.log(err);
        else{
            // evaluation here

            res.redirect('/specific/' + req.params.id);
        }
    });
});

router.get('/task3/:id/:task3', (req,res) => {
    projects.findByIdAndUpdate(req.params.id, {$pull:{task3:{body: req.params.task3}}},(err) => {
        if(err) console.log(err);
        else{
            // evaluation here

            res.redirect('/specific/' + req.params.id);
        }
    });
});

module.exports = router;