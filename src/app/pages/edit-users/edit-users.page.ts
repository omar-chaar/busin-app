import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { ChatMessageService } from 'src/app/services/chat-message/chat-message.service';
import { ChatService } from 'src/app/services/chat/chat.service';
import { MessagesService } from 'src/app/services/messages/messages.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/services/user/user.service';
import { AddUserPage } from '../add-user/add-user.page';
import { EditUserPage } from '../edit-user/edit-user.page';
import { User } from 'src/model/classes/User';

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
    private messageService: MessagesService, private chatMessageService: ChatMessageService,
    private chatService: ChatService, private toastService: ToastService, private router: Router,
    private modalController: ModalController) { 


    }

  ngOnInit() {
    const users = this.userService.getUsersPagination(this.page);
    this.users.push(...users);
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
      await this.chatService.deleteChat(user);
      await this.messageService.deleteMessagesByUser(user);
      await this.chatMessageService.deleteMessagesByUser(user);
      await this.userService.deleteUser(user);
      const index = this.users.indexOf(user);
      this.users.splice(index, 1);
      
      this.toastService.presentToast('User account deleted!', 3000, 'success')
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

  loadData(event): void {
    if (!this.fullyLoaded) {
      this.page += 1;
      setTimeout(() => {
        const res = this.addMoreItems();
        if (!res) {
          this.fullyLoaded = true
        }
        event.target.complete();
      }, 2000);
    }
  }

  addMoreItems(): boolean {
    const users = this.userService.getUsersPagination(this.page)
    if (users.length === 0) return false
    this.users.push(...users)
    return true
  }

  redirectTo(url: string): void {
    this.router.navigateByUrl(url)
  }

}
