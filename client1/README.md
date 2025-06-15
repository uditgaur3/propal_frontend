# proPAL AI Frontend

A modern, multilingual Voice AI platform dashboard for SMBs in India, built with Next.js (App Router), Tailwind CSS, and React. This project demonstrates authentication, user profile management, agent configuration, and a clean, responsive UI.

![Landing Page](screenshots/Screenshot%202025-06-15%20193652.png)
![Dashboard](screenshots/Screenshot%202025-06-15%20203758.png)

---

## 🎬 Demo Video

https://user-images.githubusercontent.com/your-github-username/your-repo-name/main/screenshots/20250615-1705-56.8988469.mp4

<details>
<summary>Click to view embedded video (if supported by your markdown viewer)</summary>

<video src="screenshots/20250615-1705-56.8988469.mp4" controls width="700"></video>

</details>

---

## 🚀 Features
- **Next.js App Router** for fast, scalable routing
- **Tailwind CSS** for beautiful, responsive design
- **Authentication** (Sign Up, Login, Protected Dashboard)
- **Profile Management** (update email/password)
- **Agent Configuration** (provider/model/language dropdowns)
- **Dark Mode** (toggle and persist)
- **Form validation & feedback**
- **LRU cache utility** for efficient resource use
- **No sensitive info in cookies/localStorage**

---

## 📂 Project Structure
```
public/
  users.json         # User data (for demo, flat file)
  stt.json           # Agent config data
  ...
src/
  app/               # Next.js app router pages
    api/             # API routes for auth, users
    dashboard/       # Protected dashboard, profile, agent
    ...
  components/        # UI components
  contexts/          # React contexts (auth, notifications)
  hooks/             # Custom React hooks
  lib/               # Utilities (e.g., LRUCache)
```

---

## 🛠️ Requirements
- Node.js v18+
- npm v9+

---

## 📦 Installation
```bash
# Clone the repo
$ git clone <your-repo-url>
$ cd client1

# Install dependencies
$ npm install
```

---

## 🏗️ Build & Run
```bash
# Build for production
$ npm run build

# Start the production server
$ npm start

# Or, for development
$ npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## ✨ Usage
### 1. Landing Page
- Click **Sign Up** to register a new user.

### 2. Sign Up
- Fields: username, email, password, phone (optional)
- Data saved to `/public/users.json`
- On success, redirect to login.

### 3. Login
- Fields: email, password
- Validates against `/public/users.json`
- On success, redirects to dashboard.

### 4. Dashboard (Protected)
- Sidebar navigation: **Profile** and **Agent**
- Highlights active page

#### Profile
- View and update email/password
- Changes saved to `/public/users.json`

#### Agent
- 3 interdependent dropdowns: Provider, Model, Language (from `/public/stt.json`)
- Changing one updates the others
- Summary card shows selected config

---

## 🌗 Dark Mode
- Toggle with the button in the header/sidebar
- Preference is saved and persisted

---

## 🖼️ Screenshots
### Landing Page
![Landing Page](screenshots/Screenshot%202025-06-15%20193652.png)

### Dashboard
![Dashboard](screenshots/Screenshot%202025-06-15%20203758.png)

### Profile Page
![Profile](screenshots/Screenshot%202025-06-15%20221137.png)

### Agent Config
![Agent](screenshots/Screenshot%202025-06-15%20221201.png)

---

## 🔒 Security & Best Practices
- **No sensitive info** (passwords, emails, phone) is stored in cookies or localStorage
- Only session tokens or non-sensitive identifiers are stored in cookies
- All user data is stored in `/public/users.json` (for demo; use a DB for production)
- LRU cache utility for efficient resource use

---

## 📄 License
MIT

---

## 🤝 Credits
- [proPAL AI](https://propalai.com)
- Built with Next.js, Tailwind CSS, React
