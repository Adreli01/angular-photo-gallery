import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PhotoService} from '../../services/photo.service';

import {Photo} from '../../interfaces/Photo';

@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.css']
})
export class PhotoPreviewComponent implements OnInit {

  id: string;
  photo: Photo;

  constructor(
    private activedRoute: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService,
  ) { }

  ngOnInit() {
    this.activedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.photoService.getPhoto(this.id)
        .subscribe(
          res => {
            this.photo = res;
          },
          error => console.log(error),
        )
    })
  }

deletePhoto(id: string) {
  this.photoService.deletePhoto(id)
    .subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/photos'])
      },
      err => console.log(err)
    )
}

updatePhoto(title: HTMLInputElement, description: HTMLTextAreaElement): boolean{  
  this.photoService.updatePhoto(this.id, title.value, description.value)
  .subscribe(
    res => {      
      console.log(res),
      this.router.navigate(['/photos'])
    },
    err => console.log(err),
  )
  return false;
}

}
