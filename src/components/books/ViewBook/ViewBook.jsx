import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BookService from '../../../services/BookService';
import Spinner from '../../Spinner/Spinner';

let ViewBook = () => {
  let { bookId } = useParams();
  console.log(bookId);

  let [state, setState] = useState({
    loading: false,
    book: {},
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
        setState({ ...state, loading: false, errorMessage: error.message });
      }
    };

    fetchData();
  }, [bookId]);

  let { loading, book, errorMessage } = state;

  return (
    <>
      <React.Fragment>
        <section className='view-student-intro p-3'>
          <div className='container'>
            <div className='row'>
              <div className='col'>
                <p className='h3 text-warning fw-bold'>View Books</p>
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
            {Object.keys(book).length > 0 && (
              <section className='view-student mt-3'>
                <div className='container'>
                  <div className='row align-items-center'>
                    <div className='col-md-8'>
                      <ul className='list-group'>
                        <li className='list-group-item list-group-item-action'>
                          Title: <span className='fw-bold'>{book.title}</span>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                          Author: <span className='fw-bold'>{book.author}</span>
                        </li>
                        {/* 
                        <Link
                          to={`/students/ViewStudent/ViewBook`}
                          className='btn btn-warning'
                        >
                          Check rented books
                        </Link> */}
                      </ul>
                    </div>
                  </div>
                  <div className='row mt-3'>
                    <div className='col'>
                      <Link to={`/books/list`} className='btn btn-warning'>
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

export default ViewBook;
