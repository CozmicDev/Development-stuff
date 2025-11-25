// Employee Performance Management
document.addEventListener('DOMContentLoaded', function() {
    loadPerformanceData();
    initPerformanceChart();
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

// Initialize Performance Chart
function initPerformanceChart() {
    const ctx = document.getElementById('performanceChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [90, 10],
                backgroundColor: ['var(--secondary-color)', '#E5E7EB'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            cutout: '75%',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            }
        }
    });
}

// Load Performance Data
function loadPerformanceData() {
    const perfData = JSON.parse(localStorage.getItem('performanceData')) || getDefaultPerformanceData();
    localStorage.setItem('performanceData', JSON.stringify(perfData));
}

// Get Default Performance Data
function getDefaultPerformanceData() {
    return {
        overallRating: 4.5,
        goals: [],
        reviews: [],
        feedback: [],
        competencies: {}
    };
}

// Create Goal
function createGoal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 700px;">
            <div class="modal-header">
                <h3>Create New Goal</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Goal Title *</label>
                    <input type="text" id="goalTitle" placeholder="e.g., Complete Python Certification">
                </div>
                
                <div class="form-group">
                    <label>Description *</label>
                    <textarea id="goalDescription" rows="4" placeholder="Describe what you want to achieve..."></textarea>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Category *</label>
                        <select id="goalCategory">
                            <option value="">Select category...</option>
                            <option value="technical">Technical</option>
                            <option value="leadership">Leadership</option>
                            <option value="process">Process Improvement</option>
                            <option value="quality">Quality</option>
                            <option value="professional">Professional Development</option>
                            <option value="project">Project Delivery</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Due Date *</label>
                        <input type="date" id="goalDueDate">
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Success Criteria</label>
                    <textarea id="goalCriteria" rows="3" placeholder="How will you measure success? (Optional)"></textarea>
                </div>
                
                <div class="form-group">
                    <label>Align with Manager's Goals</label>
                    <select id="alignGoal">
                        <option value="">None</option>
                        <option value="team-velocity">Improve Team Velocity</option>
                        <option value="code-quality">Enhance Code Quality</option>
                        <option value="team-growth">Team Growth & Development</option>
                    </select>
                    <small>Link this goal to your manager's objectives</small>
                </div>

                <div style="padding: 16px; background: var(--primary-light); border-radius: 8px; margin-top: 16px;">
                    <h4 style="margin: 0 0 8px 0;">💡 SMART Goals Framework</h4>
                    <ul style="font-size: 13px; color: var(--text-secondary); margin: 8px 0 0 20px; line-height: 1.6;">
                        <li><strong>Specific:</strong> Clearly define what you want to achieve</li>
                        <li><strong>Measurable:</strong> Include metrics to track progress</li>
                        <li><strong>Achievable:</strong> Set realistic and attainable goals</li>
                        <li><strong>Relevant:</strong> Align with team and company objectives</li>
                        <li><strong>Time-bound:</strong> Set a clear deadline</li>
                    </ul>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Cancel</button>
                <button class="btn btn-primary" onclick="saveNewGoal()">Create Goal</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Save New Goal
function saveNewGoal() {
    const title = document.getElementById('goalTitle').value;
    const description = document.getElementById('goalDescription').value;
    const category = document.getElementById('goalCategory').value;
    const dueDate = document.getElementById('goalDueDate').value;
    
    if (!title || !description || !category || !dueDate) {
        alert('Please fill in all required fields');
        return;
    }
    
    document.querySelector('.modal').remove();
    showSuccessNotification('✓ Goal created successfully!');
    
    if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
        window.dataService.auditLog.log({
            action: 'goal_created',
            details: `Created goal: ${title}`,
            severity: 'info'
        });
    }
}

// Filter Goals
function filterGoals(status) {
    const cards = document.querySelectorAll('.goal-card');
    cards.forEach(card => {
        if (status === 'all') {
            card.style.display = 'block';
        } else {
            const cardStatus = card.getAttribute('data-status');
            card.style.display = cardStatus === status ? 'block' : 'none';
        }
    });
}

