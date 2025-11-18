// Employee Timesheet Management
let clockedIn = false;
let clockInTime = null;
let timerInterval = null;

document.addEventListener('DOMContentLoaded', function() {
    loadTimeData();
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
    checkClockStatus();
});

// Tab Switching
function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(tabName + '-tab').classList.add('active');
    event.target.classList.add('active');
}

// Update Current Time
function updateCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
    });
    const dateString = now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    document.getElementById('currentTime').textContent = `${dateString} • ${timeString}`;
    
    // Update today's hours if clocked in
    if (clockedIn && clockInTime) {
        const elapsed = Math.floor((now - clockInTime) / 1000);
        const hours = Math.floor(elapsed / 3600);
        const minutes = Math.floor((elapsed % 3600) / 60);
        document.getElementById('todayHours').textContent = `${hours}:${minutes.toString().padStart(2, '0')}`;
    }
}

// Check Clock Status
function checkClockStatus() {
    const timeData = JSON.parse(localStorage.getItem('timeData')) || {};
    const today = new Date().toDateString();
    
    if (timeData.currentSession && timeData.currentSession.date === today) {
        clockedIn = true;
        clockInTime = new Date(timeData.currentSession.clockIn);
        updateClockButton();
    }
}

// Toggle Clock In/Out
function toggleClock() {
    if (!clockedIn) {
        clockIn();
    } else {
        clockOut();
    }
}

// Clock In
function clockIn() {
    const now = new Date();
    clockedIn = true;
    clockInTime = now;
    
    // Save to localStorage
    const timeData = JSON.parse(localStorage.getItem('timeData')) || { entries: [] };
    timeData.currentSession = {
        date: now.toDateString(),
        clockIn: now.toISOString(),
        status: 'in_progress'
    };
    localStorage.setItem('timeData', JSON.stringify(timeData));
    
    updateClockButton();
    showSuccessNotification('✓ Clocked in at ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
    
    // Log the action
    if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
        window.dataService.auditLog.log({
            action: 'clock_in',
            details: 'Employee clocked in',
            severity: 'info'
        });
    }
}

// Clock Out
function clockOut() {
    if (confirm('Are you sure you want to clock out?')) {
        const now = new Date();
        const timeData = JSON.parse(localStorage.getItem('timeData')) || { entries: [] };
        
        if (timeData.currentSession) {
            const clockInDate = new Date(timeData.currentSession.clockIn);
            const duration = (now - clockInDate) / 1000 / 3600; // hours
            
            timeData.entries.push({
                date: now.toDateString(),
                clockIn: timeData.currentSession.clockIn,
                clockOut: now.toISOString(),
                duration: duration.toFixed(2),
                status: 'pending'
            });
            
            delete timeData.currentSession;
            localStorage.setItem('timeData', JSON.stringify(timeData));
        }
        
        clockedIn = false;
        clockInTime = null;
        document.getElementById('todayHours').textContent = '0:00';
        
        updateClockButton();
        showSuccessNotification('✓ Clocked out at ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
        
        // Log the action
        if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
            window.dataService.auditLog.log({
                action: 'clock_out',
                details: 'Employee clocked out',
                severity: 'info'
            });
        }
    }
}

// Update Clock Button
function updateClockButton() {
    const btn = document.getElementById('clockBtn');
    const status = document.getElementById('currentStatus');
    
    if (clockedIn) {
        btn.textContent = '🕐 Clock Out';
        btn.style.background = '#EF4444';
        btn.style.color = 'white';
        status.textContent = 'Clocked in at ' + clockInTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    } else {
        btn.textContent = '🕐 Clock In';
        btn.style.background = 'white';
        btn.style.color = 'var(--primary-color)';
        status.textContent = 'Not clocked in';
    }
}

// Load Time Data
function loadTimeData() {
    const timeData = JSON.parse(localStorage.getItem('timeData')) || getDefaultTimeData();
    localStorage.setItem('timeData', JSON.stringify(timeData));
}

