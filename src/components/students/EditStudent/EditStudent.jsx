import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import StudentService from '../../../services/StudentService';
import BookService from '../../../services/BookService';
import Spinner from '../../Spinner/Spinner';

let EditStudent = () => {
  let { studentId } = useParams();
  let navigate = useNavigate();

  let [state, setState] = useState({
    loading: false,
    student: {},
    books: [],

    errorMessage: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true });
        let response = await StudentService.getStudent(studentId);
        let responseBooks = await BookService.getBooks();
        setState({
          ...state,
          loading: false,
          student: response.data,
          books: responseBooks.data,
        });
      } catch (error) {
        setState({
          ...state,
          loading: false,
          errorMessage: error.message,
        });
      }
    };

    fetchData();
  }, [studentId]);

  let updateInput = (event) => {
    setState({
      ...state,
      student: {
        ...state.student,
        [event.target.name]: event.target.value,
      },
    });
  };

  let submitForm = async (event) => {
    event.preventDefault();
    try {
      let response = await StudentService.updateStudent(
        state.student,
        studentId,
      );
      if (response) {
        navigate('/students/list', { replace: true });
      }
    } catch (error) {
      setState({ ...state, errorMessage: error.message });
      navigate(`/students/edit/${studentId}`, { replace: false });
    }
  };

  let handleDeleteBook = async (studentId, bookId) => {
    try {
      await StudentService.deleteBookFromStudent(studentId, bookId);

      setState({
        ...state,
        student: {
          ...state.student,
          books: state.student.books.filter((book) => book.id !== bookId),
        },
      });
    } catch (error) {
      console.error('Failed to delete book: ', error);
    }
  };

  let handleAddBook = async (studentId, bookId) => {
    try {
      await StudentService.addBookToStudent(studentId, bookId);

      const addedBook = state.books.find((book) => book.id === bookId);
      setState({
        ...state,
        student: {
          ...state.student,
          books: [...state.student.books, addedBook],
        },
      });
    } catch (error) {
      console.error('Failed to add book: ', error);
    }
  };

  let { loading, student, errorMessage } = state;

  const handleCheckChange = async (event, bookId, studentId) => {
    const isChecked = event.target.checked;

    try {
      if (state && state.books && state.books.length > 0) {
        if (isChecked) {
          const book = state.books.find((b) => b.id === bookId);

          if (book) {
            console.log('Adding book to student');
            await handleAddBook(studentId, bookId);

            setState((prevState) => ({
              ...prevState,
            }));
          } else {
            console.error('Book not found');
          }
        } else {
          console.log('Removing book from student');
          await handleDeleteBook(studentId, bookId);

          setState((prevState) => ({
            ...prevState,
          }));
        }
      } else {
        console.error('State or books list is undefined or empty');
      }
    } catch (error) {
      console.error(
        isChecked ? 'Failed to add book:' : 'Failed to delete book:',
        error,
      );
    }
  };

  return (
    <>
      <React.Fragment>
        {loading ? (
          <Spinner />
        ) : (
          <div className='container'>
            <div className='row'>
              <div className='col-md-6'>
                <section className='add-contact p-3'>
                  <div className='container'>
                    <div className='row'>
                      <div className='col'>
                        <p className='h4 text-primary fw-bold'>
                          Edit Student with id {studentId}
                        </p>
                      </div>
                      <p className='fst-italic'>
                        Here you can edit user information.
                      </p>
                    </div>
                  </div>
                </section>

                <div className='row align-items-center'>
                  <div className='col-md-8'>
                    <form onSubmit={submitForm}>
                      <div className='mb-2'>
                        <input
                          name='name'
                          required={false}
                          value={student.name}
                          onChange={updateInput}
                          type='text'
                          className='form-control'
                          placeholder={`Name: ${student.name}`}
                        />
                      </div>
                      <div className='mb-2'>
                        <input
                          name='surname'
                          required={false}
                          value={student.surname}
                          onChange={updateInput}
                          type='text'
                          className='form-control'
                          placeholder='Surname'
                        />
                      </div>

                      <div className='mb-2'>
                        <input
                          name='email'
                          required={false}
                          value={student.email}
                          onChange={updateInput}
                          type='email'
                          className='form-control'
                          placeholder='Email'
                        />
                      </div>

                      <div className='mb-2'>
                        <input
                          required={false}
                          name='studentNumber'
                          value={student.studentNumber}
                          onChange={updateInput}
                          type='text'
                          className='form-control'
                          placeholder='Student number'
                          inputMode='numeric'
                          pattern='\d*'
                        />
                      </div>

                      <div className='mb-2'>
                        <input
                          type='submit'
                          className='btn btn-primary'
                          value='Update'
                        />
                        <Link
                          to={'/students/list'}
                          className='btn btn-dark ms-2'
                        >
                          Cancel
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className='col-md-6'>
                <section className='add-contact p-3'>
                  <div className='container'>
                    <div className='row'>
                      <div className='col'>
                        <p className='h4 text-primary fw-bold'>
                          Edit Student's books
                        </p>
                      </div>
                      <p className='fst-italic'>
                        Here you can edit student's books.
                      </p>
                    </div>
                  </div>
                </section>

                <div>
                  {state.loading ? (
                    <Spinner />
                  ) : (
                    <section className='student-list'>
                      <div className='container'>
                        {state.books.length > 0 &&
                          state.books.map((book) => {
                            return (
                              <>
                                <div className='col-md-12' key={book.id}>
                                  <div className='card my-2'>
                                    <div className='card-body'>
                                      <div className='row align-items-center d-flex justify-content-around'>
                                        {' '}
                                        <div className='col-md-7'>
                                          <ul className='list-group'>
                                            <li className='list-group-item list-group-item-action'>
                                              Title:{' '}
                                              <span className='fw-bold'>
                                                {book.title}
                                              </span>
                                            </li>
                                            <li className='list-group-item list-group-item-action'>
                                              Author:{' '}
                                              <span className='fw-bold'>
                                                {book.author}
                                              </span>
                                            </li>
                                          </ul>
                                        </div>
                                        <div className='col-md-1 d-flex flex-column align-items-center'>
                                          <input
                                            type='checkbox'
                                            checked={state.student.books.some(
                                              (b) => b.id === book.id,
                                            )}
                                            onChange={(event) =>
                                              handleCheckChange(
                                                event,
                                                book.id,
                                                student.id,
                                              )
                                            }
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                      </div>
                    </section>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    </>
  );
};

export default EditStudent;
