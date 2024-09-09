import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from '../services/todo.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent implements OnInit {
  todoForm$: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
  });
  todos$: Observable<Todo[]> | undefined;

  constructor(private todoService: TodoService) {}
  ngOnInit(): void {
    this.todos$ = this.todoService.viewAll();
  }
  create() {
    if (this.todoForm$.invalid) {
      return;
    }
    let todo: Todo = {
      id: '',
      name: this.todoForm$.controls['name'].value,
      isDone: false,
      createdAt: new Date(),
    };

    this.todoService
      .addTodo(todo)
      .then(() => alert('Successfully added'))
      .catch((err) => alert(err['message']));
  }
}
