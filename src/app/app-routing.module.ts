import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo:'login',
    pathMatch: 'full'
  },    
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'message/:id',
    loadChildren: () => import('./pages/message/message.module').then( m => m.MessagePageModule)
  },
  {
    path: 'profile/:id',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'join',
    loadChildren: () => import('./pages/join/join.module').then( m => m.JoinPageModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./pages/create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'user-login',
    loadChildren: () => import('./pages/user-login/user-login.module').then( m => m.UserLoginPageModule)
  },
  {
    path: 'recovery',
    loadChildren: () => import('./pages/recovery/recovery.module').then( m => m.RecoveryPageModule)
  },
  {
    path: 'voice-call',
    loadChildren: () => import('./pages/voice-call/voice-call.module').then( m => m.VoiceCallPageModule)
  },
  {
    path: 'new-announcement',
    loadChildren: () => import('./pages/new-announcement/new-announcement.module').then( m => m.NewAnnouncementPageModule)
  },
  {
    path: 'chat-group/:id',
    loadChildren: () => import('./pages/chat-group/chat-group.module').then( m => m.ChatGroupPageModule)
  },
  {
    path: 'edit-users',
    loadChildren: () => import('./pages/edit-users/edit-users.module').then( m => m.EditUsersPageModule)
  },
  {
    path: 'edit-departments',
    loadChildren: () => import('./pages/edit-departments/edit-departments.module').then( m => m.EditDepartmentsPageModule)
  }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
