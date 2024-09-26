import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResultService } from '../service/result.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css'],
})
export class AddEditComponent implements OnInit {
  myForm: FormGroup = new FormGroup({
    rollNo: new FormControl('',[Validators.required]),
    studentName: new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z ]+$')]),
    dateOfBirth: new FormControl('',[Validators.required]),
    score: new FormControl('',[Validators.required]),
  });
  path: string = '';
  rollNo: number = 0;
  result: any; 
  alert:boolean=false;

  get rollVal(){
    return this.myForm.get('rollNo');
  }
  get nameVal(){
    return this.myForm.get('studentName');
  }
  get dobVal(){
    return this.myForm.get('dateOfBirth');
  }
  get scoreVal(){
    return this.myForm.get('score');
  }
  constructor(
    private route: ActivatedRoute,
    private resultService: ResultService,
    private router: Router
  ) {
    console.log('edit component');
  }

  action:string='';
  ngOnInit() {
    this.path = this.route.snapshot.url[0].path;
    if (this.path === 'edit') {
      this.action='Edit';
      let param = this.route.snapshot.paramMap.get('rollNo') || '';
      this.rollNo = parseInt(param);
      this.resultService.getResultWithRollno(this.rollNo).subscribe(
        (response) => {
          console.log(response);
          this.result = response;
          this.result = this.result.data;
          this.myForm.get('rollNo')?.setValue(this.result.rollNo);
          this.myForm.get('rollNo')?.disable();
          this.myForm.get('studentName')?.setValue(this.result.studentName);
          this.myForm.get('dateOfBirth')?.setValue(this.result.dateOfBirth);
          this.myForm.get('score')?.setValue(this.result.score);
        },
        (err) => console.log(err)
      );
    }
    else{
      this.action='Add';
    }
  }

  closeAlert(){
    this.alert=false
  }

  onSubmit(form: FormGroup) {
    if (this.path === 'edit') {
      let data = form.getRawValue();
      data.id = data.rollNo;
      this.resultService.updateResult(data).subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['/home']);
        },
        (err) => {
          console.log(err);
        }
      );
    } else if (this.path === 'new') {
      let data = form.value;
      data.id = data.rollNo;
      this.resultService.saveResult(data).subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['/home']);
        },
        (err) => {
          this.alert=true;
          console.log(err);
        }
      );
    }
  }
}
