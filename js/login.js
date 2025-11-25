// SSO Authentication Functions
function loginWithMicrosoft() {
    // Show loading state
    showLoadingNotification('Redirecting to Microsoft authentication...');
    
    // Simulate Microsoft OAuth flow
    setTimeout(() => {
        // In production, this would redirect to:
        // https://login.microsoftonline.com/{tenant}/oauth2/v2.0/authorize
        
        // For demo, simulate successful authentication and default to employee portal
        const user = {
            name: 'John Smith',
            role: 'employee',
            email: 'john.smith@company.com',
            position: 'Software Engineer',
            department: 'Engineering',
            avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=4F46E5&color=fff',
            authMethod: 'microsoft'
        };
        
        completeLogin(user);
    }, 1500);
}

function loginWithUAEPass() {
    // Show loading state
    showLoadingNotification('Redirecting to UAE Pass authentication...');
    
    // Simulate UAE Pass OAuth flow
    setTimeout(() => {
        // In production, this would redirect to:
        // https://stg-id.uaepass.ae/idshub/authorize
        
        // For demo, simulate successful authentication and default to employee portal
        const user = {
            name: 'Ahmed Al Mansouri',
            role: 'employee',
            email: 'ahmed.almansouri@company.com',
            position: 'Software Engineer',
            department: 'Engineering',
            avatar: 'https://ui-avatars.com/api/?name=Ahmed+Al+Mansouri&background=00843D&color=fff',
            authMethod: 'uaepass'
        };
        
        completeLogin(user);
    }, 1500);
}

function completeLogin(user) {
    // Store user in session
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    
    // Show success message
    showSuccessNotification(`Welcome, ${user.name}!`);
    
    // Redirect to appropriate dashboard based on role
    const dashboards = {
        employee: 'employee/employee-dashboard.html',
        manager: 'manager/manager-dashboard.html',
        hr: 'hr/hr-dashboard.html',
        admin: 'admin/admin-dashboard.html'
    };
    
    setTimeout(() => {
        window.location.href = dashboards[user.role];
    }, 800);
}

function showLoadingNotification(message) {
    const notification = document.createElement('div');
    notification.id = 'loadingNotification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 12px;
        animation: slideInRight 0.3s ease-out;
    `;
    notification.innerHTML = `
        <div style="width: 20px; height: 20px; border: 2px solid white; border-top-color: transparent; border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
}

function showSuccessNotification(message) {
    const existing = document.getElementById('loadingNotification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10B981;
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
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
}

// Add CSS animations
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
    
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Quick Login for Demo Purposes
function quickLogin(role) {
    const users = {
        employee: {
            name: 'John Smith',
            role: 'employee',
            email: 'john.smith@company.com',
            position: 'Software Engineer',
            department: 'Engineering',
            avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=4F46E5&color=fff'
        },
        manager: {
            name: 'Sarah Johnson',
            role: 'manager',
            email: 'sarah.johnson@company.com',
            position: 'Engineering Manager',
            department: 'Engineering',
            avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=10B981&color=fff'
        },
        hr: {
            name: 'Jennifer Williams',
            role: 'hr',
            email: 'jennifer.williams@company.com',
            position: 'HR Manager',
            department: 'Human Resources',
            avatar: 'https://ui-avatars.com/api/?name=Jennifer+Williams&background=F59E0B&color=fff'
        },
        admin: {
            name: 'Robert Anderson',
            role: 'admin',
            email: 'robert.anderson@company.com',
            position: 'System Administrator',
            department: 'IT',
            avatar: 'https://ui-avatars.com/api/?name=Robert+Anderson&background=EF4444&color=fff'
        }
    };
    
    const user = users[role];
    
    if (user) {
        // Store user in session
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        
        // Redirect to appropriate dashboard
        const dashboards = {
            employee: 'employee/employee-dashboard.html',
            manager: 'manager/manager-dashboard.html',
            hr: 'hr/hr-dashboard.html',
            admin: 'admin/admin-dashboard.html'
        };
        
        window.location.href = dashboards[role];
    }
}

