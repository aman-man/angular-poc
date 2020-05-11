import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  by = '@man'
  officialSite: String = 'abc@timepass.com';
  officialContactNo: String = '+1234567890';
  galanceDetail: String = `Don't hesitate to share you views & experience to ${this.by}.`

  constructor() { }

  ngOnInit(): void {
  }

}
