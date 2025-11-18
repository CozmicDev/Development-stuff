// Manager Performance Reviews
document.addEventListener('DOMContentLoaded', function() {
    loadReviewData();
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

// Load Review Data
function loadReviewData() {
    const reviewData = JSON.parse(localStorage.getItem('reviewData')) || getDefaultReviewData();
    localStorage.setItem('reviewData', JSON.stringify(reviewData));
}

// Get Default Review Data
function getDefaultReviewData() {
    return {
        pending: [],
        inProgress: [],
        completed: []
    };
}

// View Review Calendar
function viewReviewCalendar() {
    switchTab('schedule');
}

// Start New Review
function startNewReview() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h3>Start New Performance Review</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Select Employee *</label>
                    <select id="reviewEmployee">
                        <option value="">Choose employee...</option>
                        <option value="sarah">Sarah Johnson - Senior Software Engineer</option>
                        <option value="mike">Mike Chen - Software Engineer</option>
                        <option value="emily">Emily Rodriguez - Junior Software Engineer</option>
                        <option value="alex">Alex Turner - Software Engineer</option>
                        <option value="lisa">Lisa Wang - UI/UX Designer</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Review Type *</label>
                    <select id="reviewType">
                        <option value="quarterly">Quarterly Performance Review</option>
                        <option value="annual">Annual Performance Review</option>
                        <option value="mid-year">Mid-Year Review</option>
                        <option value="probation">Probation Review</option>
                        <option value="promotion">Promotion Review</option>
                    </select>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Review Period Start *</label>
                        <input type="date" id="periodStart">
                    </div>
                    <div class="form-group">
                        <label>Review Period End *</label>
                        <input type="date" id="periodEnd">
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Due Date *</label>
                    <input type="date" id="dueDate">
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Cancel</button>
                <button class="btn btn-primary" onclick="createReview()">Create Review</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function createReview() {
    const employee = document.getElementById('reviewEmployee').value;
    const type = document.getElementById('reviewType').value;
    
    if (!employee || !type) {
        alert('Please fill in all required fields');
        return;
    }
    
    document.querySelector('.modal').remove();
    showSuccessNotification('✓ Review created successfully!');
    
    // Open the review form
    setTimeout(() => startReview(employee), 500);
}

// Start Review (Main Review Form)
function startReview(employeeId) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 1000px; max-height: 90vh; overflow-y: auto;">
            <div class="modal-header">
                <div>
                    <h3>Performance Review - Sarah Johnson</h3>
                    <p style="margin: 4px 0 0 0; color: var(--text-secondary);">
                        Senior Software Engineer | Review Period: Q4 2024
                    </p>
                </div>
                <button class="close-btn" onclick="confirmCloseReview()">&times;</button>
            </div>
            <div class="modal-body">
                <!-- Progress Bar -->
                <div style="margin-bottom: 24px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="font-size: 14px; font-weight: 500;">Review Completion</span>
                        <span id="reviewProgress" style="font-size: 14px; font-weight: 600; color: var(--primary-color);">0%</span>
                    </div>
                    <div style="height: 8px; background: #E5E7EB; border-radius: 4px; overflow: hidden;">
                        <div id="reviewProgressBar" style="width: 0%; height: 100%; background: var(--primary-color); transition: width 0.3s;"></div>
                    </div>
                </div>

                <!-- Section 1: Performance Ratings -->
                <div class="review-section">
                    <h4>1. Performance Ratings</h4>
                    <p style="color: var(--text-secondary); margin-bottom: 16px;">
                        Rate the employee's performance in each competency area (1 = Needs Improvement, 5 = Exceptional)
                    </p>
                    
                    <div class="rating-section">
                        <div class="rating-item">
                            <label>Technical Skills & Expertise</label>
                            <div class="star-rating" data-category="technical">
                                <span class="star" data-value="1">☆</span>
                                <span class="star" data-value="2">☆</span>
                                <span class="star" data-value="3">☆</span>
                                <span class="star" data-value="4">☆</span>
                                <span class="star" data-value="5">☆</span>
                            </div>
                        </div>
                        
                        <div class="rating-item">
                            <label>Communication & Collaboration</label>
                            <div class="star-rating" data-category="communication">
                                <span class="star" data-value="1">☆</span>
                                <span class="star" data-value="2">☆</span>
                                <span class="star" data-value="3">☆</span>
                                <span class="star" data-value="4">☆</span>
                                <span class="star" data-value="5">☆</span>
                            </div>
                        </div>
                        
                        <div class="rating-item">
                            <label>Problem Solving & Innovation</label>
                            <div class="star-rating" data-category="problem-solving">
                                <span class="star" data-value="1">☆</span>
                                <span class="star" data-value="2">☆</span>
                                <span class="star" data-value="3">☆</span>
                                <span class="star" data-value="4">☆</span>
                                <span class="star" data-value="5">☆</span>
                            </div>
                        </div>
                        
                        <div class="rating-item">
                            <label>Quality of Work</label>
                            <div class="star-rating" data-category="quality">
                                <span class="star" data-value="1">☆</span>
                                <span class="star" data-value="2">☆</span>
                                <span class="star" data-value="3">☆</span>
                                <span class="star" data-value="4">☆</span>
                                <span class="star" data-value="5">☆</span>
                            </div>
                        </div>
                        
                        <div class="rating-item">
                            <label>Time Management & Productivity</label>
                            <div class="star-rating" data-category="time-management">
                                <span class="star" data-value="1">☆</span>
                                <span class="star" data-value="2">☆</span>
                                <span class="star" data-value="3">☆</span>
                                <span class="star" data-value="4">☆</span>
                                <span class="star" data-value="5">☆</span>
                            </div>
                        </div>
                        
                        <div class="rating-item">
                            <label>Team Collaboration</label>
                            <div class="star-rating" data-category="teamwork">
                                <span class="star" data-value="1">☆</span>
                                <span class="star" data-value="2">☆</span>
                                <span class="star" data-value="3">☆</span>
                                <span class="star" data-value="4">☆</span>
                                <span class="star" data-value="5">☆</span>
                            </div>
                        </div>
                    </div>
                    
                    <div style="margin-top: 24px; padding: 16px; background: var(--background); border-radius: 8px;">
                        <strong>Overall Performance Rating: <span id="overallRating" style="color: var(--primary-color);">Not yet calculated</span></strong>
                    </div>
                </div>

                <!-- Section 2: Key Achievements -->
                <div class="review-section">
                    <h4>2. Key Achievements & Strengths</h4>
                    <p style="color: var(--text-secondary); margin-bottom: 16px;">
                        Highlight major accomplishments, projects delivered, and strengths demonstrated
                    </p>
                    <textarea id="achievements" rows="6" placeholder="What did the employee accomplish this period? What are their key strengths?"></textarea>
                </div>

                <!-- Section 3: Areas for Development -->
                <div class="review-section">
                    <h4>3. Areas for Development</h4>
                    <p style="color: var(--text-secondary); margin-bottom: 16px;">
                        Identify areas where the employee can improve and grow
                    </p>
                    <textarea id="development" rows="6" placeholder="What areas should the employee focus on improving?"></textarea>
                </div>

                <!-- Section 4: Goals Review -->
                <div class="review-section">
                    <h4>4. Goals Review - Q4 2024</h4>
                    <p style="color: var(--text-secondary); margin-bottom: 16px;">
                        Review progress on goals set for this period
                    </p>
                    
                    <div class="goal-review-item">
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                            <strong>Complete React Migration Project</strong>
                            <select style="width: 150px;" onchange="updateGoalStatus(this)">
                                <option value="">Select status...</option>
                                <option value="exceeded">Exceeded</option>
                                <option value="achieved">Achieved</option>
                                <option value="partially">Partially Achieved</option>
                                <option value="not-achieved">Not Achieved</option>
                            </select>
                        </div>
                        <textarea rows="3" placeholder="Comments on goal achievement..."></textarea>
                    </div>
                    
                    <div class="goal-review-item">
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                            <strong>Obtain AWS Solutions Architect Certification</strong>
                            <select style="width: 150px;" onchange="updateGoalStatus(this)">
                                <option value="">Select status...</option>
                                <option value="exceeded">Exceeded</option>
                                <option value="achieved">Achieved</option>
                                <option value="partially">Partially Achieved</option>
                                <option value="not-achieved">Not Achieved</option>
                            </select>
                        </div>
                        <textarea rows="3" placeholder="Comments on goal achievement..."></textarea>
                    </div>
                </div>

                <!-- Section 5: Goals for Next Period -->
                <div class="review-section">
                    <h4>5. Goals for Next Period (Q1 2025)</h4>
                    <p style="color: var(--text-secondary); margin-bottom: 16px;">
                        Set SMART goals for the upcoming review period
                    </p>
                    
                    <div id="newGoalsList"></div>
                    
                    <button class="btn btn-outline" onclick="addGoalInput()">+ Add Goal</button>
                </div>

                <!-- Section 6: Development Plan -->
                <div class="review-section">
                    <h4>6. Development Plan</h4>
                    <p style="color: var(--text-secondary); margin-bottom: 16px;">
                        Recommend training, mentorship, or development opportunities
                    </p>
                    <textarea id="developmentPlan" rows="5" placeholder="What training or development activities would benefit this employee?"></textarea>
                </div>

                <!-- Section 7: Overall Comments -->
                <div class="review-section">
                    <h4>7. Overall Comments</h4>
                    <p style="color: var(--text-secondary); margin-bottom: 16px;">
                        Summarize the employee's overall performance and future potential
                    </p>
                    <textarea id="overallComments" rows="5" placeholder="Provide a comprehensive summary of the employee's performance..."></textarea>
                </div>

                <!-- Section 8: Recommendations -->
                <div class="review-section">
                    <h4>8. Recommendations</h4>
                    
                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="promotionReady">
                            Ready for promotion consideration
                        </label>
                    </div>
                    
                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="raiseRecommended">
                            Recommend salary increase
                        </label>
                    </div>
                    
                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="bonusRecommended">
                            Recommend performance bonus
                        </label>
                    </div>
                    
                    <div class="form-group">
                        <label>Additional Recommendations</label>
                        <textarea id="recommendations" rows="4" placeholder="Any additional recommendations..."></textarea>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="saveDraft('${employeeId}')">💾 Save Draft</button>
                <button class="btn btn-outline" onclick="previewReview('${employeeId}')">👁️ Preview</button>
                <button class="btn btn-primary" onclick="submitReview('${employeeId}')">Submit Review</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    initializeStarRatings();
    initializeReviewProgressTracking();
}

// Initialize Star Ratings
function initializeStarRatings() {
    document.querySelectorAll('.star-rating').forEach(ratingEl => {
        const stars = ratingEl.querySelectorAll('.star');
        
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const value = this.getAttribute('data-value');
                const category = ratingEl.getAttribute('data-category');
                
                // Update stars
                stars.forEach(s => {
                    if (s.getAttribute('data-value') <= value) {
                        s.textContent = '★';
                        s.style.color = '#FCD34D';
                    } else {
                        s.textContent = '☆';
                        s.style.color = '#9CA3AF';
                    }
                });
                
                calculateOverallRating();
                updateReviewProgress();
            });
            
            star.addEventListener('mouseenter', function() {
                const value = this.getAttribute('data-value');
                stars.forEach(s => {
                    if (s.getAttribute('data-value') <= value) {
                        s.style.color = '#FCD34D';
                    }
                });
            });
            
            star.addEventListener('mouseleave', function() {
                stars.forEach(s => {
                    if (s.textContent === '☆') {
                        s.style.color = '#9CA3AF';
                    }
                });
            });
        });
    });
}

