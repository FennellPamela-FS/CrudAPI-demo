//  students router
const express = require('express');
const router = express.Router();

// build our info about the students
const Student = require('../models/Student');


// RESTful Endpoints
// Get, Post, Patch, Delete

const getStudent = async (req, res, next) => {
    // set = to student we find
    let student
    try {
        student = await Student.findById(req.params.id);
        if (student === null) {
            return res.status(404).json({
                message: 'Student not found'
            })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.student = student;
    next();
}


// Get all Students
router.get('/', async (req, res) => {
    try {
        // find everything in the student model
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json(error); // 500 = Internal Server Error
    }
});

//  Get one Student by ID
// look at getStudent first
router.get('/:id', getStudent, async (req, res) => {
    // variable matches the id in the URL
    // res.send(`Student ID: ${req.params.id}`);
    res.json(res.student);
});

// Post - create new Student
router.post('/', async (req, res) => {
    const student = new Student({
        name: req.body.name,
        class: req.body.class,
    })
    try {
        const newStudent = await student.save();
        res.status(201).json(newStudent);  // 201 object created ok
    } catch (error) {
        res.status(400).json({ message: error.message }); // 400 user error, get message back

    }
});

// Patch - update Student
// update individual pieces of an item
router.patch('/:id', getStudent, async (req, res) => {
    // variable matches the id in the URL
    // res.send(`Student ID: ${req.params.id}`);
    // did this request send a name?
    if (req.body.name != null) {
        res.student.name = req.body.name;
    }
    if (req.body.class != null) {
        res.student.class = req.body.class;
    }
    try {
        // const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        const updatedStudent = await res.student.save();
        res.json(updatedStudent);
    } catch (error) {
        res.status(400).json({ message: error.message }); // 4 
    }
});

// Delete - delete Student
router.delete('/:id', getStudent, async (req, res) => {
    // variable matches the id in the URL
    // res.send(`Student ID: ${req.params.id}`);
    try {
        await res.student.remove();
        res.json({ message: 'Remove student' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;