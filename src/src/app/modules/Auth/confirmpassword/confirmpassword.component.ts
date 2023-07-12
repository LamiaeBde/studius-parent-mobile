import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from 'src/app/core/auth/auth.service';

import * as Math from 'mathjs';




@Component({

  selector: 'app-confirmpassword',

  templateUrl: './confirmpassword.component.html',

  styleUrls: ['./confirmpassword.component.scss'],

})

export class ConfirmpasswordComponent implements OnInit {

  remainingTime: number = 420; // 7 minutes in seconds




  constructor(

    private _fb: FormBuilder,

    private router: ActivatedRoute,

    private authservice: AuthService,

    private route: Router

  ) { }




  ConfirmForm = this._fb.group({

    UserId: this.router.snapshot.params['id'],

    ConfirmationCode: [, Validators.required],

  });




  ngOnInit() {

    this.startTimer();

  }




  startTimer() {

    setInterval(() => {

      if (this.remainingTime > 0) {

        this.remainingTime--;

      }

    }, 1000);

  }




  save() {

    if (this.remainingTime <= 0) {

      console.log('Time has expired');

      return;

    }




    console.log(this.ConfirmForm.value);




    this.authservice.ConfirmAccount(this.ConfirmForm.value).subscribe({

      next: (val: any) => {

        this.route.navigate(['/home/login']);

      },

      error: (err: any) => {

        console.error(err);

      },

    });

  }




  getRemainingTime() {

    const minutes = Math.floor(this.remainingTime / 60);

    const seconds = this.remainingTime % 60;

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  }



  confirm() {




    this.authservice.ResendconfirmAccount(this.router.snapshot.params['id']).subscribe({

      next: (val: any) => {




      },

      error: (err: any) => {

        console.error(err);

      },

    });

  }







}




