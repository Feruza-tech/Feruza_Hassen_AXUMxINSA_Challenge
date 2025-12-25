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


🚨 Demonstrated Vulnerabilities [GO_TO_DEMO_VIDEO](https://drive.google.com/file/d/1gKg31bdlM_IUpRu2Uu5g_ma1BnuolG7Z/view?usp=drive_link)

- DNS Rebinding via avatar-from-url feature
- Internal service access (/internal/admin)
- Improper URL validation
- Insecure server-side image fetching
🔄 Alternative Exploitation Paths

In addition to avatar uploads, similar exploitation could occur via:

Any backend feature that fetches:
Webhooks
- Link previews
- Profile metadata
- External APIs by URL
- Redirect-based SSRF
- File upload handlers that accept SVG or XML
- Misconfigured proxy or reverse proxy trust

If the application cached DNS results longer, the attack would fail — making DNS TTL control critical.

🔗 Bonus: Chained Exploit
Exploit Chain Used

1️⃣ Improper URL Validation (SSRF entry point)
User-supplied image URLs are fetched without strict validation.

⬇️

2️⃣ DNS Rebinding
Hostname resolves first to attacker, then to 127.0.0.1.

⬇️

3️⃣ Internal Admin Route Exposure
Internal endpoint /internal/admin is accessible from localhost.

⬇️

4️⃣ SVG Data Exfiltration
Sensitive internal responses embedded inside an image file.

⬇️

5️⃣ Stored Data Leak
Exfiltrated data stored permanently in uploads/ directory.

This demonstrates a multi-stage real-world exploit, not a single isolated bug.
📘 Lessons Learned
- URL allowlists alone are insufficient
- DNS resolution must be validated after resolution
- Internal services must enforce authenticatio
- SVG is a dangerous file format if not sanitized
- SSRF can escalate into full internal compromise
- Defense-in-depth is mandatory, not optional

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


