import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import StudentService from '../../../services/StudentService';
import Spinner from '../../Spinner/Spinner';

let EditStudent = () => {
  let { studentId } = useParams();
  let navigate = useNavigate();

  let [state, setState] = useState({
    loading: false,
    student: {
      name: '',
      surname: '',
      email: '',
      studentNumber: '',
    },
    errorMessage: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true });
        let response = await StudentService.getStudent(studentId);
        setState({
          ...state,
          loading: false,
          student: response.data,
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
                              inputMode='numeric' // Указывает, что это поле предназначено для ввода чисел
                              pattern='\d*' // Указывает, что поле должно содержать только цифры
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
                </section>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    </>
  );
};

export default EditStudent;
