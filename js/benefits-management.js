// Benefits Management Functionality

// Tab switching for benefits
function switchBenefitsTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Plan details
function showPlanDetails(planType) {
    const planDetails = {
        health: {
            title: '🏥 PPO Gold Health Insurance',
            details: `
                <h3>Plan Summary</h3>
                <ul>
                    <li><strong>Network:</strong> Nationwide PPO network with over 500,000 providers</li>
                    <li><strong>No referrals required</strong> for specialists</li>
                    <li><strong>Coverage:</strong> In-network and out-of-network benefits available</li>
                    <li><strong>Prescription Coverage:</strong> 3-tier formulary with mail order option</li>
                </ul>
                
                <h3 style="margin-top: 20px;">What's Covered</h3>
                <ul>
                    <li>Preventive care (annual physicals, immunizations) - 100% covered</li>
                    <li>Doctor visits, specialist consultations</li>
                    <li>Hospital stays and surgeries</li>
                    <li>Emergency and urgent care</li>
                    <li>Maternity and newborn care</li>
                    <li>Mental health and substance abuse treatment</li>
                    <li>Prescription drugs</li>
                    <li>Lab tests and imaging (X-rays, MRIs)</li>
                </ul>
                
                <h3 style="margin-top: 20px;">Provider Search</h3>
                <p>Find in-network doctors: <a href="#">www.healthinsurance.com/provider-search</a></p>
                <p>Member Services: 1-800-555-HEALTH</p>
            `
        },
        dental: {
            title: '🦷 Premium Dental Insurance',
            details: `
                <h3>Plan Summary</h3>
                <ul>
                    <li><strong>Network:</strong> Delta Dental PPO network</li>
                    <li><strong>Annual Maximum:</strong> $2,000 per person</li>
                    <li><strong>No waiting periods</strong> for preventive services</li>
                </ul>
                
                <h3 style="margin-top: 20px;">Coverage Levels</h3>
                <ul>
                    <li><strong>Preventive (100% covered):</strong> Cleanings, exams, X-rays (2 per year)</li>
                    <li><strong>Basic (80% covered):</strong> Fillings, extractions, root canals</li>
                    <li><strong>Major (50% covered):</strong> Crowns, bridges, dentures</li>
                    <li><strong>Orthodontia (50% covered):</strong> $2,000 lifetime maximum</li>
                </ul>
                
                <p style="margin-top: 20px;">Find a dentist: <a href="#">www.deltadental.com/find-dentist</a></p>
            `
        },
        vision: {
            title: '👓 Standard Vision Insurance',
            details: `
                <h3>Plan Summary</h3>
                <ul>
                    <li><strong>Network:</strong> VSP Vision Care</li>
                    <li><strong>Eye Exam:</strong> $10 copay (once per year)</li>
                    <li><strong>Frames:</strong> $150 allowance (every 2 years)</li>
                    <li><strong>Lenses:</strong> $25 copay (every year)</li>
                    <li><strong>Contacts:</strong> $120 allowance (instead of glasses)</li>
                </ul>
                
                <h3 style="margin-top: 20px;">Additional Benefits</h3>
                <ul>
                    <li>20% discount on additional glasses and sunglasses</li>
                    <li>Laser vision correction discounts (15% off or 5% off promotional rates)</li>
                    <li>Online ordering available through VSP</li>
                </ul>
                
                <p style="margin-top: 20px;">Find a provider: <a href="#">www.vsp.com</a></p>
            `
        },
        '401k': {
            title: '🏦 401(k) Retirement Plan',
            details: `
                <h3>Plan Highlights</h3>
                <ul>
                    <li><strong>Eligibility:</strong> Immediate upon hire</li>
                    <li><strong>Contribution Limit (2024):</strong> $23,000 (under 50) / $30,500 (50+)</li>
                    <li><strong>Company Match:</strong> 50% of first 6% contributed</li>
                    <li><strong>Vesting:</strong> Company match vests 20% per year (fully vested after 5 years)</li>
                </ul>
                
                <h3 style="margin-top: 20px;">Investment Options</h3>
                <ul>
                    <li>Target Date Funds (2030, 2040, 2050, 2060)</li>
                    <li>Index Funds (S&P 500, International, Bond)</li>
                    <li>Managed Portfolios (Conservative, Moderate, Aggressive)</li>
                    <li>Company Stock</li>
                </ul>
                
                <h3 style="margin-top: 20px;">Additional Features</h3>
                <ul>
                    <li>Loan provisions available (up to 50% of vested balance, max $50,000)</li>
                    <li>Roth 401(k) option available</li>
                    <li>Automatic rebalancing</li>
                    <li>Free financial planning consultations</li>
                </ul>
                
                <p style="margin-top: 20px;">Manage your account: <a href="#">www.fidelity.com/401k</a></p>
                <p>Financial advice: 1-800-555-RETIRE</p>
            `
        },
        life: {
            title: '💼 Life Insurance',
            details: `
                <h3>Basic Life Insurance (Company Paid)</h3>
                <ul>
                    <li><strong>Coverage Amount:</strong> 2x annual salary (up to $500,000)</li>
                    <li><strong>Cost:</strong> Company paid</li>
                    <li><strong>Portability:</strong> Can convert to individual policy if you leave company</li>
                </ul>
                
                <h3 style="margin-top: 20px;">Supplemental Life Insurance (Optional)</h3>
                <ul>
                    <li><strong>Employee:</strong> Purchase up to 5x salary ($25,000 increments)</li>
                    <li><strong>Spouse:</strong> Up to $250,000</li>
                    <li><strong>Children:</strong> Up to $20,000</li>
                    <li><strong>Evidence of Insurability:</strong> May be required for amounts over guaranteed issue</li>
                </ul>
                
                <p style="margin-top: 20px;">File a claim or update beneficiaries: 1-800-555-LIFE</p>
            `
        },
        disability: {
            title: '🏥 Disability Insurance',
            details: `
                <h3>Short-Term Disability (STD)</h3>
                <ul>
                    <li><strong>Coverage:</strong> 60% of weekly earnings</li>
                    <li><strong>Waiting Period:</strong> 7 days (accident), 7 days (illness)</li>
                    <li><strong>Duration:</strong> Up to 26 weeks</li>
                    <li><strong>Cost:</strong> Company paid</li>
                </ul>
                
                <h3 style="margin-top: 20px;">Long-Term Disability (LTD)</h3>
                <ul>
                    <li><strong>Coverage:</strong> 60% of monthly earnings (up to $10,000/month)</li>
                    <li><strong>Waiting Period:</strong> 180 days</li>
                    <li><strong>Duration:</strong> To age 65</li>
                    <li><strong>Cost:</strong> Company paid</li>
                </ul>
                
                <p style="margin-top: 20px;">File a claim: 1-800-555-DISABILITY</p>
            `
        },
        fsa: {
            title: '💳 Healthcare FSA',
            details: `
                <h3>Flexible Spending Account</h3>
                <ul>
                    <li><strong>Contribution Limit (2024):</strong> $3,050</li>
                    <li><strong>Use-it-or-lose-it:</strong> Funds must be used by December 31</li>
                    <li><strong>Grace Period:</strong> 2.5 months to submit claims</li>
                </ul>
                
                <h3 style="margin-top: 20px;">Eligible Expenses</h3>
                <ul>
                    <li>Medical copays and deductibles</li>
                    <li>Prescription medications</li>
                    <li>Dental and vision expenses</li>
                    <li>Over-the-counter medications (with prescription)</li>
                    <li>Medical equipment and supplies</li>
                </ul>
                
                <h3 style="margin-top: 20px;">FSA Debit Card</h3>
                <p>Use your FSA card at eligible providers and retailers. Receipts may be required for verification.</p>
                
                <p style="margin-top: 20px;">Manage your FSA: <a href="#">www.fsastore.com</a></p>
            `
        },
        eap: {
            title: '🤝 Employee Assistance Program',
            details: `
                <h3>Confidential Support Services</h3>
                <ul>
                    <li><strong>Counseling:</strong> Up to 6 free sessions per issue per year</li>
                    <li><strong>Available 24/7:</strong> Call anytime for immediate support</li>
                    <li><strong>Coverage:</strong> You and all household members</li>
                </ul>
                
                <h3 style="margin-top: 20px;">Services Offered</h3>
                <ul>
                    <li>Mental health counseling</li>
                    <li>Substance abuse support</li>
                    <li>Financial planning consultations</li>
                    <li>Legal consultations (30 minutes free)</li>
                    <li>Child care and elder care resources</li>
                    <li>Work-life balance coaching</li>
                    <li>Stress management</li>
                </ul>
                
                <p style="margin-top: 20px;"><strong>Confidential Support:</strong> 1-800-555-EAP (available 24/7)</p>
                <p>Website: <a href="#">www.eap.com</a> | Company Code: COMP2024</p>
            `
        }
    };
    
    const plan = planDetails[planType];
    if (plan) {
        showInfoModal(plan.title, plan.details);
    }
}

