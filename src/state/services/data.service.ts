import { Injectable } from "@angular/core";
import { delay, Observable, of } from "rxjs";
import { Device, Employee } from "@models";

@Injectable({
  providedIn: 'root'
})
export class DataService {


  public getDevices(): Observable<Device[]> {
    return of(this._getDevices()).pipe(delay(Math.random() * 1000 + 1400))
  }

      
  public getEmployees(): Observable<Employee[]> {
    return of(this._getEmployees()).pipe(
      delay(Math.random() * 1000 + 1400)
    )
  }


  private _getDevices(): Device[] {
    return [
      {
        "description": "13 inch MacBook Air, Apple M1 Chip with 8‑Core CPU and 7‑Core GPU, 256GB Storage, 16‑core Neural Engine",
        "id": "1",
        "image": "https://picsum.photos/id/0/512",
        "sku": "1",
        "type": 0,
        "name": "MacBook Air Space Grey 13-inch"
      },
      {
        "description": "13 inch MacBook Air, Apple M1 Chip with 8‑Core CPU and 7‑Core GPU, 256GB Storage, 16‑core Neural Engine",
        "id": "2",
        "image": "https://picsum.photos/id/180/512",
        "sku": "1",
        "type": 0,
        "name": "MacBook Air Space Grey 13-inch"
      },
      {
        "description": "13 inch MacBook Air, Apple M1 Chip with 8‑Core CPU and 7‑Core GPU, 256GB Storage, 16‑core Neural Engine",
        "id": "3",
        "image": "https://picsum.photos/id/2/512",
        "sku": "1",
        "type": 0,
        "name": "MacBook Air Space Grey 13-inch"
      },
      {
        "description": "2014 iPhone, 20GB storage, 310 pixel screen",
        "id": "4",
        "image": "https://picsum.photos/id/20/512",
        "sku": "2",
        "type": 0,
        "name": "iPhone"
      },
      {
        "description": "Original Kindle with 256 GB storage",
        "id": "5",
        "image": "https://picsum.photos/id/367/512",
        "sku": "3",
        "type": 0,
        "name": "Kindle"
      },
      {
        "description": "2018 Apple keyboard and mouse set, compatible with all Apple devices",
        "id": "6",
        "image": "https://picsum.photos/id/366/512",
        "sku": "4",
        "type": 0,
        "name": "Apple keyboard and mouse"
      },
      {
        "description": "13 inch MacBook Air, Apple M1 Chip with 8‑Core CPU and 7‑Core GPU, 256GB Storage, 16‑core Neural Engine",
        "id": "7",
        "image": "https://picsum.photos/id/0/512",
        "sku": "1",
        "type": 0,
        "name": "MacBook Air Space Grey 13-inch"
      }
    ]
  }

  private _getEmployees(): Employee[] {
    return [
      {
        "emailAddress": "amy.zhou@flamingo-finance.com",
        "id": "1",
        "name": "Amy Zhou",
        "image": "assets/img/amy-zhou.jpg",
        "deviceLinks": []
      },
      {
        "emailAddress": "damien.white@flamingo-finance.com",
        "id": "2",
        "name": "Damien White",
        "image": "assets/img/damien-white.jpg",
        "deviceLinks": []
      },
      {
        "emailAddress": "mark.sayle@flamingo-finance.com",
        "id": "3",
        "name": "Mark Sayle",
        "image": "assets/img/mark-sayle.jpg",
        "deviceLinks": []
      },
      {
        "emailAddress": "svetlana.novoselova@flamingo-finance.com",
        "id": "4",
        "name": "Svetlana Novoselova",
        "image": "assets/img/svetlana-novoselova.jpg",
        "deviceLinks": []
      },
      {
        "emailAddress": "charles.roland@flamingo-finance.com",
        "id": "5",
        "name": "Charles Roland",
        "image": "assets/img/charles-roland.jpg",
        "deviceLinks": []
      },
      {
        "emailAddress": "mary.edwards@flamingo-finance.com",
        "id": "6",
        "name": "Mary Edwards",
        "image": "assets/img/mary-edwards.jpg",
        "deviceLinks": []
      },
      {
        "emailAddress": "eric.matthews@flamingo-finance.com",
        "id": "7",
        "name": "Eric Matthews",
        "image": "assets/img/eric-matthews.jpg",
        "deviceLinks": []
      },
      {
        "emailAddress": "kirsten.joyce@flamingo-finance.com",
        "id": "8",
        "name": "Kirsten Joyce",
        "image": "assets/img/kirsten-joyce.jpg",
        "deviceLinks": []
      },
      {
        "emailAddress": "rihanna.mclaren@flamingo-finance.com",
        "id": "9",
        "name": "Rihanna McLaren",
        "image": "assets/img/rihanna-mclaren.jpg",
        "deviceLinks": []
      },
      {
        "emailAddress": "james.pickering@flamingo-finance.com",
        "id": "10",
        "name": "James Pickering",
        "image": "assets/img/james-pickering.jpg",
        "deviceLinks": []
      }
    ]
  }
}
