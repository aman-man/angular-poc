import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/home.service';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  employeeList: any[] = [];
  // filteredList: any[] = [];
  user;
  isEdit: boolean = false;
  selectedId: Number;
  searchTerm: string = '';
  lowercase: boolean = false;
  header: string = 'Employee-Registration-Form';
  employeeRegisterForm: FormGroup;

  constructor(
    private _employeService: HomeService,
    private formbuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getEmployeList();
    this.employeeRegisterForm = this.formbuilder.group({
      name: ['', [Validators.required, Validators.max(10)]],
      phone: ['', [Validators.required, Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required,]],
      jobtitle: ['', [Validators.required,]],
      address: this.formbuilder.group({
        street: ['', [Validators.required,]],
        suite: ['', [Validators.required,]],
        city: ['', [Validators.required,]],
        zipcode: ['', [Validators.required,]],
        geo: this.formbuilder.group({
          lat: ['', []],
          lng: ['', []],
        }),
      }),
      company: this.formbuilder.group({
        name: ['', [Validators.required,]],
        catchPhrase: ['', [Validators.required,]],
        bs: ['', [Validators.required,]],
      }),
      website: ['', [Validators.required,]]
    });
  }

  getEmployeList() {
    console.log('i initiates');
    this._employeService.getEmployees().subscribe(data => {
      this.employeeList = data;
    })
  }

  saveNewEmployee() {
    console.log(this.employeeRegisterForm.value);
    this._employeService.saveEmployeeDetail(this.employeeRegisterForm.value)
      .subscribe(data => {
        this.user = data;
        console.log(this.user);
      });
      this.employeeRegisterForm.reset();
    this.getEmployeList();
  }
  GetValueInForm(selectedEmployee) {
    console.log('selectedEmployee:', selectedEmployee);
    this.selectedId = selectedEmployee.id;
    this.isEdit = true;
    this.employeeRegisterForm = this.formbuilder.group({
      name: [selectedEmployee.name, [Validators.required],],
      phone: [selectedEmployee.phone, [Validators.required,]],
      email: [selectedEmployee.email, [Validators.required, Validators.email]],
      username: [selectedEmployee.username, [Validators.required,]],
      jobtitle: [selectedEmployee.jobtitle, [Validators.required,]],
      address: this.formbuilder.group({
        street: [selectedEmployee.address.street, [Validators.required,]],
        suite: [selectedEmployee.address.suite, [Validators.required,]],
        city: [selectedEmployee.address.city, [Validators.required,]],
        zipcode: [selectedEmployee.address.zipcode, [Validators.required,]],
        geo: this.formbuilder.group({
          lat: [selectedEmployee.address.geo.lat, []],
          lng: [selectedEmployee.address.geo.lng, []],
        }),
      }),
      company: this.formbuilder.group({
        name: [selectedEmployee.company.name, [Validators.required,]],
        catchPhrase: [selectedEmployee.company.catchPhrase, [Validators.required,]],
        bs: [selectedEmployee.company.bs, [Validators.required,]],
      }),
      website: [selectedEmployee.website, [Validators.required,]]
    });

  }

  updateEmployeeDetail(updatedEmployeeDetail) {
    console.log('updatedEmployeeDetail', updatedEmployeeDetail);
    updatedEmployeeDetail.id = this.selectedId;
    this._employeService.updateEmployeeDetail(updatedEmployeeDetail)
      .subscribe(data => {
        this.user = data;
        this.employeeRegisterForm.reset();
        console.log(this.user);
      });
    
      this.getEmployeList();
  }

  removeEmployeeDetail(SelectedEmployeeId) {
    console.log('SelectedEmployee', SelectedEmployeeId);
    this._employeService.removeEmployeeDetail(SelectedEmployeeId)
      .subscribe(data => {
        this.user = data;
        console.log(this.user);
      });

    this.getEmployeList();
  }

  // search(searchTerm) {
  //   this.filteredList = [];
  //   let count = 0;
  //   console.log('searchKey:', searchTerm);
  //   if (searchTerm) {
  //     this.employeeList.map((search) => {
  //       let name: string = search.name;
  //       if (name.includes(searchTerm)) {
  //         console.log('Search: ', search);
  //         this.filteredList.push(search);
  //       }
  //       if (count == (this.employeeList.length - 1)) {
  //         this.employeeList = this.filteredList;
  //       }
  //       count = count + 1;
  //     });
  //   } else {
  //     this.getEmployeList();
  //   }
  // }

}
