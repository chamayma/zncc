import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { log } from 'console';

interface DataTablesResponse {
  recordsTotal: number;
  recordsFiltered: number;
  data: any[]; // Adjust the type based on your actual data structure
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})

export class AdminComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  data: any[] = []; // Data array to store fetched records

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.dtOptions = {
      serverSide: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.http
          .get<DataTablesResponse[]>(
            'http://127.0.0.1:8080/members' // Exclude query parameters
          )
          .subscribe(
            (resp: DataTablesResponse[]) => {
              console.log('API Response:', resp);
              this.data = resp;
              console.log('Fetched Data:', this.data);
              callback({
                data: this.data
              });
            },
            (error) => {
              console.error('API Error:', error);
            }
          );
      },
      columns: [{
        title: 'ID',
        data: 'id'
      }, {
        title: 'Company Name',
        data: 'companyName'
      }, {
        title: 'Company Email',
        data: 'companyEmail'
      }, {
        title: 'Company Phone',
        data: 'companyPhone'
      }, {
        title: 'Region',
        data: 'region'
      }, {
        title: 'District',
        data: 'district'
      }, {
        title: "Owner's Name",
        data: 'ownerName'
      }, {
        title: "Owner's Email",
        data: 'ownerEmail'
      }, {
        title: "Owners's Phone",
        data: 'ownerPhone'
      }, {
        title: 'Representative Name',
        data: 'representativeName'
      }, {
        title: 'Gender',
        data: 'gender'
      }, {
        title: 'Position',
        data: 'position'
      }, {
        title: 'Representative Email',
        data: 'representativeEmail'
      }, {
        title: 'Representative Phone',
        data: 'representativePhone'
      }, {
        title: 'Business Type',
        data: 'businessType'
      }, {
        title: 'Business Cluster',
        data: 'businessCluster'
      }, {
        title: 'Business Activities',
        data: 'businessActivity'
      }]
    };
  }
}
