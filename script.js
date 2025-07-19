// script.js

import AuthManager from './auth.js';

class XURLGenerator {
  constructor() {
    window.addEventListener('DOMContentLoaded', () => this.init());
  }

  init() {
    this.authStatus = this.getElem('authStatus');
    this.auth = new AuthManager(this.authStatus);
    this.auth.verifyToken();

    this.attachUIEvents();
  }

  attachUIEvents() {
    this.on('bearerToken', 'input', e => this.auth.storeToken(e.target.value));
    this.on('clientID', 'input', e => localStorage.setItem('clientID', e.target.value));
    this.on('oauthBtn', 'click', () => this.auth.handleOAuthLogin());
    this.on('logoutBtn', 'click', () => this.auth.handleLogout());

    // ... other event bindings
  }

  on(id, event, handler) {
    const el = this.getElem(id);
    if (el) el.addEventListener(event, handler);
  }

  getElem(id) {
    return document.getElementById(id);
  }
}

new XURLGenerator();
