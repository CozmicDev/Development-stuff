// Login functionality
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

// Handle regular login form
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // For demo purposes, check simple credentials
            if (username && password) {
                // Default to employee login
                quickLogin('employee');
            } else {
                alert('Please enter username and password');
            }
        });
    }
});
