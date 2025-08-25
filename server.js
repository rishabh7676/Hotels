const express = require('express')
const app = express()
const db = require('./db');
const Person = require('./models/person')
const MenuItem = require('./models/MenuItem')
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body

require('dotenv').config();
const  port = process.env.PORT || 3000;

app.get("/",(req,res)=>{
  req.send("welcome to my hotel")
 
});

// import router file
const personRoutes = require('./routes/personRoutes');
// use the routers
app.use('/person', personRoutes);

const menuRoutes = require('./routes/menuRoutes');
// use the routers
app.use('/menuitem', menuRoutes);



app.listen(port, ()=>{
     console.log("listener port 3000");
})
 



