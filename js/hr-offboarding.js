// HR Offboarding Management
document.addEventListener('DOMContentLoaded', function() {
    loadOffboardingData();
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

// Load Offboarding Data
function loadOffboardingData() {
    const offboardingData = JSON.parse(localStorage.getItem('offboardingData')) || getDefaultOffboardingData();
    localStorage.setItem('offboardingData', JSON.stringify(offboardingData));
}

// Get Default Offboarding Data
function getDefaultOffboardingData() {
    return {
        active: [],
        scheduled: [],
        completed: []
    };
}

// Initiate Offboarding
function initiateOffboarding() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 700px;">
            <div class="modal-header">
                <h3>Initiate Offboarding Process</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Select Employee *</label>
                    <select id="exitEmployee">
                        <option value="">Choose employee...</option>
                        <option value="fatima">Fatima Al Mazrouei - Senior Software Engineer</option>
                        <option value="mike">Mike Chen - Software Engineer</option>
                        <option value="emily">Emily Rodriguez - Junior Software Engineer</option>
                        <option value="alex">Alex Turner - Software Engineer</option>
                        <option value="lisa">Lisa Wang - UI/UX Designer</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Separation Type *</label>
                    <select id="separationType">
                        <option value="resignation">Voluntary Resignation</option>
                        <option value="retirement">Retirement</option>
                        <option value="termination">Involuntary Termination</option>
                        <option value="layoff">Layoff/Redundancy</option>
                        <option value="contract-end">Contract End</option>
                        <option value="mutual">Mutual Agreement</option>
                    </select>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Notice Date *</label>
                        <input type="date" id="noticeDate">
                    </div>
                    <div class="form-group">
                        <label>Last Working Day *</label>
                        <input type="date" id="lastDay">
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Reason for Leaving *</label>
                    <select id="exitReason">
                        <option value="">Select reason...</option>
                        <option value="new-opportunity">New Job Opportunity</option>
                        <option value="relocation">Relocation</option>
                        <option value="career-change">Career Change</option>
                        <option value="personal">Personal Reasons</option>
                        <option value="education">Higher Education</option>
                        <option value="retirement">Retirement</option>
                        <option value="health">Health Reasons</option>
                        <option value="family">Family Reasons</option>
                        <option value="dissatisfaction">Job Dissatisfaction</option>
                        <option value="performance">Performance Issues</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Eligible for Rehire?</label>
                    <div style="display: flex; gap: 16px;">
                        <label><input type="radio" name="rehire" value="yes" checked> Yes</label>
                        <label><input type="radio" name="rehire" value="no"> No</label>
                        <label><input type="radio" name="rehire" value="maybe"> Maybe (Review Required)</label>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Unused Vacation Days</label>
                    <input type="number" id="vacationDays" value="0" min="0" placeholder="Number of days">
                </div>
                
                <div class="form-group">
                    <label>Additional Notes</label>
                    <textarea id="offboardingNotes" rows="3" placeholder="Any important information about the departure..."></textarea>
                </div>
                
                <div class="form-group">
                    <label style="display: flex; align-items: center; gap: 8px;">
                        <input type="checkbox" id="scheduleExitInterview" checked>
                        <span>Schedule exit interview</span>
                    </label>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Cancel</button>
                <button class="btn btn-primary" onclick="startOffboardingProcess()">Initiate Offboarding</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function startOffboardingProcess() {
    const employee = document.getElementById('exitEmployee').value;
    const separationType = document.getElementById('separationType').value;
    const lastDay = document.getElementById('lastDay').value;
    
    if (!employee || !separationType || !lastDay) {
        alert('Please fill in all required fields');
        return;
    }
    
    document.querySelector('.modal').remove();
    showSuccessNotification('✓ Offboarding process initiated successfully!');
    
    if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
        window.dataService.auditLog.log({
            action: 'offboarding_initiated',
            details: `Offboarding initiated for ${employee}`,
            severity: 'info'
        });
    }
}

// Start Offboarding for Scheduled Employee
function startOffboarding(employeeId) {
    showSuccessNotification('Starting offboarding process...');
    setTimeout(() => initiateOffboarding(), 500);
}

// View Offboarding Details
function viewOffboardingDetails(employeeId) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 900px; max-height: 90vh; overflow-y: auto;">
            <div class="modal-header">
                <div>
                    <h3>Offboarding Details - James Wilson</h3>
                    <p style="margin: 4px 0 0 0; color: var(--text-secondary);">
                        Senior Software Engineer | Last Day: Dec 30, 2024
                    </p>
                </div>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <!-- Employee Information -->
                <div class="detail-section">
                    <h4>Employee Information</h4>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <span class="detail-label">Full Name:</span>
                            <span>James Wilson</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Email:</span>
                            <span>james.wilson@acmecorp.com</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Position:</span>
                            <span>Senior Software Engineer</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Department:</span>
                            <span>Engineering</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Join Date:</span>
                            <span>August 1, 2021</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Last Working Day:</span>
                            <span>December 30, 2024</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Tenure:</span>
                            <span>3 years 4 months</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Reason for Leaving:</span>
                            <span>New Job Opportunity</span>
                        </div>
                    </div>
                </div>

                <!-- Clearance Status -->
                <div class="detail-section">
                    <h4>Clearance Status</h4>
                    <div class="progress-grid">
                        <div class="progress-item">
                            <span class="progress-label">Documentation</span>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 100%; background: var(--secondary-color);"></div>
                            </div>
                            <span>3/3 (100%)</span>
                        </div>
                        <div class="progress-item">
                            <span class="progress-label">IT & Equipment</span>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 100%; background: var(--secondary-color);"></div>
                            </div>
                            <span>4/4 (100%)</span>
                        </div>
                        <div class="progress-item">
                            <span class="progress-label">Knowledge Transfer</span>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 75%; background: var(--primary-color);"></div>
                            </div>
                            <span>3/4 (75%)</span>
                        </div>
                        <div class="progress-item">
                            <span class="progress-label">Finance & Benefits</span>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 40%; background: var(--warning-color);"></div>
                            </div>
                            <span>2/5 (40%)</span>
                        </div>
                        <div class="progress-item">
                            <span class="progress-label">Facilities & Access</span>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 60%; background: var(--primary-color);"></div>
                            </div>
                            <span>3/5 (60%)</span>
                        </div>
                    </div>
                </div>

                <!-- Equipment Returned -->
                <div class="detail-section">
                    <h4>Equipment Return Status</h4>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Serial Number</th>
                                <th>Condition</th>
                                <th>Return Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>MacBook Pro 16"</td>
                                <td>C02YP4QXJG5H</td>
                                <td>Good</td>
                                <td>Dec 15, 2024</td>
                                <td><span class="badge badge-success">Returned</span></td>
                            </tr>
                            <tr>
                                <td>iPhone 14</td>
                                <td>F2GQD2PQMNF4</td>
                                <td>Good</td>
                                <td>Dec 15, 2024</td>
                                <td><span class="badge badge-success">Returned</span></td>
                            </tr>
                            <tr>
                                <td>Chargers & Cables</td>
                                <td>-</td>
                                <td>Good</td>
                                <td>Dec 15, 2024</td>
                                <td><span class="badge badge-success">Returned</span></td>
                            </tr>
                            <tr>
                                <td>Badge #1245</td>
                                <td>-</td>
                                <td>Good</td>
                                <td>Dec 15, 2024</td>
                                <td><span class="badge badge-success">Returned</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Final Settlement -->
                <div class="detail-section">
                    <h4>Final Settlement Breakdown</h4>
                    <table class="data-table">
                        <tbody>
                            <tr>
                                <td><strong>Final Salary (Dec 1-30)</strong></td>
                                <td style="text-align: right;">$8,500.00</td>
                            </tr>
                            <tr>
                                <td><strong>Unused Vacation (12 days @ $400/day)</strong></td>
                                <td style="text-align: right;">$4,800.00</td>
                            </tr>
                            <tr>
                                <td><strong>Prorated Annual Bonus</strong></td>
                                <td style="text-align: right;">$2,000.00</td>
                            </tr>
                            <tr>
                                <td><strong>Outstanding Expenses</strong></td>
                                <td style="text-align: right;">$240.00</td>
                            </tr>
                            <tr>
                                <td><strong>Deductions:</strong></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td style="padding-left: 24px;">Federal Tax</td>
                                <td style="text-align: right; color: var(--danger-color);">-$2,800.00</td>
                            </tr>
                            <tr>
                                <td style="padding-left: 24px;">State Tax</td>
                                <td style="text-align: right; color: var(--danger-color);">-$1,200.00</td>
                            </tr>
                            <tr>
                                <td style="padding-left: 24px;">Health Insurance (Final Month)</td>
                                <td style="text-align: right; color: var(--danger-color);">-$300.00</td>
                            </tr>
                            <tr style="border-top: 2px solid var(--primary-color); font-size: 18px;">
                                <td><strong>Net Final Payment</strong></td>
                                <td style="text-align: right;"><strong>$11,240.00</strong></td>
                            </tr>
                        </tbody>
                    </table>
                    <p style="margin-top: 16px; color: var(--text-secondary); font-size: 14px;">
                        Payment will be processed on December 30, 2024 via direct deposit.
                    </p>
                </div>

                <!-- Timeline -->
                <div class="detail-section">
                    <h4>Offboarding Timeline</h4>
                    <div class="timeline-list">
                        <div class="timeline-item completed">
                            <div class="timeline-icon">✓</div>
                            <div class="timeline-content">
                                <strong>Resignation Received</strong>
                                <p>Employee submitted resignation letter</p>
                                <span>December 1, 2024</span>
                            </div>
                        </div>
                        <div class="timeline-item completed">
                            <div class="timeline-icon">✓</div>
                            <div class="timeline-content">
                                <strong>Equipment Returned</strong>
                                <p>Laptop, phone, and accessories returned to IT</p>
                                <span>December 15, 2024</span>
                            </div>
                        </div>
                        <div class="timeline-item completed">
                            <div class="timeline-icon">✓</div>
                            <div class="timeline-content">
                                <strong>Knowledge Transfer Started</strong>
                                <p>Handover sessions with team members</p>
                                <span>December 12, 2024</span>
                            </div>
                        </div>
                        <div class="timeline-item active">
                            <div class="timeline-icon">⏳</div>
                            <div class="timeline-content">
                                <strong>Exit Interview Scheduled</strong>
                                <p>Meeting scheduled with HR</p>
                                <span>December 28, 2024 at 2:00 PM</span>
                            </div>
                        </div>
                        <div class="timeline-item pending">
                            <div class="timeline-icon">○</div>
                            <div class="timeline-content">
                                <strong>Final Day</strong>
                                <p>Last working day and final clearance</p>
                                <span>December 30, 2024</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="downloadOffboardingReport('${employeeId}')">📥 Download Report</button>
                <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Close</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Toggle Category
function toggleCategory(button) {
    const category = button.closest('.clearance-category');
    const items = category.querySelector('.category-items');
    
    if (items.classList.contains('collapsed')) {
        items.classList.remove('collapsed');
        button.textContent = 'Collapse';
    } else {
        items.classList.add('collapsed');
        button.textContent = 'Expand';
    }
}

// Update Clearance Status
function updateClearanceStatus(checkbox, employeeId, taskId) {
    const isChecked = checkbox.checked;
    
    if (isChecked) {
        showSuccessNotification('✓ Clearance item completed!');
    } else {
        showSuccessNotification('Clearance item marked as incomplete');
    }
    
    if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
        window.dataService.auditLog.log({
            action: 'clearance_updated',
            details: `Clearance ${taskId} for ${employeeId} marked as ${isChecked ? 'complete' : 'incomplete'}`,
            severity: 'info'
        });
    }
}

