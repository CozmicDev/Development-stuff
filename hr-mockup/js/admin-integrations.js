// Integrations Management
document.addEventListener('DOMContentLoaded', function() {
    loadIntegrations();
});

// Load Integrations
function loadIntegrations() {
    const integrations = JSON.parse(localStorage.getItem('integrations')) || getDefaultIntegrations();
    localStorage.setItem('integrations', JSON.stringify(integrations));
}

// Get Default Integrations
function getDefaultIntegrations() {
    return {
        active: [
            { id: 'sso', name: 'Single Sign-On (SSO)', provider: 'Okta', status: 'active', lastSync: new Date().toISOString() },
            { id: 'email', name: 'Email Service', provider: 'SendGrid', status: 'active', emailsSent: 1247 },
            { id: 'calendar', name: 'Calendar Sync', provider: 'Google Calendar', status: 'warning', issue: 'API quota limit reached' },
            { id: 'payroll', name: 'Payroll System', provider: 'ADP Workforce Now', status: 'active', lastPayroll: 'Dec 15, 2024' },
            { id: 'slack', name: 'Slack', provider: 'Slack', status: 'active', channel: '#hr-notifications' },
            { id: 'background', name: 'Background Checks', provider: 'Checkr', status: 'disconnected', issue: 'API key expired' }
        ],
        available: [
            { id: 'microsoft365', name: 'Microsoft 365', description: 'Integrate with Outlook, Teams, and OneDrive' },
            { id: 'zoom', name: 'Zoom', description: 'Schedule and manage video interviews' },
            { id: 'linkedin', name: 'LinkedIn', description: 'Post jobs and import candidate profiles' },
            { id: 'docusign', name: 'DocuSign', description: 'Electronic signature for documents' },
            { id: 'quickbooks', name: 'QuickBooks', description: 'Sync payroll with accounting' },
            { id: 'bamboohr', name: 'BambooHR', description: 'Import employee data and sync records' }
        ],
        apiKeys: [
            { id: 'prod', name: 'Production API', key: 'hrp_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p4a2b', created: 'Nov 15, 2024', lastUsed: new Date(), status: 'active' },
            { id: 'dev', name: 'Development API', key: 'hrp_test_z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k9c1d', created: 'Nov 1, 2024', lastUsed: new Date(Date.now() - 3*60*60*1000), status: 'active' },
            { id: 'mobile', name: 'Mobile App API', key: 'hrp_live_m5n6o7p8q9r0s1t2u3v4w5x6y7z8a9b7f3e', created: 'Oct 20, 2024', lastUsed: null, status: 'inactive' }
        ]
    };
}