// Show information modal
function showInfoModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 700px;">
            <div class="modal-header">
                <h2>${title}</h2>
                <button class="modal-close" onclick="this.closest('.modal').remove()">×</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="this.closest('.modal').remove()">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Select a plan
function selectPlan(planType) {
    if (confirm(`Do you want to switch to the ${planType.toUpperCase()} plan? This will require approval and may take effect in the next enrollment period.`)) {
        showSuccessNotification(`Plan change request submitted for ${planType.toUpperCase()} plan. You will receive a confirmation email shortly.`);
    }
}

// Compare plans
function comparePlans(benefitType) {
    showSuccessNotification(`Opening ${benefitType} plan comparison tool...`);
}

// Enroll in a benefit
function enrollInBenefit(benefitType) {
    showModal('enrollmentModal');
}

// Submit enrollment
function submitEnrollment() {
    const form = document.getElementById('enrollmentForm');
    if (form.checkValidity()) {
        showSuccessNotification('Benefits enrollment submitted successfully! You will receive confirmation within 24-48 hours.');
        closeModal('enrollmentModal');
        form.reset();
    } else {
        form.reportValidity();
    }
}

// Beneficiary management
function addBeneficiary(type) {
    const name = prompt('Enter beneficiary name:');
    if (!name) return;
    
    const relationship = prompt('Enter relationship:');
    if (!relationship) return;
    
    const dob = prompt('Enter date of birth (MM/DD/YYYY):');
    if (!dob) return;
    
    const allocation = prompt('Enter allocation percentage (e.g., 50):');
    if (!allocation) return;
    
    const tableId = type === 'primary' ? 'primaryBeneficiariesTable' : 'contingentBeneficiariesTable';
    const tbody = document.getElementById(tableId);
    
    // Remove "no beneficiaries" message if it exists
    const emptyRow = tbody.querySelector('td[colspan]');
    if (emptyRow) {
        emptyRow.closest('tr').remove();
    }
    
    const newRow = tbody.insertRow();
    newRow.innerHTML = `
        <td><strong>${name}</strong></td>
        <td>${relationship}</td>
        <td>${dob}</td>
        <td><span class="badge badge-primary">${allocation}%</span></td>
        <td>
            <button class="btn btn-sm btn-outline" onclick="editBeneficiary(this)">Edit</button>
            <button class="btn btn-sm btn-outline" onclick="deleteBeneficiary(this)">Delete</button>
        </td>
    `;
    
    showSuccessNotification(`Beneficiary ${name} added successfully!`);
}

