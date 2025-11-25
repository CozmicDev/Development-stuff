// Team Management Functionality

// Employee data
const employeeData = {
    'mohammed-alhashimi': {
        name: 'Mohammed Al Hashimi',
        role: 'Senior Developer',
        email: 'mohammed.alhashimi@company.com',
        phone: '+971 50 123 4567',
        hireDate: 'Jan 15, 2020',
        tenure: '5.8 years',
        status: 'Active',
        performance: 4.8,
        department: 'Engineering',
        location: 'Dubai, UAE',
        manager: 'Fatima Al Mazrouei',
        upcomingLeave: 'Dec 20-27, 2024',
        skills: ['JavaScript', 'Python', 'React', 'Node.js', 'Team Leadership'],
        recentProjects: [
            'Payment System Redesign',
            'API Gateway Implementation',
            'Team Mentorship Program'
        ],
        notes: 'Top performer, excellent mentor for junior developers. Leading the new microservices initiative.'
    },
    'amira-alqasimi': {
        name: 'Amira Al Qasimi',
        role: 'Software Developer',
        email: 'amira.alqasimi@company.com',
        phone: '+971 50 234 5678',
        hireDate: 'Mar 10, 2021',
        tenure: '3.6 years',
        status: 'On Leave',
        performance: 4.5,
        department: 'Engineering',
        location: 'Abu Dhabi, UAE',
        manager: 'Fatima Al Mazrouei',
        upcomingLeave: 'Currently on leave (returns Nov 18)',
        skills: ['JavaScript', 'React', 'TypeScript', 'CSS', 'UI/UX'],
        recentProjects: [
            'Dashboard Redesign',
            'Component Library',
            'Accessibility Improvements'
        ],
        notes: 'Strong frontend skills. Currently on vacation, returns tomorrow.'
    },
    'youssef-aldoori': {
        name: 'Youssef Al Doori',
        role: 'Senior Developer',
        email: 'youssef.aldoori@company.com',
        phone: '+971 50 345 6789',
        hireDate: 'Aug 5, 2019',
        tenure: '6.2 years',
        status: 'Active',
        performance: 4.9,
        department: 'Engineering',
        location: 'Dubai, UAE',
        manager: 'Fatima Al Mazrouei',
        upcomingLeave: 'None scheduled',
        skills: ['Python', 'JavaScript', 'Node.js', 'SQL', 'DevOps', 'Architecture'],
        recentProjects: [
            'Database Optimization',
            'CI/CD Pipeline Enhancement',
            'Security Audit'
        ],
        notes: 'Exceptional technical skills. Great problem solver and system architect.'
    },
    'hessa-alnuaimi': {
        name: 'Hessa Al Nuaimi',
        role: 'Software Developer',
        email: 'hessa.alnuaimi@company.com',
        phone: '+971 50 456 7890',
        hireDate: 'Jun 20, 2022',
        tenure: '2.4 years',
        status: 'Remote',
        performance: 4.3,
        department: 'Engineering',
        location: 'Sharjah, UAE',
        manager: 'Fatima Al Mazrouei',
        upcomingLeave: 'Nov 25-26 (Thanksgiving)',
        skills: ['React', 'JavaScript', 'Node.js', 'GraphQL'],
        recentProjects: [
            'User Profile System',
            'Real-time Notifications',
            'Mobile Responsive Updates'
        ],
        notes: 'Works remotely full-time. Reliable and self-motivated.'
    },
    'ahmed-almheiri': {
        name: 'Ahmed Al Mheiri',
        role: 'Junior Developer',
        email: 'ahmed.almheiri@company.com',
        phone: '+971 50 567 8901',
        hireDate: 'Feb 1, 2024',
        tenure: '0.8 years',
        status: 'Active',
        performance: 4.0,
        department: 'Engineering',
        location: 'Dubai, UAE',
        manager: 'Fatima Al Mazrouei',
        upcomingLeave: 'None scheduled',
        skills: ['JavaScript', 'React', 'HTML/CSS'],
        recentProjects: [
            'Bug Fixes',
            'Feature Enhancements',
            'Testing & Documentation'
        ],
        notes: 'New hire showing good progress. Eager to learn and improve.'
    },
    'lisa-anderson': {
        name: 'Lisa Anderson',
        role: 'QA Engineer',
        email: 'lisa.anderson@company.com',
        phone: '+971 50 678 9012',
        hireDate: 'Sep 12, 2021',
        tenure: '3.2 years',
        status: 'Active',
        performance: 4.4,
        department: 'Engineering',
        location: 'San Francisco, CA',
        manager: 'Sarah Manager',
        upcomingLeave: 'Dec 23 - Jan 2 (Holiday)',
        skills: ['Test Automation', 'Selenium', 'JavaScript', 'SQL', 'API Testing'],
        recentProjects: [
            'Automated Test Suite',
            'Performance Testing',
            'Quality Metrics Dashboard'
        ],
        notes: 'Detail-oriented and thorough. Significantly improved test coverage.'
    }
};

// View switching
function switchView(viewName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.view-content').forEach(content => content.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(`${viewName}-view`).classList.add('active');
}

