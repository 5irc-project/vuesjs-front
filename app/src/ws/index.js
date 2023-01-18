import socketIO from 'socket.io-client';
import { watch } from 'vue';
import { storeToRefs } from "pinia";
import { useUserStore } from '@/store/modules/user';

const socket = socketIO.connect('http://localhost:8081', {transports: ["websocket"]});

var hasConnected = false;



export default {
  install() {
    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);

    watch(user, (newUser) => onUserUpdate(newUser.value));
    onUserUpdate(user.value);
  }
}


function onUserUpdate(user) {
  console.log("userId : ", user.userId);

  if(hasConnected) {
    return;
  }

  socket.on(user.userId, () => {
    console.log("oui")
  });

  hasConnected = true;
}

socket.on("notification", (body) => {
  console.log(body);
})


socket.on("error", (err) => {
  console.error("timeout: ", err);
});
socket.on('connect', () => {
  console.log('connected to socket !')
})