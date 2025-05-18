import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListStudentComponent } from './components/list-student/list-student.component';
import { FormStudentComponent } from './components/form-student/form-student.component';

const routes: Routes = [
  { path: '', component: ListStudentComponent }, // ruta principal de la lista
  { path: 'form', component: FormStudentComponent }, // ruta para agregar datos del formulario
  { path: 'form/:id', component: FormStudentComponent }, // ruta para actualizar datos del formulario
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
