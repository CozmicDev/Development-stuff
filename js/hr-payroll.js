// Payroll Management JavaScript

// Tab switching
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(`${tabName}-tab`).classList.add('active');
    event.target.classList.add('active');
}

// Run Payroll Process
function runPayroll() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h2>Run Payroll</h2>
                <button class="close-btn" onclick="this.closest('.modal').remove()">×</button>
            </div>
            <div class="modal-body">
                <form id="runPayrollForm">
                    <div class="form-group">
                        <label>Payroll Period *</label>
                        <select required>
                            <option value="">Select period</option>
                            <option value="dec-2024" selected>December 2024</option>
                            <option value="jan-2025">January 2025</option>
                            <option value="feb-2025">February 2025</option>
                        </select>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Period Start *</label>
                            <input type="date" value="2024-12-01" required>
                        </div>
                        <div class="form-group">
                            <label>Period End *</label>
                            <input type="date" value="2024-12-31" required>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Payment Date *</label>
                        <input type="date" value="2024-12-31" required>
                    </div>

                    <div class="form-group">
                        <label>Include</label>
                        <div class="checkbox-group">
                            <label class="checkbox-label">
                                <input type="checkbox" checked>
                                <span>Regular Salary</span>
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox" checked>
                                <span>Overtime</span>
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox" checked>
                                <span>Bonuses</span>
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox">
                                <span>Commissions</span>
                            </label>
                        </div>
                    </div>

                    <div class="payroll-summary" style="background: var(--bg-secondary); padding: 16px; border-radius: 8px; margin: 16px 0;">
                        <h4 style="margin: 0 0 12px 0;">Payroll Summary</h4>
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                            <div style="display: flex; justify-content: space-between;">
                                <span>Employees:</span>
                                <strong>8</strong>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span>Total Gross:</span>
                                <strong>$284,500</strong>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span>Total Deductions:</span>
                                <strong>$74,265</strong>
                            </div>
                            <div style="display: flex; justify-content: space-between; padding-top: 8px; border-top: 2px solid var(--border-color);">
                                <span>Total Net Pay:</span>
                                <strong style="color: var(--primary-color); font-size: 1.1em;">$210,235</strong>
                            </div>
                        </div>
                    </div>

                    <div class="form-actions">
                        <button type="button" class="btn btn-outline" onclick="this.closest('.modal').remove()">Cancel</button>
                        <button type="submit" class="btn btn-primary">Process Payroll</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);

    // Handle form submission
    document.getElementById('runPayrollForm').addEventListener('submit', function(e) {
        e.preventDefault();
        processPayroll();
    });
}

function processPayroll() {
    showNotification('Processing payroll...', 'info');
    
    // Simulate processing
    setTimeout(() => {
        showNotification('Payroll processed successfully! 8 employees paid.', 'success');
        document.querySelector('.modal').remove();
        
        // Log audit
        logAudit('Payroll processed for December 2024 - 8 employees, total $210,235');
    }, 1500);
}

