// Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard
    initializeDashboard();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load user data
    loadUserData();
    
    // Start real-time updates
    startRealTimeUpdates();
});

// Initialize Dashboard
function initializeDashboard() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
        window.location.href = 'index.html';
        return;
    }
    
    // Set current date/time
    updateDateTime();
    setInterval(updateDateTime, 60000); // Update every minute
}

// Set up Event Listeners
function setupEventListeners() {
    // User menu dropdown
    const userMenu = document.querySelector('.user-menu');
    if (userMenu) {
        userMenu.addEventListener('click', toggleUserDropdown);
    }
    
    // Notification bell
    const notifications = document.querySelector('.notifications');
    if (notifications) {
        notifications.addEventListener('click', showNotifications);
    }
    
    // View details buttons
    const viewButtons = document.querySelectorAll('.btn-view');
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const itemCard = this.closest('.item-card');
            const itemTitle = itemCard.querySelector('h4').textContent;
            const itemStatus = itemCard.querySelector('.item-status').textContent;
            viewItemDetails(itemTitle, itemStatus);
        });
    });
    
    // Quick action buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });
    
    // Click outside to close dropdowns
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.user-menu') && !e.target.closest('.user-dropdown')) {
            closeUserDropdown();
        }
        if (!e.target.closest('.notifications') && !e.target.closest('.notification-dropdown')) {
            closeNotifications();
        }
    });
}

// Load User Data
function loadUserData() {
    const userName = localStorage.getItem('userName') || 'User';
    const userEmail = localStorage.getItem('userEmail') || 'user@campus.edu';
    
    // Update user name in UI
    const userNameElement = document.querySelector('.user-name');
    if (userNameElement) {
        userNameElement.textContent = userName;
    }
    
    // Update welcome message
    const welcomeMessage = document.querySelector('.welcome-section h1');
    if (welcomeMessage) {
        welcomeMessage.textContent = `Welcome back, ${userName}!`;
    }
}

// Toggle User Dropdown
function toggleUserDropdown() {
    let dropdown = document.querySelector('.user-dropdown');
    
    if (!dropdown) {
        dropdown = createUserDropdown();
        document.querySelector('.user-menu').appendChild(dropdown);
    }
    
    dropdown.classList.toggle('show');
}

// Create User Dropdown
function createUserDropdown() {
    const dropdown = document.createElement('div');
    dropdown.className = 'user-dropdown';
    dropdown.innerHTML = `
        <div class="dropdown-header">
            <img src="https://via.placeholder.com/60" alt="User" class="dropdown-avatar">
            <div class="dropdown-user-info">
                <p class="dropdown-user-name">${localStorage.getItem('userName') || 'User'}</p>
                <p class="dropdown-user-email">${localStorage.getItem('userEmail') || 'user@campus.edu'}</p>
            </div>
        </div>
        <div class="dropdown-divider"></div>
        <a href="#" class="dropdown-item" onclick="showProfile()">
            <span class="dropdown-icon">👤</span>
            <span>My Profile</span>
        </a>
        <a href="#" class="dropdown-item" onclick="showSettings()">
            <span class="dropdown-icon">⚙️</span>
            <span>Settings</span>
        </a>
        <a href="#" class="dropdown-item" onclick="showMyItems()">
            <span class="dropdown-icon">📦</span>
            <span>My Items</span>
        </a>
        <div class="dropdown-divider"></div>
        <a href="#" class="dropdown-item logout" onclick="logout()">
            <span class="dropdown-icon">🚪</span>
            <span>Logout</span>
        </a>
    `;
    return dropdown;
}

// Show Notifications
function showNotifications() {
    let dropdown = document.querySelector('.notification-dropdown');
    
    if (!dropdown) {
        dropdown = createNotificationDropdown();
        document.querySelector('.notifications').appendChild(dropdown);
    }
    
    dropdown.classList.toggle('show');
    
    // Mark notifications as read
    setTimeout(() => {
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            badge.style.display = 'none';
        }
    }, 1000);
}

// Create Notification Dropdown
function createNotificationDropdown() {
    const dropdown = document.createElement('div');
    dropdown.className = 'notification-dropdown';
    dropdown.innerHTML = `
        <div class="notification-header">
            <h3>Notifications</h3>
            <a href="#" class="mark-all-read">Mark all as read</a>
        </div>
        <div class="notification-list">
            <div class="notification-item unread">
                <div class="notification-icon match">🎯</div>
                <div class="notification-content">
                    <p><strong>Potential match found!</strong></p>
                    <p>Your lost "Black Backpack" might have been found</p>
                    <span class="notification-time">10 minutes ago</span>
                </div>
            </div>
            <div class="notification-item unread">
                <div class="notification-icon message">💬</div>
                <div class="notification-content">
                    <p><strong>New message from Sarah</strong></p>
                    <p>Is this your wallet? I found it near the library...</p>
                    <span class="notification-time">1 hour ago</span>
                </div>
            </div>
            <div class="notification-item unread">
                <div class="notification-icon update">📝</div>
                <div class="notification-content">
                    <p><strong>Item status updated</strong></p>
                    <p>Your report "iPhone 13 Pro" has been viewed 5 times</p>
                    <span class="notification-time">2 hours ago</span>
                </div>
            </div>
        </div>
        <div class="notification-footer">
            <a href="#" class="view-all-notifications">View All Notifications</a>
        </div>
    `;
    return dropdown;
}

