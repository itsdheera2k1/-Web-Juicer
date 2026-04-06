🧃 Web Juicer

Web Juicer is a sleek, macOS-inspired browser extension designed for web security researchers, bug bounty hunters, and penetration testers. It provides a centralized sidebar to test for common vulnerabilities without breaking your workflow.


🚀 Features & Interface
1. SQL Injection (SQLi)

Quickly access a curated collection of SQL injection payloads including Classic OR, Union Select, and Database/Table enumeration strings.
2. XSS Vectors

A library of ready-to-use Cross-Site Scripting strings, including Image OnError, JavaScript URI, and SVG injection methods.
3. Live Encoding & Hashing

Instantly convert strings between URL, Base64, and MD5 formats for data obfuscation and bypass analysis.
4. Advanced Tools

Modify User-Agent and Referer headers on the fly and toggle between GET and POST request methods.
🛠️ Built With

    JavaScript (ES6+) - Core logic and DOM manipulation.

    CSS3 - Custom styling with a professional dark-mode macOS aesthetic.

    Manifest V3 - Built for the latest browser extension standards.

    Node.js / EJS - Used for component rendering and backend logic.

📦 Installation
For Firefox (Temporary Load)

    Clone the repository: git clone https://github.com/your-username/web-juicer.git

    Open Firefox and type about:debugging in the URL bar.

    Click "This Firefox" -> "Load Temporary Add-on...".

    Select the manifest.json file from the project folder.

For Chrome / Brave

    Open your browser and go to chrome://extensions/.

    Enable "Developer mode" in the top right.

    Click "Load unpacked" and select the project folder.

🖥️ Usage

    Click the Web Juicer icon in your browser toolbar to open the sidebar.

    Select your target category (SQLi, XSS, etc.).

    Choose a payload or enter a custom URL/string.

    Click Execute to inject the payload or Load URL to fetch the current tab's address.