// Calculate Overall Rating
function calculateOverallRating() {
    const ratings = [];
    document.querySelectorAll('.star-rating').forEach(ratingEl => {
        const filledStars = ratingEl.querySelectorAll('.star[textContent="★"]');
        let count = 0;
        ratingEl.querySelectorAll('.star').forEach(star => {
            if (star.textContent === '★') count++;
        });
        if (count > 0) ratings.push(count);
    });
    
    if (ratings.length > 0) {
        const avg = (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1);
        document.getElementById('overallRating').textContent = `${avg} / 5.0`;
    }
}

// Initialize Review Progress Tracking
function initializeReviewProgressTracking() {
    const inputs = document.querySelectorAll('textarea, input[type="checkbox"], select');
    inputs.forEach(input => {
        input.addEventListener('input', updateReviewProgress);
        input.addEventListener('change', updateReviewProgress);
    });
}

// Update Review Progress
function updateReviewProgress() {
    const total = 8; // Number of sections
    let completed = 0;
    
    // Check ratings
    const ratingsComplete = document.querySelectorAll('.star[textContent="★"]').length >= 6;
    if (ratingsComplete) completed++;
    
    // Check other sections
    if (document.getElementById('achievements')?.value.length > 50) completed++;
    if (document.getElementById('development')?.value.length > 50) completed++;
    if (document.querySelectorAll('.goal-review-item select').length > 0) completed++;
    if (document.getElementById('newGoalsList')?.children.length > 0) completed++;
    if (document.getElementById('developmentPlan')?.value.length > 50) completed++;
    if (document.getElementById('overallComments')?.value.length > 50) completed++;
    if (document.getElementById('recommendations')?.value.length > 0) completed++;
    
    const percentage = Math.round((completed / total) * 100);
    document.getElementById('reviewProgress').textContent = `${percentage}%`;
    document.getElementById('reviewProgressBar').style.width = `${percentage}%`;
}

