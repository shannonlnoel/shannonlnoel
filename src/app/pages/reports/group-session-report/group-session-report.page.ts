import { Component, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { BookingService } from 'src/app/services/booking/booking.service';
import { ReportService } from 'src/app/services/report/report.service';

@Component({
  selector: 'app-group-session-report',
  templateUrl: './group-session-report.page.html',
  styleUrls: ['./group-session-report.page.scss'],
})
export class GroupSessionReportPage implements ViewWillEnter {

  bookings: any [] = [];
  tempBookings: any [] = [];

  loading = true;
  noresults = false;

  constructor(public reportService: ReportService, public bookingService: BookingService) { }

  ionViewWillEnter() {
    console.log("Entered Booking Report")
    this.bookingService.fetchBookingEvent.subscribe(()=>{
      this.reportService.getAllBookingReport().subscribe(data => {
        console.log(data.result);
        //this.tempBookings = data.result;
        this.bookings = data.result;
        this.bookings = this.bookings.filter(x => x.bookingAttendance.length > 0);
        this.loading = false;
        if (this.bookings.length === 0){
          this.noresults = true;
        }
      });
    })

    this.bookingService.fetchBookingEvent.emit();
  }

  download() {
    let Data = document.getElementById('htmlData')!;
    html2canvas(Data).then((canvas) => {
      let fileWidth = 290;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;

      const contentDataURL = canvas.toDataURL('image/png');

      const PDF = new jsPDF({
        orientation: 'l',
        unit: 'mm',
        format: 'a4'
      });

      // PDF.setFontSize(30)
      // PDF.text('Client Progress Report', 10, 10);

      const topPosition = 20;
      const leftPosition = 5;

      PDF.addImage(contentDataURL, 'PNG', leftPosition, topPosition, fileWidth, fileHeight);
      PDF.save('Income Report.pdf');
    });
  }

}
