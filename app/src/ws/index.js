/* eslint-disable */
import socketIO from 'socket.io-client';
import { watch } from 'vue';
import { createPinia, storeToRefs } from "pinia";
import { useUserStore } from '@/store/modules/user';
import { useNotificationStore } from '@/store/modules/notification';

const socket = socketIO.connect('http://localhost:8081', {transports: ["websocket"]});

var hasConnected = false;

export default {
  install() {
    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);

    watch(user, (newUser) => onUserUpdate(newUser));
    onUserUpdate(user.value);
  }
}


function onUserUpdate(user) {
  if(!user?.userId) {
    return;
  }

  if(hasConnected) {
    return;
  }

  const notificationStore = useNotificationStore();

  socket.on(user.userId, (notification) => {
    notificationStore.setGeneratedBadge(notification.isGenerated);
  });

  hasConnected = true;
}


socket.on("error", (err) => {
  console.error("timeout: ", err);
});
socket.on('connect', () => {
  console.log('connected to socket !')
})