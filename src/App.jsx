import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import StudentList from './components/students/StudentList/StudentList';
import AddStudent from './components/students/AddStudent/AddStudent';
import ViewStudent from './components/students/ViewStudent/ViewStudent';
import EditStudent from './components/students/EditStudent/EditStudent';
import BookList from './components/books/BookList/BookList';
import ViewBook from './components/books/ViewBook/ViewBook.jsx';
import AddBook from './components/books/AddBook/AddBook.jsx';
import EditBook from './components/books/EditBook/EditBook.jsx';

let App = () => {
  return (
    <>
      <React.Fragment>
        <Navbar />
        <Routes>
          <Route path={'/'} element={<Navigate to={'/students/list'} />} />
          <Route path={'/students/list'} element={<StudentList />} />
          <Route path={'/students/add'} element={<AddStudent />} />
          <Route path={'/students/view/:studentId'} element={<ViewStudent />} />
          <Route path={'/students/edit/:studentId'} element={<EditStudent />} />
          <Route path={'/books/list'} element={<BookList />} />
          <Route path={'/books/view/:bookId'} element={<ViewBook />} />
          <Route path={'/books/add'} element={<AddBook />} />
          <Route path={'/books/edit/:bookId'} element={<EditBook />} />
        </Routes>
      </React.Fragment>
    </>
  );
};

export default App;
