import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-form-student',
  templateUrl: './form-student.component.html',
  styleUrls: ['./form-student.component.css']
})
export class FormStudentComponent implements OnInit {
  studentForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    age: ['', [Validators.required, Validators.min(1), Validators.max(110)]],
  });

  id: any;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private studentService: StudentService) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    if(this.id > 0){
      this.editFormStudent(this.id);
    }
  }

  editFormStudent(id:any){
    if (this.id) {
      this.studentService.getStudentById(this.id).subscribe(data => {
        this.studentForm.patchValue(data);
      });
    }
  }

  onSubmit() {
    if (this.studentForm.invalid) return this.studentForm.markAllAsTouched();

    if (this.id) {
    this.studentService.updateStudent(this.id, this.studentForm.value).subscribe(() => {
      this.router.navigate(['/']); // vuelve a la lista
      });
    } else {
      this.studentService.addStudent(this.studentForm.value).subscribe(() => {
        this.router.navigate(['/']); // vuelve a la lista
      });
    }
  }

}
