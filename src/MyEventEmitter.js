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

    onceWrapper._original = callback;

    this.listeners[eventName].push(onceWrapper);
  }
  off(eventName, callback) {
    this.listeners[eventName] = this.listeners[eventName].filter(
      (item) => item !== callback && item._original !== callback,
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

    onceWrapper._original = callback;

    this.listeners[eventName].unshift(onceWrapper);
  }
  removeAllListeners(eventName) {
    if (arguments.length === 0) {
      this.listeners = {};
    } else {
      this.listeners[eventName] = [];
    }
  }
  listenerCount(eventName) {
    return (this.listeners[eventName] || []).length;
  }
}

module.exports = MyEventEmitter;
