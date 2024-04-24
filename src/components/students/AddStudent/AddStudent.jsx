import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StudentService from '../../../services/StudentService';

let AddStudent = () => {
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

  let updateInput = (event) => {
    setState({
      ...state,
      student: {
        ...state.student,
        [event.target.name]: event.target.value,
      },
    });
  };

  let { student } = state;

  let submitForm = async (event) => {
    event.preventDefault();

    try {
      let response = await StudentService.registerNewStudent(state.student);
      if (response) {
        navigate('/students/list', { replace: true });
      }
    } catch (error) {
      setState({ ...state, errorMessage: error.message });
      navigate('/students/add', { replace: false });
    }
  };

  return (
    <>
      <React.Fragment>
        <section className='add-contact p-3'>
          <div className='container'>
            <div className='row'>
              <div className='col'>
                <p className='h4 text-success fw-bold'>Register Student</p>
              </div>
              <p className='fst-italic'>
                Here you can register a new student and add it to the list.
              </p>
            </div>
            <div className='row'>
              <div className='col-md-4'>
                <form onSubmit={submitForm}>
                  <div className='mb-2'>
                    <input
                      required={true}
                      name='name'
                      value={student.name}
                      onChange={updateInput}
                      type='text'
                      className='form-control'
                      placeholder='Name'
                    />
                  </div>

                  <div className='mb-2'>
                    <input
                      required={true}
                      name='surname'
                      value={student.surname}
                      onChange={updateInput}
                      type='text'
                      className='form-control'
                      placeholder='Surname'
                    />
                  </div>

                  <div className='mb-2'>
                    <input
                      required={true}
                      name='email'
                      value={student.email}
                      onChange={updateInput}
                      type='email'
                      className='form-control'
                      placeholder='Email'
                    />
                  </div>

                  <div className='mb-2'>
                    <input
                      required={true}
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
                      className='btn btn-success'
                      value='Create'
                    />
                    <Link to={'/students/list'} className='btn btn-dark ms-2'>
                      Cancel
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    </>
  );
};

export default AddStudent;
