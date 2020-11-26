import _ from "lodash";
import EventEmitter from "events";
import socketCluster from "socketcluster-client";

export default class SocketClient extends EventEmitter {

  constructor(options) {
    super();

    // if (!options) options = {};
    // if (!options.port) options.port = config.scPort;
    // if (!options.hostname) options.hostname = config.scHost;
    // if (!options.secure) options.secure = config.secure;
    // if (!options.authEngine) options.authEngine = config.authEngine;

    this.user = null;

    this.data = {};
    this.ready = false;
    this.channels = {};
    this.channelReady = {};
    this.socket = socketCluster.connect(options);

    this.socket.on("error", error => {
      console.log("caught error", error);
    });
    this.socket.on("connect", status => {
      console.log("isAuthenticated", status.isAuthenticated);
      this.handleConnect()
    });
    this.socket.on("authStateChange", ({ newState }) => {
      if (newState == "unauthenticated") {
        this.handleRefresh()
      }
    });
    this.socket.on("logout", () => {
      this.handleLogout()
    });
    this.socket.on("disconnect", () => {
      this.handleRefresh()
    });
    this.socket.on("authenticate", () => {
      this.handleLogin()
    }
    );
    this.socket.on('deauthenticate', this.handleLogout());

  }

  async handleConnect() {
    this.ready = false;
    this.emit("loading");
    for (let name of this.commonChannels()) this.initChannel(name);
    if (!this.user) await this.handleLogin();
  }

  async handleLogin() {
    this.ready = false;
    this.emit("loading");
    if (this.socket.authToken) {
      let { id, mobile, banned, role } = this.socket.authToken;
      let user = this.user = { id, mobile, banned, role, person: null, resident: null };
      for (let name of this.userChannels()) this.initChannel(name);
      this.emit("login", { user });
    } else {
      this.handleLogout()
      this.emit("ready");
    }
  }

  handleLogout() {
    this.closeUserChannels();
    this.emit("logout");
    this.user = null;
  }

  handleRefresh() {
    this.ready = false;
    this.emit("loading");
    this.closeUserChannels();
    this.user = null;
  }

  initChannel(name) {
    this.channelReady[name] = false;
    this.emit("channel.loading", { name });
    // console.log("MODEL", name);
    let channel = this.channels[name] = this.socket.subscribe(name);
    channel.watch(this.handleChannel.bind(this, channel));
  }

  closeChannel(name) {
    this.emit("channel.close", { name });
    let channel = this.channels[name];
    delete this.channelReady[name];
    if (!channel) return;
    channel.unsubscribe();
    channel.destroy();
    delete this.channels[name];
  }

  closeUserChannels() {
    for (let name of this.userChannels()) this.closeChannel(name);
  }

  handleChannel({ name }, { event, data }) {
    let [model, ...params] = name.split(".");
    if (event === "ready") return this.handleReady(name);
    this.emit("model", { model, params, event, data });
    this.emit(model, { event, data });
  }

  handleReady(name) {
    this.emit("channel.ready", { name });
    this.channelReady[name] = true;
    if (_.every(this.channelReady)) {
      this.ready = true;
      this.emit("ready");
    }
  }

  wrapEmit(event, params) {
    return new Promise(resolve => {
      this.socket.emit(event, params, (error, response) => {
        if (error) {
          error.methodName = event
          console.log("ERROR", event, error);
        }
        error ? resolve({ status: "ERROR", message: error.message }) : resolve(response);
      });
    });
  }

  commonChannels() {
    let channels = ["ping"];
    return channels;
  }

  userChannels() {
    if (!this.user) return [];
    let channels = ["all.posts", "all.flats", "all.invites", `user.${this.user.id}`, "instructions", `invites.${this.user.id}`, "documents"];
    return channels;
  }

}