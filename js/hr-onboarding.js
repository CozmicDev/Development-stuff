// HR Onboarding Management
document.addEventListener('DOMContentLoaded', function() {
    loadOnboardingData();
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

// Load Onboarding Data
function loadOnboardingData() {
    const onboardingData = JSON.parse(localStorage.getItem('onboardingData')) || getDefaultOnboardingData();
    localStorage.setItem('onboardingData', JSON.stringify(onboardingData));
}

// Get Default Onboarding Data
function getDefaultOnboardingData() {
    return {
        active: [],
        pending: [],
        completed: []
    };
}

// Add New Hire
function addNewHire() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 700px;">
            <div class="modal-header">
                <h3>Add New Hire</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-row">
                    <div class="form-group">
                        <label>First Name *</label>
                        <input type="text" id="firstName" placeholder="Enter first name">
                    </div>
                    <div class="form-group">
                        <label>Last Name *</label>
                        <input type="text" id="lastName" placeholder="Enter last name">
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Email Address *</label>
                    <input type="email" id="email" placeholder="employee@acmecorp.com">
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Position *</label>
                        <input type="text" id="position" placeholder="Job title">
                    </div>
                    <div class="form-group">
                        <label>Department *</label>
                        <select id="department">
                            <option value="">Select department...</option>
                            <option value="engineering">Engineering</option>
                            <option value="design">Design</option>
                            <option value="product">Product</option>
                            <option value="marketing">Marketing</option>
                            <option value="sales">Sales</option>
                            <option value="hr">Human Resources</option>
                            <option value="finance">Finance</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Start Date *</label>
                        <input type="date" id="startDate">
                    </div>
                    <div class="form-group">
                        <label>Employment Type *</label>
                        <select id="employmentType">
                            <option value="full-time">Full-Time</option>
                            <option value="part-time">Part-Time</option>
                            <option value="contract">Contract</option>
                            <option value="intern">Intern</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Onboarding Template *</label>
                    <select id="template">
                        <option value="">Select template...</option>
                        <option value="engineering">Engineering Onboarding (20 tasks, 30 days)</option>
                        <option value="product">Product Manager Onboarding (18 tasks, 30 days)</option>
                        <option value="design">Design Team Onboarding (16 tasks, 21 days)</option>
                        <option value="sales">Sales & Marketing Onboarding (15 tasks, 21 days)</option>
                        <option value="generic">Generic Onboarding (12 tasks, 14 days)</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Assign Onboarding Buddy</label>
                    <select id="buddy">
                        <option value="">Select buddy (optional)...</option>
                        <option value="fatima">Fatima Al Mazrouei - Senior Software Engineer</option>
                        <option value="mike">Mike Chen - Software Engineer</option>
                        <option value="emily">Emily Rodriguez - Junior Software Engineer</option>
                        <option value="alex">Alex Turner - Software Engineer</option>
                        <option value="lisa">Lisa Wang - UI/UX Designer</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Manager *</label>
                    <select id="manager">
                        <option value="">Select reporting manager...</option>
                        <option value="mohammed-alhashimi">Mohammed Al Hashimi - Engineering Manager</option>
                        <option value="jane-doe">Jane Doe - Design Manager</option>
                        <option value="bob-wilson">Bob Wilson - Product Manager</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Additional Notes</label>
                    <textarea id="notes" rows="3" placeholder="Any special requirements or notes..."></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Cancel</button>
                <button class="btn btn-primary" onclick="saveNewHire()">Add New Hire</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function saveNewHire() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const position = document.getElementById('position').value;
    const department = document.getElementById('department').value;
    const startDate = document.getElementById('startDate').value;
    const template = document.getElementById('template').value;
    const manager = document.getElementById('manager').value;
    
    if (!firstName || !lastName || !email || !position || !department || !startDate || !template || !manager) {
        alert('Please fill in all required fields');
        return;
    }
    
    document.querySelector('.modal').remove();
    showSuccessNotification(`✓ ${firstName} ${lastName} added to onboarding system!`);
    
    if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
        window.dataService.auditLog.log({
            action: 'new_hire_added',
            details: `Added ${firstName} ${lastName} - ${position}`,
            severity: 'info'
        });
    }
}

