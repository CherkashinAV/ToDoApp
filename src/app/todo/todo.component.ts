import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Task } from '../model/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todoForm !: FormGroup;

  tasks: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];

  editable !: boolean;
  editIndex !: number;
  editArrType !: string

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item: ['', Validators.required]
    })
  }

  addTask(){
    this.tasks.push({
      description: this.todoForm.value.item,
      done: false
    });
    this.todoForm.reset();
  }

  deleteTask(i: number, type: string) {
    type === 'task' ? this.tasks.splice(i, 1) : this.inProgress.splice(i, 1);
  }

  onEditTask(item: Task, i: number, type: string) {
    this.todoForm.controls['item'].setValue(item.description);
    this.editable = true;
    this.editIndex = i;
    this.editArrType = type;
  }

  updateTask(i: number, type: string) {
    this.deleteTask(i, type);
    this.addTask();
    this.editable = false;
  }

  cancelEditTask() {
    this.editable = false;
  }

  drop (event: CdkDragDrop<Task[]>): void{
    if (event.container === event.previousContainer) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else {
      transferArrayItem(
        event.previousContainer.data, 
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

}
