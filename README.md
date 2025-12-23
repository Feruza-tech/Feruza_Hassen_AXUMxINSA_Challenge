VulnGram 🔐

VulnGram is a Node.js + React security lab application designed to demonstrate
real-world web vulnerabilities and exploitation techniques for educational
and ethical hacking purposes.

This project focuses on analyzing, exploiting, and documenting vulnerabilities
such as DNS Rebinding via image URL fetching, including real proof-of-concept
exploits and mitigation strategies.


📁 Project Structure

```text
VULNGRAM/
|
├── client/                     # React frontend
|   ├── public/
|   └── src/
|       ├── layout/
|       ├── pages/
|       |   ├── Chat.jsx
|       |   ├── Home.jsx
|       |   ├── Login.jsx
|       |   ├── Profile.jsx
|       |   └── Register.jsx
|       ├── App.jsx
|       ├── index.js
|       └── index.css
|
├── server/                     # Node.js backend
|   ├── config/
|   |   └── db.js
|   ├── controllers/
|   |   ├── authController.js
|   |   └── profileController.js
|   ├── middleware/
|   |   └── auth.js
|   ├── routes/
|   |   ├── admin.js
|   |   ├── auth.js
|   |   ├── chat.js
|   |   └── profile.js
|   ├── services/
|   |   └── imageFetcher.js
|   ├── uploads/                # Uploaded avatars (exploitation target)
|   ├── server.js
|   └── .env
|
├── exploit-scripts/            # DNS rebinding & attack scripts
├── documentation/              # Vulnerability reports & PoCs
└── README.md


⚙️ Tech Stack

Frontend:
- React

Backend:
- Node.js
- Express

Database:
- PostgreSQL

Authentication:
- Session-based authentication

Security Focus:
- DNS Rebinding
- SSRF
- Insecure URL allowlists
- Unsafe internal service exposure


🚨 Demonstrated Vulnerabilities

- DNS Rebinding via avatar-from-url feature
- Internal service access (/internal/admin)
- Improper URL validation
- Insecure server-side image fetching

Each documented vulnerability includes:
- Technical root cause explanation
- Proof of Concept (PoC)
- Exploit scripts (Python / Bash)
- Impact analysis
- Fix and mitigation recommendations


👩‍💻 Author

Feruza Hassen
Computer Science Student
Focus Areas:
- Cybersecurity
- Penetration Testing
- Red Teaming
