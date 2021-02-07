import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ScoreService } from 'src/app/score-service.service';
import { ScoreFormModel } from 'src/models/score-form-model';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})

export class ContentComponent implements OnInit {
  scoreForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    surname: new FormControl(''),
    phone: new FormControl(''),
    city: new FormControl(''),
    income: new FormControl(''),
  })

  incomeList = [
    {key:'0-2999TL', value:1},
    {key:'3000TL-4999TL', value:2},
    {key:'5000TL-7999TL', value:3},
    {key:'8000TL-11999TL', value:4},
    {key:'12000TL ve üzeri', value:5},
  ];

  cities = [
    {key:'Adana', value:1},
    {key:'Adıyaman', value:2},
    {key:'Afyonkarahisar', value:3},
    {key:'Ağrı', value:4},
    {key:'Amasya', value:5},
    {key:'Ankara', value:6},
    {key:'Antalya', value:7},
    {key:'Artvin', value:8},
    {key:'Aydın', value:9},
    {key:'Balıkesir', value:10},
  ]

  searching = false;
  scorePoint = null;

  constructor(private scoreService: ScoreService) {
   }

  ngOnInit(): void {
  }

  calculate(){
    this.searching = true;
    let formParams:ScoreFormModel = this.scoreForm.value;
    this.scoreService.calculateScore(
      formParams.name,
      formParams.surname,
      formParams.id,
      formParams.phone,
      formParams.city,
      formParams.income
      ).subscribe((response) => {
        console.log(response);
        this.searching = false;
        if(response.success){
          this.scorePoint = response.data;
        }
        else{
          alert(response.message);
          console.error("Api içinde bir hata alındı: ", response.message)
        }
      },(error) => {
        alert("Hata oluştu. Lütfen tekrar deneyiniz.");
        this.searching = false;
        this.scorePoint = null;
        console.error(error);
      })
  }

  clear(){
    this.scoreForm.reset();
    this.scorePoint = null;
    this.searching = false;
  }
}