// View Onboarding Details
function viewOnboardingDetails(employeeId) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 900px; max-height: 90vh; overflow-y: auto;">
            <div class="modal-header">
                <div>
                    <h3>Onboarding Details - David Martinez</h3>
                    <p style="margin: 4px 0 0 0; color: var(--text-secondary);">
                        Senior DevOps Engineer | Started Dec 15, 2024
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
                            <span>David Martinez</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Email:</span>
                            <span>david.martinez@acmecorp.com</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Position:</span>
                            <span>Senior DevOps Engineer</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Department:</span>
                            <span>Engineering</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Start Date:</span>
                            <span>December 15, 2024</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Manager:</span>
                            <span>Mohammed Al Hashimi</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Onboarding Buddy:</span>
                            <span>Fatima Al Mazrouei</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Days Onboarding:</span>
                            <span>5 days</span>
                        </div>
                    </div>
                </div>

                <!-- Progress Overview -->
                <div class="detail-section">
                    <h4>Progress Overview</h4>
                    <div class="progress-grid">
                        <div class="progress-item">
                            <span class="progress-label">Pre-boarding</span>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 100%; background: var(--secondary-color);"></div>
                            </div>
                            <span>3/3 (100%)</span>
                        </div>
                        <div class="progress-item">
                            <span class="progress-label">First Day</span>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 75%; background: var(--primary-color);"></div>
                            </div>
                            <span>3/4 (75%)</span>
                        </div>
                        <div class="progress-item">
                            <span class="progress-label">Documentation</span>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 60%; background: var(--primary-color);"></div>
                            </div>
                            <span>3/5 (60%)</span>
                        </div>
                        <div class="progress-item">
                            <span class="progress-label">Training</span>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 40%; background: var(--warning-color);"></div>
                            </div>
                            <span>2/5 (40%)</span>
                        </div>
                        <div class="progress-item">
                            <span class="progress-label">30-Day Review</span>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 0%; background: var(--text-secondary);"></div>
                            </div>
                            <span>0/2 (0%)</span>
                        </div>
                    </div>
                </div>

                <!-- Recent Activity -->
                <div class="detail-section">
                    <h4>Recent Activity</h4>
                    <div class="activity-list">
                        <div class="activity-item">
                            <div class="activity-icon">✓</div>
                            <div class="activity-content">
                                <strong>Security & compliance training completed</strong>
                                <span>Dec 17, 2024 at 3:45 PM</span>
                            </div>
                        </div>
                        <div class="activity-item">
                            <div class="activity-icon">✓</div>
                            <div class="activity-content">
                                <strong>Direct deposit form submitted</strong>
                                <span>Dec 16, 2024 at 10:30 AM</span>
                            </div>
                        </div>
                        <div class="activity-item">
                            <div class="activity-icon">✓</div>
                            <div class="activity-content">
                                <strong>I-9 Form verified</strong>
                                <span>Dec 15, 2024 at 2:00 PM</span>
                            </div>
                        </div>
                        <div class="activity-item">
                            <div class="activity-icon">✓</div>
                            <div class="activity-content">
                                <strong>Company overview presentation attended</strong>
                                <span>Dec 15, 2024 at 11:00 AM</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Notes & Comments -->
                <div class="detail-section">
                    <h4>Notes & Comments</h4>
                    <div class="notes-list">
                        <div class="note-item">
                            <div class="note-header">
                                <strong>HR Admin</strong>
                                <span>Dec 15, 2024</span>
                            </div>
                            <p>Employee arrived on time for first day. Completed all required paperwork efficiently.</p>
                        </div>
                        <div class="note-item">
                            <div class="note-header">
                                <strong>Fatima Al Mazrouei (Buddy)</strong>
                                <span>Dec 16, 2024</span>
                            </div>
                            <p>David is adjusting well to the team. Very eager to learn and asking great questions about our systems.</p>
                        </div>
                    </div>
                    <button class="btn btn-sm btn-outline" onclick="addNote('david')">+ Add Note</button>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="downloadOnboardingReport('${employeeId}')">📥 Download Report</button>
                <button class="btn btn-outline" onclick="sendReminder('${employeeId}')">📧 Send Reminder</button>
                <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Close</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Update Task Status
function updateTaskStatus(checkbox, employeeId, taskId) {
    const isChecked = checkbox.checked;
    
    if (isChecked) {
        showSuccessNotification('✓ Task marked as complete!');
    } else {
        showSuccessNotification('Task marked as incomplete');
    }
    
    if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
        window.dataService.auditLog.log({
            action: 'onboarding_task_updated',
            details: `Task ${taskId} for ${employeeId} marked as ${isChecked ? 'complete' : 'incomplete'}`,
            severity: 'info'
        });
    }
    
    // Update progress bar (in real app, would recalculate based on all tasks)
    setTimeout(() => {
        const card = checkbox.closest('.onboarding-card');
        if (card) {
            const progressBar = card.querySelector('.progress-fill');
            const progressPercentage = card.querySelector('.progress-percentage');
            if (progressBar && progressPercentage) {
                const currentProgress = parseInt(progressPercentage.textContent);
                const newProgress = isChecked ? currentProgress + 5 : currentProgress - 5;
                progressBar.style.width = `${newProgress}%`;
                progressPercentage.textContent = `${newProgress}%`;
            }
        }
    }, 500);
}

