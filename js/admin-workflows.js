// Workflow Management
document.addEventListener('DOMContentLoaded', function() {
    loadWorkflows();
});

// Load Workflows
function loadWorkflows() {
    const workflows = JSON.parse(localStorage.getItem('workflows')) || getDefaultWorkflows();
    localStorage.setItem('workflows', JSON.stringify(workflows));
}

// Get Default Workflows
function getDefaultWorkflows() {
    return [
        { id: 'leave', name: 'Leave Request Approval', status: 'active', approvers: 2, avgTime: '4 hours' },
        { id: 'expense', name: 'Expense Reimbursement', status: 'active', approvers: 2, avgTime: '6 hours' },
        { id: 'document', name: 'Document Request', status: 'active', approvers: 1, avgTime: '2 hours' },
        { id: 'onboarding', name: 'Employee Onboarding', status: 'active', steps: 4, avgTime: '3 days' },
        { id: 'offboarding', name: 'Employee Offboarding', status: 'active', steps: 5, avgTime: '2 days' },
        { id: 'performance', name: 'Performance Review Cycle', status: 'paused', approvers: 3, avgTime: '7 days' },
        { id: 'training', name: 'Training Request', status: 'active', approvers: 2, avgTime: '3 days' },
        { id: 'timeoff', name: 'Time Off Adjustment', status: 'active', approvers: 2, avgTime: '1 hour' }
    ];
}

// Create Workflow
function createWorkflow() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 700px;">
            <div class="modal-header">
                <h3>Create New Workflow</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Workflow Name *</label>
                    <input type="text" id="workflowName" placeholder="e.g., Equipment Request Approval">
                </div>
                
                <div class="form-group">
                    <label>Workflow Type *</label>
                    <select id="workflowType">
                        <option value="">Select type...</option>
                        <option value="approval">Approval Workflow</option>
                        <option value="sequential">Sequential Workflow</option>
                        <option value="parallel">Parallel Workflow</option>
                        <option value="conditional">Conditional Workflow</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Description</label>
                    <textarea id="workflowDescription" rows="3" placeholder="Describe what this workflow does..."></textarea>
                </div>
                
                <div class="form-group">
                    <label>Trigger</label>
                    <select id="workflowTrigger">
                        <option value="manual">Manual</option>
                        <option value="form_submit">Form Submission</option>
                        <option value="status_change">Status Change</option>
                        <option value="scheduled">Scheduled</option>
                    </select>
                </div>
                
                <div style="padding: 16px; background: var(--background); border-radius: 8px; margin-top: 16px;">
                    <h4 style="margin: 0 0 12px 0;">Approval Steps</h4>
                    <div id="approvalSteps">
                        <div class="approval-step">
                            <div style="display: flex; gap: 12px; align-items: flex-start;">
                                <div style="width: 32px; height: 32px; background: var(--primary-color); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">1</div>
                                <div style="flex: 1;">
                                    <select style="width: 100%; margin-bottom: 8px;">
                                        <option value="">Select approver role...</option>
                                        <option value="manager">Direct Manager</option>
                                        <option value="hr">HR Department</option>
                                        <option value="finance">Finance Department</option>
                                        <option value="admin">System Admin</option>
                                    </select>
                                </div>
                                <button class="btn btn-sm btn-outline" style="color: var(--danger-color);" onclick="removeStep(this)">×</button>
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-sm btn-outline" style="margin-top: 12px;" onclick="addApprovalStep()">+ Add Step</button>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Cancel</button>
                <button class="btn btn-primary" onclick="saveNewWorkflow()">Create Workflow</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Add Approval Step
function addApprovalStep() {
    const container = document.getElementById('approvalSteps');
    const stepCount = container.children.length + 1;
    
    const stepDiv = document.createElement('div');
    stepDiv.className = 'approval-step';
    stepDiv.innerHTML = `
        <div style="display: flex; gap: 12px; align-items: flex-start; margin-top: 12px;">
            <div style="width: 32px; height: 32px; background: var(--primary-color); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">${stepCount}</div>
            <div style="flex: 1;">
                <select style="width: 100%; margin-bottom: 8px;">
                    <option value="">Select approver role...</option>
                    <option value="manager">Direct Manager</option>
                    <option value="hr">HR Department</option>
                    <option value="finance">Finance Department</option>
                    <option value="admin">System Admin</option>
                </select>
            </div>
            <button class="btn btn-sm btn-outline" style="color: var(--danger-color);" onclick="removeStep(this)">×</button>
        </div>
    `;
    container.appendChild(stepDiv);
}

// Remove Step
function removeStep(button) {
    button.closest('.approval-step').remove();
    // Renumber steps
    const steps = document.querySelectorAll('.approval-step');
    steps.forEach((step, index) => {
        const numberDiv = step.querySelector('div > div:first-child');
        numberDiv.textContent = index + 1;
    });
}

