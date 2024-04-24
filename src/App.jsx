import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import StudentList from './components/students/StudentList/StudentList';
import AddStudent from './components/students/AddStudent/AddStudent';
import ViewStudent from './components/students/ViewStudent/ViewStudent';
import EditStudent from './components/students/EditStudent/EditStudent';

let App = () => {
  return (
    <>
      <React.Fragment>
        <Navbar />
        <Routes>
          <Route path={'/'} element={<Navigate to={'/Students/list'} />} />
          <Route path={'/Students/list'} element={<StudentList />} />
          <Route path={'/Students/add'} element={<AddStudent />} />
          <Route path={'/Students/view/:StudentId'} element={<ViewStudent />} />
          <Route path={'/Students/edit/:StudentId'} element={<EditStudent />} />
        </Routes>
      </React.Fragment>
    </>
  );
};

export default App;
