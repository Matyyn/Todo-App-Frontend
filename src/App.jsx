import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddExam from './components/addExam';
import Table from './components/table';
import UpdateExam from './components/updateExam';

const ExamComponent = () => {
  return (
    <Router>
      <div className="exam-component" style={{ width: 'full', margin: '20px auto', padding: '20px' }}>
        <Routes>
          <Route path="/add-exam" element={<AddExam />} />
          <Route path="/" element={<Table />} />
          <Route path="/update-exam" element={<UpdateExam />} />
        </Routes>
      </div>
    </Router>
  );
};

export default ExamComponent;