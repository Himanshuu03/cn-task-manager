import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./MyComponents/navbar/navbar.component";
import { TodoFormComponent } from "./MyComponents/todo-form/todo-form.component";
import { TodosComponent } from "./MyComponents/todos/todos.component";

interface Todo {
  id: number;
  title: string;
  desc: string;
  active: number;
  priority: number;
  dueDate: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, TodoFormComponent, TodosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  newTodo = {
    id: 0,
    title: '',
    desc: '',
    active: 0,
    priority: 0,
    dueDate: ''
  }
  title = 'taskmanager';
  addNewTodo(todo:Todo){
    this.newTodo = todo;
  }
}
