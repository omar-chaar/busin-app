import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-announcement',
  templateUrl: './new-announcement.page.html',
  styleUrls: ['./new-announcement.page.scss'],
})
export class NewAnnouncementPage implements OnInit {

  title: string
  content: string

  constructor(private router: Router) { }

  ngOnInit() {
  }

  handleSubmit():void {
    console.log('announcement sent in!')
    this.router.navigateByUrl('/tabs/announcements')
  }

}
