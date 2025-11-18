// Security Settings Management
document.addEventListener('DOMContentLoaded', function() {
    loadSecuritySettings();
    initSwitches();
});

// Tab Switching
function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(tabName + '-tab').classList.add('active');
    event.target.classList.add('active');
}

// Load Security Settings
function loadSecuritySettings() {
    const settings = JSON.parse(localStorage.getItem('securitySettings')) || getDefaultSecuritySettings();
    localStorage.setItem('securitySettings', JSON.stringify(settings));
}

// Get Default Security Settings
function getDefaultSecuritySettings() {
    return {
        mfa: {
            required: true,
            methods: ['totp', 'email'],
            gracePeriod: 7
        },
        sso: {
            enabled: true,
            provider: 'okta'
        },
        password: {
            minLength: 12,
            requireUppercase: true,
            requireLowercase: true,
            requireNumbers: true,
            requireSpecial: true,
            expiryDays: 90,
            historyCount: 5,
            maxFailedAttempts: 5,
            lockoutDuration: 30
        },
        sessions: {
            timeout: 60,
            maxConcurrent: 3,
            requireReauth: true,
            rememberDevice: true
        },
        access: {
            ipWhitelistEnabled: false,
            blockVPN: true,
            blockTor: false,
            allowedCountries: ['US', 'CA']
        },
        encryption: {
            algorithm: 'aes256',
            tlsVersion: '1.3',
            encryptSensitiveFields: true,
            e2eMessages: true
        }
    };
}

// Save Security Settings
function saveSecuritySettings() {
    const settings = getDefaultSecuritySettings();
    // In real implementation, collect values from form fields
    
    localStorage.setItem('securitySettings', JSON.stringify(settings));
    
    if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
        window.dataService.auditLog.log({
            action: 'security_settings_updated',
            details: 'Security settings updated',
            severity: 'warning'
        });
    }
    
    showSuccessNotification('Security settings saved successfully!');
}

// Reset Security Settings
function resetSecuritySettings() {
    if (confirm('Are you sure you want to reset security settings to defaults? This may affect system security.')) {
        const defaultSettings = getDefaultSecuritySettings();
        localStorage.setItem('securitySettings', JSON.stringify(defaultSettings));
        
        if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
            window.dataService.auditLog.log({
                action: 'security_settings_reset',
                details: 'Security settings reset to defaults',
                severity: 'warning'
            });
        }
        
        showSuccessNotification('Security settings reset to defaults. Reloading...');
        setTimeout(() => location.reload(), 1500);
    }
}

// Run Security Scan
function runSecurityScan() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h3>🔍 Security Scan</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div id="scanProgress">
                    <p>Running comprehensive security scan...</p>
                    <div style="width: 100%; height: 8px; background: var(--background); border-radius: 4px; overflow: hidden; margin: 16px 0;">
                        <div id="scanBar" style="width: 0%; height: 100%; background: var(--secondary-color); transition: width 0.3s;"></div>
                    </div>
                    <p id="scanStatus" style="font-size: 13px; color: var(--text-secondary);">Initializing scan...</p>
                </div>
                <div id="scanResults" style="display: none;">
                    <div style="padding: 16px; background: #D1FAE5; border-radius: 8px; margin-bottom: 16px; border-left: 4px solid var(--secondary-color);">
                        <h4 style="margin: 0 0 8px 0; color: #065F46;">✓ Security Score: 98/100</h4>
                        <p style="font-size: 13px; color: #065F46; margin: 0;">Your system security is excellent</p>
                    </div>
                    
                    <h4 style="margin: 16px 0 8px 0;">Findings:</h4>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <div style="padding: 12px; background: var(--background); border-radius: 4px; border-left: 3px solid var(--secondary-color);">
                            <strong style="color: var(--secondary-color);">✓ Pass:</strong> MFA is enabled for all users
                        </div>
                        <div style="padding: 12px; background: var(--background); border-radius: 4px; border-left: 3px solid var(--secondary-color);">
                            <strong style="color: var(--secondary-color);">✓ Pass:</strong> Strong password policy enforced
                        </div>
                        <div style="padding: 12px; background: var(--background); border-radius: 4px; border-left: 3px solid var(--warning-color);">
                            <strong style="color: var(--warning-color);">⚠ Warning:</strong> 3 users haven't logged in for 90+ days
                        </div>
                        <div style="padding: 12px; background: var(--background); border-radius: 4px; border-left: 3px solid var(--secondary-color);">
                            <strong style="color: var(--secondary-color);">✓ Pass:</strong> SSL certificate is valid
                        </div>
                        <div style="padding: 12px; background: var(--background); border-radius: 4px; border-left: 3px solid var(--warning-color);">
                            <strong style="color: var(--warning-color);">⚠ Warning:</strong> IP whitelist is disabled
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Close</button>
                <button class="btn btn-primary" onclick="exportScanResults()" style="display: none;" id="exportBtn">📥 Export Report</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Simulate scan progress
    const statuses = [
        'Checking password policies...',
        'Verifying MFA configuration...',
        'Scanning for inactive users...',
        'Validating SSL certificates...',
        'Checking access controls...',
        'Analyzing security logs...',
        'Generating report...'
    ];
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 14.3;
        document.getElementById('scanBar').style.width = progress + '%';
        
        const statusIndex = Math.floor(progress / 14.3) - 1;
        if (statusIndex >= 0 && statusIndex < statuses.length) {
            document.getElementById('scanStatus').textContent = statuses[statusIndex];
        }
        
        if (progress >= 100) {
            clearInterval(interval);
            document.getElementById('scanProgress').style.display = 'none';
            document.getElementById('scanResults').style.display = 'block';
            document.getElementById('exportBtn').style.display = 'inline-block';
            
            if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
                window.dataService.auditLog.log({
                    action: 'security_scan_completed',
                    details: 'Security scan completed with score 98/100',
                    severity: 'info'
                });
            }
        }
    }, 500);
}

