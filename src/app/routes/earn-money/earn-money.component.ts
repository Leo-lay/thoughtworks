import { Component, OnInit } from '@angular/core';
import { EarnMoneyService } from './earn-money.service';

@Component({
  selector: 'app-earn-money',
  templateUrl: './earn-money.component.html',
  styleUrls: ['./earn-money.component.css']
})
export class EarnMoneyComponent implements OnInit {

  inputValues = [];

  //
  fileContent = '';

  //
  qAMap = new Map();

  constructor(
    public earnMoneyServ: EarnMoneyService) { }

  ngOnInit() {
    // this.startUpServ.startUp();
    this.earnMoneyServ.getMockData();
  }
  /**
   * 文件选择时间
   */
  handleFiles(e) {
    console.log(e);
    this.test();
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    const reader = new FileReader();
    reader.onload = (res) => {
      console.log(reader.result);
      this.inputValues = reader.result.split('\n');
      this.fileContent = reader.result;
      console.log(this.inputValues);
      this.earnMoneyServ.parseInput(reader.result);
      e.target.value = '';
    };
    reader.readAsText(file);
  }

  showQA() {
    // this.earnMoneyServ.parseInput(this.fileContent);
    this.qAMap = this.earnMoneyServ.dealQuestion();
    const qAlist = this.earnMoneyServ.questionMap;
    console.log(qAlist.size);
  }

  test() {
    const m = new Map();
    m.set('a', 1111);
    console.log(m);
    m.set('a', 1111);
    console.log(m.keys());
  }
}
