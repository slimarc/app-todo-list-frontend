import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Task } from 'src/app/model/task';
import { CrudService } from "src/app/service/CrudService";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskObj : Task = new Task();
  taskArrey : Task[] = [];
  addTaskValue : string = ''; 
  editTaskValue : string = '';
  todo: any;

  constructor(private crudService : CrudService) { }

  ngOnInit(): void {
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.todo = Boolean.valueOf();
    this.taskObj = new Task();
    this.taskArrey = [];
    this.getAllTask();
  }
  
  getAllTask() {
    this.crudService.getAllTask().subscribe(res => {
      this.taskArrey = res;
      console.log(this.taskArrey);
    }, err => {
      alert("Não foi possível encontrar a lista de tarefas");
    });
  }

  addTask() {
    this.taskObj.Titulo = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
      this.addTaskValue = '';
    }, err => {
      alert("Insira a tarefa no campo ao lado");
    })
  }

  editTask() {
    this.taskObj.Titulo = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
    }, err=> {
      alert("Falha na atualização de tarefa");
    })
  }

  completTask() {
    this.todo.Completado = this.todo; 
    this.crudService.completTask(this.todo).subscribe(res => {
      this.ngOnInit();
      console.log(this.todo.Completado);
    }, err=> {
      alert("Falha na conclusão de tarefa");
    })
  }

  deleteTask(etask : Task) {
    this.crudService.deleteTask(etask).subscribe(res => {
      this.ngOnInit();
    }, err=> {
      alert("Falha em remover tarefa");
    });
  }

  call(etask : Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.Titulo;
  }

}