// View Settlement Details
function viewSettlementDetails(employeeId) {
    showSuccessNotification('Loading detailed settlement breakdown...');
}

// Conduct Exit Interview
function conductExitInterview(employeeId) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 800px; max-height: 90vh; overflow-y: auto;">
            <div class="modal-header">
                <h3>Exit Interview - James Wilson</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Interview Date & Time</label>
                    <input type="datetime-local" value="2024-12-28T14:00">
                </div>
                
                <div class="form-group">
                    <label>Primary Reason for Leaving *</label>
                    <select>
                        <option>New Job Opportunity</option>
                        <option>Career Advancement</option>
                        <option>Compensation</option>
                        <option>Work-Life Balance</option>
                        <option>Management Issues</option>
                        <option>Relocation</option>
                        <option>Personal Reasons</option>
                        <option>Other</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Would you recommend ACME Corp to others? *</label>
                    <div class="rating-input">
                        <span class="star" onclick="setRating(1)">☆</span>
                        <span class="star" onclick="setRating(2)">☆</span>
                        <span class="star" onclick="setRating(3)">☆</span>
                        <span class="star" onclick="setRating(4)">☆</span>
                        <span class="star" onclick="setRating(5)">☆</span>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>What did you like most about working here?</label>
                    <textarea rows="4" placeholder="Positive aspects of employment..."></textarea>
                </div>
                
                <div class="form-group">
                    <label>What areas could the company improve?</label>
                    <textarea rows="4" placeholder="Constructive feedback..."></textarea>
                </div>
                
                <div class="form-group">
                    <label>How would you rate the following? (1-5)</label>
                    <div class="rating-grid">
                        <div class="rating-item">
                            <span>Work Environment:</span>
                            <select><option>5</option><option>4</option><option>3</option><option>2</option><option>1</option></select>
                        </div>
                        <div class="rating-item">
                            <span>Management:</span>
                            <select><option>5</option><option>4</option><option>3</option><option>2</option><option>1</option></select>
                        </div>
                        <div class="rating-item">
                            <span>Career Growth:</span>
                            <select><option>5</option><option>4</option><option>3</option><option>2</option><option>1</option></select>
                        </div>
                        <div class="rating-item">
                            <span>Compensation:</span>
                            <select><option>5</option><option>4</option><option>3</option><option>2</option><option>1</option></select>
                        </div>
                        <div class="rating-item">
                            <span>Work-Life Balance:</span>
                            <select><option>5</option><option>4</option><option>3</option><option>2</option><option>1</option></select>
                        </div>
                        <div class="rating-item">
                            <span>Team Collaboration:</span>
                            <select><option>5</option><option>4</option><option>3</option><option>2</option><option>1</option></select>
                        </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Would you consider returning to ACME Corp in the future?</label>
                    <div style="display: flex; gap: 16px;">
                        <label><input type="radio" name="return" value="yes"> Yes</label>
                        <label><input type="radio" name="return" value="maybe"> Maybe</label>
                        <label><input type="radio" name="return" value="no"> No</label>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Additional Comments</label>
                    <textarea rows="4" placeholder="Any other feedback or comments..."></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Cancel</button>
                <button class="btn btn-primary" onclick="saveExitInterview('${employeeId}')">Save Interview</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function setRating(stars) {
    const starElements = document.querySelectorAll('.rating-input .star');
    starElements.forEach((star, index) => {
        if (index < stars) {
            star.textContent = '★';
            star.style.color = '#FCD34D';
        } else {
            star.textContent = '☆';
            star.style.color = '#9CA3AF';
        }
    });
}

