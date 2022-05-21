import { Injectable } from '@angular/core';
import { Announcement } from 'src/model/classes/Announcement';
import { User } from 'src/model/classes/User';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {


  constructor(private userService: UserService) {

   }

}
