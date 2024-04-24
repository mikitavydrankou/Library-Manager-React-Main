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
    group: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true });
        let response = await StudentService.getStudent(studentId);

        let groupResponse = await StudentService.getGroup(response.data);
        console.log(groupResponse.data);
        setState({
          ...state,
          loading: false,
          student: response.data,
          group: groupResponse.data,
        });
      } catch (error) {
        setState({ ...state, loading: false, errorMessage: error.message });
      }
    };

    fetchData();
  }, [studentId]);

  // eslint-disable-next-line no-unused-vars
  let { loading, student, errorMessage } = state;

  return (
    <>
      <React.Fragment>
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
        {loading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            {Object.keys(student).length > 0 && (
              <section className='view-student mt-3'>
                <div className='container'>
                  <div className='row align-items-center'>
                    <div className='col-md-8'>
                      <ul className='list-group'>
                        <li className='list-group-item list-group-item-action'>
                          e-mail:{' '}
                          <span className='fw-bold'>{student.email}</span>
                        </li>

                        <li className='list-group-item list-group-item-action'>
                          Name: <span className='fw-bold'>{student.name}</span>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                          Surname:{' '}
                          <span className='fw-bold'>{student.surname}</span>
                        </li>

                        <Link
                          to={`/students/ViewStudent/ViewBook`}
                          className='btn btn-warning'
                        >
                          Check rented books
                        </Link>
                      </ul>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col'>
                      <Link to={`/students/list`} className='btn btn-warning'>
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    </>
  );
};

export default ViewStudent;