// View Payslip
function viewPayslip(employeeId, period) {
    const payslips = {
        'sarah': {
            name: 'Sarah Johnson',
            position: 'Senior Software Engineer',
            employeeId: 'EMP001',
            baseSalary: 10000,
            overtime: 850,
            bonus: 2000,
            federalTax: 2570,
            stateTax: 1195,
            socialSecurity: 661,
            medicare: 155,
            healthInsurance: 300,
            dental: 50,
            vision: 25,
            retirement401k: 771,
            parking: 100,
            gym: 50
        },
        'mike': {
            name: 'Mike Chen',
            position: 'Software Engineer',
            employeeId: 'EMP002',
            baseSalary: 8500,
            overtime: 425,
            bonus: 1500,
            federalTax: 2093,
            stateTax: 973,
            socialSecurity: 537,
            medicare: 126,
            healthInsurance: 300,
            dental: 50,
            vision: 25,
            retirement401k: 626,
            parking: 100,
            gym: 0
        }
    };

    const data = payslips[employeeId] || payslips['sarah'];
    const grossPay = data.baseSalary + data.overtime + data.bonus;
    const totalDeductions = data.federalTax + data.stateTax + data.socialSecurity + 
                           data.medicare + data.healthInsurance + data.dental + 
                           data.vision + data.retirement401k + data.parking + data.gym;
    const netPay = grossPay - totalDeductions;

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 700px;">
            <div class="modal-header">
                <h2>Payslip - December 2024</h2>
                <button class="close-btn" onclick="this.closest('.modal').remove()">×</button>
            </div>
            <div class="modal-body">
                <div class="payslip-header" style="background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); color: white; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div>
                            <h3 style="margin: 0 0 8px 0; color: white;">ACME Corporation</h3>
                            <p style="margin: 0; opacity: 0.9;">123 Business Ave, San Francisco, CA 94102</p>
                        </div>
                        <div style="text-align: right;">
                            <p style="margin: 0 0 4px 0; font-size: 0.9em; opacity: 0.9;">Employee ID</p>
                            <p style="margin: 0; font-weight: bold; font-size: 1.1em;">${data.employeeId}</p>
                        </div>
                    </div>
                </div>

                <div class="payslip-info" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 24px; padding: 16px; background: var(--bg-secondary); border-radius: 8px;">
                    <div>
                        <p style="margin: 0 0 4px 0; font-size: 0.9em; color: var(--text-secondary);">Employee Name</p>
                        <p style="margin: 0; font-weight: bold;">${data.name}</p>
                    </div>
                    <div>
                        <p style="margin: 0 0 4px 0; font-size: 0.9em; color: var(--text-secondary);">Position</p>
                        <p style="margin: 0; font-weight: bold;">${data.position}</p>
                    </div>
                    <div>
                        <p style="margin: 0 0 4px 0; font-size: 0.9em; color: var(--text-secondary);">Pay Period</p>
                        <p style="margin: 0; font-weight: bold;">Dec 1 - Dec 31, 2024</p>
                    </div>
                    <div>
                        <p style="margin: 0 0 4px 0; font-size: 0.9em; color: var(--text-secondary);">Payment Date</p>
                        <p style="margin: 0; font-weight: bold;">December 31, 2024</p>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;">
                    <div>
                        <h4 style="margin: 0 0 12px 0; padding-bottom: 8px; border-bottom: 2px solid var(--border-color);">Earnings</h4>
                        <div class="payslip-line-items">
                            <div class="line-item">
                                <span>Base Salary</span>
                                <span>$${data.baseSalary.toLocaleString()}</span>
                            </div>
                            ${data.overtime > 0 ? `
                            <div class="line-item">
                                <span>Overtime</span>
                                <span>$${data.overtime.toLocaleString()}</span>
                            </div>
                            ` : ''}
                            ${data.bonus > 0 ? `
                            <div class="line-item">
                                <span>Bonus</span>
                                <span>$${data.bonus.toLocaleString()}</span>
                            </div>
                            ` : ''}
                            <div class="line-item total">
                                <span><strong>Gross Pay</strong></span>
                                <span><strong>$${grossPay.toLocaleString()}</strong></span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 style="margin: 0 0 12px 0; padding-bottom: 8px; border-bottom: 2px solid var(--border-color);">Deductions</h4>
                        <div class="payslip-line-items">
                            <div class="line-item">
                                <span>Federal Tax</span>
                                <span>$${data.federalTax.toLocaleString()}</span>
                            </div>
                            <div class="line-item">
                                <span>State Tax</span>
                                <span>$${data.stateTax.toLocaleString()}</span>
                            </div>
                            <div class="line-item">
                                <span>Social Security</span>
                                <span>$${data.socialSecurity}</span>
                            </div>
                            <div class="line-item">
                                <span>Medicare</span>
                                <span>$${data.medicare}</span>
                            </div>
                            <div class="line-item">
                                <span>Health Insurance</span>
                                <span>$${data.healthInsurance}</span>
                            </div>
                            <div class="line-item">
                                <span>Dental + Vision</span>
                                <span>$${data.dental + data.vision}</span>
                            </div>
                            <div class="line-item">
                                <span>401(k) Contribution</span>
                                <span>$${data.retirement401k}</span>
                            </div>
                            ${data.parking > 0 ? `
                            <div class="line-item">
                                <span>Parking</span>
                                <span>$${data.parking}</span>
                            </div>
                            ` : ''}
                            ${data.gym > 0 ? `
                            <div class="line-item">
                                <span>Gym Membership</span>
                                <span>$${data.gym}</span>
                            </div>
                            ` : ''}
                            <div class="line-item total">
                                <span><strong>Total Deductions</strong></span>
                                <span><strong>$${totalDeductions.toLocaleString()}</strong></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="net-pay-section" style="margin-top: 24px; padding: 20px; background: linear-gradient(135deg, var(--secondary-color), var(--primary-color)); border-radius: 8px; text-align: center; color: white;">
                    <p style="margin: 0 0 8px 0; font-size: 0.9em; opacity: 0.9;">Net Pay</p>
                    <p style="margin: 0; font-size: 2em; font-weight: bold;">$${netPay.toLocaleString()}</p>
                    <p style="margin: 8px 0 0 0; font-size: 0.9em; opacity: 0.9;">Direct Deposit to Account ****5678</p>
                </div>

                <div class="form-actions" style="margin-top: 24px;">
                    <button class="btn btn-outline" onclick="downloadPayslip('${employeeId}', '${period}')">📥 Download PDF</button>
                    <button class="btn btn-outline" onclick="emailPayslip('${employeeId}', '${period}')">📧 Email Payslip</button>
                    <button class="btn btn-primary" onclick="this.closest('.modal').remove()">Close</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
}