// Send Reminder
function sendReminder(employeeId) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h3>Send Reminder</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Reminder Type</label>
                    <select id="reminderType">
                        <option>Pending Documentation</option>
                        <option>Upcoming Training</option>
                        <option>Benefits Enrollment Deadline</option>
                        <option>30-Day Review Scheduled</option>
                        <option>Custom Message</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Message</label>
                    <textarea rows="5" placeholder="Reminder message...">Hi! Just a friendly reminder to complete your remaining onboarding tasks. Please let us know if you need any assistance.</textarea>
                </div>
                
                <div class="form-group">
                    <label>
                        <input type="checkbox" checked>
                        Copy manager on email
                    </label>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Cancel</button>
                <button class="btn btn-primary" onclick="sendReminderEmail('${employeeId}')">Send Reminder</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function sendReminderEmail(employeeId) {
    document.querySelector('.modal').remove();
    showSuccessNotification('✓ Reminder email sent successfully!');
}

// Add Note
function addNote(employeeId) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h3>Add Note</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Note</label>
                    <textarea id="noteText" rows="5" placeholder="Add your note here..." autofocus></textarea>
                </div>
                
                <div class="form-group">
                    <label>
                        <input type="checkbox" id="notifyManager">
                        Notify manager
                    </label>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Cancel</button>
                <button class="btn btn-primary" onclick="saveNote('${employeeId}')">Save Note</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function saveNote(employeeId) {
    const noteText = document.getElementById('noteText').value;
    
    if (!noteText.trim()) {
        alert('Please enter a note');
        return;
    }
    
    document.querySelector('.modal').remove();
    showSuccessNotification('✓ Note added successfully!');
}

// Mark Complete
function markComplete(employeeId) {
    if (confirm('Are you sure you want to mark this onboarding process as complete?')) {
        showSuccessNotification('✓ Onboarding marked as complete!');
        
        if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
            window.dataService.auditLog.log({
                action: 'onboarding_completed',
                details: `Onboarding completed for ${employeeId}`,
                severity: 'info'
            });
        }
    }
}

// Initialize Onboarding
function initializeOnboarding(employeeId) {
    showSuccessNotification('Initializing onboarding process...');
    
    setTimeout(() => {
        showSuccessNotification('✓ Onboarding initialized successfully!');
    }, 1000);
}

// View Completed Onboarding
function viewCompletedOnboarding(employeeId) {
    showSuccessNotification('Loading completed onboarding details...');
}

// Filter Functions
function filterOnboarding(query) {
    const cards = document.querySelectorAll('.onboarding-card');
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(query.toLowerCase()) ? '' : 'none';
    });
}

function filterCompletedPeriod(period) {
    showSuccessNotification(`Filtering by period: ${period}`);
}

// Template Functions
function viewOnboardingTemplate() {
    switchTab('templates');
}

function viewTemplate(templateId) {
    showSuccessNotification(`Loading template: ${templateId}`);
}

function editTemplate(templateId) {
    showSuccessNotification(`Opening template editor for: ${templateId}`);
}

function useTemplate(templateId) {
    showSuccessNotification(`Template ${templateId} selected. Opening new hire form...`);
    setTimeout(() => addNewHire(), 500);
}

function createTemplate() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 700px;">
            <div class="modal-header">
                <h3>Create Onboarding Template</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Template Name *</label>
                    <input type="text" placeholder="e.g., Engineering Onboarding">
                </div>
                
                <div class="form-group">
                    <label>Description</label>
                    <textarea rows="3" placeholder="Brief description of this template..."></textarea>
                </div>
                
                <div class="form-group">
                    <label>Target Duration (days) *</label>
                    <input type="number" value="30" min="1">
                </div>
                
                <div class="form-group">
                    <label>Department</label>
                    <select>
                        <option>All Departments</option>
                        <option>Engineering</option>
                        <option>Design</option>
                        <option>Product</option>
                        <option>Marketing</option>
                        <option>Sales</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Copy Tasks From</label>
                    <select>
                        <option value="">Start from scratch</option>
                        <option>Engineering Onboarding</option>
                        <option>Product Manager Onboarding</option>
                        <option>Design Team Onboarding</option>
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Cancel</button>
                <button class="btn btn-primary" onclick="saveTemplate()">Create Template</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function saveTemplate() {
    document.querySelector('.modal').remove();
    showSuccessNotification('✓ Template created successfully!');
}

