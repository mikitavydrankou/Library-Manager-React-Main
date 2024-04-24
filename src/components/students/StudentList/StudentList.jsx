import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StudentService from '../../../services/StudentService';
import Spinner from '../../Spinner/Spinner';

let StudentList = () => {
  let [query, setQuery] = useState({
    text: '',
  });

  let [state, setState] = useState({
    loading: false,
    students: [],
    filteredStudents: [],
    errorMessage: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true });
        let response = await StudentService.getStudents();
        console.log(response.data);

        setState({
          ...state,
          loading: false,
          students: response.data,
          filteredStudents: response.data,
        });
      } catch (error) {
        setState({ ...state, loading: false, errorMessage: error.message });
      }
    };

    fetchData();
  }, []);

  let { loading, filteredStudents } = state;

  // Delete student

  let clickDelete = async (studentId) => {
    try {
      let response = await StudentService.deleteStudent(studentId);
      if (response) {
        setState({ ...state, loading: true });
        let response = await StudentService.getStudents();
        setState({
          ...state,
          loading: false,
          students: response.data,
          filteredStudents: response.data,
        });
      }
    } catch (error) {
      setState({ ...state, loading: false, errorMessage: error.message });
    }
  };

  // search students

  let searchStudents = (event) => {
    setQuery({ ...query, text: event.target.value });
    let theStudents = state.students.filter((student) => {
      return student.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setState({
      ...state,
      filteredStudents: theStudents,
    });
  };

  return (
    <>
      <React.Fragment>
        <section className='student-search p-3'>
          <div className='container'>
            <div className='grid'>
              <div className='row'>
                <div className='col'>
                  <p className='h3 fw-bold'>
                    Library Manager
                    <Link to={'/students/add'} className='btn ms-3 bg-warning'>
                      <i className='fa fa-plus-circle me-2' />
                      New
                    </Link>
                  </p>
                  <p className='fst-italic'>
                    Click &quot;New&quot; to add user
                  </p>
                </div>

                <div className='col'>
                  <div className='d-flex justify-content-end'>
                    <input
                      name='text'
                      value={query.text}
                      onChange={searchStudents}
                      type='text'
                      className='form-control'
                      placeholder='Search Names'
                      style={{ width: '200px' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {loading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            <section className='student-list'>
              <div className='container'>
                <div className='row'>
                  {filteredStudents.length > 0 &&
                    filteredStudents.map((student) => {
                      return (
                        <>
                          <div className='col-md-6' key={student.id}>
                            <div className='card my-2'>
                              <div className='card-body'>
                                <div className='row align-items-center d-flex justify-content-around'>
                                  {' '}
                                  {/* <div className='col-md-4'>
                                    <img
                                      src={student.photo}
                                      className='student-img'
                                      alt=''
                                    />
                                  </div> */}
                                  <div className='col-md-7'>
                                    <ul className='list-group'>
                                      <li className='list-group-item list-group-item-action'>
                                        Name:{' '}
                                        <span className='fw-bold'>
                                          {student.name}
                                        </span>
                                      </li>
                                      <li className='list-group-item list-group-item-action'>
                                        Surname:{' '}
                                        <span className='fw-bold'>
                                          {student.surname}
                                        </span>
                                      </li>
                                      <li className='list-group-item list-group-item-action'>
                                        e-mail:{' '}
                                        <span className='fw-bold'>
                                          {student.email}
                                        </span>
                                      </li>
                                    </ul>
                                  </div>
                                  <div className='col-md-1 d-flex flex-column align-items-center'>
                                    <Link
                                      to={`/students/view/${student.id}`}
                                      className='btn btn-warning my-1 mx-1'
                                      style={{ width: '40px', height: '40px' }}
                                    >
                                      <i className='fa fa-eye' />
                                    </Link>

                                    <Link
                                      to={`/students/edit/${student.id}`}
                                      className='btn btn-primary my-1 mx-1'
                                      style={{ width: '40px', height: '40px' }}
                                    >
                                      <i className='fa fa-pen' />
                                    </Link>

                                    <button
                                      className='btn btn-danger my-1 mx-1'
                                      style={{ width: '40px', height: '40px' }}
                                      onClick={() => clickDelete(student.id)}
                                    >
                                      <i className='fa fa-trash' />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                </div>
              </div>
            </section>
          </React.Fragment>
        )}
      </React.Fragment>
    </>
  );
};

export default StudentList;
