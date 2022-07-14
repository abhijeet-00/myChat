const PORT=process.env.PORT || 8000;
const io= require("socket.io")(PORT);


const users={};
 io.on("connection", function(socket){
    socket.on('new-user',(username) =>{
        users[socket.id]=username;
        socket.broadcast.emit('user-joined',username);
    });
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,user:users[socket.id]})
    });
    socket.on('disconnect',message=>{
      socket.broadcast.emit('left',users[socket.id])
  });
});

