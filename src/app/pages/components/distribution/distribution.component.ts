import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VendorTypeService } from '../services/vendorType/vendor-type.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { NewsPaperTypesService } from '../services/news-paper-types/news-paper-types.service';
import { NewsPaperOrdersService } from '../services/news-paper-orders/news-paper-orders.service';
import { PrintingcompanyService } from '../services/printingcompany/printingcompany.service';
import { DistributionAreasService } from '../services/distribution-areas/distribution-areas.service';
import { NewsPaperStoresService } from '../services/news-paper-stores/news-paper-stores.service';
import { DistributionService } from '../services/distribution/distribution.service';
import { AgentsService } from '../services/agents/agents.service';
import { IssueService } from '../services/issue/issue.service';

@Component({
  selector: 'app-distribution',
  templateUrl: './distribution.component.html',
  styleUrls: ['./distribution.component.css']
})
export class DistributionComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'order_number', 'area_name', 'store_name', 'paper_name', 'quantity', 'totalsale', 'balanceQty', 'dateOfDistribution', 'action'];



  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('callDialog') callDialog!: TemplateRef<any>;
  @ViewChild('callEditDialog') callEditDialog!: TemplateRef<any>;
  @ViewChild('distributionDialog') distributionDialog!: TemplateRef<any>;
  formData!: FormGroup
  distributionForm!: FormGroup
  company_id: any;
  distribution_area_id: any;
  orderid: any;
  getDataPaper1: any;
  dataCompany: any;
  distributionAreasData: any[] = []
  storeDataValue: any;
  order_number: any;
  agentData: any;
  agentData1: any;
  distribution_id: any;
  loding: boolean = true
  constructor(
    private newsPaperOrdersService: NewsPaperOrdersService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private newsPaperTypesService: NewsPaperTypesService,
    private printingcompanyService: PrintingcompanyService,
    private issueService: IssueService,
    private agentService: AgentsService,
    private distribution: DistributionService) {
    // Create 100 users


  }
  ngOnInit(): void {
    this.createForm()
    // this.getDataDistributionArea()
    // this.getDataCompany()
    this.getDataAgents()
    this.getData()

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createForm() {
    const currentDate: Date = new Date();

    // Format date and time
    const formattedDate: string = currentDate.toISOString().slice(0, 19); // Remove milliseconds



    this.formData = this.fb.group({
      issued_to: [null],            // Assuming BigInt is the type name
      quantity: [null],            // Assuming Int is the type name
      distribution_id: [null]      // Assuming BigInt is the type name
    });
  }

  submit() {
    this.formData.patchValue({
      distribution_id: this.distribution_id
    })

    this.issueService.addPost(this.formData.value).subscribe((data: any) => {



      this.succeAlart()
    })

  }
  getDataAgents() {
    this.agentService.getPosts().subscribe(
      (data: any) => {


        this.agentData1 = data


      }
    )
  }
  openDialog() {
    let dialogRef = this.dialog.open(this.callDialog, {
      width: '650px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result !== 'no') {
          const enabled = "Y"
          console.log(result);
        } else if (result === 'no') {
          // console.log('User clicked no.');
        }
      }
    })
  }
  openDistributionDialog(row: any) {


    this.distribution_id = row.distribution_id
    // this.order_number = row.order_number
    let dialogRef = this.dialog.open(this.distributionDialog, {
      width: '650px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result !== 'no') {
          const enabled = "Y"

        } else if (result === 'no') {
          // console.log('User clicked no.');
        }
      }
    })
  }




  create() {
    this.formData.patchValue({
      balanceQty: this.formData.value.quantity
    })
    this.newsPaperOrdersService.addPost(this.formData.value).subscribe((data: any) => {
      this.succeAlart()
      this.getData()
    })
  }
  Update() {
    this.newsPaperOrdersService.updatePost(this.orderid, this.formData.value).subscribe((data: any) => {
      this.succeAlart()
      this.getData()
    })
  }
  getData() {
    let dataValue: any[] = []
    this.distribution.getAllData().subscribe(

      (data: any) => {
        console.log(data);

        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loding = false

      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  succeDestributeAlart() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: 'Distribution is successfully'
    })
  }

  erroDestributeAlart(error: any) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: error
    })
  }
  succeAlart() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: 'Issued is successfully'
    })
  }
}