import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { Location } from '@angular/common'
import { DepartmentService } from 'src/app/services/department/department.service';
import { NavController } from '@ionic/angular';
import { User } from 'src/model/classes/User';
import { Department } from 'src/model/classes/Department';
import { ChatService } from 'src/app/services/chat/chat.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileUser: User;
  department: Department;
  user: User;
  editMode: boolean = false;


  constructor(private route: ActivatedRoute, private _router: Router, private userService: UserService,
    private chatService: ChatService, private departmentService: DepartmentService, 
    private toastService:ToastService, private location: Location, private navController: NavController) {
  }

  ngOnInit() {
    this.profileUser = new User(0, '', '', '', '', '', 0, false, false, '');
    this.department = new Department(0, '', 0);
    this.user = this.userService.currentUser;
    const id = +this.route.snapshot.params['id'];
    if (id == this.userService.currentUser.id) {
      this.profileUser = this.userService.currentUser;
      this.user = this.userService.currentUser;
      this.department = this.departmentService.currentUserDepartment;
    } else {
      this.userService.getUserById(id).subscribe(
        (resp) => {
          this.profileUser = new User(id, resp.data.name, resp.data.surname, resp.data.position, null,
            resp.data.profile_picture, resp.data.department_id, resp.data.is_adm, resp.data.is_owner);
          this.departmentService.getDepartment(resp.data.department_id).subscribe(
            (resp) => {
              this.department = new Department(resp.data.department_id, resp.data.name, resp.data.company_id);
            }
          )
        })
    }
  }

  redirectTo(url: string): void {
    this._router.navigateByUrl(url)
  }

  redirectToChat(contact: User) {
    this._router.navigateByUrl('/message/' + contact.id)
  }

  backButton() {
    this.navController.setDirection("back", true, "back");
    this.location.back();
  }

  switchEdit() {
    this.editMode = !this.editMode;
    
  }
  
  checkMark(){
    if(this.user.admin || this.user.owner || this.profileUser.id == this.userService.currentUser.id){
      this.userService.setName(this.profileUser.id, this.profileUser.name, this.profileUser.surname).subscribe(
        (resp) => {
          this.toastService.presentToast("Name changed", 3000, "success");
          this.editMode = false;
        }
      )
    } else {
      this.toastService.presentToast("You are not allowed to change username", 3000, "danger");
    }
      
  }

  doRefresh(event) {
    setTimeout(() => {
      this.profileUser =  new User(0, '', '', '', '', '', 0, false, false, '');
      this.department = new Department(0, '', 0);    

      this.ngOnInit();
      event.target.complete();
    }, 2000);
  }  

  logout(){
    this.userService.logout();
    this.redirectTo('/login');
  }


}