// Review Payroll
function reviewPayroll(employeeId, period) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h2>Review Payroll</h2>
                <button class="close-btn" onclick="this.closest('.modal').remove()">×</button>
            </div>
            <div class="modal-body">
                <div class="info-box info">
                    <strong>Review Required:</strong> This payroll entry requires approval before processing.
                </div>

                <div style="margin: 20px 0;">
                    <h4>Employee: ${employeeId === 'emily' ? 'Emily Rodriguez' : 'David Martinez'}</h4>
                    <p style="color: var(--text-secondary);">Position: ${employeeId === 'emily' ? 'Junior Software Engineer' : 'Senior DevOps Engineer'}</p>
                </div>

                <div style="background: var(--bg-secondary); padding: 16px; border-radius: 8px; margin: 16px 0;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span>Gross Pay:</span>
                        <strong>${employeeId === 'emily' ? '$7,825' : '$12,760'}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span>Deductions:</span>
                        <strong>${employeeId === 'emily' ? '$1,957' : '$3,420'}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding-top: 8px; border-top: 2px solid var(--border-color);">
                        <span>Net Pay:</span>
                        <strong style="color: var(--primary-color); font-size: 1.1em;">${employeeId === 'emily' ? '$5,868' : '$9,340'}</strong>
                    </div>
                </div>

                <div class="form-group">
                    <label>Review Notes</label>
                    <textarea rows="3" placeholder="Add any notes or comments..."></textarea>
                </div>

                <div class="form-actions">
                    <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Cancel</button>
                    <button class="btn btn-danger" onclick="rejectPayroll('${employeeId}')">Reject</button>
                    <button class="btn btn-primary" onclick="approvePayrollEntry('${employeeId}')">Approve</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
}

function approvePayrollEntry(employeeId) {
    showNotification('Payroll approved successfully', 'success');
    document.querySelector('.modal').remove();
    logAudit(`Payroll approved for employee: ${employeeId}`);
    
    // Update UI
    setTimeout(() => location.reload(), 1000);
}

function rejectPayroll(employeeId) {
    showNotification('Payroll entry rejected', 'info');
    document.querySelector('.modal').remove();
    logAudit(`Payroll rejected for employee: ${employeeId}`);
}

// Approve All Payroll
function approveAllPayroll() {
    if (confirm('Approve all pending payroll entries? This will process 2 pending payments.')) {
        showNotification('All payroll entries approved', 'success');
        logAudit('Bulk payroll approval - 2 entries approved');
        setTimeout(() => location.reload(), 1000);
    }
}

