const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const webpush = require('web-push');

const { enviarNotificacao } = require('./enviar-notificacao');
const { adicionaPushSubscriber } = require('./adiciona-push-subscriber');

// VAPID keys should be generated only once.
const vapidKeys = {
  publicKey: 'BLsbmht6eyDpua2C2MFzR8nNDvu1TsDbvGtXlWxH5fsblxJdjOPwwqoc5xEBeqqF6NXf2J2Pk2QSG0MDHzRQFwA',
  privateKey: 'mZIxOID9kDTVJzH0dHM7UvMz_ue_GCyHYf9a5Giyz4A'
};

webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey,
)

const app = express();
app.use(bodyParser.json());
app.use(cors({origin: true, credentials: true}));

app.route('/api/notificacao')
    .post(adicionaPushSubscriber);

app.route('/api/notificacao/enviar')
    .post(enviarNotificacao);

const PORT = 9000;
const HOST = 'localhost';

const httpServer = app.listen(PORT, HOST, () => {
    console.log("HTTP Server running at http://" + HOST + ":" + PORT);
});