// View Goal Details
function viewGoalDetails(goalId) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 800px;">
            <div class="modal-header">
                <h3>Goal Details</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div style="margin-bottom: 24px;">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 16px;">
                        <div>
                            <h3 style="margin: 0 0 8px 0;">Complete React Migration Project</h3>
                            <span class="badge badge-primary">In Progress</span>
                        </div>
                        <button class="btn btn-sm btn-outline" onclick="editGoal('${goalId}')">✏️ Edit</button>
                    </div>
                    <p style="color: var(--text-secondary); line-height: 1.6;">
                        Migrate legacy Angular application to React with TypeScript to improve performance, 
                        maintainability, and developer experience.
                    </p>
                </div>
                
                <div class="form-row" style="margin-bottom: 24px;">
                    <div class="form-group">
                        <label>Category</label>
                        <input type="text" value="Technical" readonly>
                    </div>
                    <div class="form-group">
                        <label>Due Date</label>
                        <input type="text" value="January 31, 2025" readonly>
                    </div>
                    <div class="form-group">
                        <label>Created</label>
                        <input type="text" value="Oct 15, 2024" readonly>
                    </div>
                </div>
                
                <div style="margin-bottom: 24px;">
                    <h4 style="margin: 0 0 12px 0;">Progress: 75%</h4>
                    <div style="height: 12px; background: #E5E7EB; border-radius: 6px; overflow: hidden; margin-bottom: 8px;">
                        <div style="width: 75%; height: 100%; background: var(--primary-color);"></div>
                    </div>
                    <p style="font-size: 13px; color: var(--text-secondary);">Last updated: Dec 15, 2024</p>
                </div>
                
                <div style="margin-bottom: 24px;">
                    <h4 style="margin: 0 0 12px 0;">Success Criteria</h4>
                    <ul style="line-height: 1.8; color: var(--text-secondary);">
                        <li>✓ Complete component migration (45/60 components)</li>
                        <li>✓ Implement new state management (Redux → Context API)</li>
                        <li>⏱️ Achieve 80%+ test coverage (current: 72%)</li>
                        <li>⏱️ Improve page load time by 30% (current: 22%)</li>
                        <li>❌ Zero critical bugs in production</li>
                    </ul>
                </div>
                
                <div style="margin-bottom: 24px;">
                    <h4 style="margin: 0 0 12px 0;">Key Milestones</h4>
                    <div class="milestone-timeline">
                        <div class="milestone complete">
                            <div class="milestone-icon">✓</div>
                            <div class="milestone-content">
                                <strong>Project Setup & Planning</strong>
                                <p>Completed Oct 20, 2024</p>
                            </div>
                        </div>
                        <div class="milestone complete">
                            <div class="milestone-icon">✓</div>
                            <div class="milestone-content">
                                <strong>Core Components Migration</strong>
                                <p>Completed Nov 30, 2024</p>
                            </div>
                        </div>
                        <div class="milestone active">
                            <div class="milestone-icon">⏱️</div>
                            <div class="milestone-content">
                                <strong>Feature Modules Migration</strong>
                                <p>In Progress (Due Dec 31, 2024)</p>
                            </div>
                        </div>
                        <div class="milestone pending">
                            <div class="milestone-icon">○</div>
                            <div class="milestone-content">
                                <strong>Testing & Quality Assurance</strong>
                                <p>Scheduled for Jan 2025</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style="padding: 16px; background: var(--secondary-light); border-radius: 8px;">
                    <h4 style="margin: 0 0 8px 0; color: var(--secondary-color);">Manager's Comments</h4>
                    <p style="margin: 0; color: var(--text-secondary); font-size: 14px; line-height: 1.6;">
                        "Great progress on the React migration! The code quality has been excellent. 
                        Focus on increasing test coverage over the next few weeks to meet our quality standards."
                    </p>
                    <p style="margin: 8px 0 0 0; font-size: 13px; color: var(--text-secondary);">
                        - David Johnson, Dec 10, 2024
                    </p>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Close</button>
                <button class="btn btn-primary" onclick="updateGoalProgress('${goalId}')">Update Progress</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Update Goal Progress
