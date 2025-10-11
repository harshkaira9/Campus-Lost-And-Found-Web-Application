// ===================================
// Global Variables
// ===================================
let currentStep = 1;
let userEmail = '';
let verificationCode = '';
let resendTimer = null;
let timeLeft = 60;

// ===================================
// DOM Elements
// ===================================
const emailForm = document.getElementById('email-form');
const codeForm = document.getElementById('code-form');
const resetForm = document.getElementById('reset-form');
const emailInput = document.getElementById('email');
const codeInputs = document.querySelectorAll('.code-input');
const newPasswordInput = document.getElementById('new-password');
const confirmPasswordInput = document.getElementById('confirm-password');
const sendCodeBtn = document.getElementById('send-code-btn');
const verifyCodeBtn = document.getElementById('verify-code-btn');
const resetPasswordBtn = document.getElementById('reset-password-btn');
const resendBtn = document.getElementById('resend-btn');
const toast = document.getElementById('toast');
const togglePasswordBtns = document.querySelectorAll('.toggle-password');

// ===================================
// Event Listeners
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    loadSavedEmail();
});

function setupEventListeners() {
    // Form submissions
    emailForm.addEventListener('submit', handleEmailSubmit);
    codeForm.addEventListener('submit', handleCodeSubmit);
    resetForm.addEventListener('submit', handleResetSubmit);

    // Email input validation
    emailInput.addEventListener('blur', validateEmail);
    emailInput.addEventListener('input', () => {
        clearError('email-error');
    });

    // Code inputs
    setupCodeInputs();

    // Password validation
    newPasswordInput.addEventListener('input', () => {
        checkPasswordStrength();
        validatePasswordRequirements();
        clearError('new-password-error');
    });

    confirmPasswordInput.addEventListener('input', () => {
        validatePasswordMatch();
        clearError('confirm-password-error');
    });

    // Toggle password visibility
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', togglePasswordVisibility);
    });

    // Resend code
    resendBtn.addEventListener('click', handleResendCode);
}

// ===================================
// Step 1: Email Submission
// ===================================
async function handleEmailSubmit(e) {
    e.preventDefault();

    const email = emailInput.value.trim();

    if (!validateEmail()) {
        return;
    }

    // Show loading state
    sendCodeBtn.classList.add('loading');
    sendCodeBtn.disabled = true;

    try {
        // Simulate API call
        await simulateAPICall(1500);

        // Generate verification code
        verificationCode = generateVerificationCode();
        console.log('Verification code:', verificationCode); // For testing

        // Save email
        userEmail = email;
        localStorage.setItem('resetEmail', email);

        // Update UI
        document.getElementById('sent-email').textContent = email;

        // Show success toast
        showToast('Verification code sent to your email!', 'success');

        // Move to step 2
        setTimeout(() => {
            goToStep(2);
            startResendTimer();
        }, 1000);

    } catch (error) {
        showToast('Failed to send verification code. Please try again.', 'error');
    } finally {
        sendCodeBtn.classList.remove('loading');
        sendCodeBtn.disabled = false;
    }
}

function validateEmail() {
    const email = emailInput.value.trim();
    const emailError = document.getElementById('email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        showError('email-error', 'Email is required');
        emailInput.classList.add('error');
        return false;
    }

    if (!emailRegex.test(email)) {
        showError('email-error', 'Please enter a valid email address');
        emailInput.classList.add('error');
        return false;
    }

    emailInput.classList.remove('error');
    clearError('email-error');
    return true;
}

