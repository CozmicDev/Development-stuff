// Global App Functions
let currentUser = null;

// Toggle Sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.toggle('show');
    }
}

// Toggle Notifications
function toggleNotifications() {
    const dropdown = document.getElementById('notificationsDropdown');
    const userDropdown = document.getElementById('userDropdown');
    
    if (dropdown) {
        dropdown.classList.toggle('show');
        if (userDropdown) {
            userDropdown.classList.remove('show');
        }
    }
}

// Toggle User Menu
function toggleUserMenu() {
    const dropdown = document.getElementById('userDropdown');
    const notificationsDropdown = document.getElementById('notificationsDropdown');
    
    if (dropdown) {
        dropdown.classList.toggle('show');
        if (notificationsDropdown) {
            notificationsDropdown.classList.remove('show');
        }
    }
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(event) {
    const notificationsBtn = document.querySelector('.notifications .icon-btn');
    const notificationsDropdown = document.getElementById('notificationsDropdown');
    const userBtn = document.querySelector('.user-btn');
    const userDropdown = document.getElementById('userDropdown');
    
    if (notificationsDropdown && !event.target.closest('.notifications')) {
        notificationsDropdown.classList.remove('show');
    }
    
    if (userDropdown && !event.target.closest('.user-menu')) {
        userDropdown.classList.remove('show');
    }
});

// Show Modal
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
    }
}

// Close Modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('show');
    }
});

// Logout Function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        sessionStorage.removeItem('currentUser');
        window.location.href = '../index.html';
    }
}

// Form Submission Handler
document.addEventListener('DOMContentLoaded', function() {
    // Handle all forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            alert('Request submitted successfully!');
            
            // Close modal if form is in modal
            const modal = form.closest('.modal');
            if (modal) {
                modal.classList.remove('show');
            }
            
            // Reset form
            form.reset();
        });
    });
    
    // Load current user from session
    const userStr = sessionStorage.getItem('currentUser');
    if (userStr) {
        currentUser = JSON.parse(userStr);
    }
});

// Dummy Data
const dummyData = {
    employees: [
        {
            id: 1,
            name: 'John Smith',
            email: 'john.smith@company.com',
            position: 'Software Engineer',
            department: 'Engineering',
            manager: 'Sarah Johnson',
            hireDate: '2022-03-15',
            status: 'Active',
            leaveBalance: 18
        },
        {
            id: 2,
            name: 'Emily Chen',
            email: 'emily.chen@company.com',
            position: 'Product Manager',
            department: 'Product',
            manager: 'Michael Brown',
            hireDate: '2021-06-01',
            status: 'Active',
            leaveBalance: 22
        },
        {
            id: 3,
            name: 'Michael Davis',
            email: 'michael.davis@company.com',
            position: 'Senior Designer',
            department: 'Design',
            manager: 'Sarah Johnson',
            hireDate: '2020-09-12',
            status: 'Active',
            leaveBalance: 15
        },
        {
            id: 4,
            name: 'Sarah Johnson',
            email: 'sarah.johnson@company.com',
            position: 'Engineering Manager',
            department: 'Engineering',
            manager: 'David Wilson',
            hireDate: '2019-01-20',
            status: 'Active',
            leaveBalance: 25
        },
        {
            id: 5,
            name: 'David Wilson',
            email: 'david.wilson@company.com',
            position: 'VP of Engineering',
            department: 'Engineering',
            manager: 'CEO',
            hireDate: '2018-05-10',
            status: 'Active',
            leaveBalance: 30
        }
    ],
    
    leaveRequests: [
        {
            id: 1,
            employeeId: 1,
            employeeName: 'John Smith',
            type: 'Vacation',
            startDate: '2025-12-20',
            endDate: '2025-12-25',
            days: 5,
            status: 'Approved',
            submittedDate: '2025-11-15',
            reason: 'Year-end family vacation'
        },
        {
            id: 2,
            employeeId: 2,
            employeeName: 'Emily Chen',
            type: 'Sick',
            startDate: '2025-11-18',
            endDate: '2025-11-19',
            days: 2,
            status: 'Pending',
            submittedDate: '2025-11-17',
            reason: 'Medical appointment'
        },
        {
            id: 3,
            employeeId: 3,
            employeeName: 'Michael Davis',
            type: 'Personal',
            startDate: '2025-12-15',
            endDate: '2025-12-15',
            days: 1,
            status: 'Pending',
            submittedDate: '2025-11-16',
            reason: 'Personal matters'
        }
    ],
    
    documents: [
        {
            id: 1,
            type: 'Employment Letter',
            requestedBy: 'John Smith',
            purpose: 'Apartment rental',
            status: 'Completed',
            requestDate: '2025-11-10',
            completedDate: '2025-11-11'
        },
        {
            id: 2,
            type: 'Experience Certificate',
            requestedBy: 'Emily Chen',
            purpose: 'Job application',
            status: 'Pending',
            requestDate: '2025-11-16',
            completedDate: null
        }
    ],
    
    trainingCourses: [
        {
            id: 1,
            name: 'Cybersecurity Awareness',
            category: 'Compliance',
            duration: '2 hours',
            mandatory: true,
            deadline: '2025-11-30',
            enrolled: 145,
            completed: 98
        },
        {
            id: 2,
            name: 'Leadership Fundamentals',
            category: 'Management',
            duration: '8 hours',
            mandatory: false,
            deadline: null,
            enrolled: 32,
            completed: 28
        },
        {
            id: 3,
            name: 'AWS Solutions Architect',
            category: 'Technical',
            duration: '40 hours',
            mandatory: false,
            deadline: null,
            enrolled: 18,
            completed: 5
        }
    ],
    
    performanceGoals: [
        {
            id: 1,
            title: 'Complete Q4 Project Deliverables',
            description: 'Deliver all assigned project milestones',
            progress: 80,
            dueDate: '2025-12-31',
            status: 'On Track'
        },
        {
            id: 2,
            title: 'Improve Code Quality Metrics',
            description: 'Reduce bug count by 20%',
            progress: 65,
            dueDate: '2025-12-31',
            status: 'On Track'
        },
        {
            id: 3,
            title: 'Complete Technical Certification',
            description: 'Obtain AWS certification',
            progress: 45,
            dueDate: '2025-12-31',
            status: 'At Risk'
        }
    ]
};

// Export dummy data
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { dummyData };
}
