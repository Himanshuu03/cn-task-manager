import { NgClass, NgFor,NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { TodoEditFormComponent } from "../todo-edit-form/todo-edit-form.component";

interface Todo {
  id: number;
  title: string;
  desc: string;
  active: number;
  priority: number;
  dueDate: string;
}

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [NgFor, NgClass, NgIf, TodoEditFormComponent],
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnChanges {
  @Input() newTodo!: Todo;

  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  edit:Boolean = false;
  editedTodo :Todo = {
    id: 0,
    title: '',
    desc: '',
    active: 0,
    priority: 0,
    dueDate: ''
  }
  constructor() {
    if (typeof localStorage !== 'undefined') {
      const storedTodos = localStorage.getItem('todos');
      if (storedTodos) {
        this.todos = JSON.parse(storedTodos);
      }
      this.filteredTodos = this.todos;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['newTodo'] && changes['newTodo'].currentValue) {
      const todo = changes['newTodo'].currentValue;
      if (this.isValidTodo(todo)) {
        this.addTodoToList(todo);
      }
    }
  }

  isValidTodo(todo:Todo): boolean {
    return !!this.newTodo.title &&
           !!this.newTodo.desc &&
           !!this.newTodo.dueDate &&
           this.newTodo.priority !== undefined;
  }

  addTodoToList(todo: Todo) {
    this.todos.push(todo);
    this.filteredTodos = this.todos;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  }

  deleteTodo(todo: Todo) {
    this.edit = false;
    const index = this.todos.indexOf(todo);
    if (index > -1) {
      this.todos.splice(index, 1);
      this.filteredTodos = this.todos;
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('todos', JSON.stringify(this.todos));
      }
    }
  }

  sortTodosByPriority(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const sortOption = parseInt(selectElement.value, 10);
    console.log(sortOption);
    console.log(this.todos);
    switch(sortOption) {
      case 0:
        this.filteredTodos = this.todos;
        break;
      case 1: 
        this.filteredTodos = this.todos.filter(todo => todo.priority == 1);
        break;
      case 2:
       this.filteredTodos = this.todos.filter(todo => todo.priority == 2);
        break;
      case 3: 
        this.filteredTodos = this.todos.filter(todo => todo.priority == 3);
        break;
      case 4: 
        this.todos.sort((a, b) => a.priority - b.priority);
        this.filteredTodos = this.todos;
        break;
      case 5:
        this.todos.sort((a, b) => b.priority - a.priority);
        this.filteredTodos = this.todos;
        break;
      default:
        break;
    }

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  }

  sortTodosByDueDate() {
    this.todos.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    this.filteredTodos = this.todos;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  }

  filterTodosByStatus(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const filterOption = parseInt(selectElement.value, 10);
    switch(filterOption) {
      case 0:
        this.filteredTodos = this.todos.filter(todo => todo.active == 0);
        break;
      case 1:
        this.filteredTodos = this.todos.filter(todo => todo.active == 1);
        break;
      case 2:
        this.filteredTodos = this.todos;
        break;
      default:
        break;
    }
  }

  toggleTodoStatus(todo: Todo) {
    todo.active = todo.active == 1 ? 0 : 1;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  }
  editTodo(todo: Todo) {
    if(this.edit){
      alert('Please finish editing the current task before editing another task');
    }else{
      this.edit = true;
      this.editedTodo = todo;
    }
  }
  cancelEdit(edit:Boolean){
    this.edit = edit;
  }

}
