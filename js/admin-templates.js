// Template Management
document.addEventListener('DOMContentLoaded', function() {
    loadTemplates();
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

// Load Templates
function loadTemplates() {
    const templates = JSON.parse(localStorage.getItem('templates')) || getDefaultTemplates();
    localStorage.setItem('templates', JSON.stringify(templates));
}

// Get Default Templates
function getDefaultTemplates() {
    return {
        email: [
            { id: 'welcome', name: 'Welcome Email', category: 'Onboarding', subject: 'Welcome to {{company_name}}!' },
            { id: 'leave_approved', name: 'Leave Approved', category: 'Leave', subject: 'Your leave request has been approved' },
            { id: 'leave_rejected', name: 'Leave Rejected', category: 'Leave', subject: 'Your leave request requires revision' }
        ],
        document: [
            { id: 'employment_certificate', name: 'Employment Certificate', lastUsed: '2 days ago' },
            { id: 'salary_certificate', name: 'Salary Certificate', lastUsed: '1 week ago' },
            { id: 'experience_letter', name: 'Experience Letter', lastUsed: '3 days ago' }
        ],
        offer: [
            { id: 'swe', name: 'Software Engineer - Offer', level: 'Mid-Level', department: 'Engineering' },
            { id: 'manager', name: 'Senior Manager - Offer', level: 'Senior', department: 'Management' }
        ],
        policy: [
            { id: 'code_conduct', name: 'Code of Conduct', version: 'v2.1', acks: '247/247' },
            { id: 'remote_work', name: 'Remote Work Policy', version: 'v1.3', acks: '247/247' }
        ]
    };
}

// Search Templates
function searchTemplates(query) {
    // In real implementation, filter table rows
    console.log('Searching templates:', query);
}

// Create Template
function createTemplate() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 800px;">
            <div class="modal-header">
                <h3>Create New Template</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Template Type *</label>
                    <select id="templateType" onchange="updateTemplateForm()">
                        <option value="">Select type...</option>
                        <option value="email">Email Template</option>
                        <option value="document">Document Template</option>
                        <option value="offer">Offer Letter</option>
                        <option value="policy">Policy Document</option>
                    </select>
                </div>
                
                <div id="templateFormFields"></div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Cancel</button>
                <button class="btn btn-primary" onclick="saveNewTemplate()">Create Template</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Update Template Form
function updateTemplateForm() {
    const type = document.getElementById('templateType').value;
    const container = document.getElementById('templateFormFields');
    
    if (type === 'email') {
        container.innerHTML = `
            <div class="form-group">
                <label>Template Name *</label>
                <input type="text" id="templateName" placeholder="e.g., Welcome Email">
            </div>
            
            <div class="form-group">
                <label>Category</label>
                <select id="templateCategory">
                    <option value="onboarding">Onboarding</option>
                    <option value="leave">Leave</option>
                    <option value="performance">Performance</option>
                    <option value="security">Security</option>
                    <option value="engagement">Engagement</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>Subject Line *</label>
                <input type="text" id="emailSubject" placeholder="Use {{variables}} for personalization">
            </div>
            
            <div class="form-group">
                <label>Email Body *</label>
                <textarea id="emailBody" rows="8" placeholder="Enter email content here..."></textarea>
                <small>Available variables: {{employee_name}}, {{company_name}}, {{manager_name}}</small>
            </div>
        `;
    } else if (type === 'document') {
        container.innerHTML = `
            <div class="form-group">
                <label>Document Name *</label>
                <input type="text" id="documentName" placeholder="e.g., Employment Certificate">
            </div>
            
            <div class="form-group">
                <label>Document Type</label>
                <select>
                    <option value="certificate">Certificate</option>
                    <option value="letter">Letter</option>
                    <option value="agreement">Agreement</option>
                    <option value="form">Form</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>Upload Template File</label>
                <input type="file" accept=".doc,.docx,.pdf">
                <small>Supported formats: DOCX, PDF</small>
            </div>
        `;
    } else if (type === 'offer') {
        container.innerHTML = `
            <div class="form-group">
                <label>Position Title *</label>
                <input type="text" id="positionTitle" placeholder="e.g., Senior Software Engineer">
            </div>
            
            <div class="form-group">
                <label>Position Level</label>
                <select>
                    <option value="entry">Entry Level</option>
                    <option value="mid">Mid-Level</option>
                    <option value="senior">Senior</option>
                    <option value="lead">Lead/Principal</option>
                    <option value="executive">Executive</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>Department</label>
                <select>
                    <option value="engineering">Engineering</option>
                    <option value="sales">Sales</option>
                    <option value="marketing">Marketing</option>
                    <option value="hr">HR</option>
                    <option value="finance">Finance</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>Offer Letter Content *</label>
                <textarea rows="10" placeholder="Enter offer letter template..."></textarea>
            </div>
        `;
    }
}

// Save New Template
function saveNewTemplate() {
    document.querySelector('.modal').remove();
    showSuccessNotification('Template created successfully!');
    
    if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
        window.dataService.auditLog.log({
            action: 'template_created',
            details: 'Created new template',
            severity: 'info'
        });
    }
}

// Preview Template
function previewTemplate(templateId) {
    const templates = {
        'welcome': {
            subject: 'Welcome to Acme Corporation!',
            body: `Dear {{employee_name}},

Welcome to Acme Corporation! We're thrilled to have you join our team.

Your first day is scheduled for {{start_date}}. Please arrive at {{start_time}} and report to the reception desk. Your manager, {{manager_name}}, will meet you there.

Before your first day, please complete the following:
• Complete your onboarding paperwork in the HR portal
• Review our Employee Handbook
• Set up your direct deposit information

If you have any questions, please don't hesitate to reach out to our HR team at hr@acmecorp.com.

We look forward to working with you!

Best regards,
The Acme HR Team`
        },
        'leave_approved': {
            subject: 'Your leave request has been approved',
            body: `Dear {{employee_name}},

Your leave request has been approved!

Leave Details:
• Type: {{leave_type}}
• Start Date: {{start_date}}
• End Date: {{end_date}}
• Days: {{duration}} days

Your remaining leave balance: {{remaining_balance}} days

Please ensure all your work is properly handed over before your leave starts.

Enjoy your time off!

Best regards,
The Acme HR Team`
        }
    };
    
    const template = templates[templateId] || templates['welcome'];
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 700px;">
            <div class="modal-header">
                <h3>Template Preview</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div style="margin-bottom: 16px;">
                    <label style="font-weight: 600; margin-bottom: 4px; display: block;">Subject:</label>
                    <div style="padding: 12px; background: var(--background); border-radius: 4px;">
                        ${template.subject}
                    </div>
                </div>
                
                <div>
                    <label style="font-weight: 600; margin-bottom: 4px; display: block;">Body:</label>
                    <div style="padding: 16px; background: var(--background); border-radius: 4px; white-space: pre-wrap; font-family: inherit; line-height: 1.6;">
                        ${template.body}
                    </div>
                </div>
                
                <div style="margin-top: 16px; padding: 12px; background: #FEF3C7; border-radius: 4px; font-size: 13px;">
                    💡 <strong>Tip:</strong> Variables like {{employee_name}} will be automatically replaced with actual values when the email is sent.
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Close</button>
                <button class="btn btn-primary" onclick="editTemplate('${templateId}')">Edit Template</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Edit Template
function editTemplate(templateId) {
    document.querySelectorAll('.modal').forEach(m => m.remove());
    showSuccessNotification(`Editing template: ${templateId}`);
}

// Duplicate Template
function duplicateTemplate(templateId) {
    showSuccessNotification('Template duplicated successfully!');
    
    if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
        window.dataService.auditLog.log({
            action: 'template_duplicated',
            details: `Duplicated template: ${templateId}`,
            severity: 'info'
        });
    }
}

// Document Template Functions
function viewDocumentTemplate(templateId) {
    showSuccessNotification(`Viewing document template: ${templateId}`);
}

function editDocumentTemplate(templateId) {
    showSuccessNotification(`Editing document template: ${templateId}`);
}

function downloadTemplate(templateId) {
    showSuccessNotification(`Downloading template: ${templateId}`);
}

// Offer Letter Functions
function previewOffer(offerId) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 800px;">
            <div class="modal-header">
                <h3>Offer Letter Preview</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div style="padding: 24px; background: white; border: 1px solid var(--border-color); border-radius: 8px; font-family: 'Times New Roman', serif; line-height: 1.8;">
                    <div style="text-align: center; margin-bottom: 24px;">
                        <h2 style="margin: 0;">ACME CORPORATION</h2>
                        <p style="margin: 4px 0 0 0;">123 Business Street, San Francisco, CA 94105</p>
                    </div>
                    
                    <p style="margin-bottom: 16px;">{{date}}</p>
                    
                    <p style="margin-bottom: 16px;">
                        {{candidate_name}}<br>
                        {{candidate_address}}
                    </p>
                    
                    <p style="margin-bottom: 16px;"><strong>Dear {{candidate_name}},</strong></p>
                    
                    <p style="margin-bottom: 16px;">
                        We are pleased to offer you the position of <strong>{{position_title}}</strong> at Acme Corporation. We believe your skills and experience will be a valuable addition to our team.
                    </p>
                    
                    <p style="margin-bottom: 16px;"><strong>Position Details:</strong></p>
                    <ul style="margin-bottom: 16px;">
                        <li>Position: {{position_title}}</li>
                        <li>Department: {{department}}</li>
                        <li>Reports To: {{manager_name}}</li>
                        <li>Start Date: {{start_date}}</li>
                        <li>Location: {{work_location}}</li>
                    </ul>
                    
                    <p style="margin-bottom: 16px;"><strong>Compensation:</strong></p>
                    <ul style="margin-bottom: 16px;">
                        <li>Base Salary: ${{salary}} per year</li>
                        <li>Bonus: Up to {{bonus_percentage}}% annual performance bonus</li>
                        <li>Stock Options: {{stock_options}} shares</li>
                    </ul>
                    
                    <p style="margin-bottom: 16px;">
                        Please indicate your acceptance of this offer by signing and returning this letter by {{response_deadline}}.
                    </p>
                    
                    <p style="margin-bottom: 16px;">
                        We look forward to welcoming you to our team!
                    </p>
                    
                    <p style="margin-bottom: 48px;">
                        Sincerely,<br>
                        {{hr_name}}<br>
                        Director of Human Resources
                    </p>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Close</button>
                <button class="btn btn-primary" onclick="generateOffer('${offerId}')">Generate Offer</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function editOffer(offerId) {
    showSuccessNotification(`Editing offer template: ${offerId}`);
}

function generateOffer(offerId) {
    document.querySelectorAll('.modal').forEach(m => m.remove());
    showSuccessNotification('Generating offer letter...');
}

// Policy Functions
function uploadPolicy() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            showSuccessNotification(`Uploading policy: ${file.name}`);
        }
    };
    input.click();
}

function viewPolicy(policyId) {
    showSuccessNotification(`Viewing policy: ${policyId}`);
}

function editPolicy(policyId) {
    showSuccessNotification(`Editing policy: ${policyId}`);
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

// Add CSS
const style = document.createElement('style');
style.textContent = `
    .document-template-card {
        padding: 16px;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        background: white;
        cursor: pointer;
        transition: all 0.2s;
    }
    
    .document-template-card:hover {
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        transform: translateY(-2px);
    }
    
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
