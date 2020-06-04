const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/mongoose_express_todos', {
    useMongoClient: true
}).then(() => {
    console.log('Database connected')
})

const PORT = 3000;

const app = express();


app.use(bodyParser.urlencoded({
    extended: true
}));

const mustacheExpressInstance = mustacheExpress();
mustacheExpressInstance.cache = null;

app.engine('mustache', mustacheExpressInstance);
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');


app.use('/', routes);



app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})