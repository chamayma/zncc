import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  onActivate(componentRef: { title: any; }){
    console.log(componentRef.title); //access methods and properties of current loaded component
  }
}
