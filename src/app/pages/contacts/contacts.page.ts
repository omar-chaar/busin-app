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

  page: number = 1
  fullyLoaded = false

  constructor(private departmentService: DepartmentService, private userService: UserService,
    private router: Router, private chatService:ChatService) {
      this.user = this.userService.currentUser

  }

  ngOnInit(): void {

  }

  loadData(event):void {
    setTimeout(() => {
      
      event.target.complete();
    }, 2000);
  }

  redirectTo(url:string):void{
    this.router.navigateByUrl(url)
  }


}
