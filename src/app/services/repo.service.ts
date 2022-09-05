/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { identity, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Venue } from 'src/app/models/venue';

import { EmployeeType } from '../models/employeeType';
import { Title } from 'src/app/models/title';
import { QualificationType } from 'src/app/models/qualification-type';
import { Vat } from '../models/vat';
import { SaleItem } from '../models/sale-item';
import { SaleCategory } from 'src/app/models/sale-category';
import { RefundReason } from 'src/app/models/refund-reason';
import { appUser, appUserRegister } from '../models/appUser';
import { ExerciseCategory } from '../models/exercise-category';
import { Qualification } from '../models/qualification';
import { Employee } from '../models/employee';
import { BookingType } from '../models/booking-type';
import { Quote } from '../models/quote';
import { Exercise } from '../models/exercise';
import { WriteOffReason } from '../models/write-off-reason';
import { Lesson } from '../models/lesson';
import { Schedule } from '../models/schedule';
import { Supplier } from '../models/supplier';
import { WriteOff } from '../models/write-off';

@Injectable({
  providedIn: 'root'
})

export class RepoService {
  // base = 'https://bsctest.azurewebsites.net/api/';
  // base = 'http://localhost:5001/api/';
  base = 'https://testbsc.azurewebsites.net/api/';
  AppUserController = 'AppUser/';
  BookingController = 'Booking/'
  BookingTypeController = 'BookingType/';
  VenueController = 'Venue/';
  UserRoleController = 'UserRole/';
  EmployeeTypeController = 'EmployeeType/';
  TitleController = 'Title/';
  QualificationTypeController = 'QualificationType/';
  QualificationController = 'Qualification/';
  VatController = 'Vat/';
  SaleItemController = 'SaleItem/';
  SaleCategoryController = 'SaleCategory/';
  RefundReasonController = 'RefundReason/';
  PermissionController = 'Permission/';
  EmployeeController = 'Employee/';
  ExerciseCategoryController = 'ExerciseCategory/';
  ExerciseController = 'Exercise/';
  WriteOffReasonController = 'WriteOffReason/'
  LessonController = 'Lesson/'
  ScheduleController = 'Schedule/';
  MeasurementController = 'Measurement/';
  ReportController = 'Report/';
  PaymentController= 'Payment/';
  SupplierController= 'Supplier/';
  StockController= 'Stock/';
  WriteOffController= 'WriteOff/';

  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      ContentType: 'application/json'
    }),
  };



  constructor(public http: HttpClient) {
    //CRUDS in this repo file need to be used by subscribing to them in the relevant service.
    //E.g to use getVenues(); it must be subscribed to in the venue service
  }


  //TRAINER REPORT:
  getTrainers() {
    return this.http.get(`${this.base + this.EmployeeController}getalltrainers`, this.httpOptions);
  }

  //Payments
  chargeYOCO(data : any) : Observable<any> {
    return this.http.post(`${this.base + this.PaymentController}charge`, data, this.httpOptions);
  }

  getPayments() : Observable<any> {
    return this.http.get(`${this.base + this.PaymentController}getall`, this.httpOptions);
  }

  getUserRole(token : string) : Observable<any>{
    // console.trace();
    return this.http.get(`${this.base + this.EmployeeController}token`, { headers : new HttpHeaders({'Authorization': 'Bearer ' + token}) });
  }

  //MEASUREMENTS
  addMeasurement(data: any): Observable<any> {
    return this.http.post<any>(`${this.base+this.MeasurementController}add`, data, this.httpOptions);
  }

  getClientMeasurements(email : string) : Observable<any> {
    return this.http.get(`${this.base + this.MeasurementController}getmeasurements?email=${email}`, this.httpOptions);
  }

  //AppUser:
  //-------
  //clients:
  getAllClients(): Observable<any> {
    return this.http.get(`${this.base + this.AppUserController}getallclients`, this.httpOptions);
  }

  getUser(id : string) : Observable<any> {
    return this.http.get(`${this.base + this.AppUserController}getuser?id=${id}`, this.httpOptions);
  }

  deleteClient(id: string): Observable<any> {
    return this.http.delete(`${this.base + this.AppUserController}deleteclient?id=${id}`, this.httpOptions);
  }

  updateClientInformation(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.base+this.AppUserController}updateclient`, data, this.httpOptions);
  }

  uploadIndemnity(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.base+this.AppUserController}uploadindemnity`, data, this.httpOptions);
  }

  //Register
  register(userDetails: appUserRegister) {
    return this.http.post(`${this.base + this.AppUserController}register`,userDetails,this.httpOptions);
  }

  //Login
  login(userDetails: appUser): Observable<any> {
    //console.log(this.http.post(`${this.base + this.AppUserController}login`,userDetails,this.httpOptions));
    return this.http.post(`${this.base + this.AppUserController}login`,userDetails,this.httpOptions);
  }

  quoteEmail(quote: any): Observable<any> {
    return this.http.post(`${this.base + this.AppUserController}quoteEmail`,quote,this.httpOptions)
  }

  //password management
  VerifyOtp(data : any) : Observable<any> {
    return this.http.post(`${this.base + this.AppUserController}verifyotp`, data, this.httpOptions);
  }

  SendOtp(data : any) : Observable<any> {
    return this.http.post(`${this.base + this.AppUserController}sendotp`, data, this.httpOptions);
  }

  ChangePassword(data : any) : Observable<any> {
    return this.http.post(`${this.base + this.AppUserController}changepassword`, data, this.httpOptions);
  }

  SetNewPassword(data : any) : Observable<any> {
    return this.http.post(`${this.base + this.AppUserController}setnewpassword`, data, this.httpOptions);
  }

  CheckPasswordHistory(data : any) : Observable<any> {
    return this.http.post(`${this.base + this.AppUserController}checkpasswordhistory`, data, this.httpOptions);
  }

  makePayment(payment): Observable<any>{
    return this.http.post<any>(`${this.base + this.PaymentController}add`,payment);
  }

  //Venue:
  //------
  //Create
  createVenue(venue: any): Observable<any>{
    return this.http.post<any>(`${this.base+this.VenueController}add`,venue);
  }
  //Update
  updateVenue(venueId: number, venue: Venue): Observable<any> {
    return this.http.put(`${this.base + this.VenueController}update?id=${venueId}`, venue, this.httpOptions);
  }
  //Delete
  deleteVenue(venueId: number): Observable<any> {
    return this.http.delete(`${this.base + this.VenueController}delete?id=${venueId}`, this.httpOptions);
  }
  //GetAll
  getVenues(): Observable<any> {
    return this.http.get(`${this.base + this.VenueController}getAll`, this.httpOptions);
  }
  //GetMatch
  getMatchVenue(name: string, address: string): Observable<any> {
    return this.http.get(`${this.base + this.VenueController}getMatch?name=${name}&address=${address}`, this.httpOptions);
  }

  //EmployeeType:
  //------
  // Create
  createEmployeeType(employeeType: any): Observable<any> {
    return this.http.post<any>(`${this.base + this.EmployeeTypeController}add`, employeeType, this.httpOptions);
  }
  //Update
  updateEmployeeType(employeeTypeId: number, employeeType: QualificationType): Observable<any>{
    return this.http.put(`${this.base+this.EmployeeTypeController}update?id=${employeeTypeId}`, employeeType, this.httpOptions);
  }
  //Delete
  deleteEmployeeType(qualificationTypeId: number): Observable<any> {
    return this.http.delete(`${this.base + this.EmployeeTypeController}delete?id=${qualificationTypeId}`, this.httpOptions);
  }
  //GetAll
  getEmployeeTypes(): Observable<any> {
    return this.http.get(`${this.base + this.EmployeeTypeController}getAll`, this.httpOptions);
  }
  //GetMatch
  getMatchEmployeeType(input: string): Observable<any> {
    return this.http.get(`${this.base + this.EmployeeTypeController}getMatch?input=${input}`, this.httpOptions);
  }


  // Title:
  // ------
  // Create
  createTitle(title: any): Observable<any> {
    return this.http.post<any>(`${this.base + this.TitleController}add`, title, this.httpOptions);
  }
  //Update
  updateTitle(titleId: number, title: Title): Observable<any> {
    return this.http.put(`${this.base + this.TitleController}update?id=${titleId}`, title, this.httpOptions);
  }
  //Delete
  deleteTitle(titleId: number): Observable<any> {
    return this.http.delete(`${this.base + this.TitleController}delete?id=${titleId}`, this.httpOptions);
  }
  //GetAll
  getTitles(): Observable<any> {
    return this.http.get(`${this.base + this.TitleController}getAll`, this.httpOptions);
  }
  //GetMatch
  getMatchTitle(input: string): Observable<any> {
    return this.http.get(`${this.base + this.TitleController}getMatch?input=${input}`, this.httpOptions);
  }

  //QualificationType:
  //------
  // Create
  createQualificationType(qualificationType: any): Observable<any> {
    return this.http.post<any>(`${this.base + this.QualificationTypeController}add`, qualificationType, this.httpOptions);
  }
  //Update
  updateQualificationType(qualificationTypeId: number, qualificationType: QualificationType): Observable<any>{
    return this.http.put(`${this.base+this.QualificationTypeController}update?id=${qualificationTypeId}`,qualificationType, this.httpOptions);
  }
  //Delete
  deleteQualificationType(qualificationTypeId: number): Observable<any> {
    return this.http.delete(`${this.base + this.QualificationTypeController}delete?id=${qualificationTypeId}`, this.httpOptions);
  }
  //GetAll
  getQualificationTypes(): Observable<any> {
    return this.http.get(`${this.base + this.QualificationTypeController}getAll`, this.httpOptions);
  }
  //GetMatch
  getMatchQualificationType(input: string): Observable<any> {
    return this.http.get(`${this.base + this.QualificationTypeController}getMatch?input=${input}`, this.httpOptions);
  }