// View Item Details
function viewItemDetails(itemTitle, itemStatus) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Item Details</h2>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="item-detail-grid">
                    <div class="item-detail-image">
                        <img src="https://via.placeholder.com/300" alt="${itemTitle}">
                        <span class="item-status ${itemStatus.toLowerCase()}">${itemStatus}</span>
                    </div>
                    <div class="item-detail-info">
                        <h3>${itemTitle}</h3>
                        <div class="detail-row">
                            <span class="detail-label">Status:</span>
                            <span class="detail-value">${itemStatus}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Location:</span>
                            <span class="detail-value">Library - 2nd Floor</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Date Reported:</span>
                            <span class="detail-value">March 15, 2024</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Category:</span>
                            <span class="detail-value">Electronics</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Description:</span>
                            <span class="detail-value">Black backpack with laptop compartment, contains textbooks and a calculator</span>
                        </div>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="btn-primary" onclick="editItem()">Edit Report</button>
                    <button class="btn-secondary" onclick="shareItem()">Share</button>
                    <button class="btn-danger" onclick="deleteItem()">Delete</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Show modal
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

// Close Modal
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Show Profile
function showProfile() {
    closeUserDropdown();
    // Create profile modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content profile-modal">
            <div class="modal-header">
                <h2>My Profile</h2>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="profile-section">
                    <div class="profile-avatar-section">
                        <img src="https://via.placeholder.com/120" alt="Profile" class="profile-avatar-large">
                        <button class="btn-change-avatar">Change Photo</button>
                    </div>
                    <div class="profile-info-section">
                        <div class="profile-field">
                            <label>Full Name</label>
                            <input type="text" value="${localStorage.getItem('userName') || 'John Doe'}" class="profile-input">
                        </div>
                        <div class="profile-field">
                            <label>Email</label>
                            <input type="email" value="${localStorage.getItem('userEmail') || 'user@campus.edu'}" class="profile-input" readonly>
                        </div>
                        <div class="profile-field">
                            <label>Phone</label>
                            <input type="tel" value="+1 234 567 8900" class="profile-input">
                        </div>
                        <div class="profile-field">
                            <label>Student ID</label>
                            <input type="text" value="STU123456" class="profile-input">
                        </div>
                    </div>
                </div>
                <div class="profile-stats">
                    <div class="profile-stat">
                        <span class="stat-value">12</span>
                        <span class="stat-label">Items Reported</span>
                    </div>
                    <div class="profile-stat">
                        <span class="stat-value">8</span>
                        <span class="stat-label">Items Found</span>
                    </div>
                    <div class="profile-stat">
                        <span class="stat-value">95%</span>
                        <span class="stat-label">Success Rate</span>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="btn-primary" onclick="saveProfile()">Save Changes</button>
                    <button class="btn-secondary" onclick="closeModal()">Cancel</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

// Logout
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        window.location.href = 'index.html';
    }
}

// Update Date Time
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    // You can add a date display element if needed
}

// Start Real Time Updates
function startRealTimeUpdates() {
    // Simulate real-time updates
    setInterval(() => {
        // Update notification count
        const notificationBadge = document.querySelector('.notification-badge');
        if (notificationBadge && Math.random() > 0.8) {
            const currentCount = parseInt(notificationBadge.textContent);
            notificationBadge.textContent = currentCount + 1;
            notificationBadge.style.display = 'block';
        }
    }, 30000); // Check every 30 seconds
}

// Helper Functions
function closeUserDropdown() {
    const dropdown = document.querySelector('.user-dropdown');
    if (dropdown) {
        dropdown.classList.remove('show');
    }
}

function closeNotifications() {
    const dropdown = document.querySelector('.notification-dropdown');
    if (dropdown) {
        dropdown.classList.remove('show');
    }
}

function editItem() {
    alert('Edit functionality coming soon!');
}

function shareItem() {
    alert('Share functionality coming soon!');
}

function deleteItem() {
    if (confirm('Are you sure you want to delete this item?')) {
        alert('Item deleted successfully!');
        closeModal();
    }
}

function saveProfile() {
    alert('Profile updated successfully!');
    closeModal();
}

function showSettings() {
    alert('Settings page coming soon!');
}

function showMyItems() {
    window.location.href = 'browse.html?filter=myitems';
}