// Add Goal Input
function addGoalInput() {
    const container = document.getElementById('newGoalsList');
    const goalDiv = document.createElement('div');
    goalDiv.className = 'new-goal-item';
    goalDiv.innerHTML = `
        <div style="display: flex; gap: 12px; margin-bottom: 12px;">
            <input type="text" placeholder="Goal title..." style="flex: 1;">
            <button class="btn btn-sm btn-outline" onclick="this.closest('.new-goal-item').remove()">Remove</button>
        </div>
        <textarea rows="3" placeholder="Goal description and success criteria..."></textarea>
    `;
    container.appendChild(goalDiv);
    updateReviewProgress();
}

// Confirm Close Review
function confirmCloseReview() {
    if (confirm('Are you sure you want to close? Unsaved changes will be lost.')) {
        document.querySelector('.modal').remove();
    }
}

// Save Draft
function saveDraft(employeeId) {
    showSuccessNotification('✓ Review draft saved successfully!');
    
    if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
        window.dataService.auditLog.log({
            action: 'review_draft_saved',
            details: `Saved review draft for ${employeeId}`,
            severity: 'info'
        });
    }
}

// Preview Review
function previewReview(employeeId) {
    showSuccessNotification('Opening review preview...');
}

// Submit Review
function submitReview(employeeId) {
    if (confirm('Are you sure you want to submit this review? The employee will be notified and the review cannot be edited after submission.')) {
        document.querySelector('.modal').remove();
        showSuccessNotification('✓ Performance review submitted successfully!');
        
        if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
            window.dataService.auditLog.log({
                action: 'review_submitted',
                details: `Submitted performance review for ${employeeId}`,
                severity: 'info'
            });
        }
    }
}

