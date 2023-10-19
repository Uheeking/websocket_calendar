const userController = require("../Controllers/user.controller");

module.exports = function (io) {
  io.on("connection", async (socket) => {
    console.log("client is connected", socket.id);

    socket.on("login", async (userName, cb) => {
      try {
        console.log("backend", userName);
        const user = await userController.saveUser(userName, socket.id);
        cb({ ok: true, data: user });
      } catch (error) {
        cb({ ok: true, error: error.message });
      }
    });

    socket.on("disconnect", () => {
      console.log("user is disconnect");
    });
  });
};