function saveExitInterview(employeeId) {
    document.querySelector('.modal').remove();
    showSuccessNotification('✓ Exit interview saved successfully!');
    
    if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
        window.dataService.auditLog.log({
            action: 'exit_interview_completed',
            details: `Exit interview completed for ${employeeId}`,
            severity: 'info'
        });
    }
}

// View Full Interview
function viewFullInterview(employeeId) {
    showSuccessNotification('Loading full exit interview...');
}

// Send Clearance Reminder
function sendClearanceReminder(employeeId) {
    showSuccessNotification('✓ Clearance reminder sent!');
}

// Complete Offboarding
function completeOffboarding(employeeId) {
    if (confirm('Are you sure you want to mark this offboarding as complete? This will finalize all clearances and trigger final settlement.')) {
        showSuccessNotification('✓ Offboarding completed successfully!');
        
        if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
            window.dataService.auditLog.log({
                action: 'offboarding_completed',
                details: `Offboarding completed for ${employeeId}`,
                severity: 'info'
            });
        }
    }
}

// View Completed Offboarding
function viewCompletedOffboarding(employeeId) {
    showSuccessNotification('Loading completed offboarding details...');
}

// Filter Functions
function filterOffboarding(query) {
    const cards = document.querySelectorAll('.offboarding-card');
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(query.toLowerCase()) ? '' : 'none';
    });
}

