import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private API_URL = 'https://dummyjson.com/users'; // esta es nuestra api para el consumo de los servicios
  // private API_URL = 'https://jsonplaceholder.typicode.com/users';
  private STORAGE_KEY = 'students';

  constructor(private http: HttpClient) { }

  getAllStudents():Observable<any>{
    const localData = localStorage.getItem(this.STORAGE_KEY);
    if (localData) {
      return of(JSON.parse(localData));
    } else {
      return this.http.get<any>(this.API_URL).pipe(
        map((res:any) => {
          const users = res.users || [];
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
          return users;
        })
      );
    } // Servicio en el cual me devuelve todos los estudiantes
  }

  getStudentById(id: number): Observable<any> {
    const data = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    return of(data.find((student: any) => student.id == id)); // Servicio en el cual me devuelve un estudiante por id
  }

  addStudent(student: any): Observable<any> {
    const data = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    const newStudent = { ...student, id: Date.now() }; // simulamos ID
    data.push(newStudent);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    return of(newStudent); // Servicio que agrega un estudiante
  }

  updateStudent(id: number, student: any): Observable<any> {
    let data = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    data = data.map((item: any) => (item.id == id ? { ...item, ...student } : item));
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    return of({ ...student, id }); // Servicio que actualiza un estudiante
  }

  deleteStudent(id: number): Observable<any> {
    let data = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    data = data.filter((item: any) => item.id != id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    return of({ message: 'Eliminado correctamente' }); // Servicio que elimina un estudiante
  }
}
