const express = require('express');
const router = express.Router();
const MenuItem = require ('./../models/MenuItem')

router.post('/', async(req,res)=>{
    try{
        const data= req.body;
         const newMenuitem = new MenuItem(data);
         const response = await newMenuitem.save();
         console.log('data save menuitem');
         res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'})
    }
});

router.get('/', async(req,res) => {
try{
    const data = await MenuItem.find();
    res.send(data);
    console.log('MenuItem data fetch');
}
catch(err){
    console.log(err);
    res.status(500).json({error: "Internal server error"});
}
})
module.exports = router