// VAT:
// ------
/// Create
 createVAT(vat: any): Observable<any>{
  return this.http.post<any>(`${this.base+this.VatController}add`,vat,this.httpOptions);
 }
//Delete
deleteVat(vatId: number): Observable<any>{
  return this.http.delete(`${this.base+this.VatController}delete?id=${vatId}`,this.httpOptions);
}
//GetAll
getVats(): Observable<any>{
  return this.http.get(`${this.base+this.VatController}getAll`, this.httpOptions);
}
//GetMatch
getMatchVat(percentage:number, date: any): Observable<any>{
  return this.http.get(`${this.base+this.VatController}getMatch?percentage=${percentage}&date=${date}`, this.httpOptions);
}

  //Qualification:
  //------
  // Create
  createQualification(qualification: any): Observable<any> {
    return this.http.post<any>(`${this.base + this.QualificationController}add`, qualification, this.httpOptions);
  }
  //Update
  updateQualification(qualificationId: number, qualification: any): Observable<any>{
    return this.http.put(`${this.base+this.QualificationController}update?id=${qualificationId}`,qualification, this.httpOptions);
  }
  //Delete
  deleteQualification(qualificationId: number): Observable<any> {
    return this.http.delete(`${this.base + this.QualificationController}delete?id=${qualificationId}`, this.httpOptions);

  }
  //GetAll
  getQualifications(): Observable<any> {
    return this.http.get(`${this.base + this.QualificationController}getAll`, this.httpOptions);
  }
  //GetMatch
  getMatchQualification(input: string): Observable<any> {
    return this.http.get(`${this.base + this.QualificationController}getMatch?input=${input}`, this.httpOptions);
  }


 //SaleCategory:
 //------
 // Create

 createSaleCategory(saleCategory: any): Observable<any>{
  return this.http.post<any>(`${this.base+this.SaleCategoryController}add`,saleCategory,this.httpOptions);
}
//Update
updateSaleCategory(saleCategoryId: number, saleCategory: SaleCategory): Observable<any>{
  return this.http.put(`${this.base+this.SaleCategoryController}update?id=${saleCategoryId}`,saleCategory, this.httpOptions);
}
//Delete
deleteSaleCategory(saleCategoryId: number): Observable<any>{
  return this.http.delete(`${this.base+this.SaleCategoryController}delete?id=${saleCategoryId}`,this.httpOptions);
}
//GetAll
getSaleCategory(): Observable<any>{
  return this.http.get(`${this.base+this.SaleCategoryController}getAll`, this.httpOptions);
}
//GetMatch
getMatchSaleCategory(name: string, description: string): Observable<any>{
  return this.http.get(`${this.base+this.SaleCategoryController}getMatch?name=${name}&description=${description}`, this.httpOptions);
}

