import socketIO from 'socket.io-client';

// export const socket = socketIO.connect('http://localhost/', {path: "/nodejs/socket.io"});
export const socket = socketIO.connect('http://localhost:8080', {transports: ["websocket"]});

socket.on("notification", (body) => {
  console.log(body);
})

socket.on("message", (message) => {
  store.dispatch(addMessage(message));
})

socket.on("newConnectedUser", (userInfo) => {
  store.dispatch(addNewUser(userInfo));
})

socket.on("userDisconnected", (userInfo) => {
  store.dispatch(removeUser(userInfo));
})

socket.on("error", (err) => {
  console.error("timeout: ", err);
});

window.socket = socket;

const WS = {
  // async login(user) {
  //   socket.emit("login", user);

  //   const { data } = await getConnectedUsers();
    
  //   const idUser = selectUserId(store.getState())
  //   store.dispatch(initConnectedUsers(data.filter(u => u.id !== idUser)));

  //   if (idUser != null) {
  //     socket.on(idUser, async (object) => {

  //       const notification = JSON.parse(object)
  //       console.log("NOTIFICATION RECEIVED", JSON.parse(object));

  //       if (notification.notificationAction === "UPDATE") {
  //         try {
  //           await getUserPendingTransaction(idUser)
  //           await updateUserMoney(idUser)
  //         } catch (error) {
  //           console.error(error)
  //         }
  //       } else {
  //         //TODO: notification toast
  //         alert(object.message)
  //       }
  //     })
  //   }

  // },
  // sendMessage(text) {
  //   const destinationId = selectChatPal(store.getState())?.socketId;

  //   socket.emit("message", {
  //     destination: destinationId,
  //     timestamp: new Date(),
  //     text
  //   });
  // },
}

export default WS