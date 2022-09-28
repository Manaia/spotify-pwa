import { Component } from '@angular/core';
import { SwPush, SwUpdate, VersionEvent } from '@angular/service-worker';
import { PushNotificationService } from 'src/services/push-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pwa';
  
  constructor(
    private push: PushNotificationService, 
    private swUpdate: SwUpdate, 
    private swPush: SwPush
  ) {
    if (this.swUpdate.isEnabled) {

      this.swUpdate.versionUpdates.subscribe({
        next: (value: VersionEvent) => {
          if(value.type === 'VERSION_READY'){
            if (confirm('Nova versão disponível. Deseja recarregar a página?'))
              window.location.reload();
          }
        }
      });
    }
  }

  ngOnInit() {
  }

  enviarNotificacao() {
    this.push.enviar();
  }
}
