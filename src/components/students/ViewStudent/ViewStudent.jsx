import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import StudentService from '../../../services/StudentService';
import Spinner from '../../Spinner/Spinner';

let ViewStudent = () => {
  let { studentId } = useParams();

  let [state, setState] = useState({
    loading: false,
    student: {},
    errorMessage: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true });
        let StudentResponse = await StudentService.getStudent(studentId);

        setState({
          ...state,
          loading: false,
          student: StudentResponse.data,
        });
      } catch (error) {
        setState({ ...state, loading: false, errorMessage: error.message });
      }
    };

    fetchData();
  }, [studentId]);

  let { loading, student, errorMessage } = state;

  return (
    <>
      <React.Fragment>
        {loading ? (
          <Spinner />
        ) : (
          <div className='container'>
            <div className='row'>
              <div className='col-md-6'>
                <section className='view-student-intro p-3'>
                  <div className='container'>
                    <div className='row'>
                      <div className='col'>
                        <p className='h3 text-warning fw-bold'>View Student</p>
                        <p className='fst-italic'>
                          Here you can view the details of a user.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {Object.keys(student).length > 0 && (
                  <section className='view-student'>
                    <div className='container'>
                      <div className='row align-items-center'>
                        <div className='col'>
                          <ul className='list-group'>
                            <li className='list-group-item list-group-item-action'>
                              Name:{' '}
                              <span className='fw-bold'>{student.name}</span>
                            </li>
                            <li className='list-group-item list-group-item-action'>
                              Surname:{' '}
                              <span className='fw-bold'>{student.surname}</span>
                            </li>
                            <li className='list-group-item list-group-item-action'>
                              e-mail:{' '}
                              <span className='fw-bold'>{student.email}</span>
                            </li>
                            <li className='list-group-item list-group-item-action'>
                              Student number:{' '}
                              <span className='fw-bold'>
                                {student.studentNumber}
                              </span>
                            </li>
                            <li className='list-group-item list-group-item-action'>
                              Student's books:{' '}
                              <span className='fw-bold'>
                                {student.books.length}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className='row mt-3'>
                        <div className='col'>
                          <Link
                            to={`/students/list`}
                            className='btn btn-warning'
                          >
                            Back
                          </Link>
                        </div>
                      </div>
                    </div>
                  </section>
                )}
              </div>

              <div className='col-md-6'>
                <section className='view-student-intro p-3'>
                  <div className='container'>
                    <div className='row'>
                      <div className='col'>
                        <p className='h3 text-warning fw-bold'>
                          View Student's Books
                        </p>
                        <p className='fst-italic'>
                          Here you can view the student's books.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {student.books &&
                  Array.isArray(student.books) &&
                  student.books.length > 0 && (
                    <section className='view-student'>
                      <div className='container'>
                        <div className='row align-items-center'>
                          <div className='col'>
                            <ul className='list-group'>
                              {student.books.map((book, index) => (
                                <li
                                  key={index}
                                  className='list-group-item list-group-item-action'
                                >
                                  Title:{' '}
                                  <span className='fw-bold'>{book.title}</span>
                                  <br />
                                  Author:{' '}
                                  <span className='fw-bold'>{book.author}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    </>
  );
};

export default ViewStudent;
