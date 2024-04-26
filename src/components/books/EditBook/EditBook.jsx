import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import BookService from '../../../services/BookService';
import Spinner from '../../Spinner/Spinner';

let EditBook = () => {
  let { bookId } = useParams();
  let navigate = useNavigate();

  let [state, setState] = useState({
    loading: false,
    book: {
      title: '',
      author: '',
    },
    errorMessage: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true });
        let response = await BookService.getBook(bookId);
        setState({
          ...state,
          loading: false,
          book: response.data,
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
  }, [bookId]);

  let updateInput = (event) => {
    setState({
      ...state,
      book: {
        ...state.book,
        [event.target.name]: event.target.value,
      },
    });
  };

  let submitForm = async (event) => {
    event.preventDefault();
    try {
      let response = await BookService.updateBook(state.book, bookId);
      if (response) {
        navigate('/books/list', { replace: true });
      }
    } catch (error) {
      setState({ ...state, errorMessage: error.message });
      navigate(`/books/edit/${bookId}`, { replace: false });
    }
  };

  let { loading, book, errorMessage } = state;

  return (
    <>
      <React.Fragment>
        {loading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            <section className='add-contact p-3'>
              <div className='container'>
                <div className='row'>
                  <div className='col'>
                    <p className='h4 text-primary fw-bold'>
                      Edit Book with id {bookId}
                    </p>
                  </div>
                  <p className='fst-italic'>
                    Here you can edit book information.
                  </p>
                </div>
                <div className='row align-items-center'>
                  <div className='col-md-4'>
                    <form onSubmit={submitForm}>
                      <div className='mb-2'>
                        <input
                          name='title'
                          required={false}
                          value={book.title}
                          onChange={updateInput}
                          type='text'
                          className='form-control'
                          placeholder={`Name: ${book.title}`}
                        />
                      </div>
                      <div className='mb-2'>
                        <input
                          name='author'
                          required={false}
                          value={book.author}
                          onChange={updateInput}
                          type='text'
                          className='form-control'
                          placeholder={`Author: ${book.author}`}
                        />
                      </div>

                      <div className='mb-2'>
                        <input
                          type='submit'
                          className='btn btn-primary'
                          value='Update'
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
        )}
      </React.Fragment>
    </>
  );
};

export default EditBook;
