// Browse JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuth();
    
    // Initialize browse page
    initializeBrowse();
    
    // Set up event listeners
    setupBrowseEventListeners();
    
    // Load items
    loadItems();
});

// Check Authentication
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
        window.location.href = 'index.html';
    }
}

// Initialize Browse
function initializeBrowse() {
    // Check for URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const filter = urlParams.get('filter');
    
    if (filter === 'myitems') {
        // Show only user's items
        document.querySelector('.browse-header h1').textContent = 'My Items';
        filterMyItems();
    }
}

// Set up Event Listeners
function setupBrowseEventListeners() {
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    // Filter checkboxes
    const filterCheckboxes = document.querySelectorAll('.filter-checkbox input');
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
    
    // Filter selects
    const filterSelects = document.querySelectorAll('.filter-select');
    filterSelects.forEach(select => {
        select.addEventListener('change', applyFilters);
    });
    
    // Clear filters button
    const clearFiltersBtn = document.querySelector('.btn-clear-filters');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearAllFilters);
    }
    
    // Sort select
    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', sortItems);
    }
    
    // Pagination
    const pageButtons = document.querySelectorAll('.page-btn, .page-number');
    pageButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('active')) {
                changePage(this);
            }
        });
    });
}

// Contact Owner Function
function contactOwner(itemName, itemType) {
    const modal = document.createElement('div');
    modal.className = 'modal contact-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Contact Owner</h2>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <p class="contact-info">You're contacting the owner about: <strong>${itemName}</strong></p>
                
                <form class="contact-form" onsubmit="sendMessage(event, '${itemName}')">
                    <div class="form-group">
                        <label>Your Name</label>
                        <input type="text" value="${localStorage.getItem('userName') || ''}" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Your Email</label>
                        <input type="email" value="${localStorage.getItem('userEmail') || ''}" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Phone Number (Optional)</label>
                        <input type="tel" placeholder="+1 234 567 8900">
                    </div>
                    
                    <div class="form-group">
                        <label>Message</label>
                        <textarea placeholder="Hi, I think this might be my ${itemName}. I lost it on..." required></textarea>
                    </div>
                    
                    <div class="modal-actions">
                        <button type="submit" class="btn-primary">Send Message</button>
                        <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
}

// Claim Item Function
function claimItem(itemName, itemType) {
    const modal = document.createElement('div');
    modal.className = 'modal claim-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Claim Item</h2>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="claim-steps">
                    <div class="claim-step active" id="step1">
                        <span class="step-number">1</span>
                        <span class="step-label">Verify Identity</span>
                    </div>
                    <div class="claim-step" id="step2">
                        <span class="step-number">2</span>
                        <span class="step-label">Describe Item</span>
                    </div>
                    <div class="claim-step" id="step3">
                        <span class="step-number">3</span>
                        <span class="step-label">Schedule Pickup</span>
                    </div>
                </div>
                
                <div id="claimContent">
                    <!-- Step 1: Verify Identity -->
                    <div class="claim-step-content" id="step1-content">
                        <h3>Verify Your Identity</h3>
                        <form class="claim-form" onsubmit="nextClaimStep(event, 2)">
                            <div class="form-group">
                                <label>Full Name</label>
                                <input type="text" value="${localStorage.getItem('userName') || ''}" required>
                            </div>
                            
                            <div class="form-group">
                                <label>Student/Staff ID</label>
                                <input type="text" placeholder="STU123456" required>
                            </div>
                            
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" value="${localStorage.getItem('userEmail') || ''}" required>
                            </div>
                            
                            <div class="form-group">
                                <label>Phone Number</label>
                                <input type="tel" placeholder="+1 234 567 8900" required>
                            </div>
                            
                            <div class="modal-actions">
                                <button type="submit" class="btn-primary">Next</button>
                                <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
}

