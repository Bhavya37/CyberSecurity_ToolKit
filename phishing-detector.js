function checkPhishingURL() {
    const urlInput = document.getElementById('url-input');
    const resultDiv = document.getElementById('url-result');

    if (!urlInput || !resultDiv) {
        console.error('URL input or result div not found');
        return;
    }

    const url = urlInput.value.trim();

    if (!url) {
        resultDiv.innerHTML = '<p style="color:red;">Please enter a URL</p>';
        return;
    }

    try {
        const parsedURL = new URL(url);
        const domain = parsedURL.hostname;
        
        // Basic phishing detection checks
        const checks = [
            {
                name: 'Suspicious TLDs',
                check: () => {
                    const suspiciousTLDs = ['.tk', '.ml', '.ga', '.cf', '.gq'];
                    return suspiciousTLDs.some(tld => domain.endsWith(tld));
                }
            },
            {
                name: 'Suspicious Subdomain',
                check: () => {
                    const suspiciousPrefixes = ['login-', 'verify-', 'secure-', 'account-'];
                    return suspiciousPrefixes.some(prefix => domain.includes(prefix));
                }
            },
            {
                name: 'IP Address in URL',
                check: () => {
                    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
                    return ipRegex.test(domain);
                }
            },
            {
                name: 'Long and Complex Domain',
                check: () => domain.length > 50
            }
        ];

        const failedChecks = checks.filter(check => check.check());

        if (failedChecks.length > 0) {
            resultDiv.innerHTML = `
                <p style="color:red;">🚨 Potential Phishing URL Detected!</p>
                <h3>Suspicious Characteristics:</h3>
                <ul>
                    ${failedChecks.map(check => `<li>${check.name}</li>`).join('')}
                </ul>
                <p>⚠️ Proceed with caution!</p>
            `;
        } else {
            resultDiv.innerHTML = `
                <p style="color:green;">✅ URL appears to be safe</p>
                <p>Domain: ${domain}</p>
            `;
        }
    } catch (error) {
        resultDiv.innerHTML = '<p style="color:red;">Invalid URL format</p>';
    }
}

// Add event listener to the URL check button
document.addEventListener('DOMContentLoaded', () => {
    const urlCheckButton = document.querySelector('#phishing-detector button');
    if (urlCheckButton) {
        urlCheckButton.addEventListener('click', checkPhishingURL);
    }
});