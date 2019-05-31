var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Client = require('pg').Client;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/users', usersRouter);

//postgresql database setup
var client = new Client({
  user    :"postgres",
  password:"784512963",//"",
  host    :"localhost",
  port    :3300,
  database:"library"//"library"
})

client.connect()
.then(() => console.log("db connected"))
.then(() => client.query("select * from member"))
.then(results => console.table(results.rows))
.catch(e => console.log)
//.finally(() => client.end())


//routes


//app.get('/',(req,res,next) => {
 // console.log(req.method)
 // console.log("inside get")
 // const members=client.query("select * from member",(err,result,fields)=> {
    //console.log(result)
  //   res.json(result.rows)
 // });
  //console.log(members)
  //res.send(members);
  //next();
//})

app.get('/',function(req,res) {
  res.sendFile( 'index.html', { root: '.' });
});
app.get('/',(req,res,next) => {
  res.send("<html><body><form action='/sadasd' method='post'>Username<input type='text' name='username'<br> Lastname<input type='text' name='lastname' <br><input type='submit' value='Submit'></form></body></html>") 
})

app.post('/',(req,res,next) => {

})



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
