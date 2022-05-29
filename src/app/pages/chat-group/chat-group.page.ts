import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatGroupService } from 'src/app/services/chat-group/chat-group.service';
import { DepartmentService } from 'src/app/services/department/department.service';
import { SocketioService } from 'src/app/services/socketio/socketio.service';
import { UserService } from 'src/app/services/user/user.service';
import { ChatMessage } from 'src/model/classes/ChatMessage';
import { Department } from 'src/model/classes/Department';
import { User } from 'src/model/classes/User';
import { IonContent, NavController } from '@ionic/angular';
import { Location } from '@angular/common';
@Component({
  selector: 'app-chat-group',
  templateUrl: './chat-group.page.html',
  styleUrls: ['./chat-group.page.scss'],
})
export class ChatGroupPage implements OnInit, OnDestroy {
  @ViewChild(IonContent, { static: false }) content: IonContent;

  department: Department = new Department(-1, '', -1);
  messages: ChatMessage[] = [];
  user: User;
  text: string;
  loaded: boolean = false;
  fullyLoaded: boolean = false;
  page: number = 1;

  constructor(private _router: Router, private route: ActivatedRoute,
   private userService: UserService, private departmentService: DepartmentService,
   private chatGroupService: ChatGroupService, private socketIoService: SocketioService,
   private location:Location, private navController: NavController) { }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.user = this.userService.currentUser;
    this.departmentService.getDepartment(id).subscribe((department) => {
      this.department = new Department(department.data.department_id, department.data.name, department.data.company_id);
      this.chatGroupService.getFirstMessages(this.department.department_id).subscribe(data => {
        if(!data){
           this.loaded = this.fullyLoaded = true;
        }
        const messages = data.data
        this.messages = messages.map(message => {
          const time = message.time;
          return new ChatMessage(message.group_message_id, message.sender_id, message.department_id, time, message.message_body, message.name,
            message.deptname);
        }) 
        setTimeout(() => {
          this.ScrollToBottom();
        });          
        this.orderByDate(this.messages);        
        this.loaded = true;
        if(this.messages.length < 10){
          this.fullyLoaded = true;
        }
        this.socketIoService.connect();
        this.groupConnection();
        this.socketIoService.getNewMessageGroupMessage().subscribe((message: ChatMessage) => {
          if (message != null){
          var messageToPush = new ChatMessage(message.id, message.sender, message.department_id, message.time, message.body, message.sender_name, message.department_name);
            if(this.messages.some(message => message.id == messageToPush.id)){
              return;
            }
            this.messages.push(messageToPush);            
            setTimeout(() => {
                this.ScrollToBottomWithAnim();
            });    
          }
        });     
      });
    });
  }


  ngOnDestroy(): void {
     this.socketIoService.groupDisconnection(this.department.department_id);
     this.socketIoService.disconnect();
  }

    
  goBack(): void {
    this.navController.setDirection("back", true, "back");
    this.location.back();
  }
  loadData(event) {
  if(!this.fullyLoaded){
    setTimeout(() => {
      this.loadMoreMessages();
      event.target.complete();
    }, 500);
  }else{
    event.target.disabled = true;
  }
  }
  loadMoreMessages(){
    this.chatGroupService.getNextTenMessages(this.department.department_id, this.page).subscribe(data => {
      if(!data){
         this.loaded = this.fullyLoaded = true;
      }     
      const messages = data.data
      var newMessages = messages.map(message => {
        const time = message.time;
        return new ChatMessage(message.group_message_id, message.sender_id, message.department_id, time, message.message_body, message.name,
          message.deptname);
      })
      this.messages = [...newMessages, ...this.messages];
      this.orderByDate(this.messages);
      this.page++;
      if(newMessages.length < 10){
        this.fullyLoaded = true;
      }
      
    
    });
  }
  
     
  orderByDate(messages: ChatMessage[]): ChatMessage[] {
    return messages.sort((a, b) => {
      return +a.time - +b.time;
    });
  }

  

  formatTime(date: Date): string {
    const hour: string =
      date.getHours().toString().length === 1
        ? `0${date.getHours().toString()}`
        : date.getHours().toString();
    const minutes: string =
      date.getMinutes().toString().length === 1
        ? `0${date.getMinutes().toString()}`
        : date.getMinutes().toString();
    return `${hour}:${minutes}`;
  }

  onSubmit(): void {

    if(this.text !== ' '){
      this.chatGroupService.sendGroupMessage(this.department.department_id, this.user.id, this.text)
      .subscribe((data) =>{
        let messageToSend = new ChatMessage(data.response, this.user.id, this.department.department_id, new Date(), this.text, this.user.name, this.department.name)
        this.messages.push(messageToSend);
        setTimeout(() => {
        this.ScrollToBottomWithAnim();
        });
        this.sendGroupMessage(messageToSend);
        this.text = '';
      });
    }
  }

  getDepartmentName(message: ChatMessage): string {
    if(message.department_id !== this.department.department_id){
      return '- ' + message.department_name;
    }else{
      return '';
    }
  }

  groupConnection(){
    this.socketIoService.groupConnection(this.department.department_id);
  }

  sendGroupMessage(message: ChatMessage): void{
    this.userService.getUserById(message.sender).subscribe((user) => {
      message.department_id = user.data.department_id;
      this.departmentService.getDepartment(message.department_id).subscribe((department) => {
        message.department_name = department.data.name;
        this.socketIoService.groupMessage(message);
      }); 
    });        
  }

  ScrollToBottom() {
    this.content.scrollToBottom(0);
  }

  ScrollToBottomWithAnim() {
    this.content.scrollToBottom(500);
  }

}