// Next Claim Step
function nextClaimStep(event, step) {
    event.preventDefault();
    
    // Update step indicators
    document.querySelectorAll('.claim-step').forEach((s, index) => {
        if (index < step - 1) {
            s.classList.add('completed');
            s.classList.remove('active');
        } else if (index === step - 1) {
            s.classList.add('active');
        } else {
            s.classList.remove('active', 'completed');
        }
    });
    
    // Update content based on step
    const claimContent = document.getElementById('claimContent');
    
    if (step === 2) {
        claimContent.innerHTML = `
            <div class="claim-step-content" id="step2-content">
                <h3>Describe Your Item</h3>
                <p class="info-text">Please provide details to verify this is your item</p>
                
                <div class="verification-section">
                    <h4>Answer these questions about your item:</h4>
                    <div class="verification-questions">
                        <div class="question-group">
                            <p>What specific features or marks does your item have?</p>
                            <textarea placeholder="Describe any unique features, scratches, stickers, etc." required></textarea>
                        </div>
                        
                        <div class="question-group">
                            <p>What was inside or attached to the item?</p>
                            <textarea placeholder="List any contents or attachments" required></textarea>
                        </div>
                        
                        <div class="question-group">
                            <p>When and where did you lose it?</p>
                            <input type="text" placeholder="Date and location" required>
                        </div>
                    </div>
                </div>
                
                <form onsubmit="nextClaimStep(event, 3)">
                    <div class="modal-actions">
                        <button type="submit" class="btn-primary">Next</button>
                        <button type="button" class="btn-secondary" onclick="previousClaimStep(1)">Back</button>
                    </div>
                </form>
            </div>
        `;
    } else if (step === 3) {
        claimContent.innerHTML = `
            <div class="claim-step-content" id="step3-content">
                <h3>Schedule Pickup</h3>
                <p class="info-text">Choose when you'd like to collect your item</p>
                
                <form onsubmit="submitClaim(event)">
                    <div class="form-group">
                        <label>Preferred Date</label>
                        <input type="date" min="${new Date().toISOString().split('T')[0]}" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Preferred Time</label>
                        <select required>
                            <option value="">Select a time slot</option>
                            <option value="9-10">9:00 AM - 10:00 AM</option>
                            <option value="10-11">10:00 AM - 11:00 AM</option>
                            <option value="11-12">11:00 AM - 12:00 PM</option>
                            <option value="2-3">2:00 PM - 3:00 PM</option>
                            <option value="3-4">3:00 PM - 4:00 PM</option>
                            <option value="4-5">4:00 PM - 5:00 PM</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Pickup Location</label>
                        <select required>
                            <option value="">Select location</option>
                            <option value="security">Campus Security Office</option>
                            <option value="student-center">Student Center - Lost & Found Desk</option>
                            <option value="library">Library Information Desk</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Additional Notes (Optional)</label>
                        <textarea placeholder="Any special instructions or information"></textarea>
                    </div>
                    
                    <div class="modal-actions">
                        <button type="submit" class="btn-primary">Submit Claim</button>
                        <button type="button" class="btn-secondary" onclick="previousClaimStep(2)">Back</button>
                    </div>
                </form>
            </div>
        `;
    }
}

// Submit Claim
function submitClaim(event) {
    event.preventDefault();
    // Here you would handle the claim submission logic (e.g., send data to server)
    alert('Your claim has been submitted. The owner will contact you soon.');
    closeModal();
}
    // Show loading state
    const submitBtn = event.target.querySelector('.btn-primary');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    
    // Simulate claim submission
    setTimeout(() => {
        closeModal();
        showSuccessNotification('Claim submitted successfully! You will receive a confirmation email shortly.');
        
        // Update item status in UI
        updateItemStatus();
    }, 1500);


// Send Message
function sendMessage(event, itemName) {
    event.preventDefault();
    
    const submitBtn = event.target.querySelector('.btn-primary');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    // Simulate message sending
    setTimeout(() => {
        closeModal();
        showSuccessNotification(`Message sent to the owner of "${itemName}". They will contact you soon.`);
    }, 1500);
}

