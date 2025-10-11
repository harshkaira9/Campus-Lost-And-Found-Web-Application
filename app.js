// ===================================
// Global Variables
// ===================================
let lostItems = [];
let foundItems = [];
let currentLostPage = 1;
let currentFoundPage = 1;
const itemsPerPage = 6;

// ===================================
// Sample Data
// ===================================
const sampleLostItems = [
    {
        id: 1,
        name: "iPhone 13 Pro",
        category: "electronics",
        location: "library",
        date: "2024-01-15",
        description: "Black iPhone 13 Pro with a blue case. Lost in the main library on the second floor near the computer section.",
        status: "lost",
        contactName: "John Doe",
        contactEmail: "john@campus.edu",
        contactPhone: "+1 234 567 8900",
        image: null
    },
    {
        id: 2,
        name: "Student ID Card",
        category: "documents",
        location: "cafeteria",
        date: "2024-01-16",
        description: "Student ID card belonging to Jane Smith. Lost in the campus cafeteria during lunch hour.",
        status: "lost",
        contactName: "Jane Smith",
        contactEmail: "jane@campus.edu",
        contactPhone: "+1 234 567 8901",
        image: null
    },
    {
        id: 3,
        name: "Black Backpack",
        category: "accessories",
        location: "classroom",
        date: "2024-01-14",
        description: "Black Nike backpack with laptop compartment. Contains textbooks and notebook. Lost in Room 205.",
        status: "lost",
        contactName: "Mike Johnson",
        contactEmail: "mike@campus.edu",
        contactPhone: "+1 234 567 8902",
        image: null
    },
    {
        id: 4,
        name: "Car Keys",
        category: "keys",
        location: "parking",
        date: "2024-01-17",
        description: "Toyota car keys with a blue keychain. Lost in the north parking lot.",
        status: "lost",
        contactName: "Sarah Williams",
        contactEmail: "sarah@campus.edu",
        contactPhone: "+1 234 567 8903",
        image: null
    },
    {
        id: 5,
        name: "Calculus Textbook",
        category: "books",
        location: "lab",
        date: "2024-01-13",
        description: "Calculus 2 textbook with notes inside. Has my name written on the first page.",
        status: "lost",
        contactName: "David Brown",
        contactEmail: "david@campus.edu",
        contactPhone: "+1 234 567 8904",
        image: null
    },
    {
        id: 6,
        name: "AirPods Pro",
        category: "electronics",
        location: "sports",
        date: "2024-01-16",
        description: "White AirPods Pro in charging case. Lost in the gym locker room.",
        status: "lost",
        contactName: "Emma Davis",
        contactEmail: "emma@campus.edu",
        contactPhone: "+1 234 567 8905",
        image: null
    }
];

