// HR Employee Management Functionality

// Employee details database
const employeeDatabase = {
    'EMP001': {
        id: 'EMP001',
        name: 'John Smith',
        email: 'john.smith@company.com',
        phone: '+1 (555) 123-4567',
        department: 'Engineering',
        position: 'Senior Developer',
        status: 'Active',
        hireDate: 'January 15, 2020',
        location: 'San Francisco, CA',
        manager: 'Sarah Manager',
        salary: '$125,000',
        employmentType: 'Full-Time',
        benefits: 'Health, Dental, Vision, 401k',
        performanceRating: '4.8/5.0',
        leaveBalance: { vacation: 15, sick: 10, personal: 5 },
        emergencyContact: 'Jane Smith - Spouse - (555) 987-6543',
        notes: 'Top performer, excellent team player'
    },
    'EMP002': {
        id: 'EMP002',
        name: 'Emily Chen',
        email: 'emily.chen@company.com',
        phone: '+1 (555) 234-5678',
        department: 'Engineering',
        position: 'Software Developer',
        status: 'On Leave',
        hireDate: 'March 10, 2021',
        location: 'Remote - Austin, TX',
        manager: 'Sarah Manager',
        salary: '$95,000',
        employmentType: 'Full-Time',
        benefits: 'Health, Dental, Vision, 401k',
        performanceRating: '4.5/5.0',
        leaveBalance: { vacation: 8, sick: 12, personal: 3 },
        emergencyContact: 'Tom Chen - Father - (555) 876-5432',
        notes: 'Currently on vacation, returns Nov 18'
    },
    'EMP003': {
        id: 'EMP003',
        name: 'Robert Johnson',
        email: 'robert.johnson@company.com',
        phone: '+1 (555) 345-6789',
        department: 'Sales',
        position: 'Sales Manager',
        status: 'Active',
        hireDate: 'June 8, 2019',
        location: 'New York, NY',
        manager: 'Executive Team',
        salary: '$140,000 + Commission',
        employmentType: 'Full-Time',
        benefits: 'Health, Dental, Vision, 401k, Company Car',
        performanceRating: '4.7/5.0',
        leaveBalance: { vacation: 20, sick: 15, personal: 5 },
        emergencyContact: 'Mary Johnson - Wife - (555) 765-4321',
        notes: 'Exceeded sales targets for 3 consecutive quarters'
    },
    'EMP004': {
        id: 'EMP004',
        name: 'Jennifer Martinez',
        email: 'jennifer.martinez@company.com',
        phone: '+1 (555) 456-7890',
        department: 'Sales',
        position: 'Account Executive',
        status: 'Active',
        hireDate: 'November 20, 2021',
        location: 'New York, NY',
        manager: 'Robert Johnson',
        salary: '$85,000 + Commission',
        employmentType: 'Full-Time',
        benefits: 'Health, Dental, Vision, 401k',
        performanceRating: '4.3/5.0',
        leaveBalance: { vacation: 12, sick: 10, personal: 4 },
        emergencyContact: 'Carlos Martinez - Husband - (555) 654-3210',
        notes: 'Strong closer, building excellent client relationships'
    },
    'EMP005': {
        id: 'EMP005',
        name: 'Sarah Williams',
        email: 'sarah.williams@company.com',
        phone: '+1 (555) 567-8901',
        department: 'Marketing',
        position: 'Marketing Director',
        status: 'Active',
        hireDate: 'April 3, 2020',
        location: 'San Francisco, CA',
        manager: 'Executive Team',
        salary: '$135,000',
        employmentType: 'Full-Time',
        benefits: 'Health, Dental, Vision, 401k',
        performanceRating: '4.9/5.0',
        leaveBalance: { vacation: 18, sick: 12, personal: 5 },
        emergencyContact: 'Mike Williams - Brother - (555) 543-2109',
        notes: 'Led successful rebranding campaign. Exceptional leader.'
    },
    'EMP006': {
        id: 'EMP006',
        name: 'David Brown',
        email: 'david.brown@company.com',
        phone: '+1 (555) 678-9012',
        department: 'Human Resources',
        position: 'HR Manager',
        status: 'Active',
        hireDate: 'September 15, 2018',
        location: 'San Francisco, CA',
        manager: 'Executive Team',
        salary: '$115,000',
        employmentType: 'Full-Time',
        benefits: 'Health, Dental, Vision, 401k',
        performanceRating: '4.6/5.0',
        leaveBalance: { vacation: 22, sick: 15, personal: 8 },
        emergencyContact: 'Linda Brown - Wife - (555) 432-1098',
        notes: 'Streamlined onboarding process. Great with employee relations.'
    },
    'EMP007': {
        id: 'EMP007',
        name: 'Lisa Anderson',
        email: 'lisa.anderson@company.com',
        phone: '+1 (555) 789-0123',
        department: 'Finance',
        position: 'Financial Analyst',
        status: 'Active',
        hireDate: 'July 12, 2022',
        location: 'New York, NY',
        manager: 'Finance Director',
        salary: '$90,000',
        employmentType: 'Full-Time',
        benefits: 'Health, Dental, Vision, 401k',
        performanceRating: '4.4/5.0',
        leaveBalance: { vacation: 10, sick: 10, personal: 3 },
        emergencyContact: 'Mark Anderson - Father - (555) 321-0987',
        notes: 'Strong analytical skills, detail-oriented'
    },
    'EMP008': {
        id: 'EMP008',
        name: 'Michael Davis',
        email: 'michael.davis@company.com',
        phone: '+1 (555) 890-1234',
        department: 'Operations',
        position: 'Operations Specialist',
        status: 'Active',
        hireDate: 'January 5, 2024',
        location: 'Remote',
        manager: 'Operations Manager',
        salary: '$75,000',
        employmentType: 'Contract',
        benefits: 'Health (partial)',
        performanceRating: '4.0/5.0',
        leaveBalance: { vacation: 5, sick: 5, personal: 0 },
        emergencyContact: 'Susan Davis - Mother - (555) 210-9876',
        notes: 'Contract until December 2024, renewable'
    },
    'EMP009': {
        id: 'EMP009',
        name: 'Amanda Taylor',
        email: 'amanda.taylor@company.com',
        phone: '+1 (555) 901-2345',
        department: 'Marketing',
        position: 'Marketing Intern',
        status: 'Active',
        hireDate: 'June 1, 2024',
        location: 'Austin, TX',
        manager: 'Sarah Williams',
        salary: '$20/hour',
        employmentType: 'Intern',
        benefits: 'None',
        performanceRating: '4.2/5.0',
        leaveBalance: { vacation: 0, sick: 3, personal: 0 },
        emergencyContact: 'Karen Taylor - Mother - (555) 109-8765',
        notes: 'Summer intern, potential for full-time conversion'
    },
    'EMP010': {
        id: 'EMP010',
        name: 'James Wilson',
        email: 'james.wilson@company.com',
        phone: '+1 (555) 012-3456',
        department: 'Sales',
        position: 'Sales Representative',
        status: 'Terminated',
        hireDate: 'February 1, 2023',
        location: 'New York, NY',
        manager: 'Robert Johnson',
        salary: '$70,000 + Commission',
        employmentType: 'Full-Time',
        benefits: 'None (Terminated)',
        performanceRating: '2.8/5.0',
        leaveBalance: { vacation: 0, sick: 0, personal: 0 },
        emergencyContact: 'N/A',
        notes: 'Terminated October 15, 2024 - Performance issues'
    }
};