function updateGoalProgress(goalId) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h3>Update Goal Progress</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Current Progress (%)</label>
                    <input type="range" id="progressSlider" min="0" max="100" value="75" 
                           oninput="updateProgressDisplay(this.value)">
                    <div style="display: flex; justify-content: space-between; margin-top: 8px;">
                        <span style="font-size: 13px; color: var(--text-secondary);">0%</span>
                        <span id="progressValue" style="font-size: 18px; font-weight: 600; color: var(--primary-color);">75%</span>
                        <span style="font-size: 13px; color: var(--text-secondary);">100%</span>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Progress Update *</label>
                    <textarea id="progressUpdate" rows="4" placeholder="What have you accomplished? Any challenges?"></textarea>
                </div>
                
                <div class="form-group">
                    <label>Milestones Completed (Optional)</label>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <label style="display: flex; align-items: center; gap: 8px;">
                            <input type="checkbox"> Completed core component migration
                        </label>
                        <label style="display: flex; align-items: center; gap: 8px;">
                            <input type="checkbox"> Implemented state management
                        </label>
                        <label style="display: flex; align-items: center; gap: 8px;">
                            <input type="checkbox"> Achieved test coverage target
                        </label>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>
                        <input type="checkbox" id="notifyManager">
                        Notify manager about this update
                    </label>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Cancel</button>
                <button class="btn btn-primary" onclick="saveProgressUpdate('${goalId}')">Save Update</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function updateProgressDisplay(value) {
    document.getElementById('progressValue').textContent = value + '%';
}

function saveProgressUpdate(goalId) {
    const update = document.getElementById('progressUpdate').value;
    
    if (!update) {
        alert('Please provide a progress update');
        return;
    }
    
    document.querySelector('.modal').remove();
    showSuccessNotification('✓ Progress updated successfully!');
    
    if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
        window.dataService.auditLog.log({
            action: 'goal_updated',
            details: `Updated progress for goal ${goalId}`,
            severity: 'info'
        });
    }
}

function editGoal(goalId) {
    showSuccessNotification('Opening goal editor...');
}

// Request Feedback
function requestFeedback() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h3>Request Feedback</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Request Feedback From *</label>
                    <select id="feedbackRecipient">
                        <option value="">Select person...</option>
                        <option value="manager">David Johnson (Manager)</option>
                        <option value="peer1">Mike Chen (Peer)</option>
                        <option value="peer2">Emily Rodriguez (Peer)</option>
                        <option value="peer3">Alex Turner (Peer)</option>
                        <option value="peer4">Lisa Wang (Peer)</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Feedback Topic *</label>
                    <select id="feedbackTopic">
                        <option value="">Select topic...</option>
                        <option value="project">Recent Project Work</option>
                        <option value="collaboration">Team Collaboration</option>
                        <option value="technical">Technical Skills</option>
                        <option value="communication">Communication</option>
                        <option value="leadership">Leadership</option>
                        <option value="general">General Performance</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Specific Areas for Feedback (Optional)</label>
                    <textarea id="feedbackAreas" rows="4" placeholder="What specific aspects would you like feedback on?"></textarea>
                </div>
                
                <div class="form-group">
                    <label>Context (Optional)</label>
                    <textarea id="feedbackContext" rows="3" placeholder="Provide any relevant context (project name, timeframe, etc.)"></textarea>
                </div>
                
                <div style="padding: 12px; background: var(--info-light); border-radius: 4px;">
                    <p style="margin: 0; font-size: 13px; color: var(--info-color);">
                        ℹ️ Feedback requests are sent via email. The recipient will have 7 days to respond.
                    </p>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Cancel</button>
                <button class="btn btn-primary" onclick="sendFeedbackRequest()">Send Request</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function sendFeedbackRequest() {
    const recipient = document.getElementById('feedbackRecipient').value;
    const topic = document.getElementById('feedbackTopic').value;
    
    if (!recipient || !topic) {
        alert('Please fill in all required fields');
        return;
    }
    
    document.querySelector('.modal').remove();
    showSuccessNotification('✓ Feedback request sent successfully!');
}