// SALE ITEM:
// ------
/// Create
createSaleItem(saleItem: any): Observable<any>{
  return this.http.post<any>(`${this.base+this.SaleItemController}add`,saleItem,this.httpOptions);
}
//Update

updateSaleItem(saleItemId: number, saleItem: SaleItem): Observable<any>{
  return this.http.put(`${this.base+this.SaleItemController}update?id=${saleItemId}`,saleItem, this.httpOptions);

}
//Delete
deleteSaleItem(saleItemId: number): Observable<any>{
  return this.http.delete(`${this.base+this.SaleItemController}delete?id=${saleItemId}`,this.httpOptions);
}
//GetAll
getSaleItems(): Observable<any>{
  return this.http.get(`${this.base+this.SaleItemController}getAll`, this.httpOptions);
}
//GetMatch
getMatchSaleItem(name: string, description: string): Observable<any>{
  return this.http.get(`${this.base+this.SaleItemController}getMatch?name=${name}&description=${description}`, this.httpOptions);
}
// //Image Upload
// uploadSaleItemImage(data: FormData): Observable<any> {
//   return this.http.post('http://localhost:5001/api/SaleItem/upload', data);
// }
// //reImage Upload
// deleteSaleItemImage(id : string) : Observable<any> {
//   return this.http.delete(`http://localhost:5001/api/SaleItem/deletephoto?name=${id}`)
// }