// Get Default Time Data
function getDefaultTimeData() {
    return {
        entries: [],
        overtimeRequests: [
            { id: 'OT-2024-089', date: 'Dec 19, 2024', hours: 1.0, reason: 'Project deadline', status: 'pending' },
            { id: 'OT-2024-078', date: 'Dec 17, 2024', hours: 0.25, reason: 'Client meeting ran late', status: 'approved' },
            { id: 'OT-2024-065', date: 'Dec 10, 2024', hours: 2.0, reason: 'System maintenance', status: 'approved' },
            { id: 'OT-2024-052', date: 'Dec 3, 2024', hours: 1.5, reason: 'Training session', status: 'rejected' }
        ]
    };
}

// Timesheet Functions
function previousWeek() {
    showSuccessNotification('Loading previous week...');
}

function nextWeek() {
    showSuccessNotification('Loading next week...');
}

function submitTimesheet() {
    if (confirm('Are you sure you want to submit this timesheet? You will not be able to edit it after submission.')) {
        showSuccessNotification('✓ Timesheet submitted successfully!');
        
        if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
            window.dataService.auditLog.log({
                action: 'timesheet_submitted',
                details: 'Weekly timesheet submitted',
                severity: 'info'
            });
        }
    }
}

function viewTimesheetDetails(day) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <div class="modal-header">
                <h3>Timesheet Details</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Date</label>
                    <input type="text" value="Monday, Dec 16, 2024" readonly>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Clock In</label>
                        <input type="time" value="09:00" readonly>
                    </div>
                    <div class="form-group">
                        <label>Clock Out</label>
                        <input type="time" value="17:30" readonly>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Break Duration</label>
                    <input type="text" value="1:00 hour" readonly>
                </div>
                
                <div class="form-group">
                    <label>Total Hours</label>
                    <input type="text" value="7.5 hours" readonly style="font-weight: 600;">
                </div>
                
                <div class="form-group">
                    <label>Notes</label>
                    <textarea rows="3" readonly>Regular workday. Completed project tasks as scheduled.</textarea>
                </div>
                
                <div style="padding: 12px; background: #D1FAE5; border-radius: 4px; margin-top: 16px;">
                    <p style="margin: 0; color: #065F46; font-size: 14px;">✓ <strong>Approved</strong> by David Johnson on Dec 16, 2024</p>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Close</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function editTimesheet(day) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <div class="modal-header">
                <h3>Edit Timesheet</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Date</label>
                    <input type="text" value="Thursday, Dec 19, 2024" readonly>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Clock In</label>
                        <input type="time" value="09:00">
                    </div>
                    <div class="form-group">
                        <label>Clock Out</label>
                        <input type="time" value="19:00">
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Break Duration (minutes)</label>
                    <input type="number" value="60">
                </div>
                
                <div class="form-group">
                    <label>Notes</label>
                    <textarea rows="3" placeholder="Add any notes or comments...">Working late to meet project deadline.</textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Cancel</button>
                <button class="btn btn-primary" onclick="saveTimesheet('${day}')">Save Changes</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function saveTimesheet(day) {
    document.querySelector('.modal').remove();
    showSuccessNotification('Timesheet updated successfully!');
    
    if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
        window.dataService.auditLog.log({
            action: 'timesheet_edited',
            details: `Edited timesheet for ${day}`,
            severity: 'info'
        });
    }
}

// Attendance Functions
function filterAttendance() {
    showSuccessNotification('Filtering attendance records...');
}

function exportAttendance() {
    showSuccessNotification('Exporting attendance report...');
    
    if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
        window.dataService.auditLog.log({
            action: 'attendance_exported',
            details: 'Exported attendance report',
            severity: 'info'
        });
    }
}

