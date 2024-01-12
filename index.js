const express=require('express');
const { readFile } = require('fs/promises');
const app=express();
const mongoose = require('mongoose');
app.use(express.json());
const fs = require('fs');
const configdata = fs.readFileSync("./config.json",'utf8');
  const config = JSON.parse(configdata);

  app.set('view engine', 'ejs');
  app.use(express.static('public'));
  
  
mongoose.connect(config.MongooseURL)
  .then(() => console.log("connection succesfull with Mongoose"))
  .catch((err) => console.log(err));


const homeRouter=require('./routes/index');


app.use('/',homeRouter);








app.listen(config.Port,(err)=>{
    if(err)console.log("ERROR",err);
    else console.log(`Server is running on Port:${config.Port}`);

});