// View Full Review
function viewFullReview(reviewId) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 900px; max-height: 90vh; overflow-y: auto;">
            <div class="modal-header">
                <h3>Q4 2024 Performance Review</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div style="padding: 20px; background: var(--background); border-radius: 8px; margin-bottom: 24px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h4 style="margin: 0 0 8px 0;">Employee: Fatima Al Mazrouei</h4>
                            <p style="margin: 0; color: var(--text-secondary);">Position: Senior Software Engineer</p>
                            <p style="margin: 4px 0 0 0; color: var(--text-secondary);">Review Period: Oct 1 - Dec 31, 2024</p>
                        </div>
                        <div style="text-align: right;">
                            <p style="margin: 0; font-size: 48px; font-weight: 700; color: var(--secondary-color);">4.5</p>
                            <p style="margin: 0; color: var(--text-secondary);">Overall Rating</p>
                        </div>
                    </div>
                </div>
                
                <div style="margin-bottom: 24px;">
                    <h4 style="margin: 0 0 16px 0;">Rating Breakdown</h4>
                    <div style="display: grid; gap: 12px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: var(--background); border-radius: 4px;">
                            <span>Technical Skills</span>
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <div class="rating-stars">★★★★★</div>
                                <strong style="color: var(--secondary-color);">5.0</strong>
                            </div>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: var(--background); border-radius: 4px;">
                            <span>Communication</span>
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <div class="rating-stars">★★★★☆</div>
                                <strong style="color: var(--primary-color);">4.0</strong>
                            </div>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: var(--background); border-radius: 4px;">
                            <span>Team Collaboration</span>
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <div class="rating-stars">★★★★★</div>
                                <strong style="color: var(--secondary-color);">5.0</strong>
                            </div>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: var(--background); border-radius: 4px;">
                            <span>Problem Solving</span>
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <div class="rating-stars">★★★★★</div>
                                <strong style="color: var(--secondary-color);">5.0</strong>
                            </div>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: var(--background); border-radius: 4px;">
                            <span>Time Management</span>
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <div class="rating-stars">★★★★☆</div>
                                <strong style="color: var(--primary-color);">4.0</strong>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style="margin-bottom: 24px;">
                    <h4 style="margin: 0 0 12px 0;">Manager's Comments</h4>
                    <div style="padding: 16px; background: var(--background); border-radius: 8px; line-height: 1.8;">
                        <p><strong>Strengths:</strong></p>
                        <p>Sarah has demonstrated exceptional technical expertise throughout the quarter. Her work on the React 
                        migration project has been outstanding, with clean, maintainable code and excellent documentation. 
                        She consistently goes above and beyond to help team members and has become a go-to person for 
                        technical guidance. Her problem-solving abilities are excellent, and she approaches challenges 
                        systematically and thoroughly.</p>
                        
                        <p><strong>Areas for Development:</strong></p>
                        <p>While Sarah's contributions in meetings are valuable, there's opportunity to be more concise and 
                        focused. Working on time management, particularly around meeting efficiency, would be beneficial. 
                        Consider developing public speaking skills for larger presentations.</p>
                        
                        <p><strong>Goals for Next Quarter:</strong></p>
                        <ul>
                            <li>Complete React migration project</li>
                            <li>Obtain AWS certification</li>
                            <li>Continue mentoring junior developers</li>
                            <li>Lead one technical workshop for the team</li>
                        </ul>
                    </div>
                </div>
                
                <div style="padding: 16px; background: var(--secondary-light); border-radius: 8px;">
                    <p style="margin: 0; font-size: 14px;">
                        <strong>Reviewed by:</strong> David Johnson, Engineering Manager<br>
                        <strong>Review Date:</strong> December 10, 2024<br>
                        <strong>Employee Acknowledged:</strong> December 12, 2024
                    </p>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Close</button>
                <button class="btn btn-primary" onclick="downloadReview('${reviewId}')">Download PDF</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function downloadReview(reviewId) {
    showSuccessNotification('✓ Downloading review as PDF...');
}

