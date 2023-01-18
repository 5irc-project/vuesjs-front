import socketIO from 'socket.io-client';
import { watch } from 'vue';
import { storeToRefs } from "pinia";
import { useUserStore } from '@/store/modules/user';



export default {
  install() {
    console.log("hello")
    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);

    
    watch(user, (newUser) => {
      console.log("hzloo", newUser)
    })
  }
}


// export const socket = socketIO.connect('http://localhost/', {path: "/nodejs/socket.io"});
export const socket = socketIO.connect('http://localhost:8081', {transports: ["websocket"]});

export function onUserLogin(userId) {
  console.log("userId : ", userId)
  socket.on(userId, () => {
    console.log("oui")
  })

}

socket.on("notification", (body) => {
  console.log(body);
})


socket.on("error", (err) => {
  console.error("timeout: ", err);
});