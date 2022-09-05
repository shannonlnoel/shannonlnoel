import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RepoService } from 'src/app/services/repo.service';

import { Chart, ChartConfiguration, BarController, BarElement, PointElement, LinearScale, Title, CategoryScale  } from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-member-report',
  templateUrl: './member-report.page.html',
  styleUrls: ['./member-report.page.scss'],
})
export class MemberReportPage implements AfterViewInit {

  clients : any[] = [];
  @ViewChild('barCanvas') private barCanvas: any;
  barChart: any;
  switch = false;
  loading = true;

  constructor(private repo : RepoService, private global : GlobalService) { }

  ngAfterViewInit(): void {
    Chart.register(BarController, BarElement, PointElement, LinearScale, Title, CategoryScale);
  }
  
  ngOnInit() {
    this.global.nativeLoad("Loading...");
    this.repo.getAllClients().subscribe({
      next: (data) => {
        data.forEach((el : any) => {
          this.clients.push({
            ...el.client,
            ...el.user
          })
        });
        console.log(this.clients);
        this.calculateAges();
        this.loading = false;
      }
    }).add(() => {
      this.global.endNativeLoad();
    });

  }

  calculateAges() {
    this.clients.forEach((el : any) => {
      const dob = new Date(el.dob * 1000);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      el.age = age;
    }
    );
    console.log(this.clients);

    this.clients.sort((a, b) => {
      return a.age - b.age;
    });

    let ageShift = 9;

    //take last age:
    const lastAge = this.clients[this.clients.length - 1].age;
    const range = Math.trunc(lastAge / 10)+1;
    
    //array of ages size range:
    const bars = new Array(range);

    this.clients.forEach((el : any) => {
      const age = el.age;
      const index = Math.trunc(age / 10);
      if(bars[index] == undefined) {
        bars[index] = 1;
      } else {
        bars[index]++;
      }
    });

    bars.forEach((el : any, index : number) => {
      console.log(index * 10, el);
    });

    if(this.barChart != undefined) {
      this.barChart.destroy();
    }

    for (let i = 0; i < bars.length; i++) {
      if(bars[i] == undefined) {
        bars[i] = 0;
      }
    }

    const labels = new Array(range);
    for (let i = 0; i < labels.length; i++) {
      labels[i] = `${i * 10}-${(i * 10) + 9}`;
    }

    //use this to fake data:
    // for (let i = 0; i < 8; i++) {
    //   const r = Math.random() * (40 - 0) + 0;
    //   bars[i] = r;
    //   labels[i] = `${i *  10}-${(i * 10) + 9}(50%)`;
    // }

    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          data: bars,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          // tooltip: {
          //   enabled: true,
          //   callbacks: {
          //     footer: (item) => {
          //       return 'test'
          //     }
          //   }
          // }
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            title: {
              text: 'Number of users',
              display: true
            },
            beginAtZero:true,
            ticks: {
              stepSize: 1,
            },
          },
          x: {
            title : {
              text: 'Age Ranges (Years)',
              display: true
            }
          }
        }
      }
    });
  }
  
  download() {
    let Data = document.getElementById('htmlData');
    console.log(Data);
    html2canvas(Data).then((canvas) => {
      let fileWidth = 290;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      
      const PDF = new jsPDF({
        orientation: 'l',
        unit: 'mm',
        format: 'a4'
      });

      PDF.setFontSize(30)
      PDF.text('Age Distribution of Clients', 10, 10);
      
      const topPosition = 25;
      const leftPosition = 5;
      console.log(contentDataURL);
      PDF.addImage(contentDataURL, 'PNG', leftPosition, topPosition, fileWidth, fileHeight);
      PDF.save('Client Report.pdf');
    });
  }
}
