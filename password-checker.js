function checkPasswordStrength() {
    const passwordInput = document.getElementById('password-input');
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');
    const suggestionDiv = document.getElementById('password-suggestions');

    if (!passwordInput || !strengthBar || !strengthText || !suggestionDiv) {
        console.error('One or more elements not found');
        return;
    }

    const password = passwordInput.value;

    if (password.length === 0) {
        strengthBar.style.width = '0%';
        strengthText.textContent = 'Password strength will be shown here';
        suggestionDiv.innerHTML = '';
        return;
    }

    const entropy = calculateEntropy(password);
    let strength = 'Weak';
    let color = 'red';
    let width = '33%';

    if (entropy > 40) {
        strength = 'Strong';
        color = 'green';
        width = '100%';
    } else if (entropy > 20) {
        strength = 'Medium';
        color = 'orange';
        width = '66%';
    }

    strengthBar.style.width = width;
    strengthBar.style.backgroundColor = color;
    strengthText.textContent = `Password Strength: ${strength} (Entropy: ${entropy.toFixed(2)})`;

    // Suggestions
    suggestionDiv.innerHTML = generateSuggestions(password);
}

function calculateEntropy(password) {
    // Calculate password entropy
    const charsetSize = getCharsetSize(password);
    return password.length * Math.log2(charsetSize);
}

function getCharsetSize(password) {
    let hasLower = /[a-z]/.test(password);
    let hasUpper = /[A-Z]/.test(password);
    let hasNumber = /[0-9]/.test(password);
    let hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    
    let charsetSize = 0;
    if (hasLower) charsetSize += 26;
    if (hasUpper) charsetSize += 26;
    if (hasNumber) charsetSize += 10;
    if (hasSpecial) charsetSize += 32;
    
    return charsetSize || 1;
}

function generateSuggestions(password) {
    let suggestions = [];

    if (password.length < 12) {
        suggestions.push('✦ Use at least 12 characters');
    }
    if (!/[A-Z]/.test(password)) {
        suggestions.push('✦ Include uppercase letters');
    }
    if (!/[0-9]/.test(password)) {
        suggestions.push('✦ Add numbers');
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        suggestions.push('✦ Use special characters');
    }

    return suggestions.length > 0 
        ? `<h3>Suggestions:</h3><ul>${suggestions.map(s => `<li>${s}</li>`).join('')}</ul>`
        : '';
}