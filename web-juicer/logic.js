// Web Juicer Extension Logic
class WebJuicer {
    constructor() {
        this.requestCount = 0;
        this.currentTab = null;
        this.customHeaders = {};
        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.loadCurrentTab();
        this.updateStatus('Ready');
    }

    setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // SQLi payload insertion
        document.getElementById('insert-sqli').addEventListener('click', () => {
            this.insertPayload('sqli-payloads');
        });

        // XSS payload insertion
        document.getElementById('insert-xss').addEventListener('click', () => {
            this.insertPayload('xss-payloads');
        });

        // Encoding functions
        document.getElementById('url-encode').addEventListener('click', () => {
            this.encodeURL();
        });

        document.getElementById('url-decode').addEventListener('click', () => {
            this.decodeURL();
        });

        document.getElementById('base64-encode').addEventListener('click', () => {
            this.encodeBase64();
        });

        document.getElementById('base64-decode').addEventListener('click', () => {
            this.decodeBase64();
        });

        document.getElementById('md5-hash').addEventListener('click', () => {
            this.hashMD5();
        });

        // Custom headers
        document.getElementById('apply-headers').addEventListener('click', () => {
            this.applyCustomHeaders();
        });

        // Main actions
        document.getElementById('load-url').addEventListener('click', () => {
            this.loadCurrentURL();
        });

        document.getElementById('execute').addEventListener('click', () => {
            this.executeRequest();
        });

        document.getElementById('clear').addEventListener('click', () => {
            this.clearInput();
        });