//Image Upload
uploadSaleItemImage(data: FormData): Observable<any> {
  return this.http.post(`${this.base+this.SaleItemController}upload`, data);
}
//reImage Upload
deleteSaleItemImage(id : string) : Observable<any> {
  return this.http.delete(`${this.base+this.SaleItemController}deletephoto?name=${id}`)
}

//add writeOff
createWriteOff(writeOff: any): Observable<any> {
  console.log(writeOff);
  return this.http.post<any>(`${this.base + this.WriteOffController}add`, writeOff, this.httpOptions);
}

//GetAll writeOffs
getWriteOffs(): Observable<any>{
  return this.http.get(`${this.base+this.WriteOffController}getAll`, this.httpOptions);
}

// ExerciseCategory:
  // ------
  // Create
  createExerciseCategory(exerciseCategory: any): Observable<any> {
    return this.http.post<any>(`${this.base + this.ExerciseCategoryController}add`, exerciseCategory, this.httpOptions);
  }
  //Update
  updateExerciseCategory(exerciseCategoryId: number, exerciseCategory: ExerciseCategory): Observable<any> {
    return this.http.put(`${this.base + this.ExerciseCategoryController}update?id=${exerciseCategoryId}`, exerciseCategory, this.httpOptions);
  }
  //Delete
  deleteExerciseCategory(exerciseCategoryId: number): Observable<any> {
    return this.http.delete(`${this.base + this.ExerciseCategoryController}delete?id=${exerciseCategoryId}`, this.httpOptions);
  }
  //GetAll
  getExerciseCategory(): Observable<any> {
    return this.http.get(`${this.base + this.ExerciseCategoryController}getAll`, this.httpOptions);
  }
  //GetMatch
  getMatchExerciseCategory(name: string, description: string): Observable<any> {
    return this.http.get(`${this.base + this.ExerciseCategoryController}getMatch?name=${name}&description=${description}`, this.httpOptions);
  }
  //Exists
  existsExerciseCategory(id: number): Observable<any> {
    return this.http.get(`${this.base + this.ExerciseCategoryController}exists?id=${id}`, this.httpOptions);
  }

//EMPLOYEE
/// Create

// createEmployee(employee: any): Observable<any>{
//   return this.http.post<any>(`${this.base+this.EmployeeController}add`,employee,this.httpOptions);
// }

createAdmin(data : FormData) : Observable<any> {
  return this.http.post<any>(`${this.base+this.EmployeeController}createAdmin`, data, this.httpOptions);
}

createEmployee(data : FormData) : Observable<any> {
  return this.http.post<any>(`${this.base+this.EmployeeController}createEmployee`, data, this.httpOptions);
}

//Update
updateEmployee(data: FormData): Observable<any> {
  return this.http.post<any>(`${this.base+this.EmployeeController}update`, data, this.httpOptions);
}
//Delete
deleteEmployee(EmployeeId: string): Observable<any>{
  return this.http.delete(`${this.base+this.EmployeeController}delete?id=${EmployeeId}`,this.httpOptions);
}
//GetAll
getEmployees(): Observable<any>{
  return this.http.get(`${this.base+this.EmployeeController}getAll`, this.httpOptions);
}
//GetMatch
getMatchEmployee(input: string): Observable<any>{
  return this.http.get(`${this.base+this.EmployeeController}getMatch?input=${input}`, this.httpOptions);
}
//Exists
existsEmployee(id: number): Observable<any>{
  return this.http.get(`${this.base+this.EmployeeController}exists?id=${id}`, this.httpOptions);
}
// //Image Upload
// uploadEmployeeImage(data: FormData): Observable<any> {
//   return this.http.post('https://testbsc.azurewebsites.net/api/Employee/upload', data);
// }
// //reImage Upload
// reuploadEmployeeImage(id: string): Observable<any> {
//   return this.http.delete(`https://testbsc.azurewebsites.net/api/Employee/deletephoto?name=${id}`);
// }
//Document Upload

  // RefundReason:
  // ------
  // Create
  createRefundReason(refundReason: any): Observable<any> {
    return this.http.post<any>(`${this.base + this.RefundReasonController}add`, refundReason, this.httpOptions);
  }
  //Update
  updateRefundReason(refundReasonId: number, refundReason: RefundReason): Observable<any> {
    return this.http.put(`${this.base + this.RefundReasonController}update?id=${refundReasonId}`, refundReason, this.httpOptions);
  }
  //Delete
  deleteRefundReason(refundReasonId: number): Observable<any> {
    return this.http.delete(`${this.base + this.RefundReasonController}delete?id=${refundReasonId}`, this.httpOptions);
  }
  //GetAll
  getRefundReasons(): Observable<any> {
    return this.http.get(`${this.base + this.RefundReasonController}getAll`, this.httpOptions);
  }
  //GetMatch
  getMatchRefundReason(description: string): Observable<any> {
    console.log()
    return this.http.get(`${this.base+this.RefundReasonController}getMatch?description=${description}`, this.httpOptions);
  }

