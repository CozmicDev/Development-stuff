// Approvals Management Functionality

let currentRequestId = null;
let currentRequestType = null;

// Request details data
const requestDetails = {
    1: {
        employee: 'John Smith',
        type: 'Leave Request',
        leaveType: 'Vacation Leave',
        startDate: 'December 20, 2024',
        endDate: 'December 27, 2024',
        days: 6,
        reason: 'Holiday vacation with family',
        status: 'Pending',
        submitted: '2 hours ago',
        coverage: 'Michael Brown (confirmed)',
        notes: 'All project deliverables will be completed before departure'
    },
    2: {
        employee: 'Emily Chen',
        type: 'Expense Report',
        expenseType: 'Conference Travel',
        date: 'November 10-12, 2024',
        total: '$1,850.00',
        items: [
            { description: 'Flight to New York', amount: '$650.00' },
            { description: 'Hotel (3 nights)', amount: '$900.00' },
            { description: 'Meals', amount: '$200.00' },
            { description: 'Ground Transportation', amount: '$100.00' }
        ],
        purpose: 'Attending React Conference 2024',
        receipts: 'All receipts attached',
        submitted: '5 hours ago'
    },
    3: {
        employee: 'Sarah Davis',
        type: 'Leave Request',
        leaveType: 'Personal Leave',
        startDate: 'November 25, 2024',
        endDate: 'November 26, 2024',
        days: 2,
        reason: 'Family event - Thanksgiving',
        status: 'Pending',
        submitted: '1 day ago',
        coverage: 'Emily Chen (confirmed)',
        notes: 'Remote availability if urgent issues arise'
    },
    4: {
        employee: 'David Wilson',
        type: 'Equipment Request',
        equipment: '27" 4K Display Monitor',
        justification: 'Current monitor is 1080p and insufficient for development work with multiple windows',
        estimatedCost: '$450',
        urgency: 'Normal',
        submitted: '1 day ago'
    },
    5: {
        employee: 'Michael Brown',
        type: 'Leave Request',
        leaveType: 'Sick Leave',
        startDate: 'November 18, 2024',
        endDate: 'November 18, 2024',
        days: 1,
        reason: 'Feeling unwell, need to rest',
        status: 'Pending',
        submitted: '3 hours ago',
        coverage: 'John Smith (confirmed)',
        notes: 'Will monitor email for critical issues'
    },
    6: {
        employee: 'Lisa Anderson',
        type: 'Expense Report',
        expenseType: 'Client Meeting',
        date: 'November 5, 2024',
        total: '$1,390.00',
        items: [
            { description: 'Client Dinner (5 people)', amount: '$580.00' },
            { description: 'Meeting Room Rental', amount: '$350.00' },
            { description: 'Presentation Materials', amount: '$160.00' },
            { description: 'Transportation', amount: '$300.00' }
        ],
        purpose: 'Quarterly business review with key client',
        receipts: 'All receipts attached',
        submitted: '2 days ago'
    },
    7: {
        employee: 'John Smith',
        type: 'Leave Request',
        leaveType: 'Remote Work',
        startDate: 'December 1, 2024',
        endDate: 'December 5, 2024',
        days: 5,
        reason: 'Working remotely from home office',
        status: 'Pending',
        submitted: '3 days ago',
        coverage: 'N/A - Available during work hours',
        notes: 'Will attend all meetings via video conference'
    },
    8: {
        employee: 'Sarah Davis',
        type: 'Time Off Request',
        leaveType: 'Half Day',
        startDate: 'November 22, 2024',
        endDate: 'November 22, 2024',
        days: 0.5,
        timeSlot: 'Afternoon (1:00 PM - 5:00 PM)',
        reason: 'Personal appointment',
        status: 'Pending',
        submitted: '4 days ago',
        coverage: 'John Smith (confirmed)',
        notes: 'Morning tasks will be completed before leaving'
    }
};

