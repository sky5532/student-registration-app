import { useState } from 'react';
import './StudentRegistration.css';

const StudentRegistration = () => {
  const [studentName, setStudentName] = useState('');
  const [course, setCourse] = useState('');
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Handler to process form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!studentName.trim() || !course.trim()) return;

    const newStudent = {
      id: Date.now(),
      name: studentName.trim(),
      course: course.trim(),
    };

    setStudents((prev) => [...prev, newStudent]);
    setStudentName('');
    setCourse('');
    setSearchQuery('');
  };

  // Handler to delete a student by ID
  const handleDelete = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  // Students matching the search (by name or course)
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app">
      <div className="card">
        <header className="app-header">
          <h2>Student Registration App</h2>
          <p>Register students and manage their courses</p>
        </header>

        <div className="card-body">
          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="form">
            <div className="field">
              <label htmlFor="studentName">Student Name</label>
              <input
                id="studentName"
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter student name"
              />
            </div>

            <div className="field">
              <label htmlFor="course">Course</label>
              <input
                id="course"
                type="text"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                placeholder="Enter course name"
              />
            </div>

            <button type="submit" className="btn-primary">
              Add Student
            </button>
          </form>

          {/* Registered Students */}
          <div className="list-section">
            <h3 className="list-title">
              Registered Students <span className="badge">{students.length}</span>
            </h3>

            {students.length > 0 && (
              <input
                type="text"
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or course..."
              />
            )}

            {students.length === 0 ? (
              <p className="empty">No students registered yet.</p>
            ) : filteredStudents.length === 0 ? (
              <p className="empty">No matching students found.</p>
            ) : (
              <ul className="student-list">
                {filteredStudents.map((student) => (
                  <li key={student.id} className="student-item">
                    <div className="avatar">
                      {student.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="student-info">
                      <p className="student-name">{student.name}</p>
                      <p className="student-course">{student.course}</p>
                    </div>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(student.id)}
                      aria-label={`Delete ${student.name}`}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRegistration;