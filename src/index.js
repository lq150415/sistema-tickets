const app = require('./app');


//listen server
app.listen(app.get('port'));

console.log('Server on port', app.get('port'));