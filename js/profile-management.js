// Profile Management Functionality

let isEditMode = false;
let originalFormData = {};

// Load profile data from localStorage or use defaults
let profileData = JSON.parse(localStorage.getItem('profileData')) || {
    firstName: 'Mohammed',
    lastName: 'Al Hashimi',
    dob: '1990-05-15',
    gender: 'male',
    email: 'mohammed.alhashimi@company.com',
    phone: '+971 50 123 4567',
    personalEmail: 'mohammed.alhashimi@email.com',
    mobile: '+971 56 789 1234',
    address: '123 Sheikh Zayed Road',
    city: 'Dubai',
    state: 'Dubai',
    zip: '00000',
    country: 'United Arab Emirates'
};

// Save profile data
function saveProfileData() {
    localStorage.setItem('profileData', JSON.stringify(profileData));
}

// Tab switching for profile
function switchProfileTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Toggle edit mode
function toggleEditMode() {
    isEditMode = !isEditMode;
    const editButton = document.getElementById('editButtonText');
    const saveContainer = document.getElementById('saveButtonContainer');
    
    // Get all editable fields (exclude readonly fields)
    const editableFields = document.querySelectorAll('#personalInfoForm input:not(.readonly), #personalInfoForm select:not(.readonly)');
    
    if (isEditMode) {
        // Enable editing
        editButton.textContent = '❌ Cancel Edit';
        saveContainer.style.display = 'block';
        
        editableFields.forEach(field => {
            field.removeAttribute('readonly');
            field.removeAttribute('disabled');
            field.style.background = 'white';
            field.style.borderColor = 'var(--border-color)';
        });
        
        // Store original values
        editableFields.forEach(field => {
            originalFormData[field.id] = field.value;
        });
        
    } else {
        // Disable editing and restore original values
        editButton.textContent = '✏️ Edit Profile';
        saveContainer.style.display = 'none';
        
        editableFields.forEach(field => {
            if (originalFormData[field.id]) {
                field.value = originalFormData[field.id];
            }
            field.setAttribute('readonly', 'readonly');
            if (field.tagName === 'SELECT') {
                field.setAttribute('disabled', 'disabled');
            }
            field.style.background = 'var(--background)';
        });
    }
}

// Save personal information
function savePersonalInfo() {
    // Collect form data
    const formFields = ['phone', 'personalEmail', 'mobile', 'address', 'city', 'state', 'zip', 'country'];
    
    formFields.forEach(field => {
        const element = document.getElementById(field);
        if (element) {
            profileData[field] = element.value;
        }
    });
    
    // Save to localStorage
    saveProfileData();
    
    // Show success message
    showSuccessNotification('Profile updated successfully!');
    
    // Exit edit mode
    isEditMode = true; // Set to true so toggleEditMode will turn it off
    toggleEditMode();
}

// Cancel edit
function cancelEdit() {
    isEditMode = true; // Set to true so toggleEditMode will turn it off
    toggleEditMode();
}

// Upload profile picture
function uploadProfilePicture() {
    // Create file input
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // In a real app, this would upload to server
            // For demo, we'll just show a message
            showSuccessNotification(`Profile picture "${file.name}" uploaded successfully!`);
            
            // Could update the image here with FileReader
            const reader = new FileReader();
            reader.onload = (event) => {
                document.getElementById('profileImage').src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    };
    
    input.click();
}

// Emergency Contact Management
function addEmergencyContact() {
    const name = prompt('Enter contact name:');
    if (!name) return;
    
    const relationship = prompt('Enter relationship (e.g., Spouse, Parent, Sibling):');
    if (!relationship) return;
    
    const phone = prompt('Enter phone number:');
    if (!phone) return;
    
    const email = prompt('Enter email address:');
    if (!email) return;
    
    // Create new contact card
    const contactsList = document.getElementById('emergencyContactsList');
    const newContact = document.createElement('div');
    newContact.className = 'emergency-contact-card';
    newContact.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: start;">
            <div>
                <h4>${name}</h4>
                <p style="color: var(--text-secondary); margin: 4px 0;">${relationship}</p>
            </div>
            <div>
                <button class="btn btn-sm btn-outline" onclick="editEmergencyContact(${Date.now()})">Edit</button>
                <button class="btn btn-sm btn-outline" onclick="this.closest('.emergency-contact-card').remove()">Delete</button>
            </div>
        </div>
        <div style="margin-top: 12px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
            <div>
                <p style="font-size: 12px; color: var(--text-secondary);">Phone</p>
                <p>${phone}</p>
            </div>
            <div>
                <p style="font-size: 12px; color: var(--text-secondary);">Email</p>
                <p>${email}</p>
            </div>
        </div>
    `;
    
    contactsList.appendChild(newContact);
    showSuccessNotification('Emergency contact added successfully!');
}

function editEmergencyContact(index) {
    alert('Edit Emergency Contact\n\nThis feature would allow you to modify the contact details.');
}

function deleteEmergencyContact(index) {
    if (confirm('Are you sure you want to delete this emergency contact?')) {
        showSuccessNotification('Emergency contact deleted successfully!');
        // In a real app, this would remove the contact from the data
    }
}

// Document Management
function uploadDocument() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const docType = prompt('Enter document type (e.g., Certificate, Resume, etc.):');
            if (docType) {
                showSuccessNotification(`Document "${file.name}" uploaded successfully!`);
                
                // Add to table
                const tbody = document.querySelector('#documents-tab table tbody');
                const newRow = tbody.insertRow(0);
                newRow.innerHTML = `
                    <td>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="font-size: 20px;">📄</span>
                            <strong>${file.name}</strong>
                        </div>
                    </td>
                    <td>${docType}</td>
                    <td>${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                    <td>${(file.size / 1024).toFixed(0)} KB</td>
                    <td>
                        <button class="btn btn-sm btn-outline" onclick="downloadDocument('${file.name}')">Download</button>
                        <button class="btn btn-sm btn-outline" onclick="deleteDocument(this)">Delete</button>
                    </td>
                `;
            }
        }
    };
    
    input.click();
}

function downloadDocument(docName) {
    showSuccessNotification(`Downloading ${docName}...`);
    // In a real app, this would download the actual file
}

function deleteDocument(button) {
    if (confirm('Are you sure you want to delete this document?')) {
        button.closest('tr').remove();
        showSuccessNotification('Document deleted successfully!');
    }
}

// Success notification
function showSuccessNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 24px;">✅</span>
            <span>${message}</span>
        </div>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        z-index: 3000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS styles
const style = document.createElement('style');
style.textContent = `
    .emergency-contact-card {
        padding: 20px;
        background: var(--background);
        border-radius: 8px;
        margin-bottom: 16px;
    }
    
    .emergency-contact-card h4 {
        font-size: 16px;
        margin-bottom: 4px;
    }
    
    .readonly {
        background: var(--background) !important;
        cursor: not-allowed;
    }
    
    input[readonly],
    select[disabled] {
        background: var(--background);
    }
`;
document.head.appendChild(style);

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Load profile data into form
    Object.keys(profileData).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.value = profileData[key];
        }
    });
    
    // Update display name
    const displayName = document.getElementById('displayName');
    if (displayName) {
        displayName.textContent = `${profileData.firstName} ${profileData.lastName}`;
    }
});
