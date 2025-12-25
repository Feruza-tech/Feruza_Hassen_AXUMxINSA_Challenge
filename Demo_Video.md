[Go To Demo_Video](https://drive.google.com/file/d/1gKg31bdlM_IUpRu2Uu5g_ma1BnuolG7Z/view?usp=drive_link)

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

URL allowlists alone are insufficient

DNS resolution must be validated after resolution

Internal services must enforce authentication

SVG is a dangerous file format if not sanitized

SSRF can escalate into full internal compromise

Defense-in-depth is mandatory, not optional
