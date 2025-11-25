// HR Requests Processing Functionality

let currentHRRequestId = null;

// Request details
const hrRequestDetails = {
    'REQ001': {
        id: 'REQ001',
        employee: 'John Smith',
        type: 'Leave Request',
        leaveType: 'Vacation Leave',
        startDate: 'December 20, 2024',
        endDate: 'December 27, 2024',
        days: 6,
        reason: 'Holiday vacation with family',
        managerApproval: 'Approved by Sarah Manager',
        coverage: 'Michael Brown (confirmed)',
        remainingBalance: '15 days after approval',
        submitted: '1 hour ago'
    },
    'REQ002': {
        id: 'REQ002',
        employee: 'Emily Chen',
        type: 'Document Request',
        documentType: 'Employment Verification Letter',
        purpose: 'Mortgage application',
        recipient: 'First National Bank',
        urgency: 'Within 3 business days',
        submitted: '2 hours ago'
    },
    'REQ003': {
        id: 'REQ003',
        employee: 'Sarah Davis',
        type: 'Benefits Change',
        changeType: 'Add Dependent',
        dependent: 'Baby Davis (Newborn)',
        qualifyingEvent: 'Birth of child - November 10, 2024',
        effectiveDate: 'December 1, 2024',
        documentation: 'Birth certificate attached',
        submitted: '3 hours ago'
    },
    'REQ004': {
        id: 'REQ004',
        employee: 'Michael Brown',
        type: 'Document Request',
        documentType: 'Employment Certificate',
        purpose: 'Visa application',
        deliveryMethod: 'Email',
        submitted: '5 hours ago'
    },
    'REQ006': {
        id: 'REQ006',
        employee: 'David Wilson',
        type: 'Time Off Adjustment',
        adjustmentType: 'Leave Balance Correction',
        originalBalance: '10 days',
        requestedBalance: '12 days',
        reason: 'Sick leave on Oct 15 was incorrectly deducted as vacation',
        managerConfirmation: 'Confirmed by Sarah Manager',
        submitted: '1 day ago'
    },
    'REQ007': {
        id: 'REQ007',
        employee: 'Jennifer Martinez',
        type: 'Leave Request',
        leaveType: 'Maternity Leave (FMLA)',
        startDate: 'January 15, 2025',
        endDate: 'April 15, 2025',
        days: 90,
        dueDate: 'January 20, 2025',
        documentation: 'Doctor certification attached',
        managerApproval: 'Approved by Robert Johnson',
        submitted: '1 day ago'
    },
    'REQ008': {
        id: 'REQ008',
        employee: 'Robert Johnson',
        type: 'Document Request',
        documentType: 'Salary History Letter',
        yearsRequested: '2019-2024',
        purpose: 'Personal records',
        deliveryMethod: 'Email',
        submitted: '2 days ago'
    }
};

