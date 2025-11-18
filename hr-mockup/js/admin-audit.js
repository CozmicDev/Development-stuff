// Admin Audit Logs Management

// Filter logs
function filterLogs() {
    const searchTerm = document.getElementById('searchLogs').value.toLowerCase();
    const actionFilter = document.getElementById('actionFilter').value;
    const severityFilter = document.getElementById('severityFilter').value;
    const dateFrom = document.getElementById('dateFrom').value;
    const dateTo = document.getElementById('dateTo').value;
    
    const rows = document.querySelectorAll('#auditLogsTable tr');
    let visibleCount = 0;
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const action = row.getAttribute('data-action');
        const severity = row.getAttribute('data-severity');
        
        const matchesSearch = searchTerm === '' || text.includes(searchTerm);
        const matchesAction = actionFilter === 'all' || action === actionFilter;
        const matchesSeverity = severityFilter === 'all' || severity === severityFilter;
        
        // TODO: Add date filtering logic
        
        if (matchesSearch && matchesAction && matchesSeverity) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    // Update count
    document.getElementById('logCount').textContent = visibleCount;
}

// Reset filters
function resetLogFilters() {
    document.getElementById('searchLogs').value = '';
    document.getElementById('actionFilter').value = 'all';
    document.getElementById('severityFilter').value = 'all';
    document.getElementById('dateFrom').value = '';
    document.getElementById('dateTo').value = '';
    filterLogs();
    showSuccessNotification('Filters reset');
}

