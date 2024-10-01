import { Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { BoardComponent } from './board/board.component';
import { SecurityService } from './security.service';
import { inject } from '@angular/core';

export const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'home', component: BoardComponent },
];
