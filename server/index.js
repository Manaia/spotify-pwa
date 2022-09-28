const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const webpush = require('web-push');

const { enviarNotificacao } = require('./enviar-notificacao');
const { adicionaPushSubscriber } = require('./adiciona-push-subscriber');

// VAPID keys should be generated only once.
const vapidKeys = {
  publicKey:'BHlYp-cHojnaGz0orlkYsUEs7Ra4dFLmjX3Vc19ef03IkwhpOI4NCTtM4aEDi8VKmLEyaW46dx80-sohTUmq1Fo',
  privateKey:'7r3P_k_FQjkYYEzcl9u2_tEPK7psiTfXw6lS6TSvHcY'
}

webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey,
)

const app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cors());

// app.route('/api/notificacao')
//     .post(adicionaPushSubscriber);

// app.route('/api/notificacao/enviar')
//     .post(enviarNotificacao);

app.post('/api/notificacao/enviar', (req, res) => {
  let sub = req.body;
  console.log(sub)
  res.set('Content-Type', 'application/json');
  webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey,
  );
  

  let payload = JSON.stringify({
    notification: {
      title: 'Webpush Notification',
      body: 'Teste de Webpush',
      icon: 'https://yt3.ggpht.com/a-/AAuE7mCxr-4W53FAxBRcKR0iDk_vPCSAmW-QKFGaFA=s88-mo-c-c0xffffffff-rj-k-no',
      vibrate: [200, 100, 200],
      sound: "default"
    },
    sound: "default"
  });

  Promise.resolve(webpush.sendNotification(sub, payload))
    .then(() => res.status(200).json({
      message: 'Notificação enviada'
    }))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
})

const PORT = 9000;
const HOST = 'localhost';

const httpServer = app.listen(PORT, HOST, () => {
  console.log("HTTP Server running at http://" + HOST + ":" + PORT);
});