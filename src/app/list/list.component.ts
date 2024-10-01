import { Component } from '@angular/core';
import { TaskService } from '../task.service';
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  providers: [TaskService],
})
export class ListComponent {
  constructor(private task: TaskService) {
  
  }
}