// View log details
function viewLogDetails(logId) {
    const logDetails = {
        'LOG-001': {
            timestamp: 'Nov 17, 2024 14:23:15',
            user: 'john.smith',
            action: 'User Login',
            description: 'Successful login from web browser',
            ipAddress: '192.168.1.45',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/119.0.0.0',
            sessionId: 'sess_abc123xyz',
            status: 'Success',
            metadata: {
                loginMethod: 'Password',
                mfaEnabled: true,
                location: 'San Francisco, CA'
            }
        },
        'LOG-005': {
            timestamp: 'Nov 17, 2024 13:45:22',
            user: 'unknown',
            action: 'Security Event',
            description: 'Failed login attempt (3rd attempt)',
            ipAddress: '203.45.67.89',
            userAgent: 'Unknown',
            sessionId: 'N/A',
            status: 'Warning',
            metadata: {
                attemptedUsername: 'admin',
                failureReason: 'Invalid credentials',
                attemptNumber: 3,
                location: 'Unknown',
                nextAction: 'IP will be blocked after 2 more attempts'
            }
        }
    };
    
    const log = logDetails[logId] || {
        timestamp: 'Unknown',
        user: 'Unknown',
        action: 'Unknown',
        description: 'Log details not available',
        ipAddress: 'N/A',
        status: 'Unknown'
    };
    
    const content = `
        <div style="display: grid; gap: 16px;">
            <div style="padding: 16px; background: var(--background); border-radius: 8px;">
                <h4 style="margin: 0 0 12px 0;">Basic Information</h4>
                <div style="display: grid; grid-template-columns: 150px 1fr; gap: 12px;">
                    <div style="color: var(--text-secondary);">Log ID:</div>
                    <div><strong>${logId}</strong></div>
                    
                    <div style="color: var(--text-secondary);">Timestamp:</div>
                    <div>${log.timestamp}</div>
                    
                    <div style="color: var(--text-secondary);">User:</div>
                    <div><strong>${log.user}</strong></div>
                    
                    <div style="color: var(--text-secondary);">Action:</div>
                    <div><span class="badge badge-primary">${log.action}</span></div>
                    
                    <div style="color: var(--text-secondary);">Status:</div>
                    <div><span class="badge badge-${log.status === 'Success' ? 'success' : 'warning'}">${log.status}</span></div>
                </div>
            </div>
            
            <div style="padding: 16px; background: var(--background); border-radius: 8px;">
                <h4 style="margin: 0 0 12px 0;">Description</h4>
                <p style="margin: 0;">${log.description}</p>
            </div>
            
            <div style="padding: 16px; background: var(--background); border-radius: 8px;">
                <h4 style="margin: 0 0 12px 0;">Technical Details</h4>
                <div style="display: grid; grid-template-columns: 150px 1fr; gap: 12px;">
                    <div style="color: var(--text-secondary);">IP Address:</div>
                    <div><code>${log.ipAddress}</code></div>
                    
                    ${log.userAgent ? `
                    <div style="color: var(--text-secondary);">User Agent:</div>
                    <div style="font-size: 12px; word-break: break-all;">${log.userAgent}</div>
                    ` : ''}
                    
                    ${log.sessionId ? `
                    <div style="color: var(--text-secondary);">Session ID:</div>
                    <div><code>${log.sessionId}</code></div>
                    ` : ''}
                </div>
            </div>
            
            ${log.metadata ? `
            <div style="padding: 16px; background: var(--background); border-radius: 8px;">
                <h4 style="margin: 0 0 12px 0;">Additional Information</h4>
                <div style="display: grid; gap: 8px;">
                    ${Object.entries(log.metadata).map(([key, value]) => `
                        <div style="display: grid; grid-template-columns: 150px 1fr; gap: 12px;">
                            <div style="color: var(--text-secondary);">${key}:</div>
                            <div>${value}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
            
            <div class="modal-actions">
                <button type="button" class="btn btn-outline" onclick="exportLogEntry('${logId}')">
                    📥 Export Entry
                </button>
                <button type="button" class="btn btn-primary" onclick="closeModal('logDetailsModal')">
                    Close
                </button>
            </div>
        </div>
    `;
    
    document.getElementById('logDetailsContent').innerHTML = content;
    showModal('logDetailsModal');
}

// Export single log entry
function exportLogEntry(logId) {
    showSuccessNotification(`📥 Exporting log entry ${logId}...`);
    setTimeout(() => {
        showSuccessNotification(`✅ Log entry ${logId} exported successfully!`);
    }, 1000);
}

// Export all audit logs
function exportAuditLogs() {
    showSuccessNotification('📥 Preparing audit log export...');
    
    setTimeout(() => {
        showSuccessNotification('✅ Audit logs exported to CSV successfully!');
    }, 1500);
}

// Clear old logs
function clearOldLogs() {
    const confirm = window.confirm(
        '⚠️ Clear logs older than 90 days?\n\n' +
        'This will permanently delete old log entries to free up storage space.\n\n' +
        'Logs older than 90 days: ~8,450 entries\n' +
        'Space to be freed: ~45 MB\n\n' +
        'This action cannot be undone. Continue?'
    );
    
    if (confirm) {
        showSuccessNotification('🗑️ Clearing old logs...');
        
        setTimeout(() => {
            showSuccessNotification('✅ Successfully cleared 8,450 old log entries (45 MB freed)');
        }, 2000);
    }
}

// Load more logs
function loadMoreLogs() {
    showSuccessNotification('Loading more log entries...');
    
    setTimeout(() => {
        const currentCount = parseInt(document.getElementById('logCount').textContent);
        const newCount = currentCount + 15;
        document.getElementById('logCount').textContent = newCount;
        showSuccessNotification(`✅ Loaded 15 more entries (${newCount} total shown)`);
    }, 1000);
}

// Auto refresh logs
let autoRefreshInterval = null;
function autoRefreshLogs() {
    if (autoRefreshInterval) {
        // Stop auto refresh
        clearInterval(autoRefreshInterval);
        autoRefreshInterval = null;
        showSuccessNotification('🔄 Auto refresh disabled');
    } else {
        // Start auto refresh
        autoRefreshInterval = setInterval(() => {
            showSuccessNotification('🔄 Refreshing logs...');
            // In real implementation, this would fetch new logs from server
        }, 30000); // Refresh every 30 seconds
        
        showSuccessNotification('🔄 Auto refresh enabled (every 30 seconds)');
    }
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Set default date range to last 30 days
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
    
    document.getElementById('dateTo').valueAsDate = today;
    document.getElementById('dateFrom').valueAsDate = thirtyDaysAgo;
    
    console.log('✅ Admin Audit Logs loaded');
});
