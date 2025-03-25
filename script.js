document.addEventListener('DOMContentLoaded', () => {
    // Navigation buttons
    const passwordCheckerBtn = document.querySelector('nav button:first-child');
    const phishingDetectorBtn = document.querySelector('nav button:last-child');
    
    const passwordCheckerSection = document.getElementById('password-checker');
    const phishingDetectorSection = document.getElementById('phishing-detector');

    // Default to password checker section
    passwordCheckerSection.style.display = 'block';
    phishingDetectorSection.style.display = 'none';

    // Add click event listeners
    passwordCheckerBtn.addEventListener('click', () => {
        passwordCheckerSection.style.display = 'block';
        phishingDetectorSection.style.display = 'none';
    });

    phishingDetectorBtn.addEventListener('click', () => {
        passwordCheckerSection.style.display = 'none';
        phishingDetectorSection.style.display = 'block';
    });

    // Password input event listener
    const passwordInput = document.getElementById('password-input');
    if (passwordInput) {
        passwordInput.addEventListener('input', checkPasswordStrength);
    }
});