// ===================================
// Step 2: Code Verification
// ===================================
function setupCodeInputs() {
    codeInputs.forEach((input, index) => {
        // Auto-focus next input
        input.addEventListener('input', (e) => {
            const value = e.target.value;

            if (value.length === 1) {
                input.classList.add('filled');
                if (index < codeInputs.length - 1) {
                    codeInputs[index + 1].focus();
                }
            } else {
                input.classList.remove('filled');
            }

            // Auto-submit when all inputs are filled
            if (index === codeInputs.length - 1 && value.length === 1) {
                const code = getEnteredCode();
                if (code.length === 6) {
                    setTimeout(() => handleCodeSubmit(e), 300);
                }
            }
        });

        // Handle backspace
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !input.value && index > 0) {
                codeInputs[index - 1].focus();
            }
        });

        // Only allow numbers
        input.addEventListener('keypress', (e) => {
            if (!/^\d$/.test(e.key)) {
                e.preventDefault();
            }
        });

        // Handle paste
        input.addEventListener('paste', (e) => {
            e.preventDefault();
            const pastedData = e.clipboardData.getData('text').slice(0, 6);
            
            if (/^\d+$/.test(pastedData)) {
                pastedData.split('').forEach((char, i) => {
                    if (codeInputs[i]) {
                        codeInputs[i].value = char;
                        codeInputs[i].classList.add('filled');
                    }
                });
                codeInputs[Math.min(pastedData.length, 5)].focus();
            }
        });
    });
}

async function handleCodeSubmit(e) {
    e.preventDefault();

    const enteredCode = getEnteredCode();

    if (enteredCode.length !== 6) {
        showError('code-error', 'Please enter the complete 6-digit code');
        codeInputs.forEach(input => input.classList.add('error'));
        return;
    }

    // Show loading state
    verifyCodeBtn.classList.add('loading');
    verifyCodeBtn.disabled = true;

    try {
        // Simulate API call
        await simulateAPICall(1500);

        // Verify code
        if (enteredCode === verificationCode) {
            showToast('Code verified successfully!', 'success');
            clearInterval(resendTimer);
            setTimeout(() => goToStep(3), 1000);
        } else {
            throw new Error('Invalid code');
        }

    } catch (error) {
        showError('code-error', 'Invalid verification code. Please try again.');
        codeInputs.forEach(input => {
            input.classList.add('error');
            input.value = '';
            input.classList.remove('filled');
        });
        codeInputs[0].focus();
        showToast('Invalid verification code', 'error');
    } finally {
        verifyCodeBtn.classList.remove('loading');
        verifyCodeBtn.disabled = false;
    }
}

function getEnteredCode() {
    return Array.from(codeInputs).map(input => input.value).join('');
}

function startResendTimer() {
    timeLeft = 60;
    resendBtn.disabled = true;
    updateTimerDisplay();

    resendTimer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(resendTimer);
            resendBtn.disabled = false;
            resendBtn.innerHTML = 'Resend Code';
        }
    }, 1000);
}

function updateTimerDisplay() {
    document.getElementById('timer').textContent = timeLeft;
}

async function handleResendCode() {
    resendBtn.disabled = true;

    try {
        // Simulate API call
        await simulateAPICall(1000);

        // Generate new code
        verificationCode = generateVerificationCode();
        console.log('New verification code:', verificationCode); // For testing

        showToast('New verification code sent!', 'success');
        startResendTimer();

        // Clear previous inputs
        codeInputs.forEach(input => {
            input.value = '';
            input.classList.remove('filled', 'error');
        });
        codeInputs[0].focus();

    } catch (error) {
        showToast('Failed to resend code. Please try again.', 'error');
        resendBtn.disabled = false;
    }
}

// ===================================
// Step 3: Reset Password
// ===================================
async function handleResetSubmit(e) {
    e.preventDefault();

    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Validate passwords
    if (!validatePasswordRequirements()) {
        showError('new-password-error', 'Password does not meet requirements');
        return;
    }

    if (!validatePasswordMatch()) {
        showError('confirm-password-error', 'Passwords do not match');
        return;
    }

    // Show loading state
    resetPasswordBtn.classList.add('loading');
    resetPasswordBtn.disabled = true;

    try {
        // Simulate API call
        await simulateAPICall(2000);

        // Clear saved data
        localStorage.removeItem('resetEmail');

        showToast('Password reset successfully!', 'success');
        setTimeout(() => goToStep(4), 1000);

    } catch (error) {
        showToast('Failed to reset password. Please try again.', 'error');
    } finally {
        resetPasswordBtn.classList.remove('loading');
        resetPasswordBtn.disabled = false;
    }
}