// Add Bonus
function addBonus() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h2>Add Bonus</h2>
                <button class="close-btn" onclick="this.closest('.modal').remove()">×</button>
            </div>
            <div class="modal-body">
                <form id="addBonusForm">
                    <div class="form-group">
                        <label>Employee *</label>
                        <select required>
                            <option value="">Select employee</option>
                            <option value="sarah">Sarah Johnson - Senior Software Engineer</option>
                            <option value="mike">Mike Chen - Software Engineer</option>
                            <option value="emily">Emily Rodriguez - Junior Software Engineer</option>
                            <option value="alex">Alex Turner - Software Engineer</option>
                            <option value="lisa">Lisa Wang - UI/UX Designer</option>
                            <option value="david">David Martinez - Senior DevOps Engineer</option>
                            <option value="jessica">Jessica Lee - Product Manager</option>
                            <option value="robert">Robert Taylor - UX Designer</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Bonus Type *</label>
                        <select required onchange="updateBonusReason(this.value)">
                            <option value="">Select type</option>
                            <option value="performance">Performance Bonus</option>
                            <option value="spot">Spot Award</option>
                            <option value="annual">Annual Bonus</option>
                            <option value="referral">Referral Bonus</option>
                            <option value="signing">Signing Bonus</option>
                            <option value="retention">Retention Bonus</option>
                        </select>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Amount *</label>
                            <input type="number" step="0.01" placeholder="0.00" required>
                        </div>
                        <div class="form-group">
                            <label>Payment Date *</label>
                            <input type="date" required>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Reason / Description *</label>
                        <textarea rows="3" placeholder="Describe the reason for this bonus..." required></textarea>
                    </div>

                    <div class="form-group">
                        <label>Approval</label>
                        <div class="radio-group">
                            <label class="radio-label">
                                <input type="radio" name="approval" value="approved" checked>
                                <span>Pre-approved</span>
                            </label>
                            <label class="radio-label">
                                <input type="radio" name="approval" value="pending">
                                <span>Requires Approval</span>
                            </label>
                        </div>
                    </div>

                    <div class="form-actions">
                        <button type="button" class="btn btn-outline" onclick="this.closest('.modal').remove()">Cancel</button>
                        <button type="submit" class="btn btn-primary">Add Bonus</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);

    document.getElementById('addBonusForm').addEventListener('submit', function(e) {
        e.preventDefault();
        showNotification('Bonus added successfully', 'success');
        document.querySelector('.modal').remove();
        logAudit('New bonus added');
    });
}

// View Bonus Details
function viewBonusDetails(bonusId) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <div class="modal-header">
                <h2>Bonus Details</h2>
                <button class="close-btn" onclick="this.closest('.modal').remove()">×</button>
            </div>
            <div class="modal-body">
                <div class="info-grid">
                    <div class="info-item">
                        <span class="info-label">Employee:</span>
                        <span class="info-value">Sarah Johnson</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Position:</span>
                        <span class="info-value">Senior Software Engineer</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Bonus Type:</span>
                        <span class="info-value">Performance Bonus</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Amount:</span>
                        <span class="info-value"><strong>$2,000</strong></span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Payment Date:</span>
                        <span class="info-value">December 31, 2024</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Status:</span>
                        <span class="info-value"><span class="badge badge-success">Approved</span></span>
                    </div>
                    <div class="info-item" style="grid-column: 1 / -1;">
                        <span class="info-label">Reason:</span>
                        <span class="info-value">Exceptional performance in Q4 2024. Led critical project delivery ahead of schedule.</span>
                    </div>
                </div>

                <div class="form-actions">
                    <button class="btn btn-primary" onclick="this.closest('.modal').remove()">Close</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
}

// Approve Bonus
function approveBonus(bonusId) {
    if (confirm('Approve this bonus?')) {
        showNotification('Bonus approved', 'success');
        logAudit(`Bonus approved: ${bonusId}`);
        setTimeout(() => location.reload(), 1000);
    }
}

