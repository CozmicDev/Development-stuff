// System Configuration Management
document.addEventListener('DOMContentLoaded', function() {
    loadSystemSettings();
    initToggleSwitches();
});

// Tab Switching
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName + '-tab').classList.add('active');
    
    // Activate button
    event.target.classList.add('active');
}

// Load System Settings
function loadSystemSettings() {
    const settings = JSON.parse(localStorage.getItem('systemSettings')) || getDefaultSettings();
    
    // General Settings
    if (document.getElementById('systemName')) {
        document.getElementById('systemName').value = settings.general.systemName;
    }
    if (document.getElementById('defaultLanguage')) {
        document.getElementById('defaultLanguage').value = settings.general.language;
    }
    if (document.getElementById('timezone')) {
        document.getElementById('timezone').value = settings.general.timezone;
    }
    if (document.getElementById('dateFormat')) {
        document.getElementById('dateFormat').value = settings.general.dateFormat;
    }
    if (document.getElementById('timeFormat')) {
        document.getElementById('timeFormat').value = settings.general.timeFormat;
    }
    if (document.getElementById('currency')) {
        document.getElementById('currency').value = settings.general.currency;
    }
    if (document.getElementById('maintenanceMode')) {
        document.getElementById('maintenanceMode').checked = settings.general.maintenanceMode;
    }
}

// Get Default Settings
function getDefaultSettings() {
    return {
        general: {
            systemName: 'Human Capital',
            language: 'en',
            timezone: 'America/Los_Angeles',
            dateFormat: 'MM/DD/YYYY',
            timeFormat: '12h',
            currency: 'USD',
            maintenanceMode: false,
            workWeekStart: 'monday',
            workHoursPerDay: 8,
            workDayStart: '09:00',
            workDayEnd: '17:00'
        },
        company: {
            name: 'Acme Corporation',
            legalName: 'Acme Corporation Inc.',
            registrationNumber: '12-3456789',
            taxId: '12-3456789',
            industry: 'technology',
            size: '201-500',
            website: 'https://www.acmecorp.com',
            phone: '+1 (555) 123-4567',
            email: 'hr@acmecorp.com',
            address: '123 Business Street\nSan Francisco, CA 94105\nUnited States'
        },
        modules: {
            leaveManagement: true,
            timeAttendance: true,
            performanceManagement: true,
            learningDevelopment: true,
            recruitment: true,
            payroll: false,
            expenseManagement: true
        },
        notifications: {
            smtpServer: 'smtp.gmail.com',
            smtpPort: 587,
            encryption: 'tls',
            fromEmail: 'noreply@acmecorp.com',
            fromName: 'Acme HR System',
            leaveApproval: true,
            performanceReview: true,
            documentReady: true,
            birthdays: false,
            maintenance: true
        },
        advanced: {
            sessionTimeout: 60,
            passwordExpiry: 90,
            maxUploadSize: 10,
            logRetention: 90
        }
    };
}

// Save All Settings
function saveAllSettings() {
    const settings = {
        general: {
            systemName: document.getElementById('systemName').value,
            language: document.getElementById('defaultLanguage').value,
            timezone: document.getElementById('timezone').value,
            dateFormat: document.getElementById('dateFormat').value,
            timeFormat: document.getElementById('timeFormat').value,
            currency: document.getElementById('currency').value,
            maintenanceMode: document.getElementById('maintenanceMode').checked
        },
        company: {}, // Would collect from company tab
        modules: {}, // Would collect from modules tab
        notifications: {}, // Would collect from notifications tab
        advanced: {} // Would collect from advanced tab
    };
    
    // Merge with existing settings
    const existingSettings = JSON.parse(localStorage.getItem('systemSettings')) || getDefaultSettings();
    const mergedSettings = { ...existingSettings, ...settings };
    
    localStorage.setItem('systemSettings', JSON.stringify(mergedSettings));
    
    // Log the change
    if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
        window.dataService.auditLog.log({
            action: 'system_settings_updated',
            details: 'System configuration updated',
            severity: 'info'
        });
    }
    
    showSuccessNotification('Settings saved successfully!');
}

