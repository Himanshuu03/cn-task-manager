import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
interface Todo {
  id: number;
  title: string;
  desc: string;
  active: number;
  priority: number;
  dueDate: string;

}
@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css'
})
export class TodoFormComponent {
  @Output() addTodo:EventEmitter<Todo> = new EventEmitter();
  newTodo: Todo = {
    id: 0,
    title: '',
    desc: '',
    active: 0,
    priority: 0,
    dueDate: ''
  };
  validateForm(): boolean {
    return !!this.newTodo.title &&
           !!this.newTodo.desc &&
           !!this.newTodo.dueDate &&
           this.newTodo.priority !== undefined;
  }
  resetForm() {
    this.newTodo = {
      id: 0,
      title: '',
      desc: '',
      active: 0,
      priority: 0,
      dueDate: ''
    };
  }
  addTask(){
    if (!this.validateForm()) {
      alert('Please fill out all fields.');
      return;
    }
    this.addTodo.emit(this.newTodo);
    this.resetForm();
  } 
}