// Configure Deductions
function configureDeductions() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 700px;">
            <div class="modal-header">
                <h2>Configure Deductions</h2>
                <button class="close-btn" onclick="this.closest('.modal').remove()">×</button>
            </div>
            <div class="modal-body">
                <div class="info-box warning">
                    <strong>Warning:</strong> Changes to tax rates should be reviewed with accounting and legal.
                </div>

                <h4 style="margin: 20px 0 12px 0;">Federal Tax Rates</h4>
                <div class="form-row">
                    <div class="form-group">
                        <label>Standard Rate</label>
                        <input type="number" step="0.01" value="22" placeholder="22.00">
                        <small>Percentage</small>
                    </div>
                    <div class="form-group">
                        <label>High Earner Rate</label>
                        <input type="number" step="0.01" value="24" placeholder="24.00">
                        <small>For income over $89,075</small>
                    </div>
                </div>

                <h4 style="margin: 20px 0 12px 0;">State Tax (California)</h4>
                <div class="form-group">
                    <label>Rate</label>
                    <input type="number" step="0.01" value="9.3" placeholder="9.3">
                    <small>Percentage</small>
                </div>

                <h4 style="margin: 20px 0 12px 0;">Social Security & Medicare</h4>
                <div class="form-row">
                    <div class="form-group">
                        <label>Social Security</label>
                        <input type="number" step="0.01" value="6.2" placeholder="6.2">
                        <small>Percentage (capped at $160,200)</small>
                    </div>
                    <div class="form-group">
                        <label>Medicare</label>
                        <input type="number" step="0.01" value="1.45" placeholder="1.45">
                        <small>Percentage</small>
                    </div>
                </div>

                <h4 style="margin: 20px 0 12px 0;">Benefits</h4>
                <div class="form-row">
                    <div class="form-group">
                        <label>Health Insurance</label>
                        <input type="number" step="0.01" value="300" placeholder="300.00">
                        <small>Monthly employee contribution</small>
                    </div>
                    <div class="form-group">
                        <label>Dental Insurance</label>
                        <input type="number" step="0.01" value="50" placeholder="50.00">
                        <small>Monthly employee contribution</small>
                    </div>
                </div>

                <div class="form-actions" style="margin-top: 24px;">
                    <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Cancel</button>
                    <button class="btn btn-primary" onclick="saveDeductionConfig()">Save Configuration</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
}

function saveDeductionConfig() {
    showNotification('Deduction configuration saved', 'success');
    document.querySelector('.modal').remove();
    logAudit('Deduction configuration updated');
}

// Generate Reports
function generateReport(reportType) {
    const reportNames = {
        'register': 'Payroll Register',
        'tax': 'Tax Summary',
        'department': 'Department Costs',
        'ytd': 'YTD Report',
        'bonus': 'Bonus Report',
        'deductions': 'Deductions Summary',
        'direct-deposit': 'Direct Deposit Report',
        'compliance': 'Compliance Report'
    };

    showNotification(`Generating ${reportNames[reportType]}...`, 'info');
    
    setTimeout(() => {
        showNotification(`${reportNames[reportType]} generated successfully`, 'success');
        logAudit(`Generated report: ${reportNames[reportType]}`);
    }, 1500);
}

