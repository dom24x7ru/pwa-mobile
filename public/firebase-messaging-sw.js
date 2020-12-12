console.log("firebase-messaging-sw");

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.0.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyCjmBpkkvQz0W81xMs9_1Dyw0IX3LPr5lo",
  authDomain: "dom24x7-f28f7.firebaseapp.com",
  databaseURL: "https://dom24x7-f28f7.firebaseio.com",
  projectId: "dom24x7-f28f7",
  storageBucket: "dom24x7-f28f7.appspot.com",
  messagingSenderId: "631025425076",
  appId: "1:631025425076:web:0125df1c64403c783ed5e1",
  measurementId: "G-0YR7766JHF"
});

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  const data = { ...payload.notification, ...payload.data };
  const notificationTitle = data.title;
  const notificationOptions = {
    body: data.body,
    icon: data.icon,
    image: data.image,
    requireInteraction: true,
    click_action: data.click_action,
    data
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  const target = event.notification.data.click_action;
  event.notification.close();
  event.waitUntil(
    clients
      .matchAll({
        type: "window",
        includeUncontrolled: true
      })
      .then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          console.log(client.url, client.focus);
          if (client.url === target && "focus" in client) {
            return client.focus();
          }
        }
        return clients.openWindow(target);
      })
  );
});