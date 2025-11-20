// Leave Management Functionality

// Initialize leave data from localStorage or use defaults
let leaveData = JSON.parse(localStorage.getItem('leaveData')) || {
    balances: {
        vacation: { total: 25, used: 7, available: 18 },
        sick: { total: 10, used: 2, available: 8 },
        personal: { total: 5, used: 2, available: 3 }
    },
    requests: [
        {
            id: 1,
            type: 'vacation',
            startDate: '2025-12-20',
            endDate: '2025-12-25',
            days: 5,
            reason: 'Year-end family vacation',
            status: 'approved',
            submittedDate: '2025-11-15',
            approvedBy: 'Sarah Johnson',
            approvedDate: '2025-11-16'
        }
    ],
    history: [
        {
            id: 2,
            type: 'vacation',
            startDate: '2025-07-15',
            endDate: '2025-07-22',
            days: 7,
            reason: 'Summer vacation',
            status: 'approved',
            submittedDate: '2025-06-20',
            approvedBy: 'Sarah Johnson',
            approvedDate: '2025-06-21'
        },
        {
            id: 3,
            type: 'sick',
            startDate: '2025-05-10',
            endDate: '2025-05-11',
            days: 2,
            reason: 'Medical appointment',
            status: 'approved',
            submittedDate: '2025-05-09',
            approvedBy: 'Sarah Johnson',
            approvedDate: '2025-05-09'
        },
        {
            id: 4,
            type: 'personal',
            startDate: '2025-03-20',
            endDate: '2025-03-20',
            days: 1,
            reason: 'Personal matter',
            status: 'approved',
            submittedDate: '2025-03-13',
            approvedBy: 'Sarah Johnson',
            approvedDate: '2025-03-14'
        },
        {
            id: 5,
            type: 'vacation',
            startDate: '2025-01-02',
            endDate: '2025-01-05',
            days: 3,
            reason: 'New Year break',
            status: 'approved',
            submittedDate: '2024-12-10',
            approvedBy: 'Sarah Johnson',
            approvedDate: '2024-12-11'
        }
    ]
};

// Save leave data to localStorage
function saveLeaveData() {
    localStorage.setItem('leaveData', JSON.stringify(leaveData));
}

// Tab switching
function switchTab(tabName) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab
    event.target.classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Calculate business days between two dates
function calculateBusinessDays(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let count = 0;
    const current = new Date(start);
    
    while (current <= end) {
        const dayOfWeek = current.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Not Sunday (0) or Saturday (6)
            count++;
        }
        current.setDate(current.getDate() + 1);
    }
    
    return count;
}

// Calculate days when dates change
function calculateDays() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    if (startDate && endDate) {
        const days = calculateBusinessDays(startDate, endDate);
        document.getElementById('calculatedDays').textContent = `${days} day${days !== 1 ? 's' : ''}`;
    }
}

// Update available leave days in dropdown
function updateLeaveDays() {
    const leaveType = document.getElementById('leaveType').value;
    const options = document.getElementById('leaveType').options;
    
    options[1].text = `Vacation Leave (${leaveData.balances.vacation.available} days available)`;
    options[2].text = `Sick Leave (${leaveData.balances.sick.available} days available)`;
    options[3].text = `Personal Day (${leaveData.balances.personal.available} days available)`;
}

// Submit leave request
function submitLeaveRequest(event) {
    event.preventDefault();
    
    const leaveType = document.getElementById('leaveType').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const reason = document.getElementById('leaveReason').value;
    const days = calculateBusinessDays(startDate, endDate);
    
    // Check if enough leave is available
    if (leaveType !== 'unpaid') {
        const available = leaveData.balances[leaveType].available;
        if (days > available) {
            alert(`Insufficient leave balance! You have ${available} days available.`);
            return;
        }
    }
    
    // Create new request
    const newRequest = {
        id: Date.now(),
        type: leaveType,
        startDate: startDate,
        endDate: endDate,
        days: days,
        reason: reason,
        status: 'pending',
        submittedDate: new Date().toISOString().split('T')[0]
    };
    
    // Add to requests array
    leaveData.requests.push(newRequest);
    
    // Update balance (deduct from available)
    if (leaveType !== 'unpaid') {
        leaveData.balances[leaveType].available -= days;
        leaveData.balances[leaveType].used += days;
    }
    
    // Save to localStorage
    saveLeaveData();
    
    // Show success message
    showSuccessNotification('Leave request submitted successfully! Your manager will be notified.');
    
    // Close modal and reset form
    closeModal('requestLeaveModal');
    document.getElementById('leaveRequestForm').reset();
    
    // Refresh displays
    updateLeaveBalances();
    loadPendingRequests();
}

// Cancel leave request
function cancelLeave(requestId) {
    if (!confirm('Are you sure you want to cancel this leave request?')) {
        return;
    }
    
    // Find the request
    const requestIndex = leaveData.requests.findIndex(r => r.id === requestId);
    if (requestIndex === -1) return;
    
    const request = leaveData.requests[requestIndex];
    
    // Restore balance if it was approved
    if (request.status === 'approved' && request.type !== 'unpaid') {
        leaveData.balances[request.type].available += request.days;
        leaveData.balances[request.type].used -= request.days;
    }
    
    // Remove from requests
    leaveData.requests.splice(requestIndex, 1);
    
    // Save changes
    saveLeaveData();
    
    // Show notification
    showSuccessNotification('Leave request cancelled successfully.');
    
    // Refresh displays
    updateLeaveBalances();
    loadUpcomingLeave();
}

