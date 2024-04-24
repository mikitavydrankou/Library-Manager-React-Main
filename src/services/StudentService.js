import axios from 'axios';

export default class StudentService {
  static serverURL = `http://localhost:8080`;

  static getAllStudents() {
    let dataURL = `${this.serverURL}/api/students/`;
    return axios.get(dataURL);
  }

  static getStudent(studentId) {
    let dataURL = `${this.serverURL}/api/students/${studentId}`;
    return axios.get(dataURL);
  }

  static createStudent(student) {
    let dataURL = `${this.serverURL}/api/stundents`;
    return axios.post(dataURL, student);
  }

  static updateStudent(student, studentId) {
    let dataURL = `${this.serverURL}/api/students/${studentId}`;
    return axios.put(dataURL, student);
  }

  static deleteStudent(studentId) {
    let dataURL = `${this.serverURL}/api/contacts/${studentId}`;
    return axios.delete(dataURL);
  }
}
