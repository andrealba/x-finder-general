# X URL Generator App

A JavaScript application (OOP-based) for generating and displaying profile, list, and community URLs from [X (formerly Twitter)](https://x.com), featuring OAuth 2.0 support, token refresh, local storage, and filtered blocked users.

---

## 🚀 Features

- OAuth 2.0 PKCE login (using your X Developer Client ID)
- Automatic token refresh (if supported by your client)
- Persistent storage using `localStorage` and `sessionStorage`
- Manual logout (clears all stored tokens)
- Dynamic URL generation for:

  - **Communities**: members, moderators
  - **Lists**: followers, members
  - **Users**: followers, following, verified followers

- Visual indicator of authentication status
- Modern UI styled like X.com

---

## 💧 How to Use Locally

1. Clone or download this project:

   ```bash
   git clone https://github.com/your-username/my-project.git
   cd my-project
   ```

2. Open `x-url-generator.html` in your browser directly, or launch a local server:

   ```bash
   # With Python 3
   python -m http.server
   # Then visit http://localhost:8000
   ```

3. Fill in the required fields:

   - Your **Client ID** from [developer.x.com](https://developer.x.com)
   - Optionally, a **Bearer Token**
   - One of: Community ID, List ID, or User ID

4. Click "Login with X" to begin the OAuth flow.

---

## 🌐 Deploying on GitHub Pages

1. Copy `x-url-generator.html` to your repo root.
2. (Optional) Rename to `index.html`.
3. In GitHub > Settings > Pages:

   - Set source to `main` branch, root folder (`/`).

4. After deployment, add the following URI in your app settings on X Developer Portal:

   ```
   https://your-username.github.io/my-project
   ```

---

## 🔒 Security Notes

Tokens are stored in `localStorage` for ease of use during development. In production:

- Consider encrypting tokens
- Set shorter token expiration
- Implement CORS protection on server
- Strip debug logs and error traces

---

## 📄 License

This project is released under the MIT License.
