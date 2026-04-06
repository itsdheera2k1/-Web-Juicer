# Web Juicer Extension - Installation Guide

## 🚀 Ready to Install Extension

The Web Juicer Firefox extension is now ready for installation!

### 📦 Extension Files Structure
```
web-juicer/
├── manifest.json       ✅ Manifest V3 configuration
├── popup.html         ✅ Main interface
├── styles.css         ✅ macOS-inspired styling
├── logic.js           ✅ Core functionality
├── background.js      ✅ Background script
├── icons/             ✅ Custom icon set
│   ├── icon-16.png
│   ├── icon-32.png
│   ├── icon-48.png
│   └── icon-128.png
└── README.md          📖 Documentation
```

### 🔧 Installation Steps

1. **Open Firefox**
   - Launch Firefox browser

2. **Access Debugging**
   - Type `about:debugging` in the address bar
   - Press Enter

3. **Load Temporary Add-on**
   - Click "This Firefox" on the left sidebar
   - Click "Load Temporary Add-on" button
   - Navigate to the `web-juicer` folder
   - Select the `manifest.json` file

4. **Verify Installation**
   - Look for the Web Juicer icon in Firefox toolbar
   - Click the icon to open the extension

### ✅ Features Available

- **🎨 macOS Dark UI** - Glassmorphism design with traffic lights
- **💉 SQLi Payloads** - Common injection vectors
- **🎯 XSS Vectors** - Cross-site scripting payloads  
- **🔐 Encoding Tools** - URL, Base64, SHA-256 hashing
- **🌐 Custom Headers** - User-Agent and Referer modification
- **📋 Tab Integration** - Load current URL and execute
- **⌨️ Keyboard Shortcuts** - Ctrl+Enter, Ctrl+L, Escape

### 🎯 Quick Start

1. Click the Web Juicer icon in toolbar
2. Click "Load URL" to fetch current tab's URL
3. Select payloads from SQLi/XSS dropdowns
4. Use encoding tools as needed
5. Click "Execute" to run (Ctrl+Enter)

### 🔧 Troubleshooting

**Extension won't load:**
- Ensure all files are in the correct folder structure
- Check that `manifest.json` is valid JSON
- Verify all icon files exist in `icons/` folder

**Permissions error:**
- Firefox may show permission warnings - this is normal for security tools
- Accept the permissions to continue

**Icon not showing:**
- Check that all PNG files are present
- Ensure icon paths in manifest.json are correct

### 📱 Extension Permissions

The extension requests these permissions for functionality:
- `activeTab` - Access current tab content
- `tabs` - Tab manipulation and URL loading
- `storage` - Save preferences (future feature)
- `webRequest` - Header modification (future feature)
- `webRequestBlocking` - Request interception (future feature)
- `<all_urls>` - Work on any website

### 🎨 Custom Icon

Your custom "WJ" logo with dripping effect and security theme is now active!

---

**🎉 Extension is ready for penetration testing!**

For support or feature requests, refer to the README.md file.