        // Auto-resize textarea
        const urlInput = document.getElementById('url-input');
        urlInput.addEventListener('input', () => {
            this.autoResizeTextarea(urlInput);
        });
    }

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');
    }

    insertPayload(selectId) {
        const select = document.getElementById(selectId);
        const textarea = document.getElementById('url-input');
        const selectedValue = select.value;

        if (selectedValue) {
            const cursorPos = textarea.selectionStart;
            const textBefore = textarea.value.substring(0, cursorPos);
            const textAfter = textarea.value.substring(textarea.selectionEnd);
            
            textarea.value = textBefore + selectedValue + textAfter;
            textarea.focus();
            textarea.setSelectionRange(cursorPos + selectedValue.length, cursorPos + selectedValue.length);
            
            this.updateStatus(`Inserted payload: ${selectedValue.substring(0, 30)}...`);
        }
    }

    encodeURL() {
        const textarea = document.getElementById('url-input');
        const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
        
        if (selectedText) {
            const encoded = encodeURIComponent(selectedText);
            this.replaceSelectedText(textarea, encoded);
            this.updateStatus('URL encoded selected text');
        } else {
            textarea.value = encodeURIComponent(textarea.value);
            this.updateStatus('URL encoded entire input');
        }
    }

    decodeURL() {
        const textarea = document.getElementById('url-input');
        const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
        
        if (selectedText) {
            try {
                const decoded = decodeURIComponent(selectedText);
                this.replaceSelectedText(textarea, decoded);
                this.updateStatus('URL decoded selected text');
            } catch (e) {
                this.updateStatus('Error: Invalid URL encoding');
            }
        } else {
            try {
                textarea.value = decodeURIComponent(textarea.value);
                this.updateStatus('URL decoded entire input');
            } catch (e) {
                this.updateStatus('Error: Invalid URL encoding');
            }
        }
    }

    encodeBase64() {
        const textarea = document.getElementById('url-input');
        const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
        
        if (selectedText) {
            const encoded = btoa(selectedText);
            this.replaceSelectedText(textarea, encoded);
            this.updateStatus('Base64 encoded selected text');
        } else {
            textarea.value = btoa(textarea.value);
            this.updateStatus('Base64 encoded entire input');
        }
    }

    decodeBase64() {
        const textarea = document.getElementById('url-input');
        const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
        
        if (selectedText) {
            try {
                const decoded = atob(selectedText);
                this.replaceSelectedText(textarea, decoded);
                this.updateStatus('Base64 decoded selected text');
            } catch (e) {
                this.updateStatus('Error: Invalid Base64');
            }
        } else {
            try {
                textarea.value = atob(textarea.value);
                this.updateStatus('Base64 decoded entire input');
            } catch (e) {
                this.updateStatus('Error: Invalid Base64');
            }
        }
    }

    async hashMD5() {
        const textarea = document.getElementById('url-input');
        const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
        const textToHash = selectedText || textarea.value;
        
        try {
            const encoder = new TextEncoder();
            const data = encoder.encode(textToHash);
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            
            if (selectedText) {
                this.replaceSelectedText(textarea, hashHex);
            } else {
                textarea.value = hashHex;
            }
            
            this.updateStatus('SHA-256 hash generated');
        } catch (e) {
            this.updateStatus('Error: Failed to generate hash');
        }
    }

    replaceSelectedText(textarea, newText) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        
        textarea.value = text.substring(0, start) + newText + text.substring(end);
        textarea.focus();
        textarea.setSelectionRange(start + newText.length, start + newText.length);
    }

    applyCustomHeaders() {
        const userAgent = document.getElementById('user-agent').value;
        const referer = document.getElementById('referer').value;
        
        this.customHeaders = {};
        
        if (userAgent) {
            this.customHeaders['User-Agent'] = userAgent;
        }
        
        if (referer) {
            this.customHeaders['Referer'] = referer;
        }
        
        const headerCount = Object.keys(this.customHeaders).length;
        this.updateStatus(`Applied ${headerCount} custom header(s)`);
    }

    async loadCurrentTab() {
        try {
            const tabs = await browser.tabs.query({ active: true, currentWindow: true });
            this.currentTab = tabs[0];
        } catch (error) {
            console.error('Error loading current tab:', error);
            this.updateStatus('Error: Could not load current tab');
        }
    }

    async loadCurrentURL() {
        if (this.currentTab && this.currentTab.url) {
            document.getElementById('url-input').value = this.currentTab.url;
            this.updateStatus('Loaded current URL');
        } else {
            await this.loadCurrentTab();
            if (this.currentTab && this.currentTab.url) {
                document.getElementById('url-input').value = this.currentTab.url;
                this.updateStatus('Loaded current URL');
            } else {
                this.updateStatus('Error: No active tab found');
            }
        }
    }

    async executeRequest() {
        const url = document.getElementById('url-input').value.trim();
        
        if (!url) {
            this.updateStatus('Error: No URL provided');
            return;
        }

        const method = document.querySelector('input[name="method"]:checked').value;
        
        try {
            this.updateStatus('Executing request...');
            
            if (method === 'GET') {
                await browser.tabs.update({ url: url });
            } else {
                // For POST requests, we'll need to use content script or background script
                // For now, we'll open the URL and note that POST functionality needs backend
                await browser.tabs.update({ url: url });
                this.updateStatus('POST request - URL opened (full POST needs backend)');
            }
            
            this.requestCount++;
            document.getElementById('request-count').textContent = `Requests: ${this.requestCount}`;
            
            setTimeout(() => {
                this.updateStatus('Request executed');
            }, 1000);
            
        } catch (error) {
            console.error('Error executing request:', error);
            this.updateStatus('Error: Failed to execute request');
        }
    }

    clearInput() {
        document.getElementById('url-input').value = '';
        document.getElementById('user-agent').value = '';
        document.getElementById('referer').value = '';
        document.getElementById('sqli-payloads').selectedIndex = 0;
        document.getElementById('xss-payloads').selectedIndex = 0;
        this.updateStatus('Cleared all inputs');
    }

    autoResizeTextarea(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 150) + 'px';
    }

    updateStatus(message) {
        const statusElement = document.getElementById('status-text');
        statusElement.textContent = message;
        
        // Add color coding based on message type
        if (message.includes('Error')) {
            statusElement.style.color = '#ff3b30';
        } else if (message.includes('executed') || message.includes('loaded')) {
            statusElement.style.color = '#28ca42';
        } else {
            statusElement.style.color = '#007aff';
        }
        
        // Auto-clear status after 3 seconds for non-error messages
        if (!message.includes('Error')) {
            setTimeout(() => {
                if (statusElement.textContent === message) {
                    statusElement.textContent = 'Ready';
                    statusElement.style.color = '#28ca42';
                }
            }, 3000);
        }
    }
}

// Initialize the extension when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WebJuicer();
});

// Handle keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to execute
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('execute').click();
    }
    
    // Ctrl/Cmd + L to load URL
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        document.getElementById('load-url').click();
    }
    
    // Escape to clear
    if (e.key === 'Escape') {
        document.getElementById('clear').click();
    }
});