// Tab switching
function switchApprovalTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Filter requests
function filterRequests() {
    const searchTerm = document.getElementById('searchRequests').value.toLowerCase();
    const typeFilter = document.getElementById('typeFilter').value;
    const priorityFilter = document.getElementById('priorityFilter').value;
    
    const rows = document.querySelectorAll('#approvalsTableBody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const type = row.getAttribute('data-type');
        const priority = row.getAttribute('data-priority');
        
        const matchesSearch = searchTerm === '' || text.includes(searchTerm);
        const matchesType = typeFilter === 'all' || type === typeFilter;
        const matchesPriority = priorityFilter === 'all' || priority === priorityFilter;
        
        if (matchesSearch && matchesType && matchesPriority) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Reset filters
function resetApprovalFilters() {
    document.getElementById('searchRequests').value = '';
    document.getElementById('typeFilter').value = 'all';
    document.getElementById('priorityFilter').value = 'all';
    filterRequests();
    showSuccessNotification('Filters reset');
}

// Show request details
function showRequestDetails(requestId) {
    currentRequestId = requestId;
    const request = requestDetails[requestId];
    
    if (!request) {
        alert('Request details not found');
        return;
    }
    
    currentRequestType = request.type;
    document.getElementById('requestModalTitle').textContent = `${request.type} - ${request.employee}`;
    
    let bodyContent = '';
    
    if (request.type === 'Leave Request' || request.type === 'Time Off Request') {
        bodyContent = `
            <div style="display: grid; gap: 16px;">
                <div>
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Employee</div>
                    <strong style="font-size: 16px;">${request.employee}</strong>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                    <div>
                        <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Leave Type</div>
                        <strong>${request.leaveType}</strong>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Duration</div>
                        <strong>${request.days} ${request.days === 1 ? 'day' : 'days'}</strong>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                    <div>
                        <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Start Date</div>
                        <strong>${request.startDate}</strong>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">End Date</div>
                        <strong>${request.endDate}</strong>
                    </div>
                </div>
                
                ${request.timeSlot ? `
                <div>
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Time Slot</div>
                    <strong>${request.timeSlot}</strong>
                </div>
                ` : ''}
                
                <div>
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Reason</div>
                    <p>${request.reason}</p>
                </div>
                
                <div>
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Coverage Arrangement</div>
                    <strong>${request.coverage}</strong>
                </div>
                
                <div>
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Additional Notes</div>
                    <p>${request.notes}</p>
                </div>
                
                <div style="padding: 16px; background: var(--background); border-radius: 8px;">
                    <strong>Submitted:</strong> ${request.submitted}<br>
                    <strong>Status:</strong> <span class="badge badge-warning">${request.status}</span>
                </div>
            </div>
        `;
    } else if (request.type === 'Expense Report') {
        const itemsHtml = request.items.map(item => `
            <tr>
                <td>${item.description}</td>
                <td style="text-align: right;"><strong>${item.amount}</strong></td>
            </tr>
        `).join('');
        
        bodyContent = `
            <div style="display: grid; gap: 16px;">
                <div>
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Employee</div>
                    <strong style="font-size: 16px;">${request.employee}</strong>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                    <div>
                        <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Expense Type</div>
                        <strong>${request.expenseType}</strong>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Date</div>
                        <strong>${request.date}</strong>
                    </div>
                </div>
                
                <div>
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Purpose</div>
                    <p>${request.purpose}</p>
                </div>
                
                <div>
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 8px;">Expense Items</div>
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="border-bottom: 2px solid var(--border-color);">
                                <th style="text-align: left; padding: 8px;">Description</th>
                                <th style="text-align: right; padding: 8px;">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemsHtml}
                        </tbody>
                        <tfoot>
                            <tr style="border-top: 2px solid var(--border-color); font-weight: bold;">
                                <td style="padding: 8px;">Total</td>
                                <td style="text-align: right; padding: 8px; color: var(--primary); font-size: 18px;">${request.total}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                
                <div style="padding: 16px; background: var(--background); border-radius: 8px;">
                    <strong>Receipts:</strong> ${request.receipts}<br>
                    <strong>Submitted:</strong> ${request.submitted}
                </div>
            </div>
        `;
    } else if (request.type === 'Equipment Request') {
        bodyContent = `
            <div style="display: grid; gap: 16px;">
                <div>
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Employee</div>
                    <strong style="font-size: 16px;">${request.employee}</strong>
                </div>
                
                <div>
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Equipment Requested</div>
                    <strong style="font-size: 16px;">${request.equipment}</strong>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                    <div>
                        <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Estimated Cost</div>
                        <strong>${request.estimatedCost}</strong>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Urgency</div>
                        <strong>${request.urgency}</strong>
                    </div>
                </div>
                
                <div>
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Justification</div>
                    <p>${request.justification}</p>
                </div>
                
                <div style="padding: 16px; background: var(--background); border-radius: 8px;">
                    <strong>Submitted:</strong> ${request.submitted}
                </div>
            </div>
        `;
    }
    
    document.getElementById('requestModalBody').innerHTML = bodyContent;
    showModal('requestDetailsModal');
}

// Approve request
function approveRequest(requestId, requestType) {
    const request = requestDetails[requestId];
    if (confirm(`Approve ${request.type} for ${request.employee}?`)) {
        // Remove from table
        const row = document.querySelector(`tr[data-request-id="${requestId}"]`);
        if (row) {
            row.remove();
        }
        
        // Update counters
        updateCounters();
        
        showSuccessNotification(`✓ ${request.type} approved for ${request.employee}`);
    }
}

// Approve from modal
function approveFromModal() {
    if (currentRequestId) {
        const request = requestDetails[currentRequestId];
        const row = document.querySelector(`tr[data-request-id="${currentRequestId}"]`);
        if (row) {
            row.remove();
        }
        updateCounters();
        showSuccessNotification(`✓ ${request.type} approved for ${request.employee}`);
        closeModal('requestDetailsModal');
    }
}

// Reject request
function rejectRequest() {
    if (currentRequestId) {
        const request = requestDetails[currentRequestId];
        const reason = prompt('Please provide a reason for rejection:');
        if (reason) {
            const row = document.querySelector(`tr[data-request-id="${currentRequestId}"]`);
            if (row) {
                row.remove();
            }
            updateCounters();
            showSuccessNotification(`✗ ${request.type} rejected for ${request.employee}`);
            closeModal('requestDetailsModal');
        }
    }
}

// Update counters
function updateCounters() {
    const totalPending = document.querySelectorAll('#approvalsTableBody tr:not([style*="display: none"])').length;
    document.querySelector('.stat-value').textContent = totalPending;
    
    // Update tab badge
    const pendingTab = document.querySelector('.tab-btn');
    if (pendingTab) {
        pendingTab.textContent = `Pending (${totalPending})`;
    }
}

// Toggle select all
function toggleSelectAll() {
    const selectAll = document.getElementById('selectAll');
    const checkboxes = document.querySelectorAll('.request-checkbox');
    checkboxes.forEach(cb => {
        if (cb.closest('tr').style.display !== 'none') {
            cb.checked = selectAll.checked;
        }
    });
    updateSelectedCount();
}

// Update selected count
function updateSelectedCount() {
    const selected = document.querySelectorAll('.request-checkbox:checked').length;
    document.getElementById('selectedCount').textContent = selected;
    document.getElementById('selectedCount2').textContent = selected;
}

// Update selected count on checkbox change
document.addEventListener('change', function(e) {
    if (e.target.classList.contains('request-checkbox')) {
        updateSelectedCount();
    }
});

// Bulk approve
function bulkApprove() {
    const selected = document.querySelectorAll('.request-checkbox:checked');
    if (selected.length === 0) {
        alert('Please select at least one request');
        return;
    }
    
    if (confirm(`Approve ${selected.length} selected request(s)?`)) {
        selected.forEach(checkbox => {
            checkbox.closest('tr').remove();
        });
        updateCounters();
        closeModal('bulkActionModal');
        showSuccessNotification(`✓ ${selected.length} request(s) approved successfully`);
    }
}

// Bulk reject
function bulkReject() {
    const selected = document.querySelectorAll('.request-checkbox:checked');
    if (selected.length === 0) {
        alert('Please select at least one request');
        return;
    }
    
    const reason = prompt('Please provide a reason for rejection:');
    if (reason) {
        selected.forEach(checkbox => {
            checkbox.closest('tr').remove();
        });
        updateCounters();
        closeModal('bulkActionModal');
        showSuccessNotification(`✗ ${selected.length} request(s) rejected`);
    }
}

// View approval history
function viewApprovalHistory() {
    switchApprovalTab('recent');
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-btn')[1].classList.add('active');
}

// Success notification
function showSuccessNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 24px;">${message.startsWith('✓') ? '✅' : message.startsWith('✗') ? '❌' : '📋'}</span>
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
