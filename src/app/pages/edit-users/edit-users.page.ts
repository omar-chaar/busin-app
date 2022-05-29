import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { ChatService } from 'src/app/services/chat/chat.service';
import { MessagesService } from 'src/app/services/messages/messages.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/services/user/user.service';
import { AddUserPage } from '../add-user/add-user.page';
import { User } from 'src/model/classes/User';
import { CompanyService } from 'src/app/services/company/company.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.page.html',
  styleUrls: ['./edit-users.page.scss'],
})
export class EditUsersPage implements OnInit {

  users: User[] = [];
  user: User;
  page: number = 1;
  fullyLoaded = false;
  modal: HTMLElement;

  constructor(private userService: UserService, private actionSheetCtrl: ActionSheetController,
    private messageService: MessagesService,
    private chatService: ChatService, private toastService: ToastService, private router: Router,
    private modalController: ModalController, private companyService: CompanyService) { 

    this.user = this.userService.currentUser;
    const id = this.companyService.company.company_id;
    this.userService.getUsersByCompany(id).subscribe(
      (data: User[]) => {
        this.users = data;
        this.fullyLoaded = true;
      },
      (error) => {
        this.toastService.presentToast(error.error.error, 4000, 'danger');
      }
    )
  }

  ngOnInit() {

  }
  
  async confirmDelete(user: User): Promise<void> {
    const actionSheet = await this.actionSheetCtrl.create({
      header: `Are you sure you want to delete "${user.getFullName()}" and all of it's messages?`,
      buttons: [
        {
          text: 'Delete',
          role: 'destructive'
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();

    if (role === 'destructive') {
      this.userService.deleteUser(user.id).subscribe(
        (data) => {
          this.toastService.presentToast('User deleted', 4000, 'success');
          this.users = this.users.filter(u => u.id !== user.id);
        },
      )
    }
  }

  async presentAdd() {
    const modal = await this.modalController.create({
      component: AddUserPage,
      cssClass: 'my-custom-class',
      componentProps: {
        users: this.users,
        user: this.user
      }
    });
    return await modal.present();
  }

  addMoreItems(): boolean {
    return true
  }

  redirectTo(url: string): void {
    this.router.navigateByUrl(url)
  }

}
