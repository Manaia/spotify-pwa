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

webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey,
);

app.route('/api/notificacao')
    .post(adicionaPushSubscriber);

app.route('/api/notificacao/enviar')
    .post(enviarNotificacao);

const PORT = 9000;
const HOST = 'localhost';

const httpServer = app.listen(PORT, HOST, () => {
  console.log("HTTP Server running at http://" + HOST + ":" + PORT);
});