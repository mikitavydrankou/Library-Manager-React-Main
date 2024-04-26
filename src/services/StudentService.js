import axios from 'axios';

export default class StudentService {
  static serverURL = `http://localhost:8080`;

  static getStudents() {
    let dataURL = `${this.serverURL}/api/students/`;
    return axios.get(dataURL);
  }

  //надо что бы димас допилил
  static getStudent(studentId) {
    let dataURL = `${this.serverURL}/api/students/${studentId}`;
    return axios.get(dataURL);
  }

  static registerNewStudent(student) {
    let dataURL = `${this.serverURL}/api/students/`;
    return axios.post(dataURL, student);
  }

  static updateStudent(student, studentId) {
    let dataURL = `${this.serverURL}/api/students/${studentId}`;
    return axios.put(dataURL, student);
  }

  static deleteStudent(studentId) {
    let dataURL = `${this.serverURL}/api/students/${studentId}`;
    return axios.delete(dataURL);
  }

  //Добавление книжки студенту, допилить
  static addBookToStudent(studentId, bookId) {
    let dataURL = `${this.serverURL}/api/students/${studentId}/books/${bookId}`;
    return axios.post(dataURL);
  }

  static deleteBookFromStudent(studentId, bookId) {
    let dataURL = `${this.serverURL}/api/students/${studentId}/books/${bookId}`;
    return axios.delete(dataURL);
  }
}