// Save New Workflow
function saveNewWorkflow() {
    const name = document.getElementById('workflowName').value;
    if (!name) {
        alert('Please enter a workflow name');
        return;
    }
    
    document.querySelector('.modal').remove();
    showSuccessNotification('Workflow created successfully!');
    
    if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
        window.dataService.auditLog.log({
            action: 'workflow_created',
            details: `Created workflow: ${name}`,
            severity: 'info'
        });
    }
}

// View Workflow
function viewWorkflow(workflowId) {
    const workflows = {
        'leave': {
            name: 'Leave Request Approval',
            description: 'Automated approval workflow for employee leave requests',
            steps: [
                { order: 1, name: 'Direct Manager Review', type: 'approval', condition: 'Always' },
                { order: 2, name: 'HR Review', type: 'approval', condition: 'If > 5 days' },
                { order: 3, name: 'Auto-Approve', type: 'action', condition: 'If ≤ 3 days' },
                { order: 4, name: 'Send Notification', type: 'notification', condition: 'Always' }
            ]
        },
        'expense': {
            name: 'Expense Reimbursement',
            description: 'Multi-level approval for expense reimbursements',
            steps: [
                { order: 1, name: 'Manager Approval', type: 'approval', condition: 'Always' },
                { order: 2, name: 'Finance Review', type: 'approval', condition: 'If amount > $500' },
                { order: 3, name: 'Process Payment', type: 'action', condition: 'After all approvals' },
                { order: 4, name: 'Email Receipt', type: 'notification', condition: 'Always' }
            ]
        }
    };
    
    const workflow = workflows[workflowId] || workflows['leave'];
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 700px;">
            <div class="modal-header">
                <h3>${workflow.name}</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <p style="color: var(--text-secondary); margin-bottom: 20px;">${workflow.description}</p>
                
                <h4 style="margin: 0 0 12px 0;">Workflow Steps:</h4>
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    ${workflow.steps.map(step => `
                        <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: var(--background); border-radius: 8px;">
                            <div style="width: 32px; height: 32px; background: var(--primary-color); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">${step.order}</div>
                            <div style="flex: 1;">
                                <strong>${step.name}</strong>
                                <p style="font-size: 12px; color: var(--text-secondary); margin: 4px 0 0 0;">
                                    ${step.type === 'approval' ? '🔐 Approval' : step.type === 'action' ? '⚙️ Action' : '📧 Notification'} • ${step.condition}
                                </p>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div style="margin-top: 20px; padding: 16px; background: var(--background); border-radius: 8px;">
                    <h4 style="margin: 0 0 8px 0;">Statistics</h4>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 12px;">
                        <div>
                            <p style="font-size: 12px; color: var(--text-secondary); margin: 0;">Total Processed</p>
                            <p style="font-size: 18px; font-weight: 600; margin: 4px 0 0 0;">247</p>
                        </div>
                        <div>
                            <p style="font-size: 12px; color: var(--text-secondary); margin: 0;">Success Rate</p>
                            <p style="font-size: 18px; font-weight: 600; margin: 4px 0 0 0;">98.5%</p>
                        </div>
                        <div>
                            <p style="font-size: 12px; color: var(--text-secondary); margin: 0;">Avg. Duration</p>
                            <p style="font-size: 18px; font-weight: 600; margin: 4px 0 0 0;">4.2 hrs</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Close</button>
                <button class="btn btn-primary" onclick="editWorkflow('${workflowId}')">Edit Workflow</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Edit Workflow
function editWorkflow(workflowId) {
    document.querySelectorAll('.modal').forEach(m => m.remove());
    createWorkflow();
    showSuccessNotification(`Editing workflow: ${workflowId}`);
}

// Toggle Workflow
function toggleWorkflow(workflowId) {
    const workflows = getDefaultWorkflows();
    const workflow = workflows.find(w => w.id === workflowId);
    
    if (workflow.status === 'active') {
        if (confirm('Are you sure you want to pause this workflow? No new items will be processed.')) {
            showSuccessNotification('Workflow paused');
        }
    } else {
        showSuccessNotification('Workflow resumed');
    }
    
    if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
        window.dataService.auditLog.log({
            action: 'workflow_toggled',
            details: `Toggled workflow: ${workflowId}`,
            severity: 'info'
        });
    }
}

// Import Workflow
function importWorkflow() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            showSuccessNotification(`Importing workflow: ${file.name}`);
        }
    };
    input.click();
}

// Export All Workflows
function exportAllWorkflows() {
    showSuccessNotification('Exporting all workflows...');
    
    if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
        window.dataService.auditLog.log({
            action: 'workflows_exported',
            details: 'Exported all workflows',
            severity: 'info'
        });
    }
}

// Use Template
function useTemplate(templateId) {
    showSuccessNotification(`Creating workflow from ${templateId} template...`);
    setTimeout(() => {
        createWorkflow();
    }, 500);
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
    .workflow-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        border-bottom: 1px solid var(--border-color);
        transition: background 0.2s;
    }
    
    .workflow-item:hover {
        background: var(--background);
    }
    
    .workflow-item:last-child {
        border-bottom: none;
    }
    
    .template-card {
        padding: 16px;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        background: white;
        transition: all 0.2s;
    }
    
    .template-card:hover {
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