// Filter Feedback
function filterFeedback(type) {
    showSuccessNotification(`Filtering feedback: ${type}`);
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

// Add CSS for goals, reviews, feedback, and competencies
const style = document.createElement('style');
style.textContent = `
    .goals-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 20px;
    }
    
    .goal-card {
        padding: 20px;
        border: 1px solid #E5E7EB;
        border-radius: 8px;
        transition: all 0.3s ease;
    }
    
    .goal-card:hover {
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        transform: translateY(-2px);
    }
    
    .goal-header {
        display: flex;
        justify-content: space-between;
        align-items: start;
        margin-bottom: 12px;
    }
    
    .goal-header h4 {
        margin: 0;
        font-size: 16px;
        flex: 1;
    }
    
    .goal-description {
        font-size: 14px;
        color: var(--text-secondary);
        line-height: 1.6;
        margin-bottom: 16px;
    }
    
    .goal-progress {
        margin: 16px 0;
    }
    
    .goal-meta {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        margin: 16px 0;
        font-size: 13px;
        color: var(--text-secondary);
    }
    
    .goal-actions {
        display: flex;
        gap: 8px;
        margin-top: 16px;
    }
    
    .goal-actions button {
        flex: 1;
    }
    
    .review-timeline {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }
    
    .review-item {
        padding: 24px;
        border: 1px solid #E5E7EB;
        border-radius: 8px;
    }
    
    .review-period {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
    }
    
    .review-period h4 {
        margin: 0;
        font-size: 18px;
    }
    
    .review-date, .review-reviewer {
        font-size: 14px;
        color: var(--text-secondary);
        margin: 4px 0;
    }
    
    .review-rating {
        margin: 20px 0;
    }
    
    .rating-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        background: var(--background);
        border-radius: 8px;
        margin-bottom: 16px;
    }
    
    .rating-breakdown {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    
    .rating-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        border-bottom: 1px solid #E5E7EB;
    }
    
    .rating-row:last-child {
        border-bottom: none;
    }
    
    .rating-stars {
        color: #FCD34D;
        font-size: 16px;
    }
    
    .review-actions {
        display: flex;
        gap: 12px;
        margin-top: 16px;
    }
    
    .feedback-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    
    .feedback-card {
        padding: 20px;
        border: 1px solid #E5E7EB;
        border-radius: 8px;
    }
    
    .feedback-header {
        display: flex;
        justify-content: space-between;
        align-items: start;
        margin-bottom: 12px;
    }
    
    .feedback-header h4 {
        margin: 0 0 8px 0;
        font-size: 16px;
    }
    
    .feedback-from {
        font-size: 13px;
        color: var(--text-secondary);
        margin: 0;
    }
    
    .feedback-content {
        font-size: 14px;
        color: var(--text-primary);
        line-height: 1.6;
        margin: 12px 0;
    }
    
    .feedback-tags {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        margin-top: 12px;
    }
    
    .tag {
        padding: 4px 12px;
        background: var(--primary-light);
        color: var(--primary-color);
        border-radius: 12px;
        font-size: 12px;
        font-weight: 500;
    }
    
    .competency-grid {
        display: grid;
        gap: 32px;
    }
    
    .competency-section h4 {
        margin: 0 0 20px 0;
        font-size: 18px;
        color: var(--primary-color);
    }
    
    .competency-item {
        margin-bottom: 24px;
    }
    
    .competency-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
    }
    
    .competency-bar {
        height: 12px;
        background: #E5E7EB;
        border-radius: 6px;
        overflow: hidden;
        margin-bottom: 4px;
    }
    
    .competency-bar > div {
        height: 100%;
        transition: width 0.3s ease;
    }
    
    .competency-level {
        font-size: 13px;
        color: var(--text-secondary);
    }
    
    .milestone-timeline {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    
    .milestone {
        display: flex;
        gap: 16px;
        align-items: start;
    }
    
    .milestone-icon {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        flex-shrink: 0;
    }
    
    .milestone.complete .milestone-icon {
        background: var(--secondary-color);
        color: white;
    }
    
    .milestone.active .milestone-icon {
        background: var(--primary-color);
        color: white;
    }
    
    .milestone.pending .milestone-icon {
        background: #E5E7EB;
        color: var(--text-secondary);
    }
    
    .milestone-content strong {
        display: block;
        margin-bottom: 4px;
    }
    
    .milestone-content p {
        margin: 0;
        font-size: 13px;
        color: var(--text-secondary);
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