// Tab switching
function switchHRTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Filter requests
function filterHRRequests() {
    const searchTerm = document.getElementById('searchRequests').value.toLowerCase();
    const typeFilter = document.getElementById('requestTypeFilter').value;
    const priorityFilter = document.getElementById('requestPriorityFilter').value;
    const statusFilter = document.getElementById('requestStatusFilter').value;
    
    const rows = document.querySelectorAll('#hrRequestsTableBody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const type = row.getAttribute('data-type');
        const priority = row.getAttribute('data-priority');
        const status = row.getAttribute('data-status');
        
        const matchesSearch = searchTerm === '' || text.includes(searchTerm);
        const matchesType = typeFilter === 'all' || type === typeFilter;
        const matchesPriority = priorityFilter === 'all' || priority === priorityFilter;
        const matchesStatus = statusFilter === 'pending' || status === statusFilter;
        
        if (matchesSearch && matchesType && matchesPriority && matchesStatus) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Reset filters
function resetHRRequestFilters() {
    document.getElementById('searchRequests').value = '';
    document.getElementById('requestTypeFilter').value = 'all';
    document.getElementById('requestPriorityFilter').value = 'all';
    document.getElementById('requestStatusFilter').value = 'pending';
    filterHRRequests();
    showSuccessNotification('Filters reset');
}

// Toggle select all
function toggleSelectAllHR() {
    const selectAll = document.getElementById('selectAllHR');
    const checkboxes = document.querySelectorAll('.hr-req-checkbox');
    
    checkboxes.forEach(cb => {
        if (cb.closest('tr').style.display !== 'none') {
            cb.checked = selectAll.checked;
        }
    });
    
    updateHRSelectedCount();
}

// Update selected count
function updateHRSelectedCount() {
    const selected = document.querySelectorAll('.hr-req-checkbox:checked').length;
    const countElement = document.getElementById('quickApproveCount');
    
    if (countElement) {
        countElement.textContent = selected;
    }
}

// Listen for checkbox changes
document.addEventListener('change', function(e) {
    if (e.target.classList.contains('hr-req-checkbox')) {
        updateHRSelectedCount();
    }
});

// View request details
function viewHRRequestDetails(reqId) {
    currentHRRequestId = reqId;
    const request = hrRequestDetails[reqId];
    
    if (!request) {
        alert('Request details not found');
        return;
    }
    
    document.getElementById('hrReqModalTitle').textContent = `${request.id} - ${request.type}`;
    
    let bodyContent = '';
    
    if (request.type === 'Leave Request') {
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
                        <strong>${request.days} days</strong>
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
                
                ${request.dueDate ? `
                <div>
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Expected Due Date</div>
                    <strong>${request.dueDate}</strong>
                </div>
                ` : ''}
                
                <div>
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Reason</div>
                    <p>${request.reason}</p>
                </div>
                
                <div>
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Manager Approval</div>
                    <span class="badge badge-success">${request.managerApproval}</span>
                </div>
                
                ${request.coverage ? `
                <div>
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Coverage</div>
                    <strong>${request.coverage}</strong>
                </div>
                ` : ''}
                
                ${request.remainingBalance ? `
                <div>
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Remaining Balance</div>
                    <strong>${request.remainingBalance}</strong>
                </div>
                ` : ''}
                
                ${request.documentation ? `
                <div style="padding: 16px; background: var(--primary-light); border-radius: 8px;">
                    <strong>📎 ${request.documentation}</strong>
                </div>
                ` : ''}
            </div>
        `;
    } else if (request.type === 'Document Request') {
        bodyContent = `
            <div style="display: grid; gap: 16px;">
                <div>
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Employee</div>
                    <strong style="font-size: 16px;">${request.employee}</strong>
                </div>
                
                <div>
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Document Type</div>
                    <strong>${request.documentType}</strong>
                </div>
                
                ${request.taxYear ? `
                <div>
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Tax Year</div>
                    <strong>${request.taxYear}</strong>
                </div>
                ` : ''}
                
                ${request.yearsRequested ? `
                <div>
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Years Requested</div>
                    <strong>${request.yearsRequested}</strong>
                </div>
                ` : ''}
                
                <div>
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Purpose</div>
                    <p>${request.purpose}</p>
                </div>
                
                ${request.recipient ? `
                <div>
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Recipient</div>
                    <strong>${request.recipient}</strong>
                </div>
                ` : ''}
                
                ${request.urgency ? `
                <div>
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Urgency</div>
                    <span class="badge badge-warning">${request.urgency}</span>
                </div>
                ` : ''}
                
                <div>
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Delivery Method</div>
                    <strong>${request.deliveryMethod}</strong>
                </div>
                
                <div style="padding: 16px; background: var(--background); border-radius: 8px;">
                    <strong>📋 Action Required:</strong> Generate and send document via ${request.deliveryMethod}
                </div>
            </div>
        `;
    } else if (request.type === 'Benefits Change') {
        bodyContent = `
            <div style="display: grid; gap: 16px;">
                <div>
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Employee</div>
                    <strong style="font-size: 16px;">${request.employee}</strong>
                </div>
                
                <div>
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Change Type</div>
                    <strong>${request.changeType}</strong>
                </div>
                
                ${request.dependent ? `
                <div>
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Dependent Information</div>
                    <strong>${request.dependent}</strong>
                </div>
                ` : ''}
                
                <div>
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Qualifying Life Event</div>
                    <span class="badge badge-primary">${request.qualifyingEvent}</span>
                </div>
                
                <div>
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Effective Date</div>
                    <strong>${request.effectiveDate}</strong>
                </div>
                
                <div style="padding: 16px; background: var(--primary-light); border-radius: 8px;">
                    <strong>📎 ${request.documentation}</strong>
                </div>
                
                <div style="padding: 16px; background: var(--background); border-radius: 8px;">
                    <strong>⚠️ Important:</strong> This is a qualifying life event. Process within 30 days of event date.
                </div>
            </div>
        `;
    } else if (request.type === 'Time Off Adjustment') {
        bodyContent = `
            <div style="display: grid; gap: 16px;">
                <div>
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Employee</div>
                    <strong style="font-size: 16px;">${request.employee}</strong>
                </div>
                
                <div>
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Adjustment Type</div>
                    <strong>${request.adjustmentType}</strong>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                    <div>
                        <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Current Balance</div>
                        <strong>${request.originalBalance}</strong>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Requested Balance</div>
                        <strong style="color: var(--primary);">${request.requestedBalance}</strong>
                    </div>
                </div>
                
                <div>
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Reason for Adjustment</div>
                    <p>${request.reason}</p>
                </div>
                
                <div>
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Manager Confirmation</div>
                    <span class="badge badge-success">${request.managerConfirmation}</span>
                </div>
            </div>
        `;
    }
    
    document.getElementById('hrReqModalBody').innerHTML = bodyContent;
    showModal('hrRequestDetailsModal');
}

// Quick approve
function quickApproveHR(reqId) {
    if (confirm(`Approve request ${reqId}?`)) {
        const row = document.querySelector(`tr[data-req-id="${reqId}"]`);
        if (row) {
            row.remove();
        }
        updateHRCounters();
        showSuccessNotification(`✓ Request ${reqId} approved`);
    }
}

// Quick reject
function quickRejectHR(reqId) {
    const reason = prompt(`Reject request ${reqId}? Please provide a reason:`);
    if (reason) {
        const row = document.querySelector(`tr[data-req-id="${reqId}"]`);
        if (row) {
            row.remove();
        }
        updateHRCounters();
        showSuccessNotification(`✗ Request ${reqId} rejected`);
    }
}

// Approve from modal
function approveHRRequest() {
    if (currentHRRequestId) {
        const row = document.querySelector(`tr[data-req-id="${currentHRRequestId}"]`);
        if (row) {
            row.remove();
        }
        updateHRCounters();
        showSuccessNotification(`✓ Request ${currentHRRequestId} approved successfully`);
        closeModal('hrRequestDetailsModal');
    }
}

// Reject from modal
function rejectHRRequest() {
    if (currentHRRequestId) {
        const reason = prompt('Please provide a reason for rejection:');
        if (reason) {
            const row = document.querySelector(`tr[data-req-id="${currentHRRequestId}"]`);
            if (row) {
                row.remove();
            }
            updateHRCounters();
            showSuccessNotification(`✗ Request ${currentHRRequestId} rejected`);
            closeModal('hrRequestDetailsModal');
        }
    }
}

// Bulk approve
function bulkApproveHR() {
    const selected = document.querySelectorAll('.hr-req-checkbox:checked');
    if (selected.length === 0) {
        alert('Please select at least one request');
        return;
    }
    
    if (confirm(`Approve ${selected.length} request(s)?`)) {
        selected.forEach(checkbox => {
            checkbox.closest('tr').remove();
        });
        updateHRCounters();
        closeModal('quickApproveModal');
        showSuccessNotification(`✓ ${selected.length} request(s) approved successfully`);
    }
}

// Bulk reject
function bulkRejectHR() {
    const selected = document.querySelectorAll('.hr-req-checkbox:checked');
    if (selected.length === 0) {
        alert('Please select at least one request');
        return;
    }
    
    const reason = prompt('Please provide a reason for rejection:');
    if (reason) {
        selected.forEach(checkbox => {
            checkbox.closest('tr').remove();
        });
        updateHRCounters();
        closeModal('quickApproveModal');
        showSuccessNotification(`✗ ${selected.length} request(s) rejected`);
    }
}

// Update counters
function updateHRCounters() {
    const totalPending = document.querySelectorAll('#hrRequestsTableBody tr:not([style*="display: none"])').length;
    
    // Update stat card
    const statValue = document.querySelector('.stat-value');
    if (statValue) {
        statValue.textContent = totalPending;
    }
    
    // Update tab badge
    const pendingTab = document.querySelector('.tab-btn');
    if (pendingTab) {
        pendingTab.textContent = `Pending (${totalPending})`;
    }
}

// Export requests
function exportRequests() {
    showSuccessNotification('Exporting request data to CSV...');
    setTimeout(() => {
        showSuccessNotification('Request data exported successfully!');
    }, 1000);
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
