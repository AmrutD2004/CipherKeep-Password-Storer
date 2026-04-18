🔐 CipherKeep — Password Manager

CipherKeep is a secure and intuitive password management application designed to help users store, organize, and manage their credentials safely.

🚀 Features
🔒 AES-256 Encryption
🧠 Organized password vault with categories
🔍 Fast search and filtering
✏️ Add, edit, and delete credentials
📋 One-click copy to clipboard
👤 Secure authentication (JWT-based sessions)
🔐 Google OAuth 2.0 login support
📱 Responsive UI (grid + list views)
🔑 Authentication

CipherKeep supports two authentication methods:

Email & Password (JWT-based)
Google OAuth 2.0 Login

Users can securely sign in using their Google account without manually creating credentials.

🛠 Tech Stack
**Frontend**
React (Vite)
TypeScript
Tailwind CSS
**Backend**
Node.js
Express.js
PostgreSQL
Google OAuth 2.0 (Google Identity Services)

**Project Structure**
├── backend
│   ├── controller
│   │   ├── passwordController.js
│   │   └── userController.js
│   ├── database
│   │   └── database.js
│   ├── middleware
│   │   └── userAuth.js
│   ├── router
│   │   ├── authRouter.js
│   │   └── passwordRouter.js
│   ├── utils
│   │   ├── encryption.js
│   │   └── googleConfig.js
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
├── frontend
│   ├── public 
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── context
│   │   ├── pagess
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── .prettierignore
│   ├── .prettierrc
│   ├── README.md
│   ├── components.json
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vercel.json
│   └── vite.config.ts
