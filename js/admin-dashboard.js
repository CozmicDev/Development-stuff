// Admin Dashboard Functionality

// System metrics (simulated real-time data)
let systemMetrics = {
    cpu: 45,
    memory: 62,
    disk: 48,
    network: 28,
    uptime: 99.9,
    activeUsers: 245,
    totalUsers: 247,
    storageUsed: 2.4,
    storageTotal: 5.0,
    securityScore: 95
};

// Server health data
const serverHealth = {
    appServer: { name: 'Application Server', status: 'healthy', cpu: 45, memory: 62 },
    database: { name: 'Database Server', status: 'healthy', connections: 142, maxConnections: 500 },
    apiGateway: { name: 'API Gateway', status: 'healthy', requestsPerMin: 450 },
    storage: { name: 'Storage Service', status: 'healthy', used: 2.4, total: 5.0 }
};

// Active integrations
const integrations = [
    { name: 'Single Sign-On (SSO)', status: 'active', activeSessions: 245 },
    { name: 'Email Service', status: 'active', emailsSent: 1234 },
    { name: 'Background Checks', status: 'active', pendingChecks: 3 }
];

// Admin activity log
let adminActivities = [
    { action: 'User Role Updated', detail: 'Changed Mohammed Al Hashimi from Employee to Manager', time: '10 min ago' },
    { action: 'System Backup Completed', detail: 'Full database backup (2.3 GB)', time: '2 hours ago' },
    { action: 'Integration Configured', detail: 'Connected new SSO provider', time: '5 hours ago' },
    { action: 'Security Policy Updated', detail: 'Enabled MFA for all users', time: '1 day ago' }
];

// Security alerts
const securityAlerts = [
    { 
        type: 'warning', 
        title: 'Failed Login Attempts', 
        detail: '5 failed attempts from IP 192.168.1.100', 
        action: 'Block IP',
        severity: 'medium'
    },
    { 
        type: 'info', 
        title: 'SSL Certificate Renewal', 
        detail: 'Certificate expires in 30 days', 
        action: 'Renew Now',
        severity: 'low'
    },
    { 
        type: 'success', 
        title: 'Security Scan Complete', 
        detail: 'No vulnerabilities detected', 
        action: null,
        severity: 'none'
    }
];

// Initialize dashboard
function initAdminDashboard() {
    startMetricsMonitoring();
    updateSystemHealth();
    loadRecentActivities();
}

// Start real-time metrics monitoring
function startMetricsMonitoring() {
    // Update metrics every 5 seconds (simulated)
    setInterval(() => {
        // Simulate metric changes
        systemMetrics.cpu = Math.max(20, Math.min(85, systemMetrics.cpu + (Math.random() - 0.5) * 10));
        systemMetrics.memory = Math.max(40, Math.min(90, systemMetrics.memory + (Math.random() - 0.5) * 5));
        systemMetrics.network = Math.max(10, Math.min(70, systemMetrics.network + (Math.random() - 0.5) * 15));
        
        updatePerformanceMetrics();
        checkAlerts();
    }, 5000);
}

// Update performance metrics display
function updatePerformanceMetrics() {
    // Update CPU bar
    const cpuBar = document.querySelector('[style*="width: 45%"]');
    const cpuText = cpuBar?.parentElement.previousElementSibling.querySelector('span:last-child');
    if (cpuBar && cpuText) {
        cpuBar.style.width = `${Math.round(systemMetrics.cpu)}%`;
        cpuText.textContent = `${Math.round(systemMetrics.cpu)}%`;
        
        // Update color based on usage
        if (systemMetrics.cpu > 80) {
            cpuBar.style.background = 'var(--danger-color)';
            cpuText.style.color = 'var(--danger-color)';
        } else if (systemMetrics.cpu > 60) {
            cpuBar.style.background = 'var(--warning-color)';
            cpuText.style.color = 'var(--warning-color)';
        }
    }
    
    // Update Memory bar
    const memoryBars = document.querySelectorAll('[style*="background: var(--primary-color)"]');
    if (memoryBars.length > 0) {
        const memoryBar = memoryBars[0];
        const memoryText = memoryBar?.parentElement.previousElementSibling.querySelector('span:last-child');
        if (memoryBar && memoryText) {
            memoryBar.style.width = `${Math.round(systemMetrics.memory)}%`;
            memoryText.textContent = `${Math.round(systemMetrics.memory)}%`;
        }
    }
}

// Check for alerts based on metrics
function checkAlerts() {
    if (systemMetrics.cpu > 80 && !document.querySelector('.alert-high-cpu')) {
        showSystemAlert('High CPU Usage', `CPU usage is at ${Math.round(systemMetrics.cpu)}%`, 'warning');
    }
    
    if (systemMetrics.memory > 85 && !document.querySelector('.alert-high-memory')) {
        showSystemAlert('High Memory Usage', `Memory usage is at ${Math.round(systemMetrics.memory)}%`, 'warning');
    }
}

// Show system alert
function showSystemAlert(title, message, type) {
    const notification = document.createElement('div');
    notification.className = `system-alert alert-${type.toLowerCase()}`;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        z-index: 3000;
        min-width: 300px;
        border-left: 4px solid ${type === 'warning' ? '#F59E0B' : '#EF4444'};
        animation: slideIn 0.3s ease-out;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; gap: 12px;">
            <span style="font-size: 24px;">${type === 'warning' ? '⚠️' : '❌'}</span>
            <div style="flex: 1;">
                <strong style="display: block; margin-bottom: 4px;">${title}</strong>
                <p style="font-size: 14px; color: var(--text-secondary); margin: 0;">${message}</p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; font-size: 20px; cursor: pointer; color: var(--text-secondary);">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 8000);
}

