import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AnnouncementService, IAnnouncement } from 'src/app/services/announcement/announcement.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-new-announcement',
  templateUrl: './new-announcement.page.html',
  styleUrls: ['./new-announcement.page.scss'],
})
export class NewAnnouncementPage implements OnInit {

  @Input() sortByDate;
  @Input() announcements: IAnnouncement[];
  title: string
  content: string

  constructor(private router: Router, private modalController: ModalController, private validationService: ValidationService,
    private toastService: ToastService, private announcementService: AnnouncementService) { }

  ngOnInit() {
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  handleSubmit():void {
    if(this.validationService.validateLength('Title', this.title, 50, 3)){
      if(this.validationService.validateLength('Content', this.content, 300, 25)){
        const announcement = this.announcementService.insertAnnouncement(this.title, this.content)
        this.toastService.presentToast('Announcement published!', 3000, 'success')
        this.announcements.push(announcement)
        this.sortByDate(this.announcements)
        this.dismiss()
      }
    }
  }

}
