import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { timer } from 'rxjs';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  constructor(
  ) { }

  @Output() isLogged = new EventEmitter<boolean>();

  ngOnInit(): void {
    if (!!localStorage.getItem('id') == false) {
      
      this.googleAuthSDK();
    }
    else {
      this.isLogged.emit(true);
    }
    
  }

  userInfo : any = {
    "name":"",
    "id": 0,
  }

  
  auth2: any;
  @ViewChild('loginRef', {static: true }) loginElement!: ElementRef;


  callLoginButton() {
    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleAuthUser:any) => {
     
        let profile = googleAuthUser.getBasicProfile();
        console.log('Token || ' + googleAuthUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());

        localStorage.setItem('id', profile.getId()) //stockage du token
        localStorage.setItem('name', profile.getName())
        
        this.userInfo.id = profile.getId();
        this.userInfo.name = profile.getName();
        
        



        
       /* Write Your Code Here */
    
      }, (error:any) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }
  
  googleAuthSDK() {
     
    (<any>window)['googleSDKLoaded'] = () => {
      (<any>window)['gapi'].load('auth2', () => {
        this.auth2 = (<any>window)['gapi'].auth2.init({
          client_id: '54005535557-j3ou14f5h15s0n5vfiddpf3c74a8jn2q.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.callLoginButton();
      });
    }
     
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement('script'); 
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs?.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
    
    
  }
  


  onLogin() {

    localStorage.clear();
    this.googleAuthSDK();

    timer(5000).subscribe(
      () => {
        this.isLogged.emit(true);
        console.log("coucou")
      }
    )
   
  }

  

}
