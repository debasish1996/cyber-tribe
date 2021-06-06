const channel = require('./channel.controller');
const auth = require('./auth.controller');
const Profile = require('../model/profile.model');

self = this;
exports.users = {};
exports.io;
exports.init = (io) => {
  self.io = io;
  self.io.on('connection', async (socket) => {
    try {
      const uid = await auth.validateIO(socket);
      if (!uid) return;
      exports.thisSocket = new Socket(socket, uid).onConnect();
    } catch (error) {
      console.log(error);
    }
  });
};

exports.notifyContact = (id, contact) => {
  id = self.users[id];
  if (id) self.io.sockets.to(id).emit('contacts-updates', contact);
};

exports.notifyDirect = (id, direct) => {
  id = self.users[id];
  if (id) self.io.sockets.to(id).emit('direct-updates', direct);
};

class Socket {
  socket;
  uid;
  constructor(socket, uid) {
    this.socket = socket;
    this.uid = uid;
  }

  async onConnect() {
    try {
      self.users[this.uid] = this.socket.id;
      this.setPresence('ONLINE');
      console.log(this.uid + '------Connected-----');
      channel.handleJoinChannel(this.socket, this.uid);
      channel.handleMessage(this.socket, this.uid);
      this.onDisconnect();
    } catch (error) {
      console.log(error);
    }
  }

  async setPresence(state) {
    self.io.sockets.emit(this.uid + 'presence', state);
    const user = await Profile.findById(this.uid);
    user.state = state;
    user.save();
  }

  onDisconnect() {
    this.socket.on('disconnect', () => {
      delete self.users[this.uid];
      this.setPresence('OFFLINE');
      console.log(this.uid + ' disconnected');
    });
  }
}