// Continue Review
function continueReview(employeeId) {
    startReview(employeeId);
}

// View Draft
function viewDraft(employeeId) {
    startReview(employeeId);
}

// View Employee Profile
function viewEmployeeProfile(employeeId) {
    showSuccessNotification('Opening employee profile...');
}

// View Goals
function viewGoals(employeeId) {
    showSuccessNotification('Loading employee goals...');
}

// Update Goal Status
function updateGoalStatus(select) {
    updateReviewProgress();
}

// View Completed Review
function viewCompletedReview(reviewId) {
    showSuccessNotification('Loading completed review...');
}

// Export Review
function exportReview(reviewId) {
    showSuccessNotification('✓ Exporting review as PDF...');
}

// Filter Completed
function filterCompleted(period) {
    showSuccessNotification(`Filtering reviews: ${period}`);
}

// Schedule Review Cycle
function scheduleReviewCycle(cycle) {
    showSuccessNotification(`Configuring review cycle: ${cycle}`);
}

// Export Schedule
function exportSchedule() {
    showSuccessNotification('✓ Exporting review schedule...');
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

// Add CSS for review components
const style = document.createElement('style');
style.textContent = `
    .review-list {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    
    .review-card {
        padding: 24px;
        border: 1px solid #E5E7EB;
        border-radius: 8px;
        transition: all 0.3s ease;
    }
    
    .review-card:hover {
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    
    .review-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
    }
    
    .employee-info {
        display: flex;
        gap: 16px;
        align-items: center;
    }
    
    .avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: var(--primary-light);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
    }
    
    .employee-info h4 {
        margin: 0 0 4px 0;
    }
    
    .employee-info p {
        margin: 0;
        font-size: 14px;
        color: var(--text-secondary);
    }
    
    .review-details {
        display: grid;
        gap: 8px;
        margin: 16px 0;
        padding: 16px;
        background: var(--background);
        border-radius: 8px;
    }
    
    .detail-item {
        display: flex;
        gap: 8px;
        font-size: 14px;
    }
    
    .detail-label {
        font-weight: 600;
        min-width: 120px;
    }
    
    .review-actions {
        display: flex;
        gap: 8px;
        margin-top: 16px;
    }
    
    .rating-badge {
        padding: 6px 16px;
        border-radius: 20px;
        font-weight: 600;
        font-size: 14px;
    }
    
    .rating-badge.excellent {
        background: var(--secondary-light);
        color: var(--secondary-color);
    }
    
    .rating-badge.good {
        background: var(--primary-light);
        color: var(--primary-color);
    }
    
    .rating-badge.satisfactory {
        background: var(--warning-light);
        color: var(--warning-color);
    }
    
    .schedule-timeline {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }
    
    .schedule-quarter {
        padding: 24px;
        border: 1px solid #E5E7EB;
        border-radius: 8px;
    }
    
    .schedule-quarter.highlight {
        border: 2px solid var(--warning-color);
        background: var(--warning-light);
    }
    
    .schedule-quarter h4 {
        margin: 0 0 8px 0;
    }
    
    .schedule-period {
        margin: 0 0 16px 0;
        color: var(--text-secondary);
        font-size: 14px;
    }
    
    .schedule-employees {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin: 16px 0;
    }
    
    .employee-chip {
        padding: 6px 12px;
        background: var(--primary-light);
        color: var(--primary-color);
        border-radius: 16px;
        font-size: 13px;
        font-weight: 500;
    }
    
    .review-section {
        margin-bottom: 32px;
        padding-bottom: 32px;
        border-bottom: 1px solid #E5E7EB;
    }
    
    .review-section:last-child {
        border-bottom: none;
    }
    
    .review-section h4 {
        margin: 0 0 12px 0;
        color: var(--primary-color);
    }
    
    .review-section textarea {
        width: 100%;
        padding: 12px;
        border: 1px solid #E5E7EB;
        border-radius: 8px;
        font-family: inherit;
        font-size: 14px;
        resize: vertical;
    }
    
    .rating-section {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    
    .rating-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px;
        background: var(--background);
        border-radius: 8px;
    }
    
    .rating-item label {
        font-weight: 500;
    }
    
    .star-rating {
        display: flex;
        gap: 4px;
    }
    
    .star {
        font-size: 28px;
        cursor: pointer;
        color: #9CA3AF;
        transition: all 0.2s;
    }
    
    .star:hover {
        transform: scale(1.2);
    }
    
    .goal-review-item {
        padding: 16px;
        background: var(--background);
        border-radius: 8px;
        margin-bottom: 16px;
    }
    
    .goal-review-item textarea {
        width: 100%;
        margin-top: 8px;
    }
    
    .new-goal-item {
        padding: 16px;
        background: var(--background);
        border-radius: 8px;
        margin-bottom: 16px;
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