// Filter employees
function filterEmployees() {
    const searchTerm = document.getElementById('employeeSearch').value.toLowerCase();
    const deptFilter = document.getElementById('deptFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;
    const locationFilter = document.getElementById('locationFilter').value;
    
    const rows = document.querySelectorAll('#employeeTableBody tr');
    let visibleCount = 0;
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const dept = row.getAttribute('data-dept');
        const status = row.getAttribute('data-status');
        const type = row.getAttribute('data-type');
        const location = row.getAttribute('data-location');
        
        const matchesSearch = searchTerm === '' || text.includes(searchTerm);
        const matchesDept = deptFilter === 'all' || dept === deptFilter;
        const matchesStatus = statusFilter === 'all' || status === statusFilter;
        const matchesType = typeFilter === 'all' || type === typeFilter;
        const matchesLocation = locationFilter === 'all' || location === locationFilter;
        
        if (matchesSearch && matchesDept && matchesStatus && matchesType && matchesLocation) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    document.getElementById('resultCount').textContent = `Showing ${visibleCount} employee${visibleCount !== 1 ? 's' : ''}`;
}

// Reset filters
function resetEmployeeFilters() {
    document.getElementById('employeeSearch').value = '';
    document.getElementById('deptFilter').value = 'all';
    document.getElementById('statusFilter').value = 'all';
    document.getElementById('typeFilter').value = 'all';
    document.getElementById('locationFilter').value = 'all';
    filterEmployees();
    showSuccessNotification('All filters cleared');
}

// Sort employees
function sortEmployees() {
    const sortBy = document.getElementById('sortBy').value;
    const tbody = document.getElementById('employeeTableBody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    rows.sort((a, b) => {
        let aVal, bVal;
        
        if (sortBy === 'name' || sortBy === 'name-desc') {
            aVal = a.querySelectorAll('td')[1].textContent.trim();
            bVal = b.querySelectorAll('td')[1].textContent.trim();
        } else if (sortBy === 'hire-date' || sortBy === 'hire-date-desc') {
            aVal = new Date(a.querySelectorAll('td')[6].textContent);
            bVal = new Date(b.querySelectorAll('td')[6].textContent);
        } else if (sortBy === 'department') {
            aVal = a.querySelectorAll('td')[3].textContent;
            bVal = b.querySelectorAll('td')[3].textContent;
        }
        
        if (sortBy.includes('desc')) {
            return aVal < bVal ? 1 : -1;
        }
        return aVal > bVal ? 1 : -1;
    });
    
    rows.forEach(row => tbody.appendChild(row));
    showSuccessNotification('Table sorted');
}

