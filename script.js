// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all event handlers and interactive elements
    initButtonEvents();
    initHoverEvents();
    initKeyDetection();
    initImageGallery();
    initTabs();
    initFormValidation();
});

// ========== EVENT HANDLING SECTION ==========

// 1. Button Click Events
function initButtonEvents() {
    const colorButton = document.getElementById('color-button');
    const clickOutput = document.getElementById('click-output');
    
    // Available colors for button cycles
    const colors = ['#7c4dff', '#e91e63', '#2196f3', '#4caf50', '#ff9800'];
    let colorIndex = 0;
    
    // Click event - changes button color and updates text
    colorButton.addEventListener('click', function() {
        // Change button color
        colorIndex = (colorIndex + 1) % colors.length;
        this.style.backgroundColor = colors[colorIndex];
        
        // Update text message
        clickOutput.textContent = `Button color changed to: ${colors[colorIndex]}!`;
        clickOutput.style.color = colors[colorIndex];
        
        // Add and remove animation effect
        this.classList.add('pulse');
        setTimeout(() => {
            this.classList.remove('pulse');
        }, 500);
    });
    
    // Double-click event (bonus) - triggers special action
    colorButton.addEventListener('dblclick', function() {
        // Rainbow effect
        let count = 0;
        const rainbow = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#8b00ff'];
        
        // Flash through rainbow colors
        const rainbowInterval = setInterval(() => {
            if (count < rainbow.length) {
                this.style.backgroundColor = rainbow[count];
                this.style.transform = 'scale(1.1)';
                count++;
            } else {
                clearInterval(rainbowInterval);
                this.style.backgroundColor = colors[colorIndex];
                this.style.transform = 'scale(1)';
                clickOutput.textContent = '🌈 You found the rainbow secret! 🌈';
            }
        }, 200);
    });
    
    // Long press event (bonus) - uses timeout to detect long press
    let pressTimer;
    
    colorButton.addEventListener('mousedown', function() {
        pressTimer = setTimeout(() => {
            this.style.backgroundColor = '#000000';
            clickOutput.textContent = '🌑 You discovered the dark side! Hold for 2 more seconds to revert.';
            clickOutput.style.color = '#000000';
            
            setTimeout(() => {
                this.style.backgroundColor = colors[colorIndex];
                clickOutput.textContent = 'Back to normal! That was a long press.';
                clickOutput.style.color = colors[colorIndex];
            }, 2000);
        }, 1000);
    });
    
    colorButton.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    colorButton.addEventListener('mouseleave', function() {
        clearTimeout(pressTimer);
    });
}

// 2. Hover Effects
function initHoverEvents() {
    const hoverArea = document.getElementById('hover-area');
    const originalText = hoverArea.innerHTML;
    
    hoverArea.addEventListener('mouseenter', function() {
        this.innerHTML = '<p>Look at me change! 🎉</p>';
    });
    
    hoverArea.addEventListener('mouseleave', function() {
        this.innerHTML = originalText;
    });
}

// 3. Keypress Detection
function initKeyDetection() {
    const keyName = document.getElementById('key-name');
    const keyDisplay = document.getElementById('key-display');
    
    document.addEventListener('keydown', function(event) {
        // Display the pressed key
        keyName.textContent = event.key;
        
        // Add visual feedback
        keyName.classList.add('pulse');
        setTimeout(() => {
            keyName.classList.remove('pulse');
        }, 300);
        
        // Change background color based on key type
        if (/^[a-zA-Z]$/.test(event.key)) {
            // Letter keys
            keyDisplay.style.backgroundColor = '#e3f2fd'; // Light blue
        } else if (/^[0-9]$/.test(event.key)) {
            // Number keys
            keyDisplay.style.backgroundColor = '#e8f5e9'; // Light green
        } else if (event.key === 'Enter') {
            // Enter key
            keyDisplay.style.backgroundColor = '#ffebee'; // Pink
        } else if (event.key === ' ') {
            // Space key
            keyName.textContent = 'Space';
            keyDisplay.style.backgroundColor = '#fff3e0'; // Light orange
        } else {
            // Other keys
            keyDisplay.style.backgroundColor = '#f3e5f5'; // Light purple
        }
    });
}

// ========== INTERACTIVE ELEMENTS SECTION ==========