//BOOKING_TYPE
//CREATE

createBookingType(bookingType: BookingType): Observable<any>{
  return this.http.post<any>(`${this.base+this.BookingTypeController}add`,bookingType,this.httpOptions);
}
//Update
updateBookingType(bookingTypeID:number, bookingType: BookingType): Observable<any>{
  return this.http.put(`${this.base+this.BookingTypeController}update?id=${bookingTypeID}`,bookingType, this.httpOptions);
}
//Delete
deleteBookingType(BookingTypeID: number): Observable<any>{
  return this.http.delete(`${this.base+this.BookingTypeController}delete?id=${BookingTypeID}`,this.httpOptions);
}
//GetAll
getBookingType(): Observable<any>{
  return this.http.get(`${this.base+this.BookingTypeController}getAll`, this.httpOptions);
}
//GetMatch
getMatchBookingType(name: string, description: string): Observable<any>{
  return this.http.get(`${this.base+this.BookingTypeController}getMatch?name=${name}&description=${description}`, this.httpOptions);
}

//BOOKING
//GetAll
getClientBookings(aspNetUserID: string): Observable<any>{
  return this.http.get(`${this.base+this.BookingController}getMyBookings?aspNetUserID=${aspNetUserID}`, this.httpOptions)
}

cancelMyBooking(aspNetUserID: string, bookingID: number, scheduleID: number): Observable<any>{
  return this.http.delete(`${this.base+this.BookingController}delete?aspNetUserID=${aspNetUserID}&bookingID=${bookingID}&scheduleID=${scheduleID}`, this.httpOptions)
}

// Exercise:
  // ------
  // Create
  createExercise(exercise: Exercise): Observable<any> {
    console.log(exercise);
    return this.http.post<any>(`${this.base + this.ExerciseController}add`, exercise, this.httpOptions);
  }
  //Update
  updateExercise(exerciseId: number, exercise: Exercise): Observable<any> {
    return this.http.put(`${this.base + this.ExerciseController}update?id=${exerciseId}`, exercise, this.httpOptions);
  }
  //Delete
  deleteExercise(exerciseId: number): Observable<any> {
    return this.http.delete(`${this.base + this.ExerciseController}delete?id=${exerciseId}`, this.httpOptions);
  }
  //GetAll
  getExercise(): Observable<any> {
    return this.http.get(`${this.base + this.ExerciseController}getAll`, this.httpOptions);
  }
  //GetMatch
  getMatchExercise(name: string, description: string): Observable<any> {
    return this.http.get(`${this.base + this.ExerciseController}getMatch?name=${name}&description=${description}`, this.httpOptions);
  }
  //Exists
  existsExercise(id: number): Observable<any> {
    return this.http.get(`${this.base + this.ExerciseController}exists?id=${id}`, this.httpOptions);
  }


//WRITE-OFF-REASON