// Configure Integration
function configureIntegration(integrationId) {
    const integrations = {
        'sso': {
            title: 'Configure SSO',
            fields: [
                { label: 'Identity Provider', type: 'select', options: ['Okta', 'Azure AD', 'OneLogin', 'Auth0'], value: 'Okta' },
                { label: 'SSO URL', type: 'text', value: 'https://acme.okta.com/sso/saml' },
                { label: 'Entity ID', type: 'text', value: 'https://hrpro.acmecorp.com' },
                { label: 'X.509 Certificate', type: 'textarea', value: '-----BEGIN CERTIFICATE-----\nMIIDXTCCAkWgAwIBAgIJAL...' }
            ]
        },
        'email': {
            title: 'Configure Email',
            fields: [
                { label: 'Provider', type: 'select', options: ['SendGrid', 'Mailgun', 'Amazon SES'], value: 'SendGrid' },
                { label: 'API Key', type: 'password', value: 'SG.************************************' },
                { label: 'From Email', type: 'email', value: 'noreply@acmecorp.com' },
                { label: 'From Name', type: 'text', value: 'Acme HR System' }
            ]
        },
        'calendar': {
            title: 'Configure Calendar',
            fields: [
                { label: 'Provider', type: 'select', options: ['Google Calendar', 'Outlook Calendar'], value: 'Google Calendar' },
                { label: 'Client ID', type: 'text', value: '1234567890-abcdefghijklmnop.apps.googleusercontent.com' },
                { label: 'Client Secret', type: 'password', value: '****************************' },
                { label: 'Sync Frequency', type: 'select', options: ['Real-time', 'Every 5 minutes', 'Every 15 minutes', 'Hourly'], value: 'Every 15 minutes' }
            ]
        },
        'payroll': {
            title: 'Configure Payroll',
            fields: [
                { label: 'Provider', type: 'select', options: ['ADP Workforce Now', 'Gusto', 'Paychex'], value: 'ADP Workforce Now' },
                { label: 'API Key', type: 'password', value: '****************************' },
                { label: 'Company Code', type: 'text', value: 'ACME001' },
                { label: 'Auto-sync', type: 'checkbox', value: true }
            ]
        },
        'slack': {
            title: 'Configure Slack',
            fields: [
                { label: 'Workspace', type: 'text', value: 'acmecorp.slack.com' },
                { label: 'Bot Token', type: 'password', value: 'xoxb-****************************' },
                { label: 'Notification Channel', type: 'text', value: '#hr-notifications' },
                { label: 'Enable Notifications', type: 'checkbox', value: true }
            ]
        },
        'background': {
            title: 'Configure Background Checks',
            fields: [
                { label: 'Provider', type: 'select', options: ['Checkr', 'Sterling', 'HireRight'], value: 'Checkr' },
                { label: 'API Key', type: 'password', value: '' },
                { label: 'Package Type', type: 'select', options: ['Basic', 'Standard', 'Premium'], value: 'Standard' },
                { label: 'Auto-order for new hires', type: 'checkbox', value: false }
            ]
        }
    };
    
    const config = integrations[integrationId];
    if (!config) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    
    let fieldsHtml = '';
    config.fields.forEach(field => {
        if (field.type === 'select') {
            fieldsHtml += `
                <div class="form-group">
                    <label>${field.label}</label>
                    <select>
                        ${field.options.map(opt => `<option value="${opt}" ${opt === field.value ? 'selected' : ''}>${opt}</option>`).join('')}
                    </select>
                </div>
            `;
        } else if (field.type === 'textarea') {
            fieldsHtml += `
                <div class="form-group">
                    <label>${field.label}</label>
                    <textarea rows="4">${field.value}</textarea>
                </div>
            `;
        } else if (field.type === 'checkbox') {
            fieldsHtml += `
                <div class="form-group">
                    <label style="display: flex; align-items: center; gap: 8px;">
                        <input type="checkbox" ${field.value ? 'checked' : ''}>
                        <span>${field.label}</span>
                    </label>
                </div>
            `;
        } else {
            fieldsHtml += `
                <div class="form-group">
                    <label>${field.label}</label>
                    <input type="${field.type}" value="${field.value}">
                </div>
            `;
        }
    });
    
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h3>${config.title}</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                ${fieldsHtml}
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Cancel</button>
                <button class="btn btn-primary" onclick="saveIntegrationConfig('${integrationId}'); this.closest('.modal').remove();">Save Configuration</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Save Integration Config
function saveIntegrationConfig(integrationId) {
    showSuccessNotification(`${integrationId.toUpperCase()} configuration saved successfully!`);
    
    // Log the action
    if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
        window.dataService.auditLog.log({
            action: 'integration_configured',
            details: `Configured ${integrationId} integration`,
            severity: 'info'
        });
    }
}

// Test Integration
function testIntegration(integrationId) {
    showSuccessNotification(`Testing ${integrationId.toUpperCase()} connection...`);
    
    setTimeout(() => {
        showSuccessNotification(`✓ ${integrationId.toUpperCase()} connection test successful!`);
    }, 2000);
    
    // Log the action
    if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
        window.dataService.auditLog.log({
            action: 'integration_tested',
            details: `Tested ${integrationId} integration`,
            severity: 'info'
        });
    }
}

