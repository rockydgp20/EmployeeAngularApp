const express = require('express');
const router = express.Router();
const Employee = require('../app/models/employee')

// Fetch all the employees 
router.get('/', async (req,res) => {
    try {
       const subscriber = await Employee.find(); 
       res.status(200).json(subscriber)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
});
// Fetch specific employee using id

router.get('/:id', async (req,res) => {
    try{
        const employee = await Employee.findById(req.params.id)
        res.status(200).json(employee)
    }
    catch{
        res.status(500).json({message: err.message})
    }
});

// Update existing employee using id

router.put('/:id', async (req,res) => {
    const emp = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    }
    Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err,doc) => {
        if(!err){
            res.send(doc);
        }else{
            console.log('Error in Update' + JSON.stringify(err,undefined,2));
        }
    })
});

// Add New Employees
router.post('/addusers', async (req,res) => {
    const employee = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    })
    try{
        const a1 = await employee.save();
        res.json(a1);
    } catch(err){
        res.status(500).json({
            message: err.message
        })

    }
})

//Delete Employee using id

router.delete('/:id', getEmployee, async(req,res) => {

// if (!ObjectId.isValid(req.params.id)){
//     return res.status(400).send('No record found with given id');
// }
// Employee.findByIdAndDelete(req.params.id, (err,doc) => {
//     if(!err){
//         res.send(doc);
//     } else{
//         console.log('Error in deletion' + JSON.stringify(err, undefined, 2));
//     }
// });
    
    try{
        await res.employee.remove()
        res.json({message: 'Deleted Successfully'})
    }catch(err){
        res.status(500).json({ message: err.message})

    }

});
async function getEmployee(req,res,next){
    let employee
    try{
        employee = await Employee.findById(req.params.id)
        if(employee === null){
            return res.status(400).json({ message: 'Cannot find Employee'})
        }
    }catch(err){
        return res.status(500).json({ message: err.message})

    }
    res.employee = employee
    next()
}
module.exports = router