// Initialize Toggle Switches
function initToggleSwitches() {
    const switches = document.querySelectorAll('.switch input[type="checkbox"]');
    switches.forEach(switchEl => {
        switchEl.addEventListener('change', function() {
            // Visual feedback
            this.parentElement.classList.add('switch-changed');
            setTimeout(() => {
                this.parentElement.classList.remove('switch-changed');
            }, 300);
        });
    });
}

// Test Email
function testEmail() {
    showSuccessNotification('Test email sent to hr@acmecorp.com');
    
    // Log the action
    if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
        window.dataService.auditLog.log({
            action: 'email_test',
            details: 'Test email sent',
            severity: 'info'
        });
    }
}

// Clear Cache
function clearCache() {
    if (confirm('Are you sure you want to clear the system cache? This may temporarily slow down the system.')) {
        // Simulate cache clearing
        setTimeout(() => {
            showSuccessNotification('System cache cleared successfully!');
            
            // Log the action
            if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
                window.dataService.auditLog.log({
                    action: 'cache_cleared',
                    details: 'System cache cleared',
                    severity: 'warning'
                });
            }
        }, 1000);
    }
}

// Reset Settings
function resetSettings() {
    if (confirm('Are you sure you want to reset all settings to defaults? This cannot be undone.')) {
        const defaultSettings = getDefaultSettings();
        localStorage.setItem('systemSettings', JSON.stringify(defaultSettings));
        
        // Log the action
        if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
            window.dataService.auditLog.log({
                action: 'settings_reset',
                details: 'System settings reset to defaults',
                severity: 'warning'
            });
        }
        
        showSuccessNotification('Settings reset to defaults. Reloading...');
        setTimeout(() => {
            location.reload();
        }, 1500);
    }
}

// Confirm Delete All Data
function confirmDeleteAll() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <div class="modal-header" style="background: var(--danger-color); color: white;">
                <h3>⚠️ Danger: Delete All Data</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div style="padding: 16px; background: #FEE2E2; border-radius: 8px; margin-bottom: 16px;">
                    <p style="margin: 0; color: #991B1B;"><strong>Warning:</strong> This action will permanently delete:</p>
                    <ul style="margin: 8px 0 0 0; color: #991B1B;">
                        <li>All user accounts</li>
                        <li>All employee records</li>
                        <li>All leave requests</li>
                        <li>All audit logs</li>
                        <li>All system data</li>
                    </ul>
                </div>
                
                <p><strong>This action cannot be undone!</strong></p>
                
                <p>Type <code style="background: #FEE2E2; padding: 2px 8px; border-radius: 4px; color: #991B1B;">DELETE ALL DATA</code> to confirm:</p>
                
                <input type="text" id="deleteConfirmation" placeholder="DELETE ALL DATA" style="width: 100%; padding: 8px; border: 2px solid var(--danger-color); border-radius: 4px; font-family: monospace;">
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Cancel</button>
                <button class="btn" style="background: var(--danger-color);" onclick="deleteAllData()">Delete Everything</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    document.getElementById('deleteConfirmation').focus();
}

// Delete All Data
function deleteAllData() {
    const confirmation = document.getElementById('deleteConfirmation').value;
    
    if (confirmation !== 'DELETE ALL DATA') {
        alert('Please type "DELETE ALL DATA" exactly to confirm.');
        return;
    }
    
    // Clear all localStorage
    localStorage.clear();
    
    // Close modal
    document.querySelector('.modal').remove();
    
    showSuccessNotification('All data has been deleted. Redirecting to login...');
    
    setTimeout(() => {
        window.location.href = '../index.html';
    }, 2000);
}

// Success Notification
function showSuccessNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--secondary-color);
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 20px;">✓</span>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .switch {
        position: relative;
        display: inline-block;
        width: 48px;
        height: 24px;
        flex-shrink: 0;
    }
    
    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }
    
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: 0.3s;
        border-radius: 24px;
    }
    
    .slider:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: 0.3s;
        border-radius: 50%;
    }
    
    input:checked + .slider {
        background-color: var(--secondary-color);
    }
    
    input:checked + .slider:before {
        transform: translateX(24px);
    }
    
    .switch-changed .slider {
        box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.2);
    }
`;
document.head.appendChild(style);
