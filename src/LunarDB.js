const WebSocket = require('ws');
const { Logger, LogLevel } = require('./Logger');
const assert = require('assert');

class LunarDB {
  #ip = '127.0.0.1';
  #port = 8083;
  #socket = null;
  #connected = false;
  #executingQuery = false;
  #callbacks = {
    open: new Set(),
    close: new Set(),
    error: new Set(),
  };

  // <connection>
  constructor(ip, port) {
    this.#setAddress(ip, port);
  }

  #setAddress(ip, port) {
    assert(
      ip !== null && ip !== undefined && typeof ip === 'string' && ip.length != 0,
      Logger.format('WebSocketServer IP cannot be null or undefined or empty', LogLevel.Assert)
    );
    assert(
      port !== null && port !== undefined && typeof port === 'number',
      Logger.format('WebSocketServer Port cannot be null or undefined or empty', LogLevel.Assert)
    );

    this.#ip = ip;
    this.#port = port;
  }

  connect() {
    if (this.#socket == null) {
      const address = this.#getAddress();
      Logger.info(`Connecting to server ${address}`);

      this.#socket = new WebSocket(address);

      this.#socket.on('open', () => this.#handleSocketOpen());
      this.#socket.on('message', buffer => this.#handleSocketMessage(buffer.toString()));
      this.#socket.on('close', () => this.#handleSocketClose());
      this.#socket.on('error', err => this.#handleSocketError(err));
    }
  }

  disconnect() {
    Logger.info(`Disconnecting`);
    this.#socket.close();
    this.#socket = null;
    this.#connected = false;
  }

  connectOverride(is, port) {
    this.#setAddress(is, port);
    this.#socket.close();
    this.#socket = null;
    this.connect();
  }

  #getAddress() {
    return `ws://${this.#ip}:${this.#port}`;
  }
  // </connection>

  // <handlers>
  #handleSocketOpen() {
    Logger.verbose(`Connected to ${this.#getAddress()}`);
    this.#connected = true;
    for (const callback of this.#callbacks.open) {
      callback();
    }
  }

  #handleSocketMessage(message) {
    // Logger.verbose(`Received server message: "${message}"`);
  }

  #handleSocketClose() {
    for (const callback of this.#callbacks.close) {
      callback();
    }
    Logger.info(`Connection closed`);
  }

  #handleSocketError(err) {
    for (const callback of this.#callbacks.error) {
      callback();
    }
    Logger.error(err);
  }
  // </handlers>

  // <events>
  connectionEstablished() {
    return this.#connected;
  }

  addOnConnectionEstablished(cb) {
    this.#callbacks.open.add(cb);
  }

  deleteOnConnectionEstablished(cb) {
    this.#callbacks.open.delete(cb);
  }

  addOnConnectionClosed(cb) {
    this.#callbacks.close.add(cb);
  }

  addOnConnectionError(cb) {
    this.#callbacks.error.add(cb);
  }
  // </events>

  // <query>
  execQuery(query) {
    assert(typeof query === 'string', Logger.format('Query must be a string', LogLevel.Assert));
    if (this.#executingQuery === false) {
      Logger.verbose(`Executing query: "${query}"`);

      this.#executingQuery = true;
      this.connect();
      this.#socket.send(query);
    } else {
      assert(false, 'Cannot execute more than one query at a time');
    }

    return this;
  }

  afterQueryExec(cb) {
    this.connect();
    this.#socket.on('message', buffer => {
      cb(buffer.toString());
      this.resetQueryCallback();
      this.#executingQuery = false;
    });

    return this;
  }

  resetQueryCallback() {
    this.connect();
    this.#socket.on('message', buffer => this.#handleSocketMessage(buffer.toString()));
  }
  // </query>
}

module.exports = LunarDB;
