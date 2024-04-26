import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BookService from '../../../services/BookService';

let AddBook = () => {
  let navigate = useNavigate();

  let [state, setState] = useState({
    loading: false,
    book: {
      title: '',
      author: '',
    },
    errorMessage: '',
  });

  let updateInput = (event) => {
    setState({
      ...state,
      book: {
        ...state.book,
        [event.target.name]: event.target.value,
      },
    });
  };

  let { book } = state;

  let submitForm = async (event) => {
    event.preventDefault();

    try {
      let response = await BookService.registerNewBook(state.book);
      if (response) {
        navigate('/books/list', { replace: true });
      }
    } catch (error) {
      setState({ ...state, errorMessage: error.message });
      navigate('/books/add', { replace: false });
    }
  };

  return (
    <>
      <React.Fragment>
        <section className='add-contact p-3'>
          <div className='container'>
            <div className='row'>
              <div className='col'>
                <p className='h4 text-success fw-bold'>Register Book</p>
              </div>
              <p className='fst-italic'>
                Here you can register a new book and add it to the list.
              </p>
            </div>
            <div className='row'>
              <div className='col-md-4'>
                <form onSubmit={submitForm}>
                  <div className='mb-2'>
                    <input
                      required={true}
                      name='title'
                      value={book.title}
                      onChange={updateInput}
                      type='text'
                      className='form-control'
                      placeholder='Book title'
                    />
                  </div>

                  <div className='mb-2'>
                    <input
                      required={true}
                      name='author'
                      value={book.author}
                      onChange={updateInput}
                      type='text'
                      className='form-control'
                      placeholder='Book author'
                    />
                  </div>

                  <div className='mb-2'>
                    <input
                      type='submit'
                      className='btn btn-success'
                      value='Create'
                    />
                    <Link to={'/books/list'} className='btn btn-dark ms-2'>
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

export default AddBook;
