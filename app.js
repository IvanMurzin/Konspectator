const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const createError = require('http-errors');
const bodyParser = require('body-parser')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: false,limit: '50mb' }));
app.use(express.static(__dirname + '/styles'));


app.use('/', require('./routes/main'));
app.use("/setFile", require('./routes/main'));
app.use("/history", require('./routes/main'));
app.use("/search",require('./routes/main'));

app.use(function (req, res, next) { next(createError(404)); });
app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('pages/error', { error: err});
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));