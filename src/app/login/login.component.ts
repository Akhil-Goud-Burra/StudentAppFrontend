import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  myForm: FormGroup;
  errorMessage: string | null = null; // Variable to hold error messages

  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient) 
  {
    this.myForm = this.fb.group
    ({
        account: this.fb.group
        (
          {
            username: [''],
            Password: ['']
          }
        )
    });
  }

  ngOnInit(): void {  }


  onSubmit() {
    const formData = this.myForm.value.account;
  
    if (this.myForm.valid) {
  
      const url = 'https://localhost:7145/api/Login';
  
      const checkDetails = {
        username: formData.username,
        password: formData.Password,
      };
  
      
      this.http.post(url, checkDetails).subscribe(
        (response) => {
          console.log('Response received:', response);
          this.redirectToHome()
        },
        (error) => {
          console.error('Error fetching details:', error);
          this.errorMessage = error.error;
        }
      );
    }
  }
  
  
  redirectToHome() {
    // Navigate to the Home page
    this.router.navigate(['/home']);
  }

}