function editBeneficiary(button) {
    alert('Edit Beneficiary\n\nThis feature would allow you to modify beneficiary details.');
}

function deleteBeneficiary(button) {
    if (confirm('Are you sure you want to remove this beneficiary?')) {
        button.closest('tr').remove();
        showSuccessNotification('Beneficiary removed successfully!');
    }
}

// Cost Calculator
function calculateTotalCost() {
    const healthPlan = parseFloat(document.getElementById('calcHealthPlan').value) || 0;
    const coverageMultiplier = parseFloat(document.getElementById('calcCoverageType').value) || 1;
    const dentalPlan = parseFloat(document.getElementById('calcDentalPlan').value) || 0;
    const visionPlan = parseFloat(document.getElementById('calcVisionPlan').value) || 0;
    const contribution401k = parseFloat(document.getElementById('calc401k').value) || 0;
    const fsaAnnual = parseFloat(document.getElementById('calcFSA').value) || 0;
    
    // Assume monthly salary of $7,500 for calculations
    const monthlySalary = 7500;
    
    // Calculate individual costs
    const healthCost = healthPlan * coverageMultiplier;
    const dentalCost = dentalPlan;
    const visionCost = visionPlan;
    const retirement401k = monthlySalary * (contribution401k / 100);
    const fsaMonthly = fsaAnnual / 12;
    
    // Update display
    document.getElementById('costHealth').textContent = `$${healthCost.toFixed(2)}`;
    document.getElementById('costDental').textContent = `$${dentalCost.toFixed(2)}`;
    document.getElementById('costVision').textContent = `$${visionCost.toFixed(2)}`;
    document.getElementById('cost401k').textContent = `$${retirement401k.toFixed(2)}`;
    document.getElementById('costFSA').textContent = `$${fsaMonthly.toFixed(2)}`;
    
    // Calculate totals
    const monthlyTotal = healthCost + dentalCost + visionCost + retirement401k + fsaMonthly;
    const annualTotal = monthlyTotal * 12;
    
    document.getElementById('costTotal').textContent = `$${monthlyTotal.toFixed(2)}`;
    document.getElementById('costAnnual').textContent = `$${annualTotal.toFixed(2)}`;
}

// Success notification
function showSuccessNotification(message) {
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
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize calculator on page load
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('calcHealthPlan')) {
        calculateTotalCost();
    }
});
