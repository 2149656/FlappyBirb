import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { RegisterDTO } from '../models/RegisterDTO';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginDTO } from '../models/LoginDTO';

const domain: string = 'https://localhost:7018/';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  hide = true;

  registerUsername : string = "";
  registerEmail : string = "";
  registerPassword : string = "";
  registerPasswordConfirm : string = "";

  loginUsername : string = "";
  loginPassword : string = "";

  constructor(public route : Router, public http : HttpClient) { }

  ngOnInit() {
  }

  async login() : Promise<void>{

    let loginDTO = new LoginDTO(this.loginUsername, this.loginPassword);

     let x = await lastValueFrom(
       this.http.post<any>(domain + "api/Users/Login", loginDTO)
     );
     console.log(x);
     localStorage.setItem("token", x.token);

    // Redirection si la connexion a réussi :
    this.route.navigate(["/play"]);
  }

 async register() : Promise<void> {

    let registerDTO = new RegisterDTO(
       this.registerUsername,
      this.registerEmail,
      this.registerPassword,
      this.registerPasswordConfirm
    );

    let x = await lastValueFrom(this.http.post<RegisterDTO>(domain + "api/Users/Register", registerDTO));
    console.log(x);
  }
}