// Toggle select all
function toggleSelectAllEmployees() {
    const selectAll = document.getElementById('selectAllCheckbox');
    const checkboxes = document.querySelectorAll('.emp-checkbox');
    
    checkboxes.forEach(cb => {
        if (cb.closest('tr').style.display !== 'none') {
            cb.checked = selectAll.checked;
        }
    });
    
    updateSelectedCount();
}

// Select all visible
function selectAllVisible() {
    const checkboxes = document.querySelectorAll('.emp-checkbox');
    checkboxes.forEach(cb => {
        if (cb.closest('tr').style.display !== 'none') {
            cb.checked = true;
        }
    });
    updateSelectedCount();
}

// Update selected count
function updateSelectedCount() {
    const selected = document.querySelectorAll('.emp-checkbox:checked').length;
    const countElement = document.getElementById('selectedCount');
    const bulkCountElement = document.getElementById('bulkSelectedCount');
    
    if (selected > 0) {
        countElement.textContent = `${selected} selected`;
        countElement.style.display = 'inline';
    } else {
        countElement.textContent = '';
        countElement.style.display = 'none';
    }
    
    if (bulkCountElement) {
        bulkCountElement.textContent = selected;
    }
}

// Listen for checkbox changes
document.addEventListener('change', function(e) {
    if (e.target.classList.contains('emp-checkbox')) {
        updateSelectedCount();
    }
});

