import Student from '../models/student.model.js';

export const getStudents = async (req, res) => {
      try {
                const students = await Student.find().sort({ createdAt: -1 });
                res.status(200).json(students);
      } catch (error) {
                res.status(500).json({ message: error.message });
      }
};

export const createStudent = async (req, res) => {
      const { name, roll } = req.body;
      try {
                const newStudent = new Student({ name, roll });
                await newStudent.save();
                res.status(201).json(newStudent);
      } catch (error) {
                res.status(400).json({ message: error.message });
      }
};

export const getStudentById = async (req, res) => {
      try {
                const student = await Student.findById(req.params.id);
                if (!student) return res.status(404).json({ message: 'Student not found' });
                res.status(200).json(student);
      } catch (error) {
                res.status(500).json({ message: error.message });
      }
};

export const updateStudent = async (req, res) => {
      try {
                const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
                res.status(200).json(updatedStudent);
      } catch (error) {
                res.status(400).json({ message: error.message });
      }
};

export const deleteStudent = async (req, res) => {
      try {
                await Student.findByIdAndDelete(req.params.id);
                res.status(200).json({ message: 'Student deleted successfully' });
      } catch (error) {
                res.status(500).json({ message: error.message });
      }
};