// Filter team
function filterTeam() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    const roleFilter = document.getElementById('roleFilter').value;
    
    const rows = document.querySelectorAll('#teamTableBody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const status = row.getAttribute('data-status');
        const role = row.getAttribute('data-role');
        
        const matchesSearch = searchTerm === '' || text.includes(searchTerm);
        const matchesStatus = statusFilter === 'all' || status === statusFilter;
        const matchesRole = roleFilter === 'all' || role === roleFilter;
        
        if (matchesSearch && matchesStatus && matchesRole) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Reset filters
function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('statusFilter').value = 'all';
    document.getElementById('roleFilter').value = 'all';
    filterTeam();
    showSuccessNotification('Filters reset');
}

// View employee details
function viewEmployeeDetails(employeeId) {
    const employee = employeeData[employeeId];
    
    if (!employee) {
        alert('Employee details not found');
        return;
    }
    
    // Update modal title
    document.getElementById('employeeModalName').textContent = employee.name;
    
    // Build modal content
    const modalBody = document.getElementById('employeeModalBody');
    modalBody.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
            <!-- Left Column -->
            <div>
                <h3 style="margin-bottom: 16px;">📋 Basic Information</h3>
                <div style="display: grid; gap: 12px; margin-bottom: 24px;">
                    <div>
                        <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Role</div>
                        <strong>${employee.role}</strong>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Department</div>
                        <strong>${employee.department}</strong>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Email</div>
                        <a href="mailto:${employee.email}">${employee.email}</a>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Phone</div>
                        <strong>${employee.phone}</strong>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Location</div>
                        <strong>${employee.location}</strong>
                    </div>
                </div>

                <h3 style="margin-bottom: 16px;">💼 Employment</h3>
                <div style="display: grid; gap: 12px;">
                    <div>
                        <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Hire Date</div>
                        <strong>${employee.hireDate}</strong>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Tenure</div>
                        <strong>${employee.tenure}</strong>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Status</div>
                        <span class="badge ${employee.status === 'Active' ? 'badge-success' : employee.status === 'On Leave' ? 'badge-warning' : 'badge-info'}">${employee.status}</span>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Manager</div>
                        <strong>${employee.manager}</strong>
                    </div>
                </div>
            </div>

            <!-- Right Column -->
            <div>
                <h3 style="margin-bottom: 16px;">⭐ Performance</h3>
                <div style="margin-bottom: 24px;">
                    <div style="font-size: 32px; font-weight: bold; color: var(--primary); margin-bottom: 8px;">
                        ${employee.performance}/5.0
                    </div>
                    <div style="font-size: 14px;">
                        ${'⭐'.repeat(Math.round(employee.performance))}
                    </div>
                    <div style="margin-top: 12px;">
                        <button class="btn btn-sm btn-outline" onclick="viewPerformanceHistory()">View Performance History</button>
                    </div>
                </div>

                <h3 style="margin-bottom: 16px;">🏖️ Leave Information</h3>
                <div style="margin-bottom: 24px;">
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Upcoming Leave</div>
                    <strong>${employee.upcomingLeave}</strong>
                    <div style="margin-top: 12px;">
                        <button class="btn btn-sm btn-outline" onclick="viewLeaveHistory()">View Leave History</button>
                    </div>
                </div>

                <h3 style="margin-bottom: 16px;">🛠️ Skills</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px;">
                    ${employee.skills.map(skill => `<span class="badge badge-info">${skill}</span>`).join('')}
                </div>
            </div>
        </div>

        <!-- Full Width Sections -->
        <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--border-color);">
            <h3 style="margin-bottom: 16px;">📊 Recent Projects</h3>
            <ul style="margin-left: 20px;">
                ${employee.recentProjects.map(project => `<li style="margin-bottom: 8px;">${project}</li>`).join('')}
            </ul>
        </div>

        <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--border-color);">
            <h3 style="margin-bottom: 16px;">📝 Manager Notes</h3>
            <p>${employee.notes}</p>
            <button class="btn btn-sm btn-outline" onclick="editNotes('${employeeId}')" style="margin-top: 12px;">Edit Notes</button>
        </div>
    `;
    
    showModal('employeeDetailsModal');
}

// Export team data
function exportTeamData() {
    showSuccessNotification('Exporting team data to CSV...');
    // In a real app, this would generate and download a CSV file
    setTimeout(() => {
        showSuccessNotification('Team data exported successfully!');
    }, 1000);
}

// Submit team member request
function submitTeamMemberRequest() {
    const form = document.getElementById('addMemberForm');
    if (form.checkValidity()) {
        showSuccessNotification('Team member request submitted! HR will review and get back to you within 3-5 business days.');
        closeModal('addTeamMemberModal');
        form.reset();
    } else {
        form.reportValidity();
    }
}

// Send message to employee
function sendMessage() {
    const employeeName = document.getElementById('employeeModalName').textContent;
    showSuccessNotification(`Opening message composer for ${employeeName}...`);
    // In a real app, this would open a messaging interface
}

// View performance history
function viewPerformanceHistory() {
    showSuccessNotification('Opening performance review history...');
}

// View leave history
function viewLeaveHistory() {
    showSuccessNotification('Opening leave history...');
}

// Edit manager notes
function editNotes(employeeId) {
    const employee = employeeData[employeeId];
    const newNotes = prompt('Edit manager notes:', employee.notes);
    if (newNotes !== null) {
        employee.notes = newNotes;
        showSuccessNotification('Notes updated successfully!');
        viewEmployeeDetails(employeeId); // Refresh the modal
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

// Add CSS for view content
const style = document.createElement('style');
style.textContent = `
    .view-content {
        display: none;
    }
    
    .view-content.active {
        display: block;
    }
`;
document.head.appendChild(style);
