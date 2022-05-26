import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { IonAccordionGroup } from '@ionic/angular';
import { ChatService } from 'src/app/services/chat/chat.service';
import { DepartmentService } from 'src/app/services/department/department.service';
import { UserService } from 'src/app/services/user/user.service';

import { User } from 'src/model/classes/User';
import { Department } from 'src/model/classes/Department';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-contacts',
  templateUrl: 'contacts.page.html',
  styleUrls: ['./contacts.page.scss']
})
export class ContactsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonAccordionGroup, { static: true }) accordionGroup: IonAccordionGroup;

  departments: Department[] = []
  user: User;
  subscription: Subscription;
  alreadyLoaded: number[] = [];

  page: number = 1
  fullyLoaded = false

  constructor(private departmentService: DepartmentService, private userService: UserService,
    private router: Router, private chatService:ChatService) {
      this.user = this.userService.currentUser
      const deptos = this.departmentService.departments
      this.departments = deptos;
  }

  ngOnInit(): void {

  }

  loadUsers(department: Department):void{
    if(!this.alreadyLoaded.includes(department.department_id)){
    this.userService.getUsersByDepartment(department.department_id).subscribe(
      (resp) => {
        if(resp == undefined){
          return this.alreadyLoaded.push(department.department_id);
        }
        department.users = resp.data.map(user => {
          return new User(user.user_id, user.name, user.surname, user.position, user.email,
             null, user.department_id, user.is_adm, user.is_owner);
        })
      } , (err) => {
        if(err.status == 400){ //No user found
          department.users = undefined;
        }
      }
      
    )    
    this.alreadyLoaded.push(department.department_id);
  }
}

  redirectTo(url:string):void{
    this.router.navigateByUrl(url)
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.departments = [];
      this.alreadyLoaded = [];
      const deptos = this.departmentService.departments
      this.departments = deptos;
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }  
}