const sampleFoundItems = [
    {
        id: 101,
        name: "Blue Water Bottle",
        category: "other",
        location: "library",
        date: "2024-01-17",
        description: "Blue metal water bottle with stickers. Found on a study desk in the library.",
        status: "found",
        currentLocation: "Library Lost & Found Desk",
        contactName: "Library Staff",
        contactEmail: "library@campus.edu",
        contactPhone: "+1 234 567 9000",
        image: null
    },
    {
        id: 102,
        name: "Gray Hoodie",
        category: "clothing",
        location: "auditorium",
                date: "2024-01-16",
        description: "Gray hoodie with university logo. Size medium. Found in the main auditorium after the seminar.",
        status: "found",
        currentLocation: "Security Office",
        contactName: "Security Team",
        contactEmail: "security@campus.edu",
        contactPhone: "+1 234 567 9001",
        image: null
    },
    {
        id: 103,
        name: "Wireless Mouse",
        category: "electronics",
        location: "classroom",
        date: "2024-01-15",
        description: "Black Logitech wireless mouse. Found in Classroom 301.",
        status: "found",
        currentLocation: "Room 301",
        contactName: "Prof. Anderson",
        contactEmail: "anderson@campus.edu",
        contactPhone: "+1 234 567 9002",
        image: null
    },
    {
        id: 104,
        name: "Prescription Glasses",
        category: "accessories",
        location: "cafeteria",
        date: "2024-01-17",
        description: "Black frame prescription glasses in a brown case. Found on table near the entrance.",
        status: "found",
        currentLocation: "Cafeteria Manager's Office",
        contactName: "Cafeteria Staff",
        contactEmail: "cafeteria@campus.edu",
        contactPhone: "+1 234 567 9003",
        image: null
    },
    {
        id: 105,
        name: "USB Flash Drive",
        category: "electronics",
        location: "lab",
        date: "2024-01-14",
        description: "32GB SanDisk USB flash drive with red casing. Found in Computer Lab 2.",
        status: "found",
        currentLocation: "Lab Supervisor's Desk",
        contactName: "Lab Supervisor",
        contactEmail: "lab@campus.edu",
        contactPhone: "+1 234 567 9004",
        image: null
    },
    {
        id: 106,
        name: "Umbrella",
        category: "other",
        location: "hostel",
        date: "2024-01-16",
        description: "Large black umbrella with wooden handle. Found in the hostel common room.",
        status: "found",
        currentLocation: "Hostel Reception",
        contactName: "Hostel Warden",
        contactEmail: "hostel@campus.edu",
        contactPhone: "+1 234 567 9005",
        image: null
    },
    {
        id: 107,
        name: "Notebook",
        category: "books",
        location: "library",
        date: "2024-01-15",
        description: "Red spiral notebook with physics notes. Found on the third floor study area.",
        status: "found",
        currentLocation: "Library Lost & Found",
        contactName: "Library Staff",
        contactEmail: "library@campus.edu",
        contactPhone: "+1 234 567 9000",
        image: null
    },
    {
        id: 108,
        name: "Watch",
        category: "accessories",
        location: "sports",
        date: "2024-01-17",
        description: "Silver Casio digital watch. Found in the basketball court locker room.",
        status: "found",
        currentLocation: "Sports Complex Office",
        contactName: "Sports Staff",
        contactEmail: "sports@campus.edu",
        contactPhone: "+1 234 567 9006",
        image: null
    }
];

// Initialize with sample data
lostItems = [...sampleLostItems];
foundItems = [...sampleFoundItems];

// ===================================
// DOM Elements
// ===================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const lostItemForm = document.getElementById('lost-item-form');
const foundItemForm = document.getElementById('found-item-form');
const contactForm = document.getElementById('contact-form');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const locationFilter = document.getElementById('location-filter');
const dateFilter = document.getElementById('date-filter');
const modal = document.getElementById('item-modal');
const modalClose = document.querySelector('.modal-close');
const toast = document.getElementById('toast');
const scrollToTopBtn = document.getElementById('scroll-to-top');

// ===================================
// Event Listeners
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
});

// ===================================
// Initialize Application
// ===================================
function initializeApp() {
    renderLostItems();
    renderFoundItems();
    updateStats();
    setMaxDate();
}

// ===================================
// Setup Event Listeners
// ===================================
function setupEventListeners() {
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tab = button.getAttribute('data-tab');
            switchTab(tab);
        });
    });

    // Form submissions
    lostItemForm.addEventListener('submit', handleLostItemSubmit);
    foundItemForm.addEventListener('submit', handleFoundItemSubmit);
    contactForm.addEventListener('submit', handleContactSubmit);

    // Search and filters
    searchInput.addEventListener('input', applyFilters);
    categoryFilter.addEventListener('change', applyFilters);
    locationFilter.addEventListener('change', applyFilters);
    dateFilter.addEventListener('change', applyFilters);

    // Modal close
    modalClose.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Image upload preview
    setupImagePreview('lost-image', 'lost-image-preview');
    setupImagePreview('found-image', 'found-image-preview');

    // Scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Load more buttons
    document.getElementById('load-more-lost').addEventListener('click', () => {
        currentLostPage++;
        renderLostItems();
    });

    document.getElementById('load-more-found').addEventListener('click', () => {
        currentFoundPage++;
        renderFoundItems();
    });

    // Newsletter form
    document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Thank you for subscribing!', 'success');
        e.target.reset();
    });
}

