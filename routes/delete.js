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
    // res.send('deleting the project is initiated')

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

                    if(result.tasks.length == 0 || result.tasks.length == 1){
                        completeValue = 0;
                    }else {
                        completeValue = trueValue / result.tasks.length * 100;
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
});

module.exports = router;