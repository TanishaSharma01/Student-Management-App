import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResultService } from '../service/result.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  myForm: FormGroup = new FormGroup({
    rollNo: new FormControl('',[Validators.required]),
    dateOfBirth: new FormControl('',[Validators.required]),
  });
  result: any = null;
  alert:boolean=false;

  get rollVal(){
    return this.myForm.get('rollNo');
  }

  constructor(private resultService: ResultService) {}
  ngOnInit(): void {}

  closeAlert(){
    this.alert=false
  }

  onSubmit(form: FormGroup): void {
    const { rollNo, dateOfBirth } = form.value;
    this.resultService.getResult(rollNo, dateOfBirth).subscribe(
      (response) => {
        this.result = response;

        this.result = this.result.data;
        console.log(this.result);
      },
      (err) => {
        console.log(err);
        this.alert=true
        this.result = null;
      }
    );
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 500);
  }
}
