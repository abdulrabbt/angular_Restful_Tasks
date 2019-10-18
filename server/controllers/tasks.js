var mongoose = require("mongoose");
var Task = mongoose.model("Task");

module.exports = {
    index: function (req, res) {
        Task.find({}, function (error, task) {
            if (error) {
                console.log(error)
                res.json({ message: "Error +++", error: error });
            }
            else {
                console.log(task)
                res.json({ message: "Success", task: task });
            }
        })
    },

    details: function (req, res) {
        let id = req.params.id;
        Task.find({ _id: id }, function (error, task) {
            if (error) {
                res.json({ message: "Error", error: error });
            }
            else {
                res.json({ message: "Success", task: task });
            }
        })
    },

    addTask: function (req, res) {
        Task.create({ title: req.body.title, description: req.body.description, completed: req.body.completed }, function (error, task) {
            if (error) {
                res.json({ message: "Error", error: error });
            }
            else {
                res.json({ message: "Success", added: true });
            }
        })
    },

    editTask: function (req, res) {
        let id = req.params.id;
        Task.findById(id, function (error, task) {
            if (error) {
                res.json({ message: "Error", error: error });
            }
            else {
                if (req.body.title) {
                    task.title = req.body.title;
                }
                if (req.body.description) {
                    task.description = req.body.description;
                }
                if (req.params.completed) {
                    task.completed = req.body.completed;
                }
                task.save(function (error) {
                    if (error) {
                        res.json({ message: "Error", error: error });
                    }
                    else {
                        res.json({ message: "Success", task: task })
                    }
                })
            }
        })
    },

    deleteTask: function (req, res) {
        let id = req.params.id;
        Task.remove({ _id: id }, function (error) {
            if (error) {
                res.json({ message: "Error", error: error });
            }
            else {
                res.json({ message: "Success", removed: true });
            }
        })
    }
};