document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const emailInput = document.getElementById('email');
    const submitBtn = document.querySelector('.submit-btn');
    const strengthBar = document.querySelector('.strength-bar');

    // Animate form fields on page load
    animateFormFields();

    // Password strength checker
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strength = checkPasswordStrength(password);
        updatePasswordStrength(strength);
    });

    // Confirm password validation
    confirmPasswordInput.addEventListener('input', function() {
        validatePasswordMatch();
    });

    // Email validation
    emailInput.addEventListener('blur', function() {
        validateEmail();
    });

    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            shakeForm();
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        
        // Simulate API call
        try {
            await simulateRegistration();
            showSuccessMessage();
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } catch (error) {
            showErrorMessage(error.message);
            submitBtn.classList.remove('loading');
        }
    });

    // Animate form fields
    function animateFormFields() {
        const inputs = document.querySelectorAll('.input-group input, .input-group select');
        inputs.forEach((input, index) => {
            input.style.opacity = '0';
            input.style.transform = 'translateY(20px)';
            setTimeout(() => {
                input.style.transition = 'all 0.5s ease';
                input.style.opacity = '1';
                input.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Check password strength
    function checkPasswordStrength(password) {
        let strength = 0;
        
        if (password.length >= 8) strength++;
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
        if (password.match(/[0-9]/)) strength++;
        if (password.match(/[^a-zA-Z0-9]/)) strength++;
        
        return strength;
    }

    // Update password strength indicator
    function updatePasswordStrength(strength) {
        strengthBar.className = 'strength-bar';
        
        if (strength === 0) {
            strengthBar.style.width = '0';
        } else if (strength <= 2) {
            strengthBar.classList.add('weak');
        } else if (strength === 3) {
            strengthBar.classList.add('medium');
        } else {
            strengthBar.classList.add('strong');
        }
    }

    // Validate password match
    function validatePasswordMatch() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const errorMessage = confirmPasswordInput.parentElement.querySelector('.error-message');
        
        if (confirmPassword && password !== confirmPassword) {
            errorMessage.textContent = 'Passwords do not match';
            errorMessage.classList.add('show');
            confirmPasswordInput.style.borderBottomColor = 'var(--error-color)';
            return false;
        } else {
            errorMessage.classList.remove('show');
            if (confirmPassword) {
                confirmPasswordInput.style.borderBottomColor = 'var(--success-color)';
            }
            return true;
        }
    }

    // Validate email
    function validateEmail() {
        const email = emailInput.value;
        const errorMessage = emailInput.parentElement.querySelector('.error-message');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email && !emailRegex.test(email)) {
            errorMessage.textContent = 'Please enter a valid email address';
            errorMessage.classList.add('show');
            emailInput.style.borderBottomColor = 'var(--error-color)';
            return false;
        } else if (email && !email.includes('.edu')) {
            errorMessage.textContent = 'Please use your university email address';
            errorMessage.classList.add('show');
            emailInput.style.borderBottomColor = 'var(--error-color)';
            return false;
        } else {
            errorMessage.classList.remove('show');
            if (email) {
                emailInput.style.borderBottomColor = 'var(--success-color)';
            }
            return true;
        }
    }

    // Validate entire form
    function validateForm() {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderBottomColor = 'var(--error-color)';
                isValid = false;
            }
        });
        
        if (!validateEmail()) isValid = false;
        if (!validatePasswordMatch()) isValid = false;
        
        const termsCheckbox = document.getElementById('terms');
        if (!termsCheckbox.checked) {
            isValid = false;
            termsCheckbox.parentElement.style.animation = 'shake 0.5s ease';
        }
        
        return isValid;
    }

    // Shake form animation
    function shakeForm() {
        form.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            form.style.animation = '';
        }, 500);
    }

    // Simulate registration API call
    function simulateRegistration() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate successful registration
                const formData = new FormData(form);
                const userData = {
                    firstName: formData.get('firstName'),
                    lastName: formData.get('lastName'),
                    email: formData.get('email'),
                    studentId: formData.get('studentId'),
                    department: formData.get('department'),
                    phone: formData.get('phone')
                };
                
                // Store user data in localStorage (for demo purposes)
                localStorage.setItem('userData', JSON.stringify(userData));
                resolve();
            }, 2000);
        });
    }

    // Show success message
    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <div class="success-icon">✓</div>
            <h3>Registration Successful!</h3>
            <p>Redirecting to dashboard...</p>
        `;
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.classList.add('show');
        }, 100);
    }

    // Show error message
    function showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-toast';
        errorDiv.textContent = message || 'Registration failed. Please try again.';
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            errorDiv.classList.remove('show');
            setTimeout(() => {
                errorDiv.remove();
            }, 300);
        }, 3000);
    }
});

// Add shake animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    .success-message {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 40px;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
        text-align: center;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
    }
    
    .success-message.show {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
    
    .success-icon {
        width: 80px;
        height: 80px;
        background: var(--success-color);
        color: white;
        font-size: 40px;
        line-height: 80px;
        border-radius: 50%;
        margin: 0 auto 20px;
        animation: scaleIn 0.5s ease;
    }
    
    @keyframes scaleIn {
        from {
            transform: scale(0);
        }
        to {
            transform: scale(1);
        }
    }
    
    .error-toast {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--error-color);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(239, 68, 68, 0.3);
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        z-index: 1000;
    }
    
    .error-toast.show {
        opacity: 1;
        transform: translateX(0);
    }
`;
document.head.appendChild(style);