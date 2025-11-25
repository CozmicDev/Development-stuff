// Employee Documents Management
document.addEventListener('DOMContentLoaded', function() {
    loadDocumentData();
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

// Load Document Data
function loadDocumentData() {
    const docData = JSON.parse(localStorage.getItem('documentData')) || getDefaultDocumentData();
    localStorage.setItem('documentData', JSON.stringify(docData));
}

// Get Default Document Data
function getDefaultDocumentData() {
    return {
        available: [
            { id: 'employment-cert', name: 'Employment Certificate', type: 'Certificate', date: 'Dec 15, 2024' },
            { id: 'offer-letter', name: 'Offer Letter', type: 'Employment', date: 'Jan 15, 2023' }
        ],
        requests: [],
        personal: [],
        tax: []
    };
}

// Request Document
function requestDocument() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h3>Request Document</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Document Type *</label>
                    <select id="docType" onchange="updateDocumentOptions(this.value)">
                        <option value="">Select document type...</option>
                        <option value="employment">Employment Certificate</option>
                        <option value="experience">Experience Certificate</option>
                        <option value="noc">No Objection Certificate</option>
                        <option value="relieving">Relieving Letter</option>
                        <option value="promotion">Promotion Letter</option>
                        <option value="transfer">Transfer Letter</option>
                        <option value="increment">Increment Letter</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div class="form-group" id="otherDocType" style="display: none;">
                    <label>Specify Document Type *</label>
                    <input type="text" id="otherDocTypeInput" placeholder="Enter document type...">
                </div>
                
                <div class="form-group">
                    <label>Purpose of Request *</label>
                    <select id="docPurpose">
                        <option value="">Select purpose...</option>
                        <option value="visa">Visa Application</option>
                        <option value="loan">Bank Loan</option>
                        <option value="housing">Housing Application</option>
                        <option value="education">Higher Education</option>
                        <option value="job">New Job Application</option>
                        <option value="immigration">Immigration</option>
                        <option value="personal">Personal Use</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Additional Details</label>
                    <textarea id="docDetails" rows="4" placeholder="Provide any additional information or special requirements..."></textarea>
                </div>

                <div class="form-group">
                    <label>Delivery Method</label>
                    <select id="deliveryMethod">
                        <option value="digital">Digital (Email/Portal) - Instant</option>
                        <option value="printed">Printed Copy - 2-3 business days</option>
                        <option value="both">Both Digital and Printed</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>
                        <input type="checkbox" id="urgentRequest">
                        This is an urgent request
                    </label>
                    <small>Urgent requests are processed within 24 hours</small>
                </div>

                <div style="padding: 16px; background: var(--background); border-radius: 8px; margin-top: 16px;">
                    <h4 style="margin: 0 0 8px 0;">📋 Processing Information</h4>
                    <ul style="font-size: 13px; color: var(--text-secondary); margin: 8px 0 0 20px; line-height: 1.6;">
                        <li>Standard requests: 2-3 business days</li>
                        <li>Urgent requests: Within 24 hours</li>
                        <li>Digital documents are available instantly once approved</li>
                        <li>You will receive an email notification when ready</li>
                    </ul>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Cancel</button>
                <button class="btn btn-primary" onclick="submitDocumentRequest()">Submit Request</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Update Document Options
function updateDocumentOptions(value) {
    const otherDiv = document.getElementById('otherDocType');
    if (value === 'other') {
        otherDiv.style.display = 'block';
    } else {
        otherDiv.style.display = 'none';
    }
}

// Submit Document Request
function submitDocumentRequest() {
    const docType = document.getElementById('docType').value;
    const purpose = document.getElementById('docPurpose').value;
    const details = document.getElementById('docDetails').value;
    
    if (!docType || !purpose) {
        alert('Please fill in all required fields');
        return;
    }
    
    document.querySelector('.modal').remove();
    showSuccessNotification('✓ Document request submitted successfully! You will be notified once it\'s ready.');
    
    if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
        window.dataService.auditLog.log({
            action: 'document_requested',
            details: `Requested ${docType} certificate`,
            severity: 'info'
        });
    }
}

// Search Documents
function searchDocuments(query) {
    const cards = document.querySelectorAll('.document-card');
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(query.toLowerCase())) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Preview Document
function previewDocument(docId) {
    const documents = {
        'employment-cert': {
            title: 'Employment Certificate',
            content: `
                <div style="padding: 40px; background: white; max-width: 800px; margin: 0 auto;">
                    <div style="text-align: center; margin-bottom: 40px;">
                        <h2 style="color: var(--primary-color); margin: 0;">ACME CORPORATION</h2>
                        <p style="color: var(--text-secondary); margin: 8px 0;">123 Business Street, San Francisco, CA 94105</p>
                    </div>
                    
                    <h3 style="text-align: center; margin: 30px 0;">EMPLOYMENT CERTIFICATE</h3>
                    
                    <p style="line-height: 1.8; color: var(--text-primary);">Date: December 15, 2024</p>
                    
                    <p style="line-height: 1.8; color: var(--text-primary); margin-top: 30px;">
                        To Whom It May Concern,
                    </p>
                    
                    <p style="line-height: 1.8; color: var(--text-primary); margin-top: 20px;">
                        This is to certify that <strong>Sarah Johnson</strong> is currently employed with ACME Corporation 
                        as a <strong>Senior Software Engineer</strong> in the Engineering Department since 
                        <strong>January 20, 2023</strong>.
                    </p>
                    
                    <p style="line-height: 1.8; color: var(--text-primary); margin-top: 20px;">
                        During their tenure with us, they have demonstrated excellent professional conduct, 
                        technical expertise, and dedication to their responsibilities.
                    </p>
                    
                    <p style="line-height: 1.8; color: var(--text-primary); margin-top: 20px;">
                        This certificate is issued upon their request for official purposes.
                    </p>
                    
                    <div style="margin-top: 60px;">
                        <p style="margin: 0;"><strong>David Johnson</strong></p>
                        <p style="margin: 4px 0; color: var(--text-secondary);">Engineering Manager</p>
                        <p style="margin: 4px 0; color: var(--text-secondary);">ACME Corporation</p>
                    </div>
                    
                    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E7EB;">
                        <p style="font-size: 12px; color: var(--text-secondary); text-align: center;">
                            This is a computer-generated document and does not require a physical signature.
                        </p>
                    </div>
                </div>
            `
        },
        'offer-letter': {
            title: 'Offer Letter',
            content: `
                <div style="padding: 40px; background: white; max-width: 800px; margin: 0 auto;">
                    <div style="text-align: center; margin-bottom: 40px;">
                        <h2 style="color: var(--primary-color); margin: 0;">ACME CORPORATION</h2>
                        <p style="color: var(--text-secondary); margin: 8px 0;">123 Business Street, San Francisco, CA 94105</p>
                    </div>
                    
                    <p style="line-height: 1.8; color: var(--text-primary);">January 10, 2023</p>
                    
                    <p style="line-height: 1.8; color: var(--text-primary); margin-top: 30px;">
                        Dear Sarah Johnson,
                    </p>
                    
                    <p style="line-height: 1.8; color: var(--text-primary); margin-top: 20px;">
                        We are pleased to offer you the position of <strong>Senior Software Engineer</strong> 
                        at ACME Corporation. We were impressed with your qualifications and believe you will 
                        be a valuable addition to our team.
                    </p>
                    
                    <div style="margin: 30px 0;">
                        <h4 style="margin: 0 0 16px 0;">Position Details:</h4>
                        <ul style="line-height: 2;">
                            <li><strong>Position:</strong> Senior Software Engineer</li>
                            <li><strong>Department:</strong> Engineering</li>
                            <li><strong>Reports To:</strong> David Johnson, Engineering Manager</li>
                            <li><strong>Start Date:</strong> January 20, 2023</li>
                            <li><strong>Location:</strong> San Francisco, CA (Hybrid)</li>
                        </ul>
                    </div>
                    
                    <div style="margin: 30px 0; padding: 20px; background: var(--background); border-radius: 8px;">
                        <h4 style="margin: 0 0 16px 0;">Compensation Package:</h4>
                        <ul style="line-height: 2;">
                            <li><strong>Base Salary:</strong> $120,000 per year</li>
                            <li><strong>Performance Bonus:</strong> Up to 15% of base salary</li>
                            <li><strong>Stock Options:</strong> 5,000 shares (4-year vesting)</li>
                            <li><strong>Health Insurance:</strong> Comprehensive coverage</li>
                            <li><strong>Paid Time Off:</strong> 20 days annually</li>
                            <li><strong>401(k):</strong> Company match up to 5%</li>
                        </ul>
                    </div>
                    
                    <p style="line-height: 1.8; color: var(--text-primary);">
                        Please confirm your acceptance by signing and returning this letter by January 15, 2023.
                    </p>
                    
                    <p style="line-height: 1.8; color: var(--text-primary); margin-top: 30px;">
                        We look forward to welcoming you to the team!
                    </p>
                    
                    <div style="margin-top: 60px;">
                        <p style="margin: 0;"><strong>Jennifer Smith</strong></p>
                        <p style="margin: 4px 0; color: var(--text-secondary);">HR Manager</p>
                        <p style="margin: 4px 0; color: var(--text-secondary);">ACME Corporation</p>
                    </div>
                </div>
            `
        }
    };
    
    const doc = documents[docId] || documents['employment-cert'];
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 900px; max-height: 90vh; overflow-y: auto;">
            <div class="modal-header">
                <h3>${doc.title}</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body" style="padding: 0;">
                ${doc.content}
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Close</button>
                <button class="btn btn-primary" onclick="downloadDocument('${docId}')">Download PDF</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Download Document
function downloadDocument(docId) {
    showSuccessNotification('✓ Downloading document...');
    
    if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
        window.dataService.auditLog.log({
            action: 'document_downloaded',
            details: `Downloaded ${docId}`,
            severity: 'info'
        });
    }
}

// Filter Requests
function filterRequests(status) {
    showSuccessNotification(`Filtering requests by: ${status}`);
}

// View Request Details
function viewRequestDetails(requestId) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h3>Request Details - ${requestId}</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Request ID</label>
                    <input type="text" value="${requestId}" readonly>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Document Type</label>
                        <input type="text" value="Experience Certificate" readonly>
                    </div>
                    <div class="form-group">
                        <label>Status</label>
                        <span class="badge badge-warning">Pending Review</span>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Purpose</label>
                    <textarea rows="2" readonly>Visa Application</textarea>
                </div>
                
                <div class="form-group">
                    <label>Additional Details</label>
                    <textarea rows="3" readonly>Need experience certificate for Australian work visa application. Please include job duties and responsibilities.</textarea>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Requested On</label>
                        <input type="text" value="Dec 18, 2024" readonly>
                    </div>
                    <div class="form-group">
                        <label>Delivery Method</label>
                        <input type="text" value="Digital (Email)" readonly>
                    </div>
                </div>
                
                <div style="padding: 16px; background: var(--warning-light); border-radius: 8px; margin-top: 16px;">
                    <p style="margin: 0; color: var(--warning-color); font-size: 14px;">
                        ⏱️ Your request is being reviewed by the HR department. Estimated completion: Dec 20, 2024
                    </p>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Close</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Download Requested Document
function downloadRequestedDoc(requestId) {
    showSuccessNotification('✓ Downloading document...');
}

// Personal Documents
function uploadPersonalDocument() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <div class="modal-header">
                <h3>Upload Personal Document</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Document Name *</label>
                    <input type="text" id="docName" placeholder="e.g., Updated Passport">
                </div>
                
                <div class="form-group">
                    <label>Document Type *</label>
                    <select id="personalDocType">
                        <option value="">Select type...</option>
                        <option value="id">ID Proof</option>
                        <option value="education">Education</option>
                        <option value="professional">Professional Certification</option>
                        <option value="medical">Medical Records</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Upload File *</label>
                    <div style="padding: 40px; border: 2px dashed #D1D5DB; border-radius: 8px; text-align: center; background: var(--background); cursor: pointer;" onclick="document.getElementById('fileInput').click()">
                        <span style="font-size: 48px;">📤</span>
                        <p style="margin: 8px 0 4px 0; font-weight: 500;">Click to upload or drag and drop</p>
                        <p style="margin: 0; font-size: 13px; color: var(--text-secondary);">PDF, JPG, or PNG (Max 10MB)</p>
                        <input type="file" id="fileInput" style="display: none;" accept=".pdf,.jpg,.jpeg,.png">
                    </div>
                </div>
                
                <div style="padding: 12px; background: var(--info-light); border-radius: 4px;">
                    <p style="margin: 0; font-size: 13px; color: var(--info-color);">
                        ℹ️ Personal documents are encrypted and stored securely. Only you and authorized HR personnel can access them.
                    </p>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Cancel</button>
                <button class="btn btn-primary" onclick="submitPersonalDocument()">Upload Document</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function submitPersonalDocument() {
    const docName = document.getElementById('docName').value;
    const docType = document.getElementById('personalDocType').value;
    
    if (!docName || !docType) {
        alert('Please fill in all required fields');
        return;
    }
    
    document.querySelector('.modal').remove();
    showSuccessNotification('✓ Document uploaded successfully!');
}

function viewPersonalDoc(docId) {
    showSuccessNotification('Opening document preview...');
}

function deletePersonalDoc(docId) {
    if (confirm('Are you sure you want to delete this document? This action cannot be undone.')) {
        showSuccessNotification('✓ Document deleted successfully');
    }
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

// Add document grid CSS
const style = document.createElement('style');
style.textContent = `
    .document-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
    }
    
    .document-card {
        padding: 20px;
        border: 1px solid #E5E7EB;
        border-radius: 8px;
        transition: all 0.3s ease;
    }
    
    .document-card:hover {
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        transform: translateY(-2px);
    }
    
    .document-icon {
        font-size: 48px;
        margin-bottom: 16px;
    }
    
    .document-info h4 {
        margin: 0 0 8px 0;
        font-size: 16px;
    }
    
    .doc-type {
        display: inline-block;
        padding: 4px 12px;
        background: var(--primary-light);
        color: var(--primary-color);
        border-radius: 12px;
        font-size: 12px;
        font-weight: 500;
        margin: 8px 0;
    }
    
    .doc-date {
        font-size: 13px;
        color: var(--text-secondary);
        margin: 4px 0;
    }
    
    .doc-desc {
        font-size: 14px;
        color: var(--text-secondary);
        margin: 8px 0 16px 0;
        line-height: 1.5;
    }
    
    .document-actions {
        display: flex;
        gap: 8px;
        margin-top: 16px;
    }
    
    .document-actions button {
        flex: 1;
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