function filterCompletedPeriod(period) {
    showSuccessNotification(`Filtering by period: ${period}`);
}

// View Offboarding Reports
function viewOffboardingReports() {
    showSuccessNotification('Loading offboarding reports...');
}

// Generate Exit Report
function generateExitReport() {
    showSuccessNotification('✓ Generating exit interview analytics report...');
}

// Download Offboarding Report
function downloadOffboardingReport(employeeId) {
    showSuccessNotification('✓ Downloading offboarding report...');
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
            <span style="font-size: 20px;">👋</span>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS for offboarding components
const style = document.createElement('style');
style.textContent = `
    .offboarding-card {
        background: white;
        border: 1px solid #E5E7EB;
        border-radius: 8px;
        padding: 24px;
        margin-bottom: 24px;
    }
    
    .badges {
        display: flex;
        gap: 8px;
        margin-top: 8px;
        flex-wrap: wrap;
    }
    
    .clearance-checklist {
        margin-bottom: 24px;
    }
    
    .clearance-checklist h5 {
        margin: 0 0 16px 0;
    }
    
    .clearance-category {
        margin-bottom: 12px;
        border: 1px solid #E5E7EB;
        border-radius: 8px;
        overflow: hidden;
    }
    
    .category-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        background: var(--background);
        font-weight: 600;
        cursor: pointer;
    }
    
    .category-items {
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    
    .category-items.collapsed {
        display: none;
    }
    
    .clearance-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px;
        border-radius: 4px;
        cursor: pointer;
        transition: background 0.2s;
    }
    
    .clearance-item:hover {
        background: var(--background);
    }
    
    .clearance-item.completed {
        opacity: 0.6;
    }
    
    .clearance-item input[type="checkbox"] {
        width: 18px;
        height: 18px;
    }
    
    .clearance-item span:first-of-type {
        flex: 1;
    }
    
    .item-status {
        font-size: 13px;
        color: var(--text-secondary);
    }
    
    .clearance-summary {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 16px;
        background: var(--background);
        border-radius: 8px;
        margin-bottom: 16px;
    }
    
    .summary-item {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 14px;
    }
    
    .summary-icon {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: var(--primary-light);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .settlement-section {
        padding: 20px;
        background: var(--background);
        border-radius: 8px;
        margin-bottom: 24px;
    }
    
    .settlement-section h5 {
        margin: 0 0 16px 0;
    }
    
    .settlement-grid {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 16px;
    }
    
    .settlement-item {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        font-size: 15px;
    }
    
    .settlement-item.total {
        border-top: 2px solid var(--primary-color);
        padding-top: 16px;
        margin-top: 8px;
        font-size: 18px;
    }
    
    .settlement-item .amount {
        font-weight: 600;
        color: var(--primary-color);
    }
    
    .interview-stats {
        margin-bottom: 32px;
    }
    
    .interview-stats h4 {
        margin: 0 0 16px 0;
    }
    
    .mini-stat {
        padding: 16px;
        background: white;
        border: 1px solid #E5E7EB;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    
    .mini-label {
        font-size: 14px;
        color: var(--text-secondary);
    }
    
    .mini-value {
        font-size: 24px;
        font-weight: 700;
        color: var(--primary-color);
    }
    
    .interview-list {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    
    .interview-card {
        background: white;
        border: 1px solid #E5E7EB;
        border-radius: 8px;
        padding: 20px;
    }
    
    .interview-header {
        display: flex;
        justify-content: space-between;
        align-items: start;
        margin-bottom: 16px;
        padding-bottom: 16px;
        border-bottom: 1px solid #E5E7EB;
    }
    
    .interview-header h4 {
        margin: 0 0 4px 0;
    }
    
    .interview-header p {
        margin: 0;
        font-size: 14px;
        color: var(--text-secondary);
    }
    
    .interview-content {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    
    .interview-section strong {
        display: block;
        margin-bottom: 4px;
        font-size: 14px;
    }
    
    .interview-section p {
        margin: 0;
        color: var(--text-secondary);
        font-size: 14px;
    }
    
    .interview-section .rating {
        color: #FCD34D;
        font-size: 16px;
    }
    
    .rating-input {
        display: flex;
        gap: 8px;
        margin-top: 8px;
    }
    
    .rating-input .star {
        font-size: 32px;
        color: #9CA3AF;
        cursor: pointer;
        transition: all 0.2s;
    }
    
    .rating-input .star:hover {
        transform: scale(1.2);
    }
    
    .rating-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
        margin-top: 8px;
    }
    
    .rating-grid .rating-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px;
        background: var(--background);
        border-radius: 4px;
    }
    
    .timeline-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    
    .timeline-item {
        display: flex;
        gap: 16px;
        padding: 16px;
        border-left: 3px solid #E5E7EB;
    }
    
    .timeline-item.completed {
        border-left-color: var(--secondary-color);
    }
    
    .timeline-item.active {
        border-left-color: var(--primary-color);
        background: var(--primary-light);
    }
    
    .timeline-item.pending {
        border-left-color: #E5E7EB;
        opacity: 0.6;
    }
    
    .timeline-icon {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: white;
        border: 2px solid currentColor;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        flex-shrink: 0;
    }
    
    .timeline-content {
        flex: 1;
    }
    
    .timeline-content strong {
        display: block;
        margin-bottom: 4px;
    }
    
    .timeline-content p {
        margin: 0 0 4px 0;
        font-size: 14px;
        color: var(--text-secondary);
    }
    
    .timeline-content span {
        font-size: 13px;
        color: var(--text-secondary);
    }
    
    @media (max-width: 768px) {
        .offboarding-header {
            flex-direction: column;
        }
        
        .settlement-grid {
            font-size: 14px;
        }
        
        .rating-grid {
            grid-template-columns: 1fr;
        }
    }
`;
document.head.appendChild(style);
