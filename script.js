// script.js - JavaScript for X URL Generator App

/**
 * Class representing the X URL Generator app functionality.
 */
class XURLGenerator {
  constructor() {
    // Stored OAuth token and client ID
    this.apiToken = '';
    this.clientID = '';
    // Redirect URI set to current origin (can be customized)
    this.redirectURI = window.location.origin;
    // DOM reference to the auth status element
    this.authStatus = document.getElementById('authStatus');
    this.userInfoBox = document.getElementById('userInfoBox');
    // Initialize event listeners and restore tokens from storage
    this.attachEvents();
    this.restoreTokens();
    this.updateAuthIndicator();
    this.verifyToken();
  }

  /**
   * Attaches event listeners to buttons and input fields.
   */
  attachEvents() {
    document.getElementById('oauthBtn').addEventListener('click', () => this.startOAuth());
    document.getElementById('logoutBtn').addEventListener('click', () => this.logout());

    // Input fields trigger URL generation on change
    ['communityID', 'listID', 'userID'].forEach(id =>
      document.getElementById(id).addEventListener('input', () => this.generateURLs())
    );

    // Update tokens on input change
    document.getElementById('apiToken').addEventListener('input', e => {
      this.apiToken = e.target.value;
      this.saveTokens();
      this.updateAuthIndicator();
    });

    document.getElementById('clientID').addEventListener('input', e => {
      this.clientID = e.target.value;
      this.saveTokens();
    });
  }

  /**
   * Initiates the OAuth login process with PKCE (simplified).
   */
  startOAuth() {
    if (!this.clientID) {
      alert('Please enter your Client ID before logging in.');
      return;
    }
    // Normally, redirect to X OAuth endpoint with PKCE params here
    alert('OAuth flow start - redirect to X login here.');
  }

  /**
   * Restores saved tokens from localStorage/sessionStorage.
   */
  restoreTokens() {
    this.apiToken = localStorage.getItem('apiToken') || '';
    this.clientID = localStorage.getItem('clientID') || '';
    document.getElementById('apiToken').value = this.apiToken;
    document.getElementById('clientID').value = this.clientID;
  }

  /**
   * Saves current tokens to localStorage.
   */
  saveTokens() {
    localStorage.setItem('apiToken', this.apiToken);
    localStorage.setItem('clientID', this.clientID);
  }

  /**
   * Clears tokens from storage and updates UI.
   */
  logout() {
    localStorage.removeItem('apiToken');
    localStorage.removeItem('clientID');
    sessionStorage.clear();
    this.apiToken = '';
    this.clientID = '';
    document.getElementById('apiToken').value = '';
    document.getElementById('clientID').value = '';
    this.updateAuthIndicator();
    alert('Logged out successfully.');
  }

  /**
   * Updates the visual auth indicator based on token validity.
   * Green = valid token, Red = no token.
   */
  updateAuthIndicator() {
    if (this.apiToken) {
      this.authStatus.textContent = '✅ Authenticated';
      this.authStatus.classList.add('valid');
      this.authStatus.classList.remove('invalid');
    } else {
      this.authStatus.textContent = '❌ Not Authenticated';
      this.authStatus.classList.add('invalid');
      this.authStatus.classList.remove('valid');
    }
  }

  /**
   * Generates URLs based on the inputs and displays them with tabs.
   */
  generateURLs() {
    const communityID = document.getElementById('communityID').value.trim();
    const listID = document.getElementById('listID').value.trim();
    const userID = document.getElementById('userID').value.trim();

    const container = document.getElementById('urlContainer');
    container.innerHTML = ''; // clear previous URLs

    const createTab = (name, url) => {
      const tab = document.createElement('div');
      tab.className = 'x-tab';
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.textContent = name;
      tab.appendChild(a);
      return tab;
    };

    if (communityID) {
      container.appendChild(createTab('Community Members', `https://x.com/i/communities/${communityID}/members`));
      container.appendChild(createTab('Community Moderators', `https://x.com/i/communities/${communityID}/moderators`));
    }

    if (listID) {
      container.appendChild(createTab('List Followers', `https://x.com/i/lists/${listID}/followers`));
      container.appendChild(createTab('List Members', `https://x.com/i/lists/${listID}/members`));
    }

    if (userID) {
      container.appendChild(createTab('User Followers', `https://x.com/${userID}/followers`));
      container.appendChild(createTab('User Following', `https://x.com/${userID}/following`));
      container.appendChild(createTab('Verified Followers', `https://x.com/${userID}/verified_followers`));
    }
  }
}

// Instantiate the app once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.xApp = new XURLGenerator();
});