// ===================================
// Render Functions
// ===================================
function renderLostItems() {
    const grid = document.getElementById('lost-items-grid');
    const filteredItems = getFilteredItems(lostItems);
    const startIndex = 0;
    const endIndex = currentLostPage * itemsPerPage;
    const itemsToShow = filteredItems.slice(startIndex, endIndex);

    if (currentLostPage === 1) {
        grid.innerHTML = '';
    }

    if (itemsToShow.length === 0 && currentLostPage === 1) {
        grid.innerHTML = '<p class="text-center" style="grid-column: 1/-1; padding: 40px; color: var(--gray-500);">No lost items found matching your criteria.</p>';
        return;
    }

    itemsToShow.forEach((item, index) => {
        if (index >= (currentLostPage - 1) * itemsPerPage) {
            grid.appendChild(createItemCard(item));
        }
    });

    // Show/hide load more button
    const loadMoreBtn = document.getElementById('load-more-lost');
    if (endIndex >= filteredItems.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'inline-block';
    }
}

function renderFoundItems() {
    const grid = document.getElementById('found-items-grid');
    const filteredItems = getFilteredItems(foundItems);
    const startIndex = 0;
    const endIndex = currentFoundPage * itemsPerPage;
    const itemsToShow = filteredItems.slice(startIndex, endIndex);

    if (currentFoundPage === 1) {
        grid.innerHTML = '';
    }

    if (itemsToShow.length === 0 && currentFoundPage === 1) {
        grid.innerHTML = '<p class="text-center" style="grid-column: 1/-1; padding: 40px; color: var(--gray-500);">No found items matching your criteria.</p>';
        return;
    }

    itemsToShow.forEach((item, index) => {
        if (index >= (currentFoundPage - 1) * itemsPerPage) {
            grid.appendChild(createItemCard(item));
        }
    });

    // Show/hide load more button
    const loadMoreBtn = document.getElementById('load-more-found');
    if (endIndex >= filteredItems.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'inline-block';
    }
}

function createItemCard(item) {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.onclick = () => openItemModal(item);

    const iconMap = {
        electronics: 'fa-laptop',
        documents: 'fa-file-alt',
        accessories: 'fa-glasses',
        clothing: 'fa-tshirt',
        books: 'fa-book',
        keys: 'fa-key',
        sports: 'fa-football-ball',
        other: 'fa-box'
    };

    const statusClass = item.status === 'lost' ? 'status-lost' : 'status-found';
    const statusText = item.status === 'lost' ? 'Lost' : 'Found';

    card.innerHTML = `
        <div class="item-image">
            ${item.image ? `<img src="${item.image}" alt="${item.name}">` : `<i class="fas ${iconMap[item.category]}"></i>`}
        </div>
        <div class="item-content">
            <div class="item-header">
                <div>
                    <h3 class="item-title">${item.name}</h3>
                    <span class="item-category">${formatCategory(item.category)}</span>
                </div>
                <span class="item-status ${statusClass}">${statusText}</span>
            </div>
            <p class="item-description">${item.description}</p>
            <div class="item-meta">
                <div class="item-meta-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${formatLocation(item.location)}</span>
                </div>
                <div class="item-meta-item">
                    <i class="fas fa-calendar"></i>
                    <span>${formatDate(item.date)}</span>
                </div>
                ${item.currentLocation ? `
                <div class="item-meta-item">
                    <i class="fas fa-box"></i>
                    <span>${item.currentLocation}</span>
                </div>
                ` : ''}
            </div>
            <div class="item-footer">
                <span class="item-date">${getTimeAgo(item.date)}</span>
                <button class="item-action">View Details</button>
            </div>
        </div>
    `;

    return card;
}

