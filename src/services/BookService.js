import axios from 'axios';

export default class StudentService {
  static serverURL = `http://localhost:8080`;

  static getBooks() {
    let dataURL = `${this.serverURL}/api/books/`;
    return axios.get(dataURL);
  }
  static registerNewBook(student) {
    let dataURL = `${this.serverURL}/api/books/`;
    return axios.post(dataURL, student);
  }

  static updateBook(student, studentId) {
    let dataURL = `${this.serverURL}/api/books/${studentId}`;
    return axios.put(dataURL, student);
  }

  static deleteBook(studentId) {
    let dataURL = `${this.serverURL}/api/books/${studentId}`;
    return axios.delete(dataURL);
  }
}