// View Payroll Details
function viewPayrollDetails(period) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 800px;">
            <div class="modal-header">
                <h2>Payroll Details - ${period.toUpperCase()}</h2>
                <button class="close-btn" onclick="this.closest('.modal').remove()">×</button>
            </div>
            <div class="modal-body">
                <div class="summary-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px;">
                    <div style="padding: 16px; background: var(--bg-secondary); border-radius: 8px;">
                        <p style="margin: 0 0 4px 0; color: var(--text-secondary); font-size: 0.9em;">Total Gross</p>
                        <p style="margin: 0; font-size: 1.5em; font-weight: bold; color: var(--primary-color);">$284,500</p>
                    </div>
                    <div style="padding: 16px; background: var(--bg-secondary); border-radius: 8px;">
                        <p style="margin: 0 0 4px 0; color: var(--text-secondary); font-size: 0.9em;">Total Deductions</p>
                        <p style="margin: 0; font-size: 1.5em; font-weight: bold; color: var(--danger-color);">$74,265</p>
                    </div>
                    <div style="padding: 16px; background: var(--bg-secondary); border-radius: 8px;">
                        <p style="margin: 0 0 4px 0; color: var(--text-secondary); font-size: 0.9em;">Total Net</p>
                        <p style="margin: 0; font-size: 1.5em; font-weight: bold; color: var(--secondary-color);">$210,235</p>
                    </div>
                </div>

                <h4>Breakdown by Category</h4>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Base Salaries</td>
                            <td>$66,000</td>
                            <td>23.2%</td>
                        </tr>
                        <tr>
                            <td>Overtime</td>
                            <td>$3,200</td>
                            <td>1.1%</td>
                        </tr>
                        <tr>
                            <td>Bonuses</td>
                            <td>$12,500</td>
                            <td>4.4%</td>
                        </tr>
                        <tr>
                            <td>Tax Withholdings</td>
                            <td>$52,124</td>
                            <td>18.3%</td>
                        </tr>
                        <tr>
                            <td>Benefits</td>
                            <td>$3,320</td>
                            <td>1.2%</td>
                        </tr>
                        <tr>
                            <td>401(k) Contributions</td>
                            <td>$4,902</td>
                            <td>1.7%</td>
                        </tr>
                    </tbody>
                </table>

                <div class="form-actions" style="margin-top: 24px;">
                    <button class="btn btn-outline" onclick="exportPayrollDetails('${period}')">📥 Export</button>
                    <button class="btn btn-primary" onclick="this.closest('.modal').remove()">Close</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
}

// Download/Email Functions
function downloadPayslip(employeeId, period) {
    showNotification('Downloading payslip...', 'info');
    setTimeout(() => {
        showNotification('Payslip downloaded successfully', 'success');
    }, 1000);
}

function emailPayslip(employeeId, period) {
    showNotification('Sending payslip via email...', 'info');
    setTimeout(() => {
        showNotification('Payslip sent successfully', 'success');
    }, 1000);
}

// Export Functions
function exportPayroll() {
    showNotification('Exporting payroll data...', 'info');
    setTimeout(() => {
        showNotification('Payroll exported successfully', 'success');
    }, 1000);
}

function exportPayrollHistory() {
    showNotification('Exporting payment history...', 'info');
    setTimeout(() => {
        showNotification('History exported successfully', 'success');
    }, 1000);
}

function exportPayrollDetails(period) {
    showNotification('Exporting payroll details...', 'info');
    setTimeout(() => {
        showNotification('Details exported successfully', 'success');
    }, 1000);
}

// Filter Functions
function filterByDepartment(department) {
    if (department === 'all') {
        showNotification('Showing all departments', 'info');
    } else {
        showNotification(`Filtering by ${department} department`, 'info');
    }
}

function filterHistoryPeriod(period) {
    showNotification(`Showing ${period} payroll history`, 'info');
}

// Manage Bonus Types
function managePerformanceBonuses() {
    showNotification('Opening performance bonus management...', 'info');
}

function manageSpotAwards() {
    showNotification('Opening spot awards management...', 'info');
}

function manageAnnualBonuses() {
    showNotification('Opening annual bonus management...', 'info');
}

function manageReferralBonuses() {
    showNotification('Opening referral bonus management...', 'info');
}

// View Payroll Reports
function viewPayrollReports() {
    // Switch to reports tab
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('reports-tab').classList.add('active');
    document.querySelectorAll('.tab-btn')[4].classList.add('active');
}

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: var(--${type === 'success' ? 'secondary' : type === 'error' ? 'danger' : type === 'warning' ? 'warning' : 'primary'}-color);
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function logAudit(action) {
    const auditLog = JSON.parse(localStorage.getItem('auditLog') || '[]');
    auditLog.push({
        action: action,
        user: 'HR Manager',
        timestamp: new Date().toISOString(),
        module: 'Payroll'
    });
    localStorage.setItem('auditLog', JSON.stringify(auditLog));
}

