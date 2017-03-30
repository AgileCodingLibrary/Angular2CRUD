import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {IDepartment} from '../shared/interfaces';
import { DataService } from '../shared/data_services/data.service';
import { Location } from '@angular/common';


@Component({
    moduleId: module.id,
    selector: 'department-new',
    templateUrl: 'department-new.component.html'
})
export class DepartmentNewComponent {
     name:string;
     description: string;
     department: IDepartment;

     info:string = '';
     departmentCreated:boolean =false;

    
    constructor(private dataService: DataService, 
                private route: ActivatedRoute,
                private location: Location) { }

     goBack(): void{
        this.location.back();
    }

     newDepartment(_name:string, _description:string){

        this.department = {
            "name":_name,
            "description": _description
        }

         this.dataService.createDepartment(this.department)
         .subscribe(() => {
                console.log('Department '+this.department.name+' was created successfully. ');
                this.departmentCreated = true;
                this.info = 'Department '+this.department.name+' was created successfully. ';
                Materialize.toast('Department created', 3000, 'green rounded')
            },
            error => {
                Materialize.toast('Failed to create department', 3000, 'red rounded')
                console.log('Failed while trying to update the department. '+error);
            });

     }

     
}