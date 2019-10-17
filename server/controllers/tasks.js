const mongoose = require('mongoose')
var Task = mongoose.model('Task')
module.exports = {
    index: function(req, res) {
        Task.find({})
        .then(tasks => 
            {
                res.json(tasks)})
        .catch(err => res.json(err));
            
    },

    id: function (req, res) {
        let id = req.params.id
        Task.find({_id : id})
        .then(data => {
                res.json({data: data});
            })
        .catch(err => res.json(err));
    },

    new: function (req, res) {
        var task = new Task(req.body);
        task.save(function (errorsNewMessage) {
            if (errorsNewMessage) {
                res.json(err);
            } else {
                console.log('task created successfully', task)
                res.json({task: task});
            }
        });
    },

    update: function (req, res) {
        Task.updateOne({_id : req.params.id}, {title: req.body.title,
            description: req.body.description, completed: req.body.completed
            })
                .then(data => {
                    console.log('data updated', data)
                    res.json({data: data});
                })
                .catch(err => {
                    console.log("We have an error!", err);
                    for (var key in err.errors) {
                        req.flash('registration', err.errors[key].message);
                    }
                    res.json(err);
                });
    },

    remove: function (req, res) {
        Task.findOneAndDelete({id : req.params._id})
        .then(data => {
            console.log('task deleted:')
            res.json({data: data})
        })
        .catch(err => {
    
            res.json(err);
        });
    }
};