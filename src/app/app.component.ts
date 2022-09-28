import { Component } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { PushNotificationService } from 'src/services/push-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pwa';
  
  constructor(private push: PushNotificationService, private swUpdate: SwUpdate, private swPush: SwPush) {}

  ngOnInit() {
    // this.push.adicionaPushSubscriber();

    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('Nova versão disponível. Deseja recarregar a página?')) {
          window.location.reload();
        }
      });
    }

    this.swPush.messages.subscribe((message) => console.log(message))
  }

  enviarNotificacao() {
    if (this.swPush.isEnabled) {
      this.push.adicionaPushSubscriber();
    }
    // this.push.enviar();
  }
}