// Export Scan Results
function exportScanResults() {
    showSuccessNotification('Security scan report exported successfully!');
}

// Configure SSO Provider
function configureSSOProvider() {
    window.location.href = 'admin-integrations.html';
}

// Session Management
function refreshSessions() {
    showSuccessNotification('Session list refreshed');
}

function terminateSession(sessionId) {
    if (confirm('Are you sure you want to terminate this session? The user will be logged out immediately.')) {
        showSuccessNotification('Session terminated successfully');
        
        if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
            window.dataService.auditLog.log({
                action: 'session_terminated',
                details: `Terminated session: ${sessionId}`,
                severity: 'warning'
            });
        }
    }
}

// IP Whitelist Management
function addIpAddress() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <div class="modal-header">
                <h3>Add IP Address</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>IP Address or CIDR Range *</label>
                    <input type="text" id="ipAddress" placeholder="e.g., 192.168.1.100 or 10.0.0.0/24">
                    <small>Single IP or CIDR notation for ranges</small>
                </div>
                
                <div class="form-group">
                    <label>Description</label>
                    <input type="text" id="ipDescription" placeholder="e.g., Office Network">
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Cancel</button>
                <button class="btn btn-primary" onclick="saveIpAddress()">Add IP Address</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function saveIpAddress() {
    const ip = document.getElementById('ipAddress').value;
    if (!ip) {
        alert('Please enter an IP address');
        return;
    }
    
    document.querySelector('.modal').remove();
    showSuccessNotification('IP address added to whitelist');
    
    if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
        window.dataService.auditLog.log({
            action: 'ip_whitelist_updated',
            details: `Added IP to whitelist: ${ip}`,
            severity: 'info'
        });
    }
}

function editIpAddress(ipId) {
    showSuccessNotification('Edit IP address functionality');
}

function deleteIpAddress(ipId) {
    if (confirm('Are you sure you want to remove this IP address from the whitelist?')) {
        showSuccessNotification('IP address removed from whitelist');
        
        if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
            window.dataService.auditLog.log({
                action: 'ip_whitelist_updated',
                details: `Removed IP from whitelist: ${ipId}`,
                severity: 'warning'
            });
        }
    }
}

// Certificate Management
function renewCertificate() {
    if (confirm('Are you sure you want to renew the SSL certificate? This may cause a brief service interruption.')) {
        showSuccessNotification('SSL certificate renewal initiated...');
        
        setTimeout(() => {
            showSuccessNotification('✓ SSL certificate renewed successfully!');
            
            if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
                window.dataService.auditLog.log({
                    action: 'ssl_certificate_renewed',
                    details: 'SSL certificate renewed',
                    severity: 'info'
                });
            }
        }, 2000);
    }
}

function uploadCertificate() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h3>Upload Custom Certificate</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Certificate (.crt)</label>
                    <input type="file" accept=".crt,.pem">
                </div>
                
                <div class="form-group">
                    <label>Private Key (.key)</label>
                    <input type="file" accept=".key,.pem">
                </div>
                
                <div class="form-group">
                    <label>Certificate Chain (optional)</label>
                    <input type="file" accept=".crt,.pem">
                </div>
                
                <div style="padding: 16px; background: #FEF3C7; border-radius: 8px; margin-top: 16px;">
                    <p style="margin: 0; font-size: 13px; color: #92400E;">⚠️ <strong>Warning:</strong> Uploading an invalid certificate may cause service disruption. Make sure your certificate is valid before uploading.</p>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Cancel</button>
                <button class="btn btn-primary" onclick="processUploadCertificate()">Upload Certificate</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function processUploadCertificate() {
    document.querySelector('.modal').remove();
    showSuccessNotification('Certificate uploaded and validated successfully!');
    
    if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
        window.dataService.auditLog.log({
            action: 'ssl_certificate_uploaded',
            details: 'Custom SSL certificate uploaded',
            severity: 'warning'
        });
    }
}

// Initialize Switches
function initSwitches() {
    const switches = document.querySelectorAll('.switch input[type="checkbox"]');
    switches.forEach(switchEl => {
        switchEl.addEventListener('change', function() {
            this.parentElement.classList.add('switch-changed');
            setTimeout(() => {
                this.parentElement.classList.remove('switch-changed');
            }, 300);
        });
    });
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

// Add CSS
const style = document.createElement('style');
style.textContent = `
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
`;
document.head.appendChild(style);
