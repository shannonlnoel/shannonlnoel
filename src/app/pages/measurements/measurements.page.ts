import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global/global.service';
import { RepoService } from 'src/app/services/repo.service';
import { StoreService } from 'src/app/services/storage/store.service';
import { AddComponent } from './add/add.component';

import { Chart, ChartConfiguration, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale  } from 'chart.js';
import { isThisHour } from 'date-fns';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.page.html',
  styleUrls: ['./measurements.page.scss'],
})
export class MeasurementsPage implements AfterViewInit {

  lineChart: any;
  @ViewChild('lineCanvas') lineCanvas: any;

  measurementCount! : any;

  measurements : any[] = [];
  measurementsOriginal : any[] = [];

  email! : any;

  selected = false;

  height! : any;
  avgWeight! : any;
  avgFatPercentage! : any;
  avgWaist! : any;

  lower! : any;
  upper! : any;

  labels : any[] = [];
  data : any[] = [];

  results = false;

  constructor(private storage : StoreService, private modalCtrl : ModalController, private global : GlobalService, private repo : RepoService) { }

  ngAfterViewInit(): void {
    Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);
  }

  ngOnInit() {

    this.storage.getKey('token').then((token) => {
      const decode = this.global.decodeToken(token);
      this.email = decode.sub;
      this.fetchData(this.email).then(() => {});
    });



  }

  fetchData(email : string) : Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.measurements = [];
      this.measurementsOriginal = [];
      this.repo.getClientMeasurements(email).subscribe((data : any) => {

        this.measurementCount = data.measurement.length;
        data.measurement.forEach(element => {
          this.measurements.push(element);
        });

        //sort by date:
        this.measurements.sort((a, b) => { return a.date - b.date });

        //assign to original array:
        this.measurementsOriginal = this.measurements;

        // console.log(this.measurements);
        this.global.fetchMeasurementFlag = false;
        resolve(true);

      });
    })
  }

  setLow(l : any) {
    const d = new Date(l.value);
    this.lower = Math.trunc(d.getTime() / 1000);
  }

  setHigh(h : any) {
    const d = new Date(h.value);
    this.upper = Math.trunc(d.getTime() / 1000);
  }

  analyze(data : any[]) {
    let height = 0;
    let avgWeight = 0;
    let avgFat = 0;
    let avgWaist = 0;

    data.forEach(el => {
      height += el.height;
      avgWeight += el.weight;
      avgFat += el.bodyFate;
      avgWaist += el.waist;
    });

    this.measurementCount = data.length;
    this.height = Math.trunc(height / this.measurementCount);
    this.avgWaist = Math.trunc(avgWaist / this.measurementCount);
    this.avgWeight = Math.trunc(avgWeight / this.measurementCount);
    this.avgFatPercentage = Math.trunc(avgFat / this.measurementCount);

    // console.log(this.height);
    // console.log(this.avgWaist);
    // console.log(this.avgWeight);
    // console.log(this.avgFatPercentage);

  }

  callGenerate() {
    if (this.global.fetchMeasurementFlag) {
      this.fetchData(this.email).then(() => {
        this.generate();
        // console.log('fetched new data from the api')
      });
    } else {
      this.generate();
    }
  }

  download() {
    let Data = document.getElementById('htmlData')!;
    html2canvas(Data).then((canvas) => {
      let fileWidth = 210;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;

      const contentDataURL = canvas.toDataURL('image/png');

      const PDF = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'
      });

      PDF.setFontSize(30)
      PDF.text('Client Progress Report', 10, 10);

      const topPosition = 25;
      const leftPosition = 5;

      PDF.addImage(contentDataURL, 'PNG', leftPosition, topPosition, fileWidth, fileHeight);
      PDF.save('Client Report.pdf');
    });
  }

  generate() {
    if (this.lower == null || this.upper == null) {
      this.global.showAlert("Date range is required.");
      return;
    }

    //check range placement:
    if (this.lower > this.upper) {
      this.global.showAlert("From date may not exceed To date.", "Invalid Dates!");
      return;
    }

    this.selected = true;
    // console.log(this.lower);
    // console.log(this.upper);
    //filter the mes.
    this.measurements = [];
    this.measurementsOriginal.map((el : any) => {
      if (this.lower <= el.date && el.date <= this.upper) {
        this.measurements.push(el);
      }
    });

    this.analyze(this.measurements);

    // console.log('graph data', this.measurements);
    this.labels = [];
    this.data = [];
    this.measurements.forEach((mes : any) => {
      const d = new Date(mes.date * 1000);
      let date = d.getFullYear().toString();
      if (d.getMonth() + 1 < 10)
        date += '/0' + (d.getMonth() + 1).toString();
      else date += '/' + (d.getMonth() + 1).toString();
      if (d.getDate() < 10)
        date += '/0' + (d.getDate()).toString();
      else date += '/' + (d.getDate()).toString();

      this.labels.push(date);
      this.data.push(mes.weight);

    });

    if (this.lineChart != undefined)
      this.lineChart.destroy();

    if (this.measurements.length == 0) {
      this.results = false;
      return;
    }

    this.results = true;

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Weight',
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.data,
            spanGaps: false,
          }
        ]
      }
    });

    this.selected = true;

  }

  async add() {
    const modal = await this.modalCtrl.create({
      component: AddComponent
    });
    await modal.present();
    modal.onDidDismiss().then((data : any) => {
      //this.global.showToast('Measurement added successfully.');
    });

  }

}
