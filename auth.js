// auth.js - Handles authentication for X URL Generator

export default class AuthManager {
  constructor(statusElem) {
    this.authStatus = statusElem;
    this.apiToken = localStorage.getItem('bearerToken') || '';
    this.clientID = localStorage.getItem('clientID') || '';
    this.redirectURI = window.location.origin;
  }

  getToken() {
    return this.apiToken;
  }

  storeToken(token) {
    this.apiToken = token;
    localStorage.setItem('bearerToken', token);
    this.updateStatus(true);
  }

  verifyToken() {
    if (!this.apiToken) {
      this.updateStatus(false);
      return;
    }

    fetch('https://api.twitter.com/2/users/me', {
      headers: {
        Authorization: `Bearer ${this.apiToken}`
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(data => {
        this.updateStatus(true);
        document.getElementById('userInfoBox').textContent = `Hello, @${data.data.username}`;
      })
      .catch(() => {
        this.updateStatus(false);
      });
  }

  updateStatus(valid) {
    this.authStatus.classList.remove('valid', 'invalid');
    this.authStatus.classList.add(valid ? 'valid' : 'invalid');
    this.authStatus.textContent = valid ? 'Token Valid ✅' : 'Token Invalid ❌';
  }

  handleOAuthLogin() {
    const url = `https://twitter.com/i/oauth2/authorize?response_type=token&client_id=${this.clientID}&redirect_uri=${encodeURIComponent(this.redirectURI)}&scope=tweet.read users.read follows.read&state=state&code_challenge=challenge&code_challenge_method=plain`;
    window.location.href = url;
  }

  handleLogout() {
    localStorage.removeItem('bearerToken');
    localStorage.removeItem('clientID');
    sessionStorage.clear();
    window.location.reload();
  }
}