// 1. Image Gallery
function initImageGallery() {
    const currentImage = document.getElementById('current-image');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const thumbs = document.querySelectorAll('.thumb');
    
    const images = [
        'https://via.placeholder.com/600x300/3498db/ffffff?text=Image+1',
        'https://via.placeholder.com/600x300/e74c3c/ffffff?text=Image+2',
        'https://via.placeholder.com/600x300/2ecc71/ffffff?text=Image+3',
        'https://via.placeholder.com/600x300/f39c12/ffffff?text=Image+4'
    ];
    
    let currentIndex = 0;
    
    // Update active thumbnail
    function updateActiveThumbnail() {
        thumbs.forEach(thumb => {
            thumb.classList.remove('active');
        });
        thumbs[currentIndex].classList.add('active');
    }
    
    // Change displayed image with animation
    function changeImage(index) {
        // Slide out animation
        currentImage.style.opacity = '0';
        
        setTimeout(() => {
            currentImage.src = images[index];
            // Slide in animation
            currentImage.style.opacity = '1';
        }, 300);
        
        currentIndex = index;
        updateActiveThumbnail();
    }
    
    // Previous button
    prevBtn.addEventListener('click', function() {
        const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
        changeImage(newIndex);
    });
    
    // Next button
    nextBtn.addEventListener('click', function() {
        const newIndex = (currentIndex + 1) % images.length;
        changeImage(newIndex);
    });
    
    // Thumbnail clicks
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            changeImage(index);
        });
    });
    
    // Auto slide show (bonus feature)
    let slideInterval;
    
    function startSlideshow() {
        slideInterval = setInterval(() => {
            const newIndex = (currentIndex + 1) % images.length;
            changeImage(newIndex);
        }, 3000);
    }
    
    function stopSlideshow() {
        clearInterval(slideInterval);
    }
    
    // Start/stop slideshow on hover
    const galleryContainer = document.querySelector('.gallery-container');
    galleryContainer.addEventListener('mouseenter', stopSlideshow);
    galleryContainer.addEventListener('mouseleave', startSlideshow);
    
    // Initialize slideshow
    startSlideshow();
}

// 2. Tabs
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Add active class to current button and content
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// ========== FORM VALIDATION SECTION ==========

function initFormValidation() {
    const form = document.getElementById('validation-form');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    const usernameValidation = document.getElementById('username-validation');
    const emailValidation = document.getElementById('email-validation');
    const passwordValidation = document.getElementById('password-validation');
    
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');
    
    // Validation flags
    let isUsernameValid = false;
    let isEmailValid = false;
    let isPasswordValid = false;
    
    // Username validation
    usernameInput.addEventListener('input', function() {
        const value = this.value.trim();
        
        if (value === '') {
            this.className = '';
            usernameValidation.textContent = '';
            usernameValidation.className = 'validation-message';
            isUsernameValid = false;
        } else if (value.length < 3) {
            this.className = 'invalid';
            usernameValidation.textContent = 'Username must be at least 3 characters long';
            usernameValidation.className = 'validation-message error';
            isUsernameValid = false;
        } else {
            this.className = 'valid';
            usernameValidation.textContent = 'Username looks good!';
            usernameValidation.className = 'validation-message success';
            isUsernameValid = true;
        }
        
        updateSubmitButton();
    });
    
    // Email validation
    emailInput.addEventListener('input', function() {
        const value = this.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (value === '') {
            this.className = '';
            emailValidation.textContent = '';
            emailValidation.className = 'validation-message';
            isEmailValid = false;
        } else if (!emailRegex.test(value)) {
            this.className = 'invalid';
            emailValidation.textContent = 'Please enter a valid email address';
            emailValidation.className = 'validation-message error';
            isEmailValid = false;
        } else {
            this.className = 'valid';
            emailValidation.textContent = 'Email looks good!';
            emailValidation.className = 'validation-message success';
            isEmailValid = true;
        }
        
        updateSubmitButton();
    });
    
    // Password validation and strength meter
    passwordInput.addEventListener('input', function() {
        const value = this.value;
        
        // Basic requirements check
        const hasMinLength = value.length >= 8;
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumbers = /[0-9]/.test(value);
        const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(value);
        
        // Calculate password strength
        let strength = 0;
        if (value.length > 0) strength += 1;
        if (value.length >= 8) strength += 1;
        if (hasUpperCase) strength += 1;
        if (hasLowerCase) strength += 1;
        if (hasNumbers) strength += 1;
        if (hasSpecialChars) strength += 1;
        
        // Update strength bar
        const percent = (strength / 6) * 100;
        strengthBar.style.width = `${percent}%`;
        
        // Set color based on strength
        if (strength <= 2) {
            strengthBar.style.backgroundColor = '#f44336'; // Red - weak
            strengthText.textContent = 'Weak password';
            strengthText.style.color = '#f44336';
        } else if (strength <= 4) {
            strengthBar.style.backgroundColor = '#ff9800'; // Orange - medium
            strengthText.textContent = 'Medium strength password';
            strengthText.style.color = '#ff9800';
        } else {
            strengthBar.style.backgroundColor = '#4caf50'; // Green - strong
            strengthText.textContent = 'Strong password';
            strengthText.style.color = '#4caf50';
        }
        
        // Validation feedback
        if (value === '') {
            this.className = '';
            passwordValidation.textContent = '';
            passwordValidation.className = 'validation-message';
            isPasswordValid = false;
        } else if (!hasMinLength) {
            this.className = 'invalid';