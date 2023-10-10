import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-bodypart',
  templateUrl: './select-bodypart.component.html',
  styleUrls: ['./select-bodypart.component.scss']
})
export class SelectBodypartComponent {
  public bodyPart:string;
  constructor(private router:Router){}
  
  navigateToTrainingDiscipline(bodyPart:string){
    this.bodyPart=bodyPart;
    this.router.navigate(["home/workout/selectTrainingDiscipline"]);
  }

}