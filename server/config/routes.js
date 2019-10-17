var tasks = require('../controllers/tasks.js');

module.exports = function(app){
    app.get('/tasks', (req, res) => { 
        tasks.index(req, res);   
    });
    app.get('/tasks/:id', (req, res) => { 
        tasks.id(req, res);   
    });
    app.post('/tasks', (req, res) => { 
        tasks.new(req, res);   
    });
    app.put('/tasks/:id', (req, res) => { 
        tasks.update(req, res);   
    });
    app.delete('/tasks/:id', (req, res) => { 
        tasks.remove(req, res);   
    });    

};
