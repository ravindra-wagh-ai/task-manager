import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TaskService } from '../task.service';
import {
  ErrorStateMatcher,
  provideNativeDateAdapter,
} from '@angular/material/core';
import {
  MatDialogContent,
  MatDialogActions,
  MatDialogTitle,
  MatDialogClose,
} from '@angular/material/dialog';
import {
  MatCalendarCellClassFunction,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { Task } from '../models/task';
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-task',
  standalone: true,
  providers: [provideNativeDateAdapter(MY_FORMATS)],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatDialogClose,
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {
  matcher = new MyErrorStateMatcher();
  taskForm: FormGroup;
  constructor(private task: TaskService, private formBuilder: FormBuilder) {
    this.taskForm = this.formBuilder.group({
      title: new FormControl('', [
        Validators.required,
        Validators.nullValidator,
      ]),
      description: new FormControl(''),
      deadline: new FormControl('', [
        Validators.required,
        Validators.nullValidator,
      ]),
    });
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }

    return '';
  };
  async onSubmit() {
    let title = this.taskForm.controls['title'].value;
    let description = this.taskForm.controls['description'].value;
    let deadline = this.taskForm.controls['deadline'].value;
    console.log({
      title: title,
      description: description,
      deadline: deadline.toISOString().split("T")[0],
    });
    if (deadline !== '') {
      let task: Task = {
        title: title,
        description: description,
        deadline: deadline.toISOString().split("T")[0],
      };
      let result = await this.task.add(task);
      console.log(result);
    }
  }
}