// Update system health display
function updateSystemHealth() {
    // This function would update the server health cards
    // For now, the data is static in HTML
}

// Load recent activities
function loadRecentActivities() {
    // Activities are already in HTML
    // This could be used to fetch from localStorage or API
}

// Add new admin activity
function addAdminActivity(action, detail) {
    const activity = {
        action: action,
        detail: detail,
        time: 'Just now'
    };
    
    adminActivities.unshift(activity);
    
    // Keep only last 10 activities
    if (adminActivities.length > 10) {
        adminActivities = adminActivities.slice(0, 10);
    }
    
    // Update display
    showSuccessNotification(`Activity logged: ${action}`);
}

// Run manual backup
function runManualBackup() {
    showModal('backupModal');
}

function startBackup() {
    closeModal('backupModal');
    
    // Show progress notification
    const progressNotification = document.createElement('div');
    progressNotification.className = 'backup-progress';
    progressNotification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: white;
        padding: 20px 24px;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        z-index: 3000;
        min-width: 350px;
        animation: slideIn 0.3s ease-out;
    `;
    
    progressNotification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
            <span style="font-size: 24px;">💾</span>
            <strong>System Backup in Progress...</strong>
        </div>
        <div style="background: var(--background); height: 8px; border-radius: 4px; overflow: hidden; margin-bottom: 8px;">
            <div id="backupProgress" style="background: var(--primary-color); width: 0%; height: 100%; transition: width 0.5s;"></div>
        </div>
        <p id="backupStatus" style="font-size: 12px; color: var(--text-secondary); margin: 0;">Initializing backup...</p>
    `;
    
    document.body.appendChild(progressNotification);
    
    // Simulate backup progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 5;
        const progressBar = document.getElementById('backupProgress');
        const statusText = document.getElementById('backupStatus');
        
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
        
        if (statusText) {
            if (progress < 30) {
                statusText.textContent = 'Backing up database...';
            } else if (progress < 60) {
                statusText.textContent = 'Backing up user files...';
            } else if (progress < 90) {
                statusText.textContent = 'Compressing backup...';
            } else if (progress < 100) {
                statusText.textContent = 'Verifying backup integrity...';
            }
        }
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
                progressNotification.remove();
                showSuccessNotification('✅ Backup completed successfully! (2.3 GB)');
                addAdminActivity('System Backup Completed', 'Full database backup (2.3 GB)');
            }, 500);
        }
    }, 400);
}

// Block suspicious IP
function blockIP(ip) {
    if (confirm(`Block IP address ${ip}?`)) {
        showSuccessNotification(`🚫 IP ${ip} has been blocked`);
        addAdminActivity('IP Address Blocked', `Blocked suspicious IP: ${ip}`);
    }
}

// Renew SSL certificate
function renewSSL() {
    if (confirm('Start SSL certificate renewal process?')) {
        showSuccessNotification('🔐 SSL certificate renewal initiated');
        addAdminActivity('SSL Certificate Renewal', 'Started certificate renewal process');
    }
}

// Run scheduled task manually
function runScheduledTask(taskName) {
    showSuccessNotification(`⏰ Running task: ${taskName}...`);
    
    setTimeout(() => {
        showSuccessNotification(`✅ Task completed: ${taskName}`);
        addAdminActivity(`Manual Task Execution`, `Ran scheduled task: ${taskName}`);
    }, 2000);
}

// View system logs
function viewSystemLogs() {
    window.location.href = 'admin-audit.html';
}

// Manage users
function manageUsers() {
    window.location.href = 'admin-users.html';
}

// System configuration
function systemConfig() {
    window.location.href = 'admin-system.html';
}

// Export system report
function exportSystemReport() {
    const report = {
        timestamp: new Date().toISOString(),
        metrics: systemMetrics,
        serverHealth: serverHealth,
        integrations: integrations,
        activities: adminActivities,
        alerts: securityAlerts
    };
    
    // Simulate download
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `system-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showSuccessNotification('📊 System report exported successfully');
}

// Monitor real-time activity
function startActivityMonitoring() {
    // Simulate random activity updates
    setInterval(() => {
        const activities = [
            'User logged in',
            'Leave request submitted',
            'Document uploaded',
            'Profile updated',
            'Report generated',
            'Email notification sent'
        ];
        
        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        
        // Only show occasionally (10% chance)
        if (Math.random() < 0.1) {
            const toast = document.createElement('div');
            toast.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: white;
                padding: 12px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
                z-index: 3000;
                font-size: 14px;
                animation: slideUp 0.3s ease-out;
            `;
            toast.textContent = `🔵 ${randomActivity}`;
            
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.style.animation = 'slideDown 0.3s ease-in';
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }
    }, 10000); // Check every 10 seconds
}

// Success notification
function showSuccessNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 24px;">${message.includes('✅') || message.includes('✓') ? '✅' : message.includes('🚫') ? '🚫' : message.includes('🔐') ? '🔐' : '📋'}</span>
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
    }, 4000);
}

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', function() {
    initAdminDashboard();
    startActivityMonitoring();
    
    // Add button click handlers for scheduled tasks
    document.querySelectorAll('table tbody button').forEach((btn, index) => {
        const taskNames = ['Database Backup', 'Data Sync', 'Email Reminders', 'Cleanup Old Logs'];
        btn.onclick = () => runScheduledTask(taskNames[index]);
    });
});

// Animation keyframes (add to page via style tag)
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes slideUp {
        from {
            transform: translateY(100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
