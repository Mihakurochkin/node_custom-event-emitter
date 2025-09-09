'use strict';

class MyEventEmitter {
  listeners = {};

  on(eventName, callback) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(callback);
  }
  once(eventName, callback) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    const onceWrapper = (...args) => {
      this.off(eventName, onceWrapper);
      callback(...args);
    };

    this.listeners[eventName].push(onceWrapper);
  }
  off(eventName, callback) {
    this.listeners[eventName] = this.listeners[eventName].filter(
      (item) => item !== callback,
    );
  }
  emit(eventName, ...args) {
    for (const callback of this.listeners[eventName]) {
      callback(...args);
    }
  }
  prependListener(eventName, callback) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].unshift(callback);
  }
  prependOnceListener(eventName, callback) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    const onceWrapper = (...args) => {
      this.off(eventName, onceWrapper);
      callback(...args);
    };

    this.listeners[eventName].unshift(onceWrapper);
  }
  removeAllListeners(eventName) {
    if (eventName) {
      this.listeners[eventName] = [];
    } else {
      this.listeners = {};
    }
  }
  listenerCount(eventName) {
    return eventName in this.listeners ? this.listeners[eventName].length : 0;
  }
}

module.exports = MyEventEmitter;
