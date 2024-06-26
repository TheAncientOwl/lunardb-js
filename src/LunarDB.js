import { WebSocket } from 'ws';
import { Logger, LogLevel } from './Logger.js';
import { assert } from './assert.js';

class LunarDB {
  #ip = '127.0.0.1';
  #port = 8083;
  #socket = null;
  #connected = false;
  #connectionCallbacks = {
    onConnect: new Set(),
    onClose: new Set(),
    onError: new Set(),
  };
  #queryResponseHandler = null;

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

  #getAddress() {
    return `ws://${this.#ip}:${this.#port}`;
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

  connectOverride(is, port) {
    this.#setAddress(is, port);
    this.#socket.close();
    this.#socket = null;
    this.connect();
  }

  disconnect() {
    Logger.info(`Disconnecting`);
    this.#socket.close();
    this.#socket = null;
    this.#connected = false;
  }
  // </connection>

  // <query>
  query(queryObject) {
    assert(
      typeof queryObject === 'string' ||
        (typeof queryObject === 'object' &&
          typeof queryObject.build === 'function' &&
          typeof queryObject.build() === 'string'),
      Logger.format('Query must be a string or at least build into a string', LogLevel.Assert)
    );

    const queryStr = typeof queryObject === 'string' ? queryObject : queryObject.build();

    Logger.verbose(`Executing query: "${queryStr}"`);

    this.connect();

    return new Promise((resolve, reject) => {
      this.#queryResponseHandler = message => {
        this.resetQueryResponseHandler = null;
        resolve(message);
      };

      this.#socket.send(queryStr);
    });
  }
  // </query>

  // <events>
  addOnConnectListener(cb) {
    this.#connectionCallbacks.onConnect.add(cb);
  }

  removeOnConnectListener(cb) {
    this.#connectionCallbacks.onConnect.delete(cb);
  }
  // </events>

  // <socket-handlers>
  #handleSocketOpen() {
    Logger.verbose(`Connected to ${this.#getAddress()}`);
    this.#connected = true;
    for (const callback of this.#connectionCallbacks.onConnect) {
      callback();
    }
  }

  #handleSocketMessage(message) {
    if (this.#queryResponseHandler != null) {
      this.#queryResponseHandler(message);
    }
  }

  #handleSocketClose() {
    Logger.info(`Connection closed`);
    for (const callback of this.#connectionCallbacks.onClose) {
      callback();
    }
  }

  #handleSocketError(err) {
    Logger.error(err);
    for (const callback of this.#connectionCallbacks.onError) {
      callback();
    }
  }
  // </socket-handlers>
}

export default LunarDB;