// Load upcoming leave
function loadUpcomingLeave() {
    const tbody = document.getElementById('upcomingLeaveTable');
    if (!tbody) return;
    
    const today = new Date();
    const upcoming = leaveData.requests.filter(r => {
        const startDate = new Date(r.startDate);
        return startDate >= today && r.status === 'approved';
    });
    
    if (upcoming.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 40px; color: var(--text-secondary);">No upcoming leave scheduled</td></tr>';
        return;
    }
    
    tbody.innerHTML = upcoming.map(request => `
        <tr>
            <td><span class="badge badge-info">${capitalize(request.type)}</span></td>
            <td>${formatDate(request.startDate)}</td>
            <td>${formatDate(request.endDate)}</td>
            <td>${request.days} day${request.days !== 1 ? 's' : ''}</td>
            <td><span class="badge badge-success">Approved</span></td>
            <td>
                <button class="btn btn-sm btn-outline" onclick="cancelLeave(${request.id})">Cancel</button>
            </td>
        </tr>
    `).join('');
}

// Load pending requests
function loadPendingRequests() {
    const container = document.getElementById('pendingRequestsContainer');
    if (!container) return;
    
    const pending = leaveData.requests.filter(r => r.status === 'pending');
    
    if (pending.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
                <div style="font-size: 48px; margin-bottom: 16px;">✅</div>
                <h3>No Pending Requests</h3>
                <p>You don't have any pending leave requests at the moment.</p>
                <button class="btn btn-primary mt-3" onclick="showModal('requestLeaveModal')">Request Leave</button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Leave Type</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Days</th>
                    <th>Submitted</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${pending.map(request => `
                    <tr>
                        <td><span class="badge badge-info">${capitalize(request.type)}</span></td>
                        <td>${formatDate(request.startDate)}</td>
                        <td>${formatDate(request.endDate)}</td>
                        <td>${request.days} day${request.days !== 1 ? 's' : ''}</td>
                        <td>${formatDate(request.submittedDate)}</td>
                        <td>
                            <button class="btn btn-sm btn-outline" onclick="cancelLeave(${request.id})">Cancel</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// Update leave balance display
function updateLeaveBalances() {
    // This would update the stat cards on the page
    const statCards = document.querySelectorAll('.stat-card .stat-value');
    if (statCards.length >= 4) {
        statCards[0].textContent = `${leaveData.balances.vacation.available} days`;
        statCards[1].textContent = `${leaveData.balances.sick.available} days`;
        statCards[2].textContent = `${leaveData.balances.personal.available} days`;
        
        const totalUsed = leaveData.balances.vacation.used + 
                         leaveData.balances.sick.used + 
                         leaveData.balances.personal.used;
        statCards[3].textContent = `${totalUsed} days`;
    }
}

// Helper functions
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function showSuccessNotification(message) {
    // Create notification element
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
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Quick action functions
function showLeaveCalendar() {
    alert('Leave calendar view - Coming soon!\n\nThis will show a visual calendar with all your leave dates highlighted.');
}

function downloadLeaveReport() {
    const report = `Leave Report - ${new Date().getFullYear()}\n\n` +
        `Vacation Leave: ${leaveData.balances.vacation.used}/${leaveData.balances.vacation.total} days used\n` +
        `Sick Leave: ${leaveData.balances.sick.used}/${leaveData.balances.sick.total} days used\n` +
        `Personal Days: ${leaveData.balances.personal.used}/${leaveData.balances.personal.total} days used\n\n` +
        `Leave History:\n` +
        leaveData.history.map(r => 
            `- ${formatDate(r.startDate)} to ${formatDate(r.endDate)}: ${r.days} days (${capitalize(r.type)})`
        ).join('\n');
    
    // Create blob and download
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leave-report-${new Date().getFullYear()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    showSuccessNotification('Leave report downloaded successfully!');
}

function viewTeamLeave() {
    alert('Team Leave Calendar\n\nThis feature shows when your team members are on leave to help with planning.\n\nUpcoming team leave:\n- Emily Chen: Nov 18-19 (Sick)\n- Michael Davis: Dec 15 (Personal)');
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
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
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .tabs {
        display: flex;
        gap: 8px;
        margin-bottom: 24px;
        border-bottom: 2px solid var(--border-color);
    }
    
    .tab-btn {
        padding: 12px 24px;
        background: none;
        border: none;
        border-bottom: 2px solid transparent;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        color: var(--text-secondary);
        transition: all 0.2s;
        margin-bottom: -2px;
    }
    
    .tab-btn:hover {
        color: var(--primary-color);
    }
    
    .tab-btn.active {
        color: var(--primary-color);
        border-bottom-color: var(--primary-color);
    }
    
    .tab-content {
        display: none;
    }
    
    .tab-content.active {
        display: block;
    }
    
    .form-control {
        padding: 8px 12px;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        font-size: 14px;
    }
`;
document.head.appendChild(style);

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadUpcomingLeave();
    loadPendingRequests();
    updateLeaveBalances();
    
    // Set minimum date for leave requests to today
    const today = new Date().toISOString().split('T')[0];
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    
    if (startDateInput) {
        startDateInput.min = today;
    }
    if (endDateInput) {
        endDateInput.min = today;
    }
});
