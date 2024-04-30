import axios from 'axios';

export default class StudentService {
  static serverURL = `http://localhost:8080`;

  static getBooks() {
    let dataURL = `${this.serverURL}/api/books/`;
    return axios.get(dataURL);
  }

  static getBook(bookId) {
    let dataURL = `${this.serverURL}/api/books/${bookId}`;
    return axios.get(dataURL);
  }

  static registerNewBook(student) {
    let dataURL = `${this.serverURL}/api/books/`;
    return axios.post(dataURL, student);
  }

  static updateBook(bookId) {
    let dataURL = `${this.serverURL}/api/books/${bookId}`;
    return axios.put(dataURL, student);
  }

  static deleteBook(bookId) {
    let dataURL = `${this.serverURL}/api/books/${bookId}`;
    return axios.delete(dataURL);
  }
}
