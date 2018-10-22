import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { TaskManagerService } from '../services/taskmanager.service';
import { TaskVO } from '../task';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-updatetask',
  templateUrl: './updatetask.component.html',
  styleUrls: ['./updatetask.component.css']
})
export class UpdatetaskComponent implements OnInit {
  public task :string;
  @Input('taskName') taskName : string;
  parentTaskName : string;
  startDate : string;
  endDate: string;
  priority : string;
  selectedId: string;
  @Input() updateTaskForm = new FormGroup({
      taskName: new FormControl(),
      parentTaskName: new FormControl(),
      priority:new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl()
    });
  
  constructor(public service: TaskManagerService,  private route: ActivatedRoute,  private router : Router){
   
  }
 
  ngOnInit() {

    this.route.params.subscribe(params => {
      // this.sub = new  TaskVO();
      this.selectedId = params['id']; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
      // this.updateTaskForm.get('taskName').valueChanges.subscribe(data => this.taskName = data);
   });

    console.log(this.task);
  //  this.updateTaskForm.get("taskName").setValue("sdfgsdsdgsgsfsdg");
   this.updateTaskForm.get("parentTaskName").setValue("this.sub.parentTask");
   this.updateTaskForm.get("startDate").setValue("2001-11-11");
   this.updateTaskForm.get("endDate").setValue("2001-11-11");
   this.updateTaskForm.get("priority").setValue("5");
  }
  
  
  newTask = new TaskVO();
  onSubmit(){
    this.newTask.task = this.updateTaskForm.get("taskName").value
    this.newTask.taskId = parseInt(this.selectedId);
    this.newTask.parentTask = this.updateTaskForm.get("parentTaskName").value
    this.newTask.priority = this.updateTaskForm.get("priority").value
    this.newTask.startDate = this.updateTaskForm.get("startDate").value
    this.newTask.endDate = this.updateTaskForm.get("endDate").value
    console.log(this.newTask);
    this.service.updateTaskInfo(this.newTask);
  }

  cancel(){
    this.router.navigateByUrl("/viewTask");
  }
  ngAfterViewInit(): void {
    
//     this.updateTaskForm.get('parentTaskName').statusChanges.subscribe(data => this.usrNameStatus = data);

const req = this.service.getTasksById(this.selectedId);
console.log(req);
} 
}
