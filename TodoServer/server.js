var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var cors = require('cors');
var todo=require('./routes/todo');
var user=require('./routes/user');

var mongoose=require('mongoose');

var MongoURI = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost:27017/todo'

mongoose.Promise = global.Promise;
mongoose.connect(MongoURI);

mongoose.connection.once('open', function() {
    console.log('connection established!');
});

mongoose.connection.on('error', function(err) {
    console.error('Could not connect.  Error:', err);
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());


app.use('/api', user);
app.use('/api', todo);
app.get('/*', (req, res) => {
    res.redirect('/');
  });
app.get('/',function(req,res){
        res.json({"Message" : "Hello World !"});
    });


app.listen(3010);
console.log("Listening to port 3000");
