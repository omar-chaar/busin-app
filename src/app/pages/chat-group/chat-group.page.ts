import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatGroupService } from 'src/app/services/chat-group/chat-group.service';
import { ChatMessageService } from 'src/app/services/chat-message/chat-message.service';
import { UserService } from 'src/app/services/user/user.service';
import { ChatGroup } from 'src/model/classes/ChatGroup';
import { ChatMessage } from 'src/model/classes/ChatMessage';
import { User } from 'src/model/classes/User';

@Component({
  selector: 'app-chat-group',
  templateUrl: './chat-group.page.html',
  styleUrls: ['./chat-group.page.scss'],
})
export class ChatGroupPage implements OnInit {

  chat: ChatGroup;
  messages: ChatMessage[];
  user: User;
  text: string;

  constructor(private _router: Router, private route: ActivatedRoute,
    private chatGroupService: ChatGroupService, private userService: UserService,
    private chatMessageService: ChatMessageService) { }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
  }

  goBack(): void {
    this._router.navigateByUrl('/tabs/contacts')
  }

  onSubmit(): void {

  }


}
