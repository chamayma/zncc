import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {
  // Define your form group
  dataForm!: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit() {
    // Initialize your form in the ngOnInit lifecycle hook
    this.dataForm = this.fb.group({
      companyName: ['', Validators.required],
      region: ['', Validators.required],
      district: ['', Validators.required],
      representative_name: ['', Validators.required],
      position: ['', Validators.required],
      representative_email: ['', [Validators.required, Validators.email]],
      representative_phone: ['', Validators.required],
      business_type: ['', Validators.required],
      business_cluster: ['', Validators.required],
      business_activity: ['', Validators.required],
      company_certificate: ['', Validators.required],
     });
    }

    onSubmit() {
    // Check if the form is valid    
    if (this.dataForm.valid) {
      // Get the form data
      const formData = this.dataForm.value;

      // Send the data to your server using an HTTP request
      this.http.post('http://127.0.0.1:8080/members', formData)
        .subscribe(
          (response) => {
            console.log('Data sent successfully:', response);
            // Optionally, reset the form after successful submission
            this.dataForm.reset();
          },
          (error) => {
            console.error('Error sending data:', error);
          }
        );
    }
  }
    
  }