import express from 'express';
import Student from '../models/student.model.js';

const router = express.Router();

router.get('/', async (req, res) => {
      try {
                const students = await Student.find().sort({ createdAt: -1 });
                res.render('students/index', { students });
      } catch (error) {
                res.status(500).send(error.message);
      }
});

router.post('/add', async (req, res) => {
      const { name, roll } = req.body;
      try {
                const newStudent = new Student({ name, roll });
                await newStudent.save();
                res.redirect('/');
      } catch (error) {
                res.status(400).send(error.message);
      }
});

router.get('/edit/:id', async (req, res) => {
      try {
                const student = await Student.findById(req.params.id);
                if (!student) return res.status(404).send('Student not found');
                res.render('students/edit', { student });
      } catch (error) {
                res.status(500).send(error.message);
      }
});

router.post('/edit/:id', async (req, res) => {
      try {
                await Student.findByIdAndUpdate(req.params.id, req.body);
                res.redirect('/');
      } catch (error) {
                res.status(400).send(error.message);
      }
});

router.post('/delete/:id', async (req, res) => {
      try {
                await Student.findByIdAndDelete(req.params.id);
                res.redirect('/');
      } catch (error) {
                res.status(500).send(error.message);
      }
});

export default router;