//CREATE
createWriteOffReason(writeOffReason: BookingType): Observable<any>{
  return this.http.post<any>(`${this.base+this.WriteOffReasonController}add`,writeOffReason,this.httpOptions);
}
//Update
updateWriteOffReason(writeOffReasonID:number, writeOffReason: BookingType): Observable<any>{
  return this.http.put(`${this.base+this.WriteOffReasonController}update?id=${writeOffReasonID}`,writeOffReason, this.httpOptions);
}
//Delete
deleteWriteOffReason(writeOffReasonID: number): Observable<any>{
  return this.http.delete(`${this.base+this.WriteOffReasonController}delete?id=${writeOffReasonID}`,this.httpOptions);
}
//GetAll
getWriteOffReason(): Observable<any>{
  return this.http.get(`${this.base+this.WriteOffReasonController}getAll`, this.httpOptions);
}
//GetMatch
getMatchWriteOffReason(description: string): Observable<any>{
  return this.http.get(`${this.base+this.WriteOffReasonController}getMatch?description=${description}`, this.httpOptions);
}

// LESSONS:
  // ------
  // Create
  createLesson(lesson: Lesson): Observable<any> {
    return this.http.post<any>(`${this.base + this.LessonController}add`, lesson, this.httpOptions);
  }
  //Update
  updateLesson(lessonId: number, lesson: Lesson): Observable<any> {
    return this.http.put(`${this.base + this.LessonController}update?id=${lessonId}`, lesson, this.httpOptions);
  }
  //Delete
  deleteLesson(lessonId: string): Observable<any> {
    return this.http.delete(`${this.base + this.LessonController}delete?id=${lessonId}`, this.httpOptions);
  }
  //GetAll
  getLessons(): Observable<any> {
    return this.http.get(`${this.base + this.LessonController}getAll`, this.httpOptions);
  }
  // //GetMatch
  // getMatchLesson(name: string, description: string): Observable<any> {
  //   return this.http.get(`${this.base + this.ExerciseController}getMatch?name=${name}&description=${description}`, this.httpOptions);
  // }
  // //Exists
  // existsExercise(id: number): Observable<any> {
  //   return this.http.get(`${this.base + this.ExerciseController}exists?id=${id}`, this.httpOptions);
  // }

//SCHEDULE

createScheduleEvent(schedule: Schedule): Observable<any>{
  return this.http.post<any>(`${this.base+this.ScheduleController}add`,schedule,this.httpOptions);
}
//Update
updateScheduleEvent(scheduleID:number, schedule: Schedule): Observable<any>{
  return this.http.put(`${this.base+this.ScheduleController}update?id=${scheduleID}`,schedule, this.httpOptions);
}
//Delete
deleteScheduleEvent(scheduleID: number): Observable<any>{
  return this.http.delete(`${this.base+this.ScheduleController}delete?id=${scheduleID}`,this.httpOptions);
}
//GetAll
getScheduleEvent(): Observable<any>{
  return this.http.get(`${this.base+this.ScheduleController}getAll`, this.httpOptions);
}

// recordPayment(): Observable<any>{
//   return this.http.post()
// }

//Report

//Get by sale category
getSaleCategoryReport(): Observable<any>{
  return this.http.get(`${this.base+this.ReportController}getBySaleCategory`, this.httpOptions)
}

getBookingReport(): Observable<any>{
  return this.http.get(`${this.base+this.ReportController}getByBooking`, this.httpOptions)
}

// Supplier:
  // ------
  // Create
  createSupplier(supplier: Supplier): Observable<any> {
    console.log(supplier);
    return this.http.post<any>(`${this.base + this.SupplierController}add`, supplier, this.httpOptions);
  }
  //Update
  updateSupplier(supplierId: number, supplier: Supplier): Observable<any> {
    return this.http.put(`${this.base + this.SupplierController}update?id=${supplierId}`, supplier, this.httpOptions);
  }
  //Delete
  deleteSupplier(supplierId: number): Observable<any> {
    return this.http.delete(`${this.base + this.SupplierController}delete?id=${supplierId}`, this.httpOptions);
  }
  //GetAll
  getSupplier(): Observable<any> {
    return this.http.get(`${this.base + this.SupplierController}getAll`, this.httpOptions);
  }
  // //GetMatch
  // getMatchExercise(name: string, description: string): Observable<any> {
  //   return this.http.get(`${this.base + this.ExerciseController}getMatch?name=${name}&description=${description}`, this.httpOptions);
  // }
  // //Exists
  // existsExercise(id: number): Observable<any> {
  //   return this.http.get(`${this.base + this.ExerciseController}exists?id=${id}`, this.httpOptions);
  // }

  //Stock
  createStock(supplier: any): Observable<any> {
    console.log();
    return this.http.post<any>(`${this.base + this.StockController}add`, supplier, this.httpOptions);
  }

  //GetAll
  getAllStock(): Observable<any> {
    return this.http.get(`${this.base + this.StockController}getAll`, this.httpOptions);
  }

}
