// Admin Users & Roles Management

// Filter users
function filterUsers() {
    const searchTerm = document.getElementById('searchUsers').value.toLowerCase();
    const roleFilter = document.getElementById('roleFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    
    const rows = document.querySelectorAll('#usersTableBody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const role = row.getAttribute('data-role');
        const status = row.getAttribute('data-status');
        
        const matchesSearch = searchTerm === '' || text.includes(searchTerm);
        const matchesRole = roleFilter === 'all' || role === roleFilter;
        const matchesStatus = statusFilter === 'all' || status === statusFilter;
        
        if (matchesSearch && matchesRole && matchesStatus) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Reset filters
function resetUserFilters() {
    document.getElementById('searchUsers').value = '';
    document.getElementById('roleFilter').value = 'all';
    document.getElementById('statusFilter').value = 'active';
    filterUsers();
    showSuccessNotification('Filters reset');
}

// Toggle select all
function toggleSelectAllUsers() {
    const selectAll = document.getElementById('selectAllUsers');
    const checkboxes = document.querySelectorAll('.user-checkbox');
    
    checkboxes.forEach(cb => {
        if (cb.closest('tr').style.display !== 'none') {
            cb.checked = selectAll.checked;
        }
    });
    
    updateSelectedCount();
}

// Update selected count
function updateSelectedCount() {
    const selected = document.querySelectorAll('.user-checkbox:checked').length;
    const countElement = document.getElementById('selectedCount');
    const bulkBtn = document.getElementById('bulkActionsBtn');
    
    if (countElement) {
        countElement.textContent = selected;
    }
    
    if (bulkBtn) {
        bulkBtn.disabled = selected === 0;
    }
}

// Listen for checkbox changes
document.addEventListener('change', function(e) {
    if (e.target.classList.contains('user-checkbox')) {
        updateSelectedCount();
    }
});

// View user details
function viewUserDetails(userId) {
    alert(`Viewing details for user: ${userId}\n\nThis would open a modal with full user information including:\n- Personal details\n- Account settings\n- Role permissions\n- Activity log\n- Login history`);
}

// Edit user
function editUser(userId) {
    alert(`Editing user: ${userId}\n\nThis would open a modal to edit:\n- Basic information\n- Role and permissions\n- Department assignment\n- Account status\n- Access level`);
}

// Add new user
function addNewUser(event) {
    event.preventDefault();
    
    showSuccessNotification('✅ New user created successfully! Welcome email sent.');
    closeModal('addUserModal');
    
    // Reset form
    document.getElementById('addUserForm').reset();
}

// Send invitation
function sendInvite(event) {
    event.preventDefault();
    
    showSuccessNotification('✉️ Invitation sent successfully!');
    closeModal('inviteUserModal');
}

// Bulk actions modal
function showBulkActionsModal() {
    const selected = document.querySelectorAll('.user-checkbox:checked').length;
    
    const actions = `
        <div style="display: flex; flex-direction: column; gap: 12px;">
            <button class="btn btn-outline" onclick="bulkUpdateRole(); closeModal('bulkModal');" style="justify-content: flex-start;">
                🔄 Change Role
            </button>
            <button class="btn btn-outline" onclick="bulkUpdateDepartment(); closeModal('bulkModal');" style="justify-content: flex-start;">
                🏢 Change Department
            </button>
            <button class="btn btn-outline" onclick="bulkActivate(); closeModal('bulkModal');" style="justify-content: flex-start;">
                ✅ Activate Users
            </button>
            <button class="btn btn-outline" onclick="bulkDeactivate(); closeModal('bulkModal');" style="justify-content: flex-start;">
                ⏸️ Deactivate Users
            </button>
            <button class="btn btn-outline" onclick="bulkResetPassword(); closeModal('bulkModal');" style="justify-content: flex-start;">
                🔑 Reset Passwords
            </button>
            <button class="btn btn-outline" style="color: var(--danger-color); justify-content: flex-start;" onclick="bulkDelete(); closeModal('bulkModal');">
                🗑️ Delete Users
            </button>
        </div>
    `;
    
    const modal = document.createElement('div');
    modal.id = 'bulkModal';
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 400px;">
            <div class="modal-header">
                <h3>Bulk Actions (${selected} users)</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                ${actions}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Bulk operations
function bulkUpdateRole() {
    const selected = document.querySelectorAll('.user-checkbox:checked').length;
    const role = prompt('Enter new role for selected users:\n- employee\n- manager\n- hr\n- admin');
    if (role) {
        showSuccessNotification(`🔄 Role updated for ${selected} user(s)`);
    }
}

function bulkUpdateDepartment() {
    const selected = document.querySelectorAll('.user-checkbox:checked').length;
    const dept = prompt('Enter new department for selected users:');
    if (dept) {
        showSuccessNotification(`🏢 Department updated for ${selected} user(s)`);
    }
}

function bulkActivate() {
    const selected = document.querySelectorAll('.user-checkbox:checked').length;
    if (confirm(`Activate ${selected} user account(s)?`)) {
        showSuccessNotification(`✅ ${selected} user(s) activated`);
    }
}

function bulkDeactivate() {
    const selected = document.querySelectorAll('.user-checkbox:checked').length;
    if (confirm(`Deactivate ${selected} user account(s)?`)) {
        showSuccessNotification(`⏸️ ${selected} user(s) deactivated`);
    }
}

function bulkResetPassword() {
    const selected = document.querySelectorAll('.user-checkbox:checked').length;
    if (confirm(`Send password reset emails to ${selected} user(s)?`)) {
        showSuccessNotification(`🔑 Password reset emails sent to ${selected} user(s)`);
    }
}

function bulkDelete() {
    const selected = document.querySelectorAll('.user-checkbox:checked').length;
    if (confirm(`⚠️ WARNING: This will permanently delete ${selected} user account(s).\n\nThis action cannot be undone. Continue?`)) {
        showSuccessNotification(`🗑️ ${selected} user account(s) deleted`);
        
        // Remove checked rows
        document.querySelectorAll('.user-checkbox:checked').forEach(cb => {
            cb.closest('tr').remove();
        });
        
        updateSelectedCount();
    }
}

// Export users
function exportUsers() {
    showSuccessNotification('📥 Exporting user data to CSV...');
    setTimeout(() => {
        showSuccessNotification('✅ User data exported successfully!');
    }, 1000);
}

// Success notification
function showSuccessNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
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

console.log('✅ Admin Users Management loaded');
