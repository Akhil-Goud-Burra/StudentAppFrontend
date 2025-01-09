import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BackendService } from '../services/backend.service';
import { dto } from './dto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  myForm: FormGroup;
  FetchedData: any[] = [];
  Edit_Form: boolean = false;
  Update_Index: any;

  errorMessage: string | null = null;
  activeSection: string = 'create';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private backendService: BackendService
  ) {
    this.myForm = this.fb.group({
      account: this.fb.group({
        name: [''],
        email: [''],
        age: [''],
      }),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    const formData = this.myForm.value.account;

    if (this.myForm.valid) {
      if (this.Edit_Form) {
        this.updateStudent(formData);
      } else {
        this.createStudent(formData);
      }
    }
  }

  updateStudent(formData: any) {
    const post_data: Partial<dto> = {
      Id: this.Update_Index,
      Name: formData.name,
      Mail: formData.email,
      Age: formData.age,
    };

    this.backendService.updateStudent(this.Update_Index, post_data).subscribe(
      (response) => {
        console.log('Student Updated successfully:', response);
        this.getStudentDetails();
        this.Edit_Form = false;
        this.myForm.reset();
        this.activeSection = 'display';
      },
      (error) => {
        console.error('Error in Updating student:', error);
        this.errorMessage = error.error;
        this.activeSection = 'create';
      }
    );
  }

  createStudent(formData: any) {
    const create_student: Partial<dto> = {
      Name: formData.name,
      Mail: formData.email,
      Age: formData.age,
    };

    this.backendService.createStudent(create_student).subscribe(
      (response) => {
        console.log('Student created successfully:', response);
        this.getStudentDetails();
        this.myForm.reset();
        this.activeSection = 'display';
      },
      (error) => {
        console.error('Error creating student details:', error);
        this.errorMessage = error.error;
      }
    );
  }

  getStudentDetails() {
    this.backendService.getStudentDetails().subscribe(
      (response) => {
        this.FetchedData = response;
      },
      (error) => {
        console.error('Error fetching students:', error);
        this.errorMessage = error.error;
        this.activeSection = 'create';
      }
    );
  }

  editStudent(data: any, index: number) {
    this.Edit_Form = true;
    this.Update_Index = index;
    this.myForm.patchValue({
      account: {
        name: data.name,
        email: data.mail,
        age: data.age,
      },
    });

    this.activeSection = 'create';
  }

  removeStudent(index: number) {
    this.backendService.deleteStudent(index).subscribe(
      (response) => {
        console.log('Student Deleted successfully:', response);
        this.getStudentDetails();
      },
      (error) => {
        console.error('Error in Deleting Student:', error);
        this.errorMessage = error.error;
        this.activeSection = 'create';
      }
    );
  }

  showSection(section: string) {
    this.activeSection = section;

    if (section === 'display') {
      this.getStudentDetails();
    }
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
