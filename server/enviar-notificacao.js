const { USUARIOS_SUBSCRIPTIONS } = require("./in-memory-db");

const webpush = require('web-push');

exports.enviarNotificacao = (req, res) => {

  const notificationPayload = {
    notification: {
      icon: '/src/assets/icons/icon-72x72.png',
      title: 'Web Push',
      body: 'Teste de envio de Push Notification!!',
      vibrate: [100, 50, 100],
    }
  }

  Promise.all(USUARIOS_SUBSCRIPTIONS.map(sub => {
    if(!sub) sub = customSub;

    console.log('Nova notificação')
    webpush.sendNotification(sub, JSON.stringify(notificationPayload))
  }))
    .then(() => res.status(200).json({message: 'Notificação enviada com sucesso!'}))
    .catch(err => {
      console.error('Erro ao enviar notificação:', err);
      res.sendStatus(500);
    });
}
