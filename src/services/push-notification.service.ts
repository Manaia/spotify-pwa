import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor(
    private http: HttpClient,
    private swPush: SwPush,
    // private router: Router
  ) {
    if (this.swPush.isEnabled) {
      this.adicionaPushSubscriber();
    }

    this.swPush.notificationClicks.subscribe((result) => {
      console.log('clicou na notificação', result);
      if (result.action === 'new-page') {
        window.open('https://open.spotify.com/')
      }
    });

    this.swPush.messages.subscribe((message) => console.log(message));
  }

  public adicionaPushSubscriber() {
    this.swPush.requestSubscription({
      serverPublicKey: environment.VAPID_PUBLIC_KEY
    })
    .then(sub => {
      this.http.post(environment.API + '/api/notificacao', sub).subscribe({
        next: () => console.log('Inscrição adicionada com sucesso!', sub),
        error: (err) => console.error('Erro ao adicionar inscrição.', err)
      });

      return sub;
    })
    // .then((sub) => this.enviar(sub))
    .catch(err => console.error('Erro ao se inscrever', err));
  }

  public enviar() {
    this.http.post(environment.API + '/api/notificacao/enviar', null).subscribe({
      next: () => console.log('Notificação enviada com sucesso!'),
      error: (err) => console.error('Erro ao enviar notificação.', err)
    });
  }
}