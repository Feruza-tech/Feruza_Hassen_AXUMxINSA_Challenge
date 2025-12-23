VulnGram 🔐

VulnGram is a Node.js + React security lab application designed to demonstrate real-world web vulnerabilities and exploitation techniques for educational and ethical hacking purposes.

This project was used to analyze, exploit, and document vulnerabilities such as DNS Rebinding via image URL fetching, including proof-of-concept exploits and fixes.

📁 Project Structure
VULNGRAM/
│
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── layout/
│       ├── pages/
│       │   ├── Chat.jsx
│       │   ├── Home.jsx
│       │   ├── Login.jsx
│       │   ├── Profile.jsx
│       │   └── Register.jsx
│       ├── App.jsx
│       ├── index.js
│       └── index.css
│
├── server/                 # Node.js backend
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── profileController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── admin.js
│   │   ├── auth.js
│   │   ├── chat.js
│   │   └── profile.js
│   ├── services/
│   │   └── imageFetcher.js
│   ├── uploads/            # Uploaded avatars (exploitation target)
│   ├── server.js
│   └── .env
│
├── exploit-scripts/        # DNS rebinding & attack scripts
├── documentation/          # Vulnerability reports & PoCs
└── README.md

⚙️ Tech Stack

Frontend: React

Backend: Node.js, Express

Database: PostgreSQL

Authentication: Session-based

Security Focus: SSRF, DNS Rebinding, insecure allowlists

🚨Demonstrated Vulnerabilities

   DNS Rebinding via avatar-from-url

   Internal service access (/internal/admin)

   Improper URL validation

   Insecure image fetching

  Each vulnerability includes:

   Technical explanation

   Proof of concept

   Exploit scripts (Python / Bash)

   Impact analysis

  Fix recommendations


👩‍💻 Author

Feruza Hassen
Computer Science Student
Focus: Cybersecurity, Penetration Testing, Red Teaming