// CSS Additions for Payroll
const style = document.createElement('style');
style.textContent = `
    .payroll-cycle-banner {
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
        padding: 24px;
        border-radius: 12px;
        margin-bottom: 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .payroll-cycle-banner h3 {
        margin: 0 0 8px 0;
        color: white;
    }

    .payroll-cycle-banner p {
        margin: 0;
        opacity: 0.9;
    }

    .cycle-status {
        text-align: right;
    }

    .status-badge.processing {
        background: rgba(255, 255, 255, 0.2);
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-weight: 500;
        display: inline-block;
        margin-bottom: 8px;
    }

    .status-detail {
        display: block;
        font-size: 0.9em;
        opacity: 0.9;
    }

    .payroll-table .employee-cell {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .payroll-table .employee-cell small {
        color: var(--text-secondary);
        font-size: 0.85em;
    }

    .payroll-table .net-pay {
        color: var(--primary-color);
        font-weight: 600;
    }

    .payroll-table .total-row {
        background: var(--bg-secondary);
        font-weight: bold;
        border-top: 2px solid var(--border-color);
    }

    .summary-cards {
        margin-top: 32px;
    }

    .summary-card {
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        padding: 24px;
    }

    .summary-card h4 {
        margin: 0 0 16px 0;
        color: var(--primary-color);
    }

    .summary-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
    }

    .summary-item {
        display: flex;
        justify-content: space-between;
        padding: 12px 0;
        border-bottom: 1px solid var(--border-color);
    }

    .summary-item:last-child {
        border-bottom: none;
    }

    .bonus-types {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        margin-bottom: 32px;
    }

    .bonus-type-card {
        background: white;
        border: 2px solid var(--border-color);
        border-radius: 12px;
        padding: 20px;
        text-align: center;
        transition: all 0.3s ease;
    }

    .bonus-type-card:hover {
        border-color: var(--primary-color);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
    }

    .bonus-type-card h4 {
        margin: 0 0 8px 0;
        color: var(--primary-color);
    }

    .bonus-type-card p {
        margin: 0 0 16px 0;
        color: var(--text-secondary);
        font-size: 0.9em;
    }

    .bonus-stats {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 16px;
        padding: 12px;
        background: var(--bg-secondary);
        border-radius: 8px;
    }

    .bonus-stats span {
        font-size: 0.9em;
        color: var(--text-secondary);
    }

    .deduction-categories {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 24px;
        margin-bottom: 32px;
    }

    .deduction-card {
        background: white;
        border: 1px solid var(--border-color);
        border-radius: 12px;
        padding: 20px;
    }

    .deduction-card h4 {
        margin: 0 0 16px 0;
        color: var(--primary-color);
        padding-bottom: 12px;
        border-bottom: 2px solid var(--border-color);
    }

    .deduction-items {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .deduction-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
    }

    .deduction-item .rate,
    .deduction-item .amount {
        font-weight: 600;
        color: var(--primary-color);
    }

    .deduction-total {
        margin: 16px 0 0 0;
        padding-top: 12px;
        border-top: 2px solid var(--border-color);
        font-weight: 600;
        color: var(--text-primary);
    }

    .reports-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 20px;
    }

    .report-card {
        background: white;
        border: 2px solid var(--border-color);
        border-radius: 12px;
        padding: 24px;
        text-align: center;
        transition: all 0.3s ease;
    }

    .report-card:hover {
        border-color: var(--primary-color);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
    }

    .report-icon {
        font-size: 3em;
        margin-bottom: 12px;
    }

    .report-card h4 {
        margin: 0 0 8px 0;
        color: var(--primary-color);
    }

    .report-card p {
        margin: 0 0 16px 0;
        color: var(--text-secondary);
        font-size: 0.9em;
    }

    .payslip-line-items {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .line-item {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        border-bottom: 1px solid var(--border-color);
    }

    .line-item.total {
        border-top: 2px solid var(--border-color);
        border-bottom: none;
        padding-top: 12px;
        margin-top: 8px;
        font-size: 1.1em;
    }

    .info-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
    }

    .info-item {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .info-label {
        font-size: 0.9em;
        color: var(--text-secondary);
    }

    .info-value {
        font-weight: 500;
    }

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

    @media (max-width: 768px) {
        .payroll-cycle-banner {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
        }

        .cycle-status {
            text-align: left;
        }

        .bonus-types,
        .deduction-categories,
        .reports-grid {
            grid-template-columns: 1fr;
        }

        .summary-grid {
            grid-template-columns: 1fr;
        }
    }
`;
document.head.appendChild(style);

console.log('Payroll management system initialized');