// View employee details
function viewEmployeeDetails(empId) {
    const employee = employeeDatabase[empId];
    
    if (!employee) {
        alert('Employee not found');
        return;
    }
    
    document.getElementById('empDetailName').textContent = employee.name;
    
    const detailsHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
            <div>
                <h3 style="margin-bottom: 16px;">👤 Personal Information</h3>
                <div style="display: grid; gap: 12px;">
                    <div>
                        <div style="font-size: 12px; color: var(--text-secondary);">Employee ID</div>
                        <strong>${employee.id}</strong>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: var(--text-secondary);">Email</div>
                        <a href="mailto:${employee.email}">${employee.email}</a>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: var(--text-secondary);">Phone</div>
                        <strong>${employee.phone}</strong>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: var(--text-secondary);">Emergency Contact</div>
                        <strong>${employee.emergencyContact}</strong>
                    </div>
                </div>

                <h3 style="margin: 24px 0 16px;">💼 Employment Details</h3>
                <div style="display: grid; gap: 12px;">
                    <div>
                        <div style="font-size: 12px; color: var(--text-secondary);">Department</div>
                        <strong>${employee.department}</strong>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: var(--text-secondary);">Position</div>
                        <strong>${employee.position}</strong>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: var(--text-secondary);">Manager</div>
                        <strong>${employee.manager}</strong>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: var(--text-secondary);">Employment Type</div>
                        <strong>${employee.employmentType}</strong>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: var(--text-secondary);">Hire Date</div>
                        <strong>${employee.hireDate}</strong>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: var(--text-secondary);">Location</div>
                        <strong>${employee.location}</strong>
                    </div>
                </div>
            </div>

            <div>
                <h3 style="margin-bottom: 16px;">💰 Compensation & Benefits</h3>
                <div style="display: grid; gap: 12px;">
                    <div>
                        <div style="font-size: 12px; color: var(--text-secondary);">Salary</div>
                        <strong>${employee.salary}</strong>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: var(--text-secondary);">Benefits</div>
                        <strong>${employee.benefits}</strong>
                    </div>
                </div>

                <h3 style="margin: 24px 0 16px;">⭐ Performance</h3>
                <div style="display: grid; gap: 12px;">
                    <div>
                        <div style="font-size: 12px; color: var(--text-secondary);">Current Rating</div>
                        <strong style="font-size: 20px; color: var(--primary);">${employee.performanceRating}</strong>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: var(--text-secondary);">Status</div>
                        <span class="badge ${employee.status === 'Active' ? 'badge-success' : employee.status === 'On Leave' ? 'badge-warning' : 'badge-danger'}">${employee.status}</span>
                    </div>
                </div>

                <h3 style="margin: 24px 0 16px;">🏖️ Leave Balance</h3>
                <div style="display: grid; gap: 12px;">
                    <div>
                        <div style="font-size: 12px; color: var(--text-secondary);">Vacation Days</div>
                        <strong>${employee.leaveBalance.vacation} days</strong>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: var(--text-secondary);">Sick Days</div>
                        <strong>${employee.leaveBalance.sick} days</strong>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: var(--text-secondary);">Personal Days</div>
                        <strong>${employee.leaveBalance.personal} days</strong>
                    </div>
                </div>
            </div>
        </div>

        <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--border-color);">
            <h3 style="margin-bottom: 12px;">📝 Notes</h3>
            <p>${employee.notes}</p>
        </div>

        <div style="margin-top: 24px; display: flex; gap: 12px; flex-wrap: wrap;">
            <button class="btn btn-outline" onclick="viewPerformanceReviews('${employee.id}')">Performance Reviews</button>
            <button class="btn btn-outline" onclick="viewLeaveHistory('${employee.id}')">Leave History</button>
            <button class="btn btn-outline" onclick="generateReport('${employee.id}')">Generate Report</button>
        </div>
    `;
    
    document.getElementById('empDetailBody').innerHTML = detailsHTML;
    showModal('employeeDetailsModal');
}

// Edit employee
function editEmployee(empId) {
    showSuccessNotification(`Opening edit form for employee ${empId}...`);
    // In real app, this would open an edit form
}

function editEmployeeFromModal() {
    showSuccessNotification('Opening employee edit form...');
}

// Export employees
function exportEmployees() {
    showSuccessNotification('Exporting employee data to CSV...');
    setTimeout(() => {
        showSuccessNotification('Employee data exported successfully!');
    }, 1000);
}

// Submit new employee
function submitNewEmployee() {
    const form = document.getElementById('addEmployeeForm');
    if (form.checkValidity()) {
        showSuccessNotification('New employee added successfully! Onboarding process initiated.');
        closeModal('addEmployeeModal');
        form.reset();
    } else {
        form.reportValidity();
    }
}

// Bulk actions
function bulkExport() {
    const selected = document.querySelectorAll('.emp-checkbox:checked').length;
    if (selected === 0) {
        alert('Please select at least one employee');
        return;
    }
    showSuccessNotification(`Exporting ${selected} employee record(s)...`);
    closeModal('bulkActionsModal');
}

function bulkUpdateDept() {
    const selected = document.querySelectorAll('.emp-checkbox:checked').length;
    if (selected === 0) {
        alert('Please select at least one employee');
        return;
    }
    const newDept = prompt('Enter new department:');
    if (newDept) {
        showSuccessNotification(`Updated department for ${selected} employee(s) to ${newDept}`);
        closeModal('bulkActionsModal');
    }
}

function bulkUpdateStatus() {
    const selected = document.querySelectorAll('.emp-checkbox:checked').length;
    if (selected === 0) {
        alert('Please select at least one employee');
        return;
    }
    const newStatus = prompt('Enter new status (Active/On Leave/Inactive):');
    if (newStatus) {
        showSuccessNotification(`Updated status for ${selected} employee(s) to ${newStatus}`);
        closeModal('bulkActionsModal');
    }
}

function bulkSendMessage() {
    const selected = document.querySelectorAll('.emp-checkbox:checked').length;
    if (selected === 0) {
        alert('Please select at least one employee');
        return;
    }
    showSuccessNotification(`Opening message composer for ${selected} employee(s)...`);
    closeModal('bulkActionsModal');
}

function bulkTerminate() {
    const selected = document.querySelectorAll('.emp-checkbox:checked').length;
    if (selected === 0) {
        alert('Please select at least one employee');
        return;
    }
    if (confirm(`Are you sure you want to terminate ${selected} employee(s)? This action requires additional approvals.`)) {
        showSuccessNotification(`Termination request submitted for ${selected} employee(s). Awaiting approval.`);
        closeModal('bulkActionsModal');
    }
}

// Additional actions
function viewPerformanceReviews(empId) {
    showSuccessNotification(`Loading performance reviews for ${empId}...`);
}

function viewLeaveHistory(empId) {
    showSuccessNotification(`Loading leave history for ${empId}...`);
}

function generateReport(empId) {
    showSuccessNotification(`Generating comprehensive report for ${empId}...`);
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

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    filterEmployees(); // Set initial count
});
