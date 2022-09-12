import { Component, OnInit} from '@angular/core';
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
  addTaskValue : string | undefined; 
  editTaskValue : string | undefined;
  completeTaskValue : boolean = false;

  constructor(private crudService : CrudService) { }

  ngOnInit(): void {
    this.editTaskValue = undefined;
    this.addTaskValue = undefined;
    this.completeTaskValue = false;
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
      this.addTaskValue = undefined;
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

  deleteTask(etask : Task) {
    this.crudService.deleteTask(etask).subscribe(res => {
      this.ngOnInit();
    }, err=> {
      alert("Falha em remover tarefa");
    });
  }

 completTask() {
    this.taskObj.Completado = this.completeTaskValue; 
    this.crudService.completTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
    }, err=> {
      alert("Falha na conclusão de tarefa");
    })
  }

  call(etask : Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.Titulo;
    this.completeTaskValue = etask.Completado;
  }

}