// Overtime Functions
function requestOvertime() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h3>Request Overtime</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Date *</label>
                    <input type="date" id="overtimeDate" required>
                </div>
                
                <div class="form-group">
                    <label>Overtime Hours *</label>
                    <input type="number" id="overtimeHours" min="0.25" step="0.25" placeholder="e.g., 2.5" required>
                    <small>Enter in increments of 0.25 hours (15 minutes)</small>
                </div>
                
                <div class="form-group">
                    <label>Reason for Overtime *</label>
                    <textarea id="overtimeReason" rows="4" placeholder="Explain why overtime was necessary..." required></textarea>
                </div>
                
                <div class="form-group">
                    <label>Work Performed</label>
                    <textarea id="overtimeWork" rows="3" placeholder="Describe the work completed during overtime..."></textarea>
                </div>
                
                <div style="padding: 16px; background: var(--background); border-radius: 8px; margin-top: 16px;">
                    <h4 style="margin: 0 0 8px 0;">Overtime Policy</h4>
                    <ul style="font-size: 13px; color: var(--text-secondary); margin: 8px 0 0 20px; line-height: 1.6;">
                        <li>Overtime must be pre-approved by your manager</li>
                        <li>Maximum 10 hours overtime per week</li>
                        <li>Overtime rate: 1.5x regular hourly rate</li>
                        <li>Submit requests within 3 days of overtime work</li>
                    </ul>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Cancel</button>
                <button class="btn btn-primary" onclick="submitOvertimeRequest()">Submit Request</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function submitOvertimeRequest() {
    const date = document.getElementById('overtimeDate').value;
    const hours = document.getElementById('overtimeHours').value;
    const reason = document.getElementById('overtimeReason').value;
    
    if (!date || !hours || !reason) {
        alert('Please fill in all required fields');
        return;
    }
    
    document.querySelector('.modal').remove();
    showSuccessNotification('✓ Overtime request submitted successfully!');
    
    if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
        window.dataService.auditLog.log({
            action: 'overtime_requested',
            details: `Requested ${hours} hours overtime for ${date}`,
            severity: 'info'
        });
    }
}

function viewOvertimeDetails(requestId) {
    const requests = {
        'OT-2024-089': {
            id: 'OT-2024-089',
            date: 'Dec 19, 2024',
            hours: 1.0,
            reason: 'Project deadline',
            work: 'Completed final testing and bug fixes for product release',
            submitted: 'Dec 19, 2024 at 7:30 PM',
            status: 'pending',
            approver: 'David Johnson'
        },
        'OT-2024-078': {
            id: 'OT-2024-078',
            date: 'Dec 17, 2024',
            hours: 0.25,
            reason: 'Client meeting ran late',
            work: 'Extended client presentation and Q&A session',
            submitted: 'Dec 17, 2024 at 6:15 PM',
            status: 'approved',
            approver: 'David Johnson',
            approvedDate: 'Dec 18, 2024'
        }
    };
    
    const request = requests[requestId] || requests['OT-2024-089'];
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h3>Overtime Request Details</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Request ID</label>
                    <input type="text" value="${request.id}" readonly>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Date</label>
                        <input type="text" value="${request.date}" readonly>
                    </div>
                    <div class="form-group">
                        <label>Hours</label>
                        <input type="text" value="${request.hours} hours" readonly>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Reason</label>
                    <textarea rows="2" readonly>${request.reason}</textarea>
                </div>
                
                <div class="form-group">
                    <label>Work Performed</label>
                    <textarea rows="3" readonly>${request.work}</textarea>
                </div>
                
                <div class="form-group">
                    <label>Submitted</label>
                    <input type="text" value="${request.submitted}" readonly>
                </div>
                
                <div class="form-group">
                    <label>Approver</label>
                    <input type="text" value="${request.approver}" readonly>
                </div>
                
                <div class="form-group">
                    <label>Status</label>
                    <div>
                        ${request.status === 'approved' ? 
                            `<span class="badge badge-success">Approved</span><p style="font-size: 13px; color: var(--text-secondary); margin-top: 8px;">Approved on ${request.approvedDate}</p>` : 
                            request.status === 'rejected' ?
                            `<span class="badge badge-danger">Rejected</span><p style="font-size: 13px; color: var(--text-secondary); margin-top: 8px;">Overtime not approved - does not meet policy requirements</p>` :
                            `<span class="badge badge-warning">Pending Review</span><p style="font-size: 13px; color: var(--text-secondary); margin-top: 8px;">Awaiting manager approval</p>`
                        }
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Close</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Success Notification
function showSuccessNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--secondary-color);
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
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
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
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
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
