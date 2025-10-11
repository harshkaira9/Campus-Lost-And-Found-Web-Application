// Login JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize login page
    initializeLogin();
    
    // Set up event listeners
    setupLoginEventListeners();
    
    // Check for saved credentials
    checkRememberedUser();
});

// Initialize Login
function initializeLogin() {
    // Clear any existing session
    localStorage.removeItem('isLoggedIn');
    
    // Add input animations
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}

// Set up Event Listeners
function setupLoginEventListeners() {
    // Form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Toggle password visibility
    const togglePassword = document.querySelector('.toggle-password');
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle icon
            this.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
        });
    }
    
    // Social login buttons
    const socialButtons = document.querySelectorAll('.btn-social');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.dataset.provider;
            handleSocialLogin(provider);
        });
    });
    
    // Real-time validation
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    if (emailInput) {
        emailInput.addEventListener('blur', validateEmail);
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('blur', validatePassword);
    }
}

// Handle Login
async function handleLogin(e) {
    e.preventDefault();
    
    // Get form values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Clear previous errors
    hideError();
    
    // Validate inputs
    if (!validateEmail() || !validatePassword()) {
        return;
    }
    
    // Show loading state
    const submitButton = document.querySelector('.btn-submit');
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    
    try {
        // Simulate API call
        await simulateLogin(email, password);
        
        // Save remember me preference
        if (rememberMe) {
            localStorage.setItem('rememberedEmail', email);
        } else {
            localStorage.removeItem('rememberedEmail');
        }
        
        // Set logged in status
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', email.split('@')[0]);
        
        // Show success message
        showSuccess('Login successful! Redirecting...');
        
        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
        
    } catch (error) {
        showError(error.message);
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
    }
}

// Simulate Login API Call
function simulateLogin(email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Mock validation
            if (email === 'student@campus.edu' && password === 'password123') {
                resolve({ success: true });
            } else if (email === 'admin@campus.edu' && password === 'admin123') {
                resolve({ success: true, isAdmin: true });
            } else {
                reject(new Error('Invalid email or password'));
            }
        }, 1500);
    });
}

// Handle Social Login
async function handleSocialLogin(provider) {
    showLoadingOverlay();
    
    try {
        // Simulate social login
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Set logged in status
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', `user@${provider}.com`);
        localStorage.setItem('userName', `${provider}User`);
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
        
    } catch (error) {
        hideLoadingOverlay();
        showError(`Failed to login with ${provider}`);
    }
}

// Validate Email
function validateEmail() {
    const emailInput = document.getElementById('email');
    const email = emailInput.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        showFieldError(emailInput, 'Email is required');
        return false;
    }
    
    if (!emailRegex.test(email)) {
        showFieldError(emailInput, 'Please enter a valid email');
        return false;
    }
    
    clearFieldError(emailInput);
    return true;
}
// Validate Password
function validatePassword() {
    const passwordInput = document.getElementById('password');
    const password = passwordInput.value;
    if (!password) {
        showFieldError(passwordInput, 'Password is required');
        return false;
    }
    if (password.length < 6) {
        showFieldError(passwordInput, 'Password must be at least 6 characters');
        return false;
    }
    clearFieldError(passwordInput);
    return true;
}