// Download Onboarding Report
function downloadOnboardingReport(employeeId) {
    showSuccessNotification('✓ Downloading onboarding report...');
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
            <span style="font-size: 20px;">✨</span>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS for onboarding components
const style = document.createElement('style');
style.textContent = `
    .onboarding-card {
        background: white;
        border: 1px solid #E5E7EB;
        border-radius: 8px;
        padding: 24px;
        margin-bottom: 24px;
    }
    
    .onboarding-header {
        display: flex;
        justify-content: space-between;
        align-items: start;
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid #E5E7EB;
    }
    
    .onboarding-meta {
        display: flex;
        flex-direction: column;
        gap: 8px;
        text-align: right;
    }
    
    .meta-item {
        display: flex;
        gap: 8px;
        font-size: 14px;
    }
    
    .meta-label {
        font-weight: 600;
        color: var(--text-secondary);
    }
    
    .progress-section {
        margin-bottom: 24px;
    }
    
    .progress-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        font-weight: 600;
    }
    
    .progress-percentage {
        color: var(--primary-color);
        font-size: 18px;
    }
    
    .progress-details {
        margin-top: 4px;
        font-size: 14px;
        color: var(--text-secondary);
    }
    
    .checklist-section {
        margin-bottom: 24px;
    }
    
    .checklist-section h5 {
        margin: 0 0 16px 0;
        font-size: 16px;
    }
    
    .checklist-group {
        margin-bottom: 16px;
        padding: 16px;
        background: var(--background);
        border-radius: 8px;
    }
    
    .checklist-group h6 {
        margin: 0 0 12px 0;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
    }
    
    .checklist-items {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    
    .checklist-items.collapsed {
        display: none;
    }
    
    .checklist-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px;
        border-radius: 4px;
        cursor: pointer;
        transition: background 0.2s;
    }
    
    .checklist-item:hover {
        background: white;
    }
    
    .checklist-item.completed {
        opacity: 0.6;
    }
    
    .checklist-item input[type="checkbox"] {
        width: 18px;
        height: 18px;
        cursor: pointer;
    }
    
    .checklist-item span:first-of-type {
        flex: 1;
    }
    
    .item-date {
        font-size: 13px;
        color: var(--text-secondary);
    }
    
    .checklist-summary {
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
        font-size: 16px;
    }
    
    .card-actions {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
    }
    
    .templates-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
    }
    
    .template-card {
        padding: 20px;
        border: 1px solid #E5E7EB;
        border-radius: 8px;
        background: white;
    }
    
    .template-card h4 {
        margin: 0 0 8px 0;
    }
    
    .template-card p {
        margin: 0 0 16px 0;
        color: var(--text-secondary);
        font-size: 14px;
    }
    
    .template-stats {
        display: flex;
        gap: 16px;
        margin-bottom: 16px;
        font-size: 13px;
        color: var(--text-secondary);
    }
    
    .template-actions {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
    }
    
    .detail-section {
        margin-bottom: 24px;
        padding-bottom: 24px;
        border-bottom: 1px solid #E5E7EB;
    }
    
    .detail-section:last-child {
        border-bottom: none;
    }
    
    .detail-section h4 {
        margin: 0 0 16px 0;
    }
    
    .detail-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
    }
    
    .detail-item {
        display: flex;
        gap: 8px;
        font-size: 14px;
    }
    
    .detail-label {
        font-weight: 600;
        min-width: 140px;
    }
    
    .progress-grid {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    
    .progress-item {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    
    .progress-label {
        font-weight: 600;
        font-size: 14px;
    }
    
    .activity-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    
    .activity-item {
        display: flex;
        gap: 16px;
        padding: 12px;
        background: var(--background);
        border-radius: 8px;
    }
    
    .activity-icon {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: var(--secondary-light);
        color: var(--secondary-color);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        flex-shrink: 0;
    }
    
    .activity-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    
    .activity-content strong {
        font-size: 14px;
    }
    
    .activity-content span {
        font-size: 13px;
        color: var(--text-secondary);
    }
    
    .notes-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-bottom: 16px;
    }
    
    .note-item {
        padding: 16px;
        background: var(--background);
        border-radius: 8px;
    }
    
    .note-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        font-size: 14px;
    }
    
    .note-header strong {
        color: var(--primary-color);
    }
    
    .note-header span {
        color: var(--text-secondary);
    }
    
    .note-item p {
        margin: 0;
        font-size: 14px;
    }
    
    @media (max-width: 768px) {
        .onboarding-header {
            flex-direction: column;
        }
        
        .onboarding-meta {
            text-align: left;
            margin-top: 16px;
        }
        
        .detail-grid {
            grid-template-columns: 1fr;
        }
    }
`;
document.head.appendChild(style);