// Disconnect Integration
function disconnectIntegration(integrationId) {
    if (confirm(`Are you sure you want to disconnect ${integrationId.toUpperCase()}? This will stop all data synchronization.`)) {
        showSuccessNotification(`${integrationId.toUpperCase()} disconnected successfully`);
        
        // Log the action
        if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
            window.dataService.auditLog.log({
                action: 'integration_disconnected',
                details: `Disconnected ${integrationId} integration`,
                severity: 'warning'
            });
        }
    }
}

// Reconnect Integration
function reconnectIntegration(integrationId) {
    configureIntegration(integrationId);
}

// Connect Integration
function connectIntegration(integrationId) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <div class="modal-header">
                <h3>Connect ${integrationId}</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <p>You will be redirected to authorize HRPro to access your ${integrationId} account.</p>
                <div style="padding: 16px; background: var(--background); border-radius: 8px; margin-top: 16px;">
                    <p style="margin: 0; font-size: 13px; color: var(--text-secondary);"><strong>Permissions requested:</strong></p>
                    <ul style="margin: 8px 0 0 0; font-size: 13px; color: var(--text-secondary);">
                        <li>Read basic profile information</li>
                        <li>Access calendar events</li>
                        <li>Send notifications</li>
                    </ul>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Cancel</button>
                <button class="btn btn-primary" onclick="authorizeIntegration('${integrationId}')">Authorize & Connect</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Authorize Integration
function authorizeIntegration(integrationId) {
    document.querySelector('.modal').remove();
    showSuccessNotification(`Connecting to ${integrationId}...`);
    
    setTimeout(() => {
        showSuccessNotification(`✓ ${integrationId} connected successfully!`);
        
        // Log the action
        if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
            window.dataService.auditLog.log({
                action: 'integration_connected',
                details: `Connected ${integrationId} integration`,
                severity: 'info'
            });
        }
    }, 2000);
}

// Show Add Integration Modal
function showAddIntegrationModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h3>Add Custom Integration</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Integration Name *</label>
                    <input type="text" placeholder="e.g., Custom Payroll System">
                </div>
                
                <div class="form-group">
                    <label>Integration Type *</label>
                    <select>
                        <option value="">Select type...</option>
                        <option value="sso">Single Sign-On</option>
                        <option value="hr">HR System</option>
                        <option value="payroll">Payroll</option>
                        <option value="recruiting">Recruiting</option>
                        <option value="communication">Communication</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>API Endpoint</label>
                    <input type="url" placeholder="https://api.example.com/v1">
                </div>
                
                <div class="form-group">
                    <label>API Key</label>
                    <input type="password" placeholder="Enter API key">
                </div>
                
                <div class="form-group">
                    <label>Authentication Method</label>
                    <select>
                        <option value="api_key">API Key</option>
                        <option value="oauth2">OAuth 2.0</option>
                        <option value="basic">Basic Auth</option>
                        <option value="bearer">Bearer Token</option>
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Cancel</button>
                <button class="btn btn-primary" onclick="addCustomIntegration()">Add Integration</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Add Custom Integration
function addCustomIntegration() {
    document.querySelector('.modal').remove();
    showSuccessNotification('Custom integration added successfully!');
    
    // Log the action
    if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
        window.dataService.auditLog.log({
            action: 'custom_integration_added',
            details: 'Added custom integration',
            severity: 'info'
        });
    }
}

// Generate API Key
function generateApiKey() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <div class="modal-header">
                <h3>Generate New API Key</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Key Name *</label>
                    <input type="text" id="apiKeyName" placeholder="e.g., Integration Service">
                </div>
                
                <div class="form-group">
                    <label>Environment</label>
                    <select id="apiKeyEnv">
                        <option value="production">Production</option>
                        <option value="development">Development</option>
                        <option value="staging">Staging</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Expiration</label>
                    <select>
                        <option value="30">30 days</option>
                        <option value="90" selected>90 days</option>
                        <option value="180">180 days</option>
                        <option value="365">1 year</option>
                        <option value="0">Never</option>
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Cancel</button>
                <button class="btn btn-primary" onclick="createApiKey()">Generate Key</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Create API Key
