import { Component, inject, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatGridTile } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { SecurityService } from '../security.service';
import { Task } from '../models/task';
import { TaskService } from '../task.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Status } from '../models/status';
import { TaskComponent } from '../task/task.component';
import { StoreService } from '../store.service';
import { MatSidenavModule } from "@angular/material/sidenav";

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    MatGridListModule,
    MatGridTile,
    MatListModule,
    MatCardModule,
    CommonModule,
    MatToolbarModule,
    MatIcon,
    MatButtonModule,
    MatDialogModule,
    MatSidenavModule
  ],
  providers: [SecurityService],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent implements OnInit {
  list?: Task[];
  open_task_list?: Task[];
  inprogress_task_list?: Task[];
  done_task_list?: Task[];

  readonly dialog = inject(MatDialog);
  constructor(
    private _router: Router,
    private security: SecurityService,
    private task: TaskService,
    private store: StoreService
  ) {}
  async ngOnInit(): Promise<void> {
    let token = this.security.token();
    if (token !== null) {
      let authenticated = await this.security.isAuthenticated();
      if (authenticated) {
        let result = await this.task.list();
        this.list = result?.data?.tasks;
        this.open_task_list = this.list?.filter(
          (x) => x.status === Status.OPEN
        );
        this.inprogress_task_list = this.list?.filter(
          (x) => x.status == Status.INPROGRESS
        );
        this.done_task_list = this.list?.filter(
          (x) => x.status === Status.DONE
        );
        this._router.navigate(['/home']);
      } else {
        this._router.navigate(['/signin']);
      }
    } else {
      this._router.navigate(['/signin']);
    }
  }
  newTask() {
    let dialogRef = this.dialog.open(TaskComponent, {
      height: '400px',
      width: '600px',
    });
  }
  signout() {
    this.store.clearData();
    this._router.navigate(['/signin']);
  }
}