// View Full Details
function viewFullDetails(itemName) {
    const modal = document.createElement('div');
    modal.className = 'modal details-modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 800px;">
            <div class="modal-header">
                <h2>${itemName} - Full Details</h2>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="details-grid">
                    <div class="details-images">
                        <div class="main-image">
                            <img src="https://via.placeholder.com/400" alt="${itemName}">
                        </div>
                        <div class="thumbnail-images">
                            <img src="https://via.placeholder.com/100" alt="Thumbnail 1">
                            <img src="https://via.placeholder.com/100" alt="Thumbnail 2">
                            <img src="https://via.placeholder.com/100" alt="Thumbnail 3">
                        </div>
                    </div>
                    
                    <div class="details-info">
                        <div class="detail-section">
                            <h3>Item Information</h3>
                            <div class="detail-row">
                                <span class="detail-label">Status:</span>
                                <span class="detail-value"><span class="item-badge found">Found</span></span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Category:</span>
                                <span class="detail-value">Electronics</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Brand/Model:</span>
                                <span class="detail-value">Apple iPhone 13 Pro</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Color:</span>
                                <span class="detail-value">Space Gray</span>
                            </div>
                        </div>
                        
                        <div class="detail-section">
                            <h3>Location & Time</h3>
                            <div class="detail-row">
                                <span class="detail-label">Found at:</span>
                                <span class="detail-value">Sports Complex - Gym Floor</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Date:</span>
                                <span class="detail-value">March 15, 2024</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Time:</span>
                                <span class="detail-value">Approximately 3:00 PM</span>
                            </div>
                        </div>
                        
                        <div class="detail-section">
                            <h3>Description</h3>
                            <p>Found iPhone 13 Pro in space gray color with a blue protective case. The phone is locked with a passcode. There's a small scratch on the bottom right corner of the case. Found on the gym floor near the weight section.</p>
                        </div>
                        
                        <div class="detail-section">
                            <h3>Reporter Information</h3>
                            <div class="detail-row">
                                <span class="detail-label">Reported by:</span>
                                <span class="detail-value">Anonymous User</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Report Date:</span>
                                <span class="detail-value">March 15, 2024 at 4:30 PM</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="modal-actions">
                    <button class="btn-primary" onclick="claimItem('${itemName}', 'found')">Claim This Item</button>
                    <button class="btn-secondary" onclick="shareItem('${itemName}')">Share</button>
                    <button class="btn-secondary" onclick="reportIssue('${itemName}')">Report Issue</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
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

// Show Success Notification
function showSuccessNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">✅</span>
            <p>${message}</p>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Perform Search
function performSearch() {
    const searchTerm = document.querySelector('.search-input').value.toLowerCase();
    const itemCards = document.querySelectorAll('.browse-item-card');
    let visibleCount = 0;
    
    itemCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const category = card.querySelector('.item-category').textContent.toLowerCase();
        const description = card.querySelector('.item-description').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || category.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update results count
    document.querySelector('.results-count').textContent = `Showing ${visibleCount} items`;
}

// Apply Filters
function applyFilters() {
    const statusFilters = Array.from(document.querySelectorAll('input[name="status"]:checked')).map(cb => cb.value);
    const categoryFilters = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(cb => cb.value);
    const locationFilter = document.querySelector('.filter-select').value;
    
    const itemCards = document.querySelectorAll('.browse-item-card');
    let visibleCount = 0;
    
    itemCards.forEach(card => {
        let show = true;
        
        // Check status filter
        const itemStatus = card.querySelector('.item-badge').textContent.toLowerCase();
        if (statusFilters.length > 0 && !statusFilters.includes(itemStatus)) {
            show = false;
        }
        
        // Check category filter
        const itemCategory = card.querySelector('.item-category').textContent.toLowerCase();
        if (categoryFilters.length > 0) {
            let categoryMatch = false;
            categoryFilters.forEach(filter => {
                if (itemCategory.includes(filter)) {
                    categoryMatch = true;
                }
            });
            if (!categoryMatch) show = false;
        }
        
        // Check location filter
        if (locationFilter) {
            const itemLocation = card.querySelector('.item-location').textContent.toLowerCase();
            if (!itemLocation.includes(locationFilter)) {
                show = false;
            }
        }
        
        card.style.display = show ? 'block' : 'none';
        if (show) visibleCount++;
    });
    
    // Update results count
    document.querySelector('.results-count').textContent = `Showing ${visibleCount} items`;
}

// Clear All Filters
function clearAllFilters() {
    // Uncheck all checkboxes
    document.querySelectorAll('.filter-checkbox input').forEach(cb => cb.checked = false);
    
    // Reset selects
    document.querySelectorAll('.filter-select').forEach(select => select.value = '');
    
    // Show all items
    document.querySelectorAll('.browse-item-card').forEach(card => {
        card.style.display = 'block';
    });
    
    // Update results count
    const totalItems = document.querySelectorAll('.browse-item-card').length;
    document.querySelector('.results-count').textContent = `Showing ${totalItems} items`;
}

// Sort Items
function sortItems() {
    const sortValue = document.querySelector('.sort-select').value;
    const itemsGrid = document.querySelector('.items-grid');
    const items = Array.from(document.querySelectorAll('.browse-item-card'));
    
    items.sort((a, b) => {
        switch(sortValue) {
            case 'recent':
                // Sort by date (newest first)
                return 0; // Implement actual date comparison
            case 'oldest':
                // Sort by date (oldest first)
                return 0; // Implement actual date comparison
            case 'category':
                const catA = a.querySelector('.item-category').textContent;
                const catB = b.querySelector('.item-category').textContent;
                return catA.localeCompare(catB);
            case 'location':
                const locA = a.querySelector('.item-location').textContent;
                const locB = b.querySelector('.item-location').textContent;
                return locA.localeCompare(locB);
            default:
                return 0;
        }
    });
    
    // Re-append sorted items
    items.forEach(item => itemsGrid.appendChild(item));
}

// Load Items (Mock Data)
function loadItems() {
    // This would typically fetch from an API
    console.log('Loading items...');
}

// Filter My Items
function filterMyItems() {
    // Show only items reported by current user
    const currentUser = localStorage.getItem('userName');
    // Implementation would filter based on user
}

// Share Item
function shareItem(itemName) {
    if (navigator.share) {
        navigator.share({
            title: `Lost & Found: ${itemName}`,
            text: `Check out this item on Campus Lost & Found`,
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        alert('Share link copied to clipboard!');
    }
}

// Report Issue
function reportIssue(itemName) {
    alert(`Report issue functionality for "${itemName}" coming soon!`);
}

// Previous Claim Step
function previousClaimStep(step) {
    nextClaimStep(event, step);
}

// Update Item Status
function updateItemStatus() {
    // Update the item card to show claimed status
    console.log('Item status updated');
}