// ===================================
// Modal Functions
// ===================================
function openItemModal(item) {
    const modalBody = document.getElementById('modal-body');
    
    const iconMap = {
        electronics: 'fa-laptop',
        documents: 'fa-file-alt',
        accessories: 'fa-glasses',
        clothing: 'fa-tshirt',
        books: 'fa-book',
        keys: 'fa-key',
        sports: 'fa-football-ball',
        other: 'fa-box'
    };

    const statusClass = item.status === 'lost' ? 'status-lost' : 'status-found';
    const statusText = item.status === 'lost' ? 'Lost Item' : 'Found Item';

    modalBody.innerHTML = `
        ${item.image ? `<img src="${item.image}" alt="${item.name}" class="modal-image">` : `
        <div class="item-image modal-image">
            <i class="fas ${iconMap[item.category]}"></i>
        </div>
        `}
        <div class="modal-header">
            <h2 class="modal-title">${item.name}</h2>
            <span class="item-status ${statusClass}">${statusText}</span>
        </div>
        <div class="modal-details">
            <div class="detail-item">
                <i class="fas fa-tag"></i>
                <span class="detail-label">Category:</span>
                <span class="detail-value">${formatCategory(item.category)}</span>
            </div>
            <div class="detail-item">
                <i class="fas fa-map-marker-alt"></i>
                <span class="detail-label">${item.status === 'lost' ? 'Last Seen:' : 'Found At:'}</span>
                <span class="detail-value">${formatLocation(item.location)}</span>
            </div>
            <div class="detail-item">
                <i class="fas fa-calendar"></i>
                <span class="detail-label">Date:</span>
                <span class="detail-value">${formatDate(item.date)}</span>
            </div>
            ${item.currentLocation ? `
            <div class="detail-item">
                <i class="fas fa-box"></i>
                <span class="detail-label">Current Location:</span>
                <span class="detail-value">${item.currentLocation}</span>
            </div>
            ` : ''}
            <div class="detail-item">
                <i class="fas fa-align-left"></i>
                <span class="detail-label">Description:</span>
                <span class="detail-value">${item.description}</span>
            </div>
            <div class="detail-item">
                <i class="fas fa-user"></i>
                <span class="detail-label">Contact Person:</span>
                <span class="detail-value">${item.contactName}</span>
            </div>
            <div class="detail-item">
                <i class="fas fa-envelope"></i>
                <span class="detail-label">Email:</span>
                <span class="detail-value"><a href="mailto:${item.contactEmail}">${item.contactEmail}</a></span>
            </div>
            <div class="detail-item">
                <i class="fas fa-phone"></i>
                <span class="detail-label">Phone:</span>
                <span class="detail-value"><a href="tel:${item.contactPhone}">${item.contactPhone}</a></span>
            </div>
        </div>
        <div class="modal-actions">
            <button class="btn btn -primary" onclick="contactOwner('${item.contactEmail}')">
                <i class="fas fa-envelope"></i> Contact ${item.status === 'lost' ? 'Owner' : 'Finder'}
            </button>
            <button class="btn btn-secondary" onclick="window.open('tel:${item.contactPhone}')">
                <i class="fas fa-phone"></i> Call Now
            </button>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function contactOwner(email) {
    window.location.href = `mailto:${email}`;
}

// ===================================
// Form Handlers
// ===================================
function handleLostItemSubmit(e) {
    e.preventDefault();
    
    const formData = {
        id: Date.now(),
        name: document.getElementById('lost-item-name').value,
        category: document.getElementById('lost-category').value,
        location: document.getElementById('lost-location').value,
        date: document.getElementById('lost-date').value,
        description: document.getElementById('lost-description').value,
        status: 'lost',
        contactName: document.getElementById('lost-contact-name').value,
        contactEmail: document.getElementById('lost-contact-email').value,
        contactPhone: document.getElementById('lost-contact-phone').value,
        studentId: document.getElementById('lost-student-id').value,
        image: null
    };

    // Handle image if uploaded
    const imageInput = document.getElementById('lost-image');
    if (imageInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function(e) {
            formData.image = e.target.result;
            saveLostItem(formData);
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        saveLostItem(formData);
    }
}

function saveLostItem(formData) {
    lostItems.unshift(formData);
    currentLostPage = 1;
    renderLostItems();
    updateStats();
    
    showToast('Lost item reported successfully! We will notify you if a match is found.', 'success');
    lostItemForm.reset();
    document.getElementById('lost-image-preview').innerHTML = '';
    
    // Scroll to lost items section
    setTimeout(() => {
        scrollToSection('lost-items');
    }, 1000);
}

function handleFoundItemSubmit(e) {
    e.preventDefault();
    
    const formData = {
        id: Date.now(),
        name: document.getElementById('found-item-name').value,
        category: document.getElementById('found-category').value,
        location: document.getElementById('found-location').value,
        date: document.getElementById('found-date').value,
        description: document.getElementById('found-description').value,
        currentLocation: document.getElementById('found-current-location').value,
        status: 'found',
        contactName: document.getElementById('found-contact-name').value,
        contactEmail: document.getElementById('found-contact-email').value,
        contactPhone: document.getElementById('found-contact-phone').value,
        studentId: document.getElementById('found-student-id').value,
        image: null
    };

    // Handle image if uploaded
    const imageInput = document.getElementById('found-image');
    if (imageInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function(e) {
            formData.image = e.target.result;
            saveFoundItem(formData);
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        saveFoundItem(formData);
    }
}

function saveFoundItem(formData) {
    foundItems.unshift(formData);
    currentFoundPage = 1;
    renderFoundItems();
    updateStats();
    
    showToast('Found item reported successfully! The owner can now contact you.', 'success');
    foundItemForm.reset();
    document.getElementById('found-image-preview').innerHTML = '';
    
    // Scroll to found items section
    setTimeout(() => {
        scrollToSection('found-items');
    }, 1000);
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;
    
    // Simulate sending message
    console.log('Contact Form Submitted:', { name, email, subject, message });
    
    showToast('Message sent successfully! We will get back to you soon.', 'success');
    contactForm.reset();
}

// ===================================
// Filter Functions
// ===================================
function applyFilters() {
    currentLostPage = 1;
    currentFoundPage = 1;
    renderLostItems();
    renderFoundItems();
}

function getFilteredItems(items) {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const location = locationFilter.value;
    const dateRange = dateFilter.value;

    return items.filter(item => {
        // Search filter
        const matchesSearch = !searchTerm || 
            item.name.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm) ||
            item.location.toLowerCase().includes(searchTerm);

        // Category filter
        const matchesCategory = category === 'all' || item.category === category;

        // Location filter
        const matchesLocation = location === 'all' || item.location === location;

        // Date filter
        const matchesDate = filterByDate(item.date, dateRange);

        return matchesSearch && matchesCategory && matchesLocation && matchesDate;
    });
}

function filterByDate(itemDate, range) {
    if (range === 'all') return true;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const itemDateObj = new Date(itemDate);
    itemDateObj.setHours(0, 0, 0, 0);

    const diffTime = today - itemDateObj;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    switch(range) {
        case 'today':
            return diffDays === 0;
        case 'week':
            return diffDays <= 7;
        case 'month':
            return diffDays <= 30;
        default:
            return true;
    }
}

// ===================================
// Tab Switching
// ===================================
function switchTab(tabName) {
    tabButtons.forEach(btn => {
        if (btn.getAttribute('data-tab') === tabName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    tabContents.forEach(content => {
        if (content.id === `${tabName}-form-content`) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
}

// ===================================
// Image Preview
// ===================================
function setupImagePreview(inputId, previewId) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);

    input.addEventListener('change', function(e) {
        preview.innerHTML = '';
        const files = Array.from(e.target.files);

        files.forEach((file, index) => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                
                reader.onload = function(event) {
                    const previewDiv = document.createElement('div');
                    previewDiv.className = 'preview-image';
                    previewDiv.innerHTML = `
                        <img src="${event.target.result}" alt="Preview">
                        <button type="button" class="preview-remove" onclick="removePreviewImage(this, '${inputId}', ${index})">
                            <i class="fas fa-times"></i>
                        </button>
                    `;
                    preview.appendChild(previewDiv);
                };
                
                reader.readAsDataURL(file);
            }
        });
    });
}

function removePreviewImage(button, inputId, index) {
    const input = document.getElementById(inputId);
    const dt = new DataTransfer();
    const files = input.files;

    for (let i = 0; i < files.length; i++) {
        if (i !== index) {
            dt.items.add(files[i]);
        }
    }

    input.files = dt.files;
    button.parentElement.remove();
}

// ===================================
// Utility Functions
// ===================================
function updateStats() {
    document.getElementById('total-items').textContent = lostItems.length + foundItems.length;
    document.getElementById('returned-items').textContent = 189; // This would be calculated from actual data
    document.getElementById('pending-items').textContent = lostItems.length;
}

function formatCategory(category) {
    const categories = {
        electronics: 'Electronics',
        documents: 'Documents',
        accessories: 'Accessories',
        clothing: 'Clothing',
        books: 'Books & Stationery',
        keys: 'Keys & Cards',
        sports: 'Sports Equipment',
        other: 'Other'
    };
    return categories[category] || category;
}

function formatLocation(location) {
    const locations = {
        library: 'Library',
        cafeteria: 'Cafeteria',
        hostel: 'Hostel',
        classroom: 'Classroom',
        lab: 'Laboratory',
        sports: 'Sports Complex',
        parking: 'Parking Area',
        auditorium: 'Auditorium'
    };
    return locations[location] || location;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function getTimeAgo(dateString) {
    const now = new Date();
    const past = new Date(dateString);
    const diffTime = Math.abs(now - past);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        if (diffHours === 0) {
            const diffMinutes = Math.floor(diffTime / (1000 * 60));
            return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
        }
        return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays === 1) {
        return 'Yesterday';
    } else if (diffDays < 7) {
        return `${diffDays} days ago`;
    } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
    } else {
        const months = Math.floor(diffDays / 30);
        return `${months} month${months !== 1 ? 's' : ''} ago`;
    }
}

function setMaxDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('lost-date').setAttribute('max', today);
    document.getElementById('found-date').setAttribute('max', today);
}

function showToast(message, type = 'success') {
    const toastElement = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    toastMessage.textContent = message;
    toastElement.className = `toast ${type}`;
    toastElement.classList.add('show');
    
    setTimeout(() => {
        toastElement.classList.remove('show');
    }, 4000);
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ===================================
// Smooth Scroll for Navigation
// ===================================
window.scrollToSection = scrollToSection;

// ===================================
// Search Highlighting (Optional Enhancement)
// ===================================
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// ===================================
// Local Storage Functions (for persistence)
// ===================================
function saveToLocalStorage() {
    localStorage.setItem('lostItems', JSON.stringify(lostItems));
    localStorage.setItem('foundItems', JSON.stringify(foundItems));
}

function loadFromLocalStorage() {
    const savedLostItems = localStorage.getItem('lostItems');
    const savedFoundItems = localStorage.getItem('foundItems');
    
    if (savedLostItems) {
        lostItems = JSON.parse(savedLostItems);
    }
    
    if (savedFoundItems) {
        foundItems = JSON.parse(savedFoundItems);
    }
}

// ===================================
// Auto-save to localStorage on changes
// ===================================
window.addEventListener('beforeunload', () => {
    saveToLocalStorage();
});

// ===================================
// Print Functionality
// ===================================
function printItemDetails(item) {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
        <head>
            <title>Print Item Details - ${item.name}</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1 { color: #4f46e5; }
                .detail { margin: 10px 0; }
                .label { font-weight: bold; }
            </style>
        </head>
        <body>
            <h1>${item.name}</h1>
            <div class="detail"><span class="label">Status:</span> ${item.status}</div>
            <div class="detail"><span class="label">Category:</span> ${formatCategory(item.category)}</div>
            <div class="detail"><span class="label">Location:</span> ${formatLocation(item.location)}</div>
            <div class="detail"><span class="label">Date:</span> ${formatDate(item.date)}</div>
            <div class="detail"><span class="label">Description:</span> ${item.description}</div>
            <div class="detail"><span class="label">Contact:</span> ${item.contactName}</div>
            <div class="detail"><span class="label">Email:</span> ${item.contactEmail}</div>
            <div class="detail"><span class="label">Phone:</span> ${item.contactPhone}</div>
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

// ===================================
// Export to CSV
// ===================================
function exportToCSV(items, filename) {
    const headers = ['Name', 'Category', 'Location', 'Date', 'Description', 'Contact Name', 'Email', 'Phone'];
    const csvContent = [
        headers.join(','),
        ...items.map(item => [
            item.name,
            formatCategory(item.category),
            formatLocation(item.location),
            item.date,
            `"${item.description}"`,
                        item.contactName,
            item.contactEmail,
            item.contactPhone
        ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ===================================
// Share Functionality
// ===================================
function shareItem(item) {
    const shareData = {
        title: `${item.status === 'lost' ? 'Lost' : 'Found'}: ${item.name}`,
        text: `${item.description}\nLocation: ${formatLocation(item.location)}\nDate: ${formatDate(item.date)}`,
        url: window.location.href
    };

    if (navigator.share) {
        navigator.share(shareData)
            .then(() => showToast('Item shared successfully!', 'success'))
            .catch((error) => console.log('Error sharing:', error));
    } else {
        // Fallback: Copy to clipboard
        const textToCopy = `${shareData.title}\n${shareData.text}\n${shareData.url}`;
        navigator.clipboard.writeText(textToCopy)
            .then(() => showToast('Link copied to clipboard!', 'success'))
            .catch(() => showToast('Failed to copy link', 'error'));
    }
}

// ===================================
// Advanced Search
// ===================================
function advancedSearch(query) {
    const allItems = [...lostItems, ...foundItems];
    const results = allItems.filter(item => {
        const searchableText = `${item.name} ${item.description} ${item.location} ${item.category}`.toLowerCase();
        return searchableText.includes(query.toLowerCase());
    });
    return results;
}

// ===================================
// Notification System
// ===================================
function checkForMatches(newItem) {
    const itemsToCheck = newItem.status === 'lost' ? foundItems : lostItems;
    
    const potentialMatches = itemsToCheck.filter(item => {
        const categoryMatch = item.category === newItem.category;
        const locationMatch = item.location === newItem.location;
        const nameMatch = item.name.toLowerCase().includes(newItem.name.toLowerCase()) ||
                         newItem.name.toLowerCase().includes(item.name.toLowerCase());
        
        return categoryMatch && (locationMatch || nameMatch);
    });

    if (potentialMatches.length > 0) {
        showToast(`Found ${potentialMatches.length} potential match(es)! Check your email for details.`, 'success');
        // In a real application, this would send an email notification
        console.log('Potential matches:', potentialMatches);
    }
}

// ===================================
// Form Validation
// ===================================
function validateForm(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'var(--danger-color)';
        } else {
            input.style.borderColor = 'var(--gray-200)';
        }
    });

    return isValid;
}

// ===================================
// Email Validation
// ===================================
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===================================
// Phone Validation
// ===================================
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
    return phoneRegex.test(phone);
}

// ===================================
// Sort Functions
// ===================================
function sortItems(items, sortBy) {
    switch(sortBy) {
        case 'date-new':
            return [...items].sort((a, b) => new Date(b.date) - new Date(a.date));
        case 'date-old':
            return [...items].sort((a, b) => new Date(a.date) - new Date(b.date));
        case 'name-asc':
            return [...items].sort((a, b) => a.name.localeCompare(b.name));
        case 'name-desc':
            return [...items].sort((a, b) => b.name.localeCompare(a.name));
        default:
            return items;
    }
}

// ===================================
// Dark Mode Toggle (Optional Feature)
// ===================================
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

function loadDarkModePreference() {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'true') {
        document.body.classList.add('dark-mode');
    }
}

// ===================================
// Keyboard Shortcuts
// ===================================
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
    
    // ESC to close modal
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// ===================================
// Lazy Loading Images
// ===================================
function lazyLoadImages() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    const lazyImages = document.querySelectorAll('img.lazy');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===================================
// Analytics Tracking (Placeholder)
// ===================================
function trackEvent(category, action, label) {
    console.log('Event tracked:', { category, action, label });
    // In production, this would integrate with Google Analytics or similar
}

// ===================================
// Generate Report
// ===================================
function generateReport(startDate, endDate) {
    const itemsInRange = [...lostItems, ...foundItems].filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
    });

    const report = {
        totalItems: itemsInRange.length,
        lostItems: itemsInRange.filter(i => i.status === 'lost').length,
        foundItems: itemsInRange.filter(i => i.status === 'found').length,
        categories: {}
    };

    itemsInRange.forEach(item => {
        if (!report.categories[item.category]) {
            report.categories[item.category] = 0;
        }
        report.categories[item.category]++;
    });

    return report;
}

// ===================================
// Auto-complete for Search
// ===================================
function setupAutoComplete() {
    const allItems = [...lostItems, ...foundItems];
    const suggestions = new Set();
    
    allItems.forEach(item => {
        suggestions.add(item.name);
        item.description.split(' ').forEach(word => {
            if (word.length > 3) suggestions.add(word);
        });
    });

    return Array.from(suggestions);
}

// ===================================
// Claim Item Functionality
// ===================================
function claimItem(itemId, itemType) {
    const item = itemType === 'lost' 
        ? lostItems.find(i => i.id === itemId)
        : foundItems.find(i => i.id === itemId);

    if (item) {
        const claimModal = confirm(`Do you want to claim this item: ${item.name}?\n\nYou will be contacted for verification.`);
        
        if (claimModal) {
            showToast('Claim submitted! You will be contacted shortly for verification.', 'success');
            // In a real application, this would send a notification to both parties
            trackEvent('Item', 'Claim', item.name);
        }
    }
}

// ===================================
// Mark Item as Returned
// ===================================
function markAsReturned(itemId, itemType) {
    if (itemType === 'lost') {
        const index = lostItems.findIndex(i => i.id === itemId);
        if (index > -1) {
            lostItems.splice(index, 1);
            renderLostItems();
            updateStats();
            showToast('Item marked as returned!', 'success');
        }
    } else {
        const index = foundItems.findIndex(i => i.id === itemId);
        if (index > -1) {
            foundItems.splice(index, 1);
            renderFoundItems();
            updateStats();
            showToast('Item marked as returned!', 'success');
        }
    }
    saveToLocalStorage();
}

// ===================================
// Image Compression
// ===================================
function compressImage(file, maxWidth = 800, quality = 0.8) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                let width = img.width;
                let height = img.height;
                
                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }
                
                canvas.width = width;
                canvas.height = height;
                
                ctx.drawImage(img, 0, 0, width, height);
                
                canvas.toBlob((blob) => {
                    resolve(blob);
                }, 'image/jpeg', quality);
            };
            
            img.onerror = reject;
        };
        
        reader.onerror = reject;
    });
}

// ===================================
// Geolocation (for nearby items)
// ===================================
function getNearbyItems(userLocation) {
    // This would require actual coordinates for each location
    // Placeholder implementation
    const locationProximity = {
        library: ['cafeteria', 'classroom'],
        cafeteria: ['library', 'auditorium'],
        hostel: ['sports', 'parking'],
        // ... etc
    };
    
    return locationProximity[userLocation] || [];
}

// ===================================
// Item Expiry (Auto-archive old items)
// ===================================
function archiveOldItems(daysThreshold = 90) {
    const threshold = new Date();
    threshold.setDate(threshold.getDate() - daysThreshold);
    
    const archivedLost = lostItems.filter(item => new Date(item.date) < threshold);
    const archivedFound = foundItems.filter(item => new Date(item.date) < threshold);
    
    lostItems = lostItems.filter(item => new Date(item.date) >= threshold);
    foundItems = foundItems.filter(item => new Date(item.date) >= threshold);
    
    if (archivedLost.length > 0 || archivedFound.length > 0) {
        console.log(`Archived ${archivedLost.length + archivedFound.length} old items`);
        saveToLocalStorage();
        renderLostItems();
        renderFoundItems();
        updateStats();
    }
}

// ===================================
// Initialize on page load
// ===================================
window.addEventListener('load', () => {
    loadFromLocalStorage();
    loadDarkModePreference();
    lazyLoadImages();
    
    // Check for old items and archive them
    archiveOldItems();
});

// ===================================
// Service Worker Registration (for PWA)
// ===================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered:', registration))
            .catch(error => console.log('SW registration failed:', error));
    });
}

// ===================================
// Periodic Auto-refresh
// ===================================
setInterval(() => {
    // In a real application, this would fetch new items from the server
    console.log('Auto-refresh triggered');
}, 300000); // Every 5 minutes

// ===================================
// Export Functions for Global Access
// ===================================
window.exportToCSV = exportToCSV;
window.shareItem = shareItem;
window.printItemDetails = printItemDetails;
window.toggleDarkMode = toggleDarkMode;
window.claimItem = claimItem;
window.markAsReturned = markAsReturned;