const express = require('express');
const router = express.Router();
const Person = require('./../models/person')

// Post Router
router.post("/person", async (req,res)=>{
try{
     const data = req.body //Assuming the request body contains the person data

    // create a new person document using the mongoose model
    const newPerson = new Person(data);

    // save the new person to database
   const response = await newPerson.save();
   console.log('data saved');
   res.status(200).json(response);
}catch(err){
console.log(err);
res.status(500).json({error: 'Internal server error '})
}  
});

// GET method to get the person
router.get('/', async(req,res) => {
try{
    const data = await Person.find();
    res.send(data);
    console.log('data fetched');
}
catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
}
})
router.get('/:workType', async (req,res) => {
    try{
        const workType = req.params.workType; 
         
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
            const response = await Person.find({work: workType}); //Extract the work type from the URL parameter
           
            console.log('response fetched');
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error: 'Invalid work type'});
        }
 
    }
    catch(err){
    console.log(err);
    res.status(500).json({error: "Internal server error"});
}
})
router .put('/:id', async  (req,res) => {
    try{
        const personId = req.params.id; //Extract the id from the url parameter
        const updatedpersonData = req.body;
        
        const response = await Person.findByIdAndUpdate(personId, updatedpersonData , {
            new: true, //Return the updated document
            runValidators:true, // Run Mongoose validation
        })
        if(!response){
            return res.status(404).json({ error: 'Person not found'});
        }
        console.log('data updated');
    }
    catch(err){
 console.log(err);
    res.status(500).json({error: "internal server Error"});
    }
})
router.delete('/:id', async(req,res) => {
    try{
          const personId = req.params.id; //Extract the id from the url parameter
       const response = await Person.findByIdAndDelete(personId);
     if(!response){
            return res.status(404).json({ error: 'Person not found'});
        }
        console.log('data deleted');
         return res.status(200).json({ message: 'Data deleted successfully'});
    }
     catch(err){
 console.log(err);
    res.status(500).json({error: "internal server Error"});
    }
})
module.exports = router;