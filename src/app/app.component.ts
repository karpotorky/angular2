import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { Response } from '@angular/http';
import 'rxjs/add/operator/debounceTime';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// export class AppComponent implements OnInit {
export class AppComponent {
  title = 'app works!';
  color = "primary";

  items: any[] = [];

  constructor(private httpService : HttpService ) {}

  ngOnInit() {
    this.httpService.getAllData()
      .subscribe(
         data => {
          const myArray = [];
          for (let key in data) {
            myArray.push(data[key]);
            data[key].id = key; // Add firebase key as attribute to array
          }
          this.items = myArray;
        } 
      );
  }

  onChangeNimi(event:any, item:any) {
    this.httpService.update( 
        {
          id: item.id,
          nimi: event.target.value,
          // toive: item.toive
        }
      )
      .subscribe(
        data => console.log(data)
      );
  }

   onChangeToive(event:any, item:any) {
    this.httpService.update( 
        {
          id: item.id,
          // nimi: item.nimi,
          toive: event.target.value
        }
      )
      .subscribe(
        data => console.log(data)
      );
  }

  onCheck(event:any, item:any) {
    console.log(event.checked);
    this.httpService.update( 
        {
          id: item.id,
          isChecked: event.checked
        }
      )
      .subscribe(
        data => console.log(data)
      );
  }


  onSubmit(nimi : string, toive: string) {
    let _id : any;
    this.httpService.sendData({ nimi : nimi, toive : toive, isChecked : false })
      .subscribe(
        data => {          
            _id = data.name
        },
        err => console.log(err),
        () => {
          this.items.push({ id: _id, nimi : nimi, toive : toive, isChecked : false })
        }
      );
  }

  onDelete(item : any) {
    let confirm = window.confirm("Oletko varma, että haluat poistaa rivin?");
    if (confirm == true) {
      this.httpService.delete(item.id)
      .subscribe(
        data => console.log(data),
        err => console.log(err),
        () => {
          let i = this.items.indexOf(item);
          if (i > -1) {
            this.items.splice(i, 1);
          }
        }
      )
    } else {
      return;
    }
  }
}
