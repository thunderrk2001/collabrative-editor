const uuid = require("uuid");
const Delta = require("quill-delta");

io.use((socket, next) => {
   return next();
});

io.on('connection', (socket) => {
   socket.on("join", async (room_id) => {
      try {
         await socket.join(room_id);
         let document = await redisClient.get(room_id);
         if (document)
            socket.emit('onload', JSON.parse(document));
      } catch (error) {
         console.log(error);
      }
      socket.on("write", async (delta) => {
         let document = await redisClient.get(room_id);
         if (!document) document = delta;
         else {
            document = JSON.parse(document);
            document = new Delta(document);
            document = document.compose(delta);
         }
         await redisClient.set(room_id, JSON.stringify(document));
         socket.to(room_id).emit('receive', delta);
      })
   });

});
