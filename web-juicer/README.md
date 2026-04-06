# Web Juicer - Firefox Extension

A penetration testing tool inspired by HackBar and DH Hackbar, built with Manifest V3 for Firefox.

## Features

- **macOS-inspired UI**: Sleek dark mode with glassmorphism effects and traffic light buttons
- **SQL Injection Payloads**: Common SQLi vectors for quick insertion
- **XSS Vectors**: Pre-built XSS payloads for testing
- **Encoding/Decoding**: URL, Base64, and SHA-256 hashing tools
- **Custom Headers**: Modify User-Agent and Referer headers
- **Request Methods**: Switch between GET and POST requests
- **Tab Integration**: Load and execute requests in the current tab

## Installation

1. Clone or download this repository
2. Open Firefox and navigate to `about:debugging`
3. Click "This Firefox" → "Load Temporary Add-on"
4. Select the `manifest.json` file from the web-juicer folder
5. The Web Juicer icon will appear in your toolbar

## Usage

### Basic Operations

1. **Load Current URL**: Click "Load URL" to fetch the active tab's URL
2. **Insert Payloads**: Select from SQLi or XSS dropdowns and click "Insert"
3. **Encode/Decode**: Use the encoding tools to transform your payloads
4. **Execute**: Click "Execute" to run the request (Ctrl/Cmd + Enter)

### Keyboard Shortcuts

- `Ctrl/Cmd + Enter`: Execute request
- `Ctrl/Cmd + L`: Load current URL
- `Escape`: Clear all inputs

### Tabs

- **SQLi**: SQL Injection payloads and vectors
- **XSS**: Cross-site scripting payloads
- **Encoding**: URL, Base64, and hashing tools
- **Tools**: Custom headers and request methods

## File Structure

```
web-juicer/
├── manifest.json       # Extension manifest (Manifest V3)
├── popup.html         # Main popup interface
├── styles.css         # macOS-inspired styling
├── logic.js           # Core functionality
├── background.js      # Background script
├── icons/            # Extension icons (add your own)
└── README.md         # This file
```

## Development

To modify or extend the extension:

1. Edit the relevant files in the `web-juicer/` directory
2. Reload the extension in Firefox's about:debugging page
3. Changes will take effect immediately

## Security Note

This tool is designed for authorized penetration testing and security research only. Users are responsible for ensuring they have proper authorization before testing any systems.

## Firefox APIs Used

- `browser.tabs`: For tab manipulation and URL loading
- `browser.webRequest`: For header modification (future enhancement)
- `browser.storage`: For persisting settings (future enhancement)

## Future Enhancements

- POST request functionality with form data
- Request/response interception
- Payload history and favorites
- Export/import functionality
- Advanced encoding options
- Proxy configuration

## License

MIT License - feel free to modify and distribute as needed for security testing purposes.
