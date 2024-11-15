import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MaterialModule } from './material.module';
import { Score } from './models/score';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MaterialModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {
  toggleLogout: boolean = true;

  domain = "https://localhost:5000/"
  scores: Score[] = [];

  constructor(public http: HttpClient) {}

  logout() {
    // ██ Supprimer le token juste ici ! ██

    let darkScreen: HTMLElement | null = document.querySelector('#darkScreen');
    if (darkScreen == null) return;
    darkScreen.style.visibility = this.toggleLogout ? 'visible' : 'hidden';

    let logoutBox: HTMLElement | null = document.querySelector('#logoutBox');
    if (logoutBox == null) return;
    logoutBox.style.opacity = this.toggleLogout ? '1' : '0';
    logoutBox.style.top = this.toggleLogout ? '50%' : '48%';

    this.toggleLogout = !this.toggleLogout;

    sessionStorage.removeItem('token');
  }
}
