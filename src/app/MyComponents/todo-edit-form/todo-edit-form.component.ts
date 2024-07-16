import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  selector: 'app-todo-edit-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo-edit-form.component.html',
  styleUrl: './todo-edit-form.component.css'
})
export class TodoEditFormComponent {
  @Output() editCancel:EventEmitter<Boolean> = new EventEmitter();
  @Input() editedTodo !: Todo;
  @Input() todos !: Todo[];

  cancelEdit(){
    this.editCancel.emit(false);
  }
  newTodo: Todo = {
      id: 0,
      title:'',  
      desc: '',
      active: 0,
      priority: 0,
      dueDate: ''
  };
  ngOnInit() {
    this.newTodo = { ...this.editedTodo };
  }
  validateForm(): boolean {
    return !!this.newTodo.title &&
           !!this.newTodo.desc &&
           !!this.newTodo.dueDate &&
           this.newTodo.priority !== undefined;
  }
  editTask(){
    if (!this.validateForm()) {
      alert('Please fill out all fields.');
      return;
    }
    if(localStorage !== undefined){
     this.todos.forEach((todo)=>{
      if(todo.id === this.newTodo.id){
        todo.title = this.newTodo.title;
        todo.desc = this.newTodo.desc;
        todo.dueDate = this.newTodo.dueDate;
        todo.priority = this.newTodo.priority;
        todo.active = this.newTodo.active;
      }
     })
     localStorage.setItem('todos', JSON.stringify(this.todos));
     this.editCancel.emit(false);
    }

  } 
}
