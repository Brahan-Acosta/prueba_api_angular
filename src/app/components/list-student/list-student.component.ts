import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {
  students: any[] = [];

  constructor(private studentService: StudentService, private router: Router) { }

  ngOnInit(): void {
    this.loadStudents(); // LLamado de funcion inicial para cargar la lista de estudiantes
  }

  loadStudents() {
    this.studentService.getAllStudents().subscribe((res: any) => {
      this.students = res; // data que llega del servicio para mostrala en la lista
    });
  }

  addStudent() {
    this.router.navigate(['/form']); // ruta para la vista de agregar desde el formulario
  }

  editStudent(id: number) {
    this.router.navigate(['/form', id]); // ruta para la vista de editar desde el formulario
  }

  deleteStudent(id: number) {
    if (confirm('¿Deseas eliminar este estudiante?')) {
      this.studentService.deleteStudent(id).subscribe(() => {
        this.loadStudents(); // vuelve a cargar
      });
    }
  }

}
