import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { PushNotificationService } from 'src/services/push-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pwa';
  
  constructor(private push: PushNotificationService, private swUpdate: SwUpdate) {}

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe(() => {
        if (confirm('Nova versão disponível. Deseja recarregar a página?')) {
          window.location.reload();
        }
      });
    }

    this.push.adicionaPushSubscriber();
  }

  enviarNotificacao() {
    this.push.enviar();
  }
}