function checkPasswordStrength() {
    const password = newPasswordInput.value;
    const strengthProgress = document.getElementById('strength-progress');
    const strengthText = document.getElementById('strength-text');

    let strength = 0;
    const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!@#$%^&*]/.test(password)
    };

    Object.values(requirements).forEach(met => {
        if (met) strength++;
    });

    // Remove previous classes
    strengthProgress.classList.remove('weak', 'medium', 'strong');
    strengthText.classList.remove('weak', 'medium', 'strong');

    if (strength <= 2) {
        strengthProgress.classList.add('weak');
        strengthText.classList.add('weak');
        strengthText.textContent = 'Weak password';
    } else if (strength <= 4) {
        strengthProgress.classList.add('medium');
        strengthText.classList.add('medium');
        strengthText.textContent = 'Medium password';
    } else {
        strengthProgress.classList.add('strong');
        strengthText.classList.add('strong');
        strengthText.textContent = 'Strong password';
    }
}

function validatePasswordRequirements() {
    const password = newPasswordInput.value;
    
    const requirements = [
        { id: 'req-length', test: password.length >= 8 },
                { id: 'req-uppercase', test: /[A-Z]/.test(password) },
        { id: 'req-lowercase', test: /[a-z]/.test(password) },
        { id: 'req-number', test: /[0-9]/.test(password) },
        { id: 'req-special', test: /[!@#$%^&*]/.test(password) }
    ];

    let allMet = true;

    requirements.forEach(req => {
        const element = document.getElementById(req.id);
        if (req.test) {
            element.classList.add('valid');
        } else {
            element.classList.remove('valid');
            allMet = false;
        }
    });

    return allMet;
}

function validatePasswordMatch() {
    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (confirmPassword && newPassword !== confirmPassword) {
        showError('confirm-password-error', 'Passwords do not match');
        confirmPasswordInput.classList.add('error');
        return false;
    }

    confirmPasswordInput.classList.remove('error');
    clearError('confirm-password-error');
    return true;
}

// ===================================
// Password Visibility Toggle
// ===================================
function togglePasswordVisibility(e) {
    const button = e.currentTarget;
    const targetId = button.getAttribute('data-target');
    const input = document.getElementById(targetId);
    const icon = button.querySelector('i');

    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// ===================================
// Step Navigation
// ===================================
function goToStep(step) {
    // Hide all steps
    document.querySelectorAll('.step-content').forEach(content => {
        content.classList.remove('active');
    });

    // Show current step
    document.getElementById(`step-${step}`).classList.add('active');

    // Update progress indicator
    updateProgressIndicator(step);

    // Update current step
    currentStep = step;

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateProgressIndicator(step) {
    const progressSteps = document.querySelectorAll('.progress-step');
    const progressLines = document.querySelectorAll('.progress-line');

    progressSteps.forEach((progressStep, index) => {
        const stepNumber = index + 1;
        
        if (stepNumber < step) {
            progressStep.classList.add('completed');
            progressStep.classList.remove('active');
        } else if (stepNumber === step) {
            progressStep.classList.add('active');
            progressStep.classList.remove('completed');
        } else {
            progressStep.classList.remove('active', 'completed');
        }
    });

    progressLines.forEach((line, index) => {
        if (index < step - 1) {
            line.classList.add('completed');
        } else {
            line.classList.remove('completed');
        }
    });
}

// ===================================
// Utility Functions
// ===================================
function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function simulateAPICall(delay) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

function showError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearError(errorId) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = '';
    }
}

function showToast(message, type = 'success') {
    const toastElement = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    // Update icon based on type
    const icon = toastElement.querySelector('i');
    icon.className = type === 'success' ? 'fas fa-check-circle' : 
                     type === 'error' ? 'fas fa-exclamation-circle' : 
                     'fas fa-info-circle';
    
    toastMessage.textContent = message;
    toastElement.className = `toast ${type}`;
    toastElement.classList.add('show');
    
    setTimeout(() => {
        toastElement.classList.remove('show');
    }, 4000);
}

function loadSavedEmail() {
    const savedEmail = localStorage.getItem('resetEmail');
    if (savedEmail) {
        emailInput.value = savedEmail;
    }
}

// ===================================
// Keyboard Shortcuts
// ===================================
document.addEventListener('keydown', (e) => {
    // ESC to go back
    if (e.key === 'Escape' && currentStep > 1 && currentStep < 4) {
        goToStep(currentStep - 1);
    }

    // Enter to submit forms
    if (e.key === 'Enter') {
        if (currentStep === 1 && document.activeElement === emailInput) {
            emailForm.dispatchEvent(new Event('submit'));
        }
    }
});

// ===================================
// Prevent back button after success
// ===================================
window.addEventListener('popstate', (e) => {
    if (currentStep === 4) {
        e.preventDefault();
        window.location.href = 'login.html';
    }
});

// ===================================
// Form Auto-save
// ===================================
emailInput.addEventListener('input', () => {
    localStorage.setItem('resetEmail', emailInput.value);
});

// ===================================
// Copy to clipboard (for testing)
// ===================================
function copyCodeToClipboard() {
    if (verificationCode) {
        navigator.clipboard.writeText(verificationCode).then(() => {
            console.log('Code copied to clipboard:', verificationCode);
        });
    }
}

// ===================================
// Session timeout
// ===================================
let sessionTimeout;

function startSessionTimeout() {
    clearTimeout(sessionTimeout);
    sessionTimeout = setTimeout(() => {
        showToast('Session expired. Please start over.', 'warning');
        setTimeout(() => {
            window.location.href = 'forgot-password.html';
        }, 2000);
    }, 15 * 60 * 1000); // 15 minutes
}

// Reset timeout on user activity
document.addEventListener('click', startSessionTimeout);
document.addEventListener('keypress', startSessionTimeout);

// Start timeout
startSessionTimeout();

// ===================================
// Accessibility improvements
// ===================================
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// ===================================
// Email validation with suggestions
// ===================================
function suggestEmailCorrection(email) {
    const commonDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'campus.edu'];
    const parts = email.split('@');
    
    if (parts.length === 2) {
        const domain = parts[1];
        const suggestions = commonDomains.filter(d => 
            d.includes(domain) || domain.includes(d.substring(0, 3))
        );
        
        if (suggestions.length > 0 && suggestions[0] !== domain) {
            return `${parts[0]}@${suggestions[0]}`;
        }
    }
    
    return null;
}

// ===================================
// Rate limiting for resend
// ===================================
let resendAttempts = 0;
const maxResendAttempts = 5;

function checkResendLimit() {
    if (resendAttempts >= maxResendAttempts) {
        showToast('Too many attempts. Please try again later.', 'error');
        resendBtn.disabled = true;
        setTimeout(() => {
            resendAttempts = 0;
            resendBtn.disabled = false;
        }, 10 * 60 * 1000); // 10 minutes
        return false;
    }
    return true;
}

// Update resend handler
const originalHandleResendCode = handleResendCode;
handleResendCode = async function() {
    if (!checkResendLimit()) return;
    resendAttempts++;
    await originalHandleResendCode.call(this);
};

// ===================================
// Analytics tracking (placeholder)
// ===================================
function trackEvent(category, action, label) {
    console.log('Event tracked:', { category, action, label });
    // In production, integrate with Google Analytics or similar
}

// Track step changes
function trackStepChange(step) {
    trackEvent('Password Reset', 'Step Changed', `Step ${step}`);
}

// ===================================
// Error logging
// ===================================
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // In production, send to error tracking service
});

// ===================================
// Network status monitoring
// ===================================
window.addEventListener('online', () => {
    showToast('Connection restored', 'success');
});

window.addEventListener('offline', () => {
    showToast('No internet connection', 'warning');
});

// ===================================
// Export functions for global access
// ===================================
window.goToStep = goToStep;
window.copyCodeToClipboard = copyCodeToClipboard;

// ===================================
// Initialize
// ===================================
console.log('Forgot Password page initialized');
console.log('Current step:', currentStep);

// Focus on first input
if (currentStep === 1) {
    emailInput.focus();
}