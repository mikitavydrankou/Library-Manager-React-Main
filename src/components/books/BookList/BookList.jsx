import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BookService from '../../../services/BookService';
import Spinner from '../../Spinner/Spinner';

let BookList = () => {
  let [query, setQuery] = useState({
    text: '',
  });

  let [state, setState] = useState({
    loading: false,
    books: [],
    filteredBooks: [],
    errorMessage: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true });
        let response = await BookService.getBooks();

        setState({
          ...state,
          loading: false,
          books: response.data,
          filteredBooks: response.data,
        });
      } catch (error) {
        setState({ ...state, loading: false, errorMessage: error.message });
      }
    };

    fetchData();
  }, []);

  let { loading, filteredBooks } = state;

  // Delete student

  let clickDelete = async (bookId) => {
    try {
      let response = await BookService.deleteBook(bookId);
      if (response) {
        setState({ ...state, loading: true });
        let response = await BookService.getBooks();
        setState({
          ...state,
          loading: false,
          books: response.data,
          filteredBooks: response.data,
        });
      }
    } catch (error) {
      setState({ ...state, loading: false, errorMessage: error.message });
    }
  };

  // search students

  let searchBooks = (event) => {
    setQuery({ ...query, text: event.target.value });
    let theBooks = state.books.filter((book) => {
      return book.title
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setState({
      ...state,
      filteredBooks: theBooks,
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
                    Book Manager
                    <Link to={'/books/add'} className='btn ms-3 bg-warning'>
                      <i className='fa fa-plus-circle me-2' />
                      New
                    </Link>
                    <Link to={'/students/list'} className='btn ms-3 bg-warning'>
                      <i className='fa fa-eye me-2' />
                      Students
                    </Link>
                  </p>
                  <p className='fst-italic'>
                    Click &quot;New&quot; to add book
                  </p>
                </div>

                <div className='col'>
                  <div className='d-flex justify-content-end'>
                    <input
                      name='text'
                      value={query.text}
                      onChange={searchBooks}
                      type='text'
                      className='form-control'
                      placeholder='Search books by title'
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
                  {filteredBooks.length > 0 &&
                    filteredBooks.map((book) => {
                      return (
                        <>
                          <div className='col-md-6' key={book.id}>
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
                                    <Link
                                      to={`/books/view/${book.id}`}
                                      className='btn btn-warning my-1 mx-1'
                                      style={{ width: '40px', height: '40px' }}
                                    >
                                      <i className='fa fa-eye' />
                                    </Link>

                                    <Link
                                      to={`/books/edit/${book.id}`}
                                      className='btn btn-primary my-1 mx-1'
                                      style={{ width: '40px', height: '40px' }}
                                    >
                                      <i className='fa fa-pen' />
                                    </Link>

                                    <button
                                      className='btn btn-danger my-1 mx-1'
                                      style={{ width: '40px', height: '40px' }}
                                      onClick={() => clickDelete(book.id)}
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

export default BookList;