function createApiKey() {
    const keyName = document.getElementById('apiKeyName').value;
    if (!keyName) {
        alert('Please enter a key name');
        return;
    }
    
    const newKey = 'hrp_live_' + Array(32).fill(0).map(() => Math.random().toString(36)[2]).join('');
    
    document.querySelector('.modal').remove();
    
    // Show the generated key
    const keyModal = document.createElement('div');
    keyModal.className = 'modal';
    keyModal.style.display = 'flex';
    keyModal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header" style="background: var(--secondary-color); color: white;">
                <h3>✓ API Key Generated</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div style="padding: 16px; background: #FEF3C7; border-radius: 8px; margin-bottom: 16px;">
                    <p style="margin: 0; color: #92400E;">⚠️ <strong>Important:</strong> Copy this key now. You won't be able to see it again!</p>
                </div>
                
                <div class="form-group">
                    <label>API Key</label>
                    <div style="display: flex; gap: 8px;">
                        <input type="text" value="${newKey}" id="generatedKey" readonly style="font-family: monospace; font-size: 12px;">
                        <button class="btn btn-outline" onclick="copyApiKey()">📋 Copy</button>
                    </div>
                </div>
                
                <p style="font-size: 13px; color: var(--text-secondary); margin-top: 16px;">
                    Use this key in your API requests by including it in the Authorization header:
                </p>
                <code style="display: block; padding: 12px; background: var(--background); border-radius: 4px; font-size: 12px; margin-top: 8px;">
                    Authorization: Bearer ${newKey}
                </code>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="this.closest('.modal').remove()">I've Saved the Key</button>
            </div>
        </div>
    `;
    document.body.appendChild(keyModal);
    
    // Log the action
    if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
        window.dataService.auditLog.log({
            action: 'api_key_generated',
            details: `Generated API key: ${keyName}`,
            severity: 'info'
        });
    }
}

// Copy API Key
function copyApiKey() {
    const keyInput = document.getElementById('generatedKey');
    keyInput.select();
    document.execCommand('copy');
    showSuccessNotification('API key copied to clipboard!');
}

// View API Key
function viewApiKey(keyId) {
    const integrations = getDefaultIntegrations();
    const key = integrations.apiKeys.find(k => k.id === keyId);
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h3>API Key Details</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Key Name</label>
                    <input type="text" value="${key.name}" readonly>
                </div>
                
                <div class="form-group">
                    <label>API Key</label>
                    <div style="display: flex; gap: 8px;">
                        <input type="password" value="${key.key}" id="viewKey${keyId}" readonly style="font-family: monospace; font-size: 12px;">
                        <button class="btn btn-outline" onclick="toggleKeyVisibility('${keyId}')">👁️ Show</button>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Created</label>
                        <input type="text" value="${key.created}" readonly>
                    </div>
                    <div class="form-group">
                        <label>Last Used</label>
                        <input type="text" value="${key.lastUsed ? new Date(key.lastUsed).toLocaleString() : 'Never'}" readonly>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Status</label>
                    <input type="text" value="${key.status}" readonly>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Close</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Toggle Key Visibility
function toggleKeyVisibility(keyId) {
    const input = document.getElementById('viewKey' + keyId);
    const btn = event.target;
    
    if (input.type === 'password') {
        input.type = 'text';
        btn.textContent = '🙈 Hide';
    } else {
        input.type = 'password';
        btn.textContent = '👁️ Show';
    }
}

// Revoke API Key
function revokeApiKey(keyId) {
    if (confirm('Are you sure you want to revoke this API key? Applications using this key will no longer be able to access the API.')) {
        showSuccessNotification('API key revoked successfully');
        
        // Log the action
        if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
            window.dataService.auditLog.log({
                action: 'api_key_revoked',
                details: `Revoked API key: ${keyId}`,
                severity: 'warning'
            });
        }
    }
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
    .integration-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        border-bottom: 1px solid var(--border-color);
    }
    
    .integration-item:last-child {
        border-bottom: none;
    }
    
    .available-integration-card {
        padding: 16px;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        background: white;
        transition: all 0.2s;
    }
    
    .available-integration-card:hover {
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        transform: translateY(-2px);
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
