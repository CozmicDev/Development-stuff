// Recruitment Management JavaScript

// Tab switching
function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(`${tabName}-tab`).classList.add('active');
    event.target.classList.add('active');
}

// Create Job Posting
function createJobPosting() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 700px;">
            <div class="modal-header">
                <h2>Create Job Posting</h2>
                <button class="close-btn" onclick="this.closest('.modal').remove()">×</button>
            </div>
            <div class="modal-body">
                <form id="createJobForm">
                    <div class="form-group">
                        <label>Job Title *</label>
                        <input type="text" required placeholder="e.g., Senior Software Engineer">
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Department *</label>
                            <select required>
                                <option value="">Select department</option>
                                <option value="engineering">Engineering</option>
                                <option value="design">Design</option>
                                <option value="product">Product</option>
                                <option value="marketing">Marketing</option>
                                <option value="sales">Sales</option>
                                <option value="hr">Human Resources</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Employment Type *</label>
                            <select required>
                                <option value="">Select type</option>
                                <option value="fulltime">Full-time</option>
                                <option value="parttime">Part-time</option>
                                <option value="contract">Contract</option>
                                <option value="intern">Internship</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Location Type *</label>
                            <select required>
                                <option value="">Select type</option>
                                <option value="remote">Remote</option>
                                <option value="onsite">On-site</option>
                                <option value="hybrid">Hybrid</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Location</label>
                            <input type="text" placeholder="e.g., San Francisco, CA">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Salary Range (Min) *</label>
                            <input type="number" required placeholder="80000">
                        </div>
                        <div class="form-group">
                            <label>Salary Range (Max) *</label>
                            <input type="number" required placeholder="120000">
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Job Description *</label>
                        <textarea rows="4" required placeholder="Describe the role, responsibilities, and what the candidate will be doing..."></textarea>
                    </div>

                    <div class="form-group">
                        <label>Requirements *</label>
                        <textarea rows="3" required placeholder="List required skills, experience, education..."></textarea>
                    </div>

                    <div class="form-group">
                        <label>Preferred Qualifications</label>
                        <textarea rows="2" placeholder="Nice-to-have skills and experience..."></textarea>
                    </div>

                    <div class="form-group">
                        <label>Hiring Manager *</label>
                        <select required>
                            <option value="">Select manager</option>
                            <option value="sarah">Sarah Johnson - Engineering Manager</option>
                            <option value="jessica">Jessica Lee - Product Manager</option>
                            <option value="lisa">Lisa Wang - Design Lead</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Publish To</label>
                        <div class="checkbox-group">
                            <label class="checkbox-label">
                                <input type="checkbox" checked>
                                <span>Company Website</span>
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox" checked>
                                <span>LinkedIn</span>
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox">
                                <span>Indeed</span>
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox">
                                <span>Glassdoor</span>
                            </label>
                        </div>
                    </div>

                    <div class="form-actions">
                        <button type="button" class="btn btn-outline" onclick="this.closest('.modal').remove()">Cancel</button>
                        <button type="submit" class="btn btn-primary">Create Job Posting</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);

    document.getElementById('createJobForm').addEventListener('submit', function(e) {
        e.preventDefault();
        showNotification('Job posting created successfully', 'success');
        document.querySelector('.modal').remove();
        logAudit('Created new job posting');
        setTimeout(() => location.reload(), 1000);
    });
}

// View Job Details
function viewJobDetails(jobId) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 800px;">
            <div class="modal-header">
                <h2>Senior Full Stack Developer</h2>
                <button class="close-btn" onclick="this.closest('.modal').remove()">×</button>
            </div>
            <div class="modal-body">
                <div class="job-full-details">
                    <div class="detail-section">
                        <h4>Job Information</h4>
                        <div class="info-grid">
                            <div class="info-item">
                                <span class="info-label">Department:</span>
                                <span>Engineering</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Employment Type:</span>
                                <span>Full-time</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Location:</span>
                                <span>Remote (US)</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Salary Range:</span>
                                <span>$120,000 - $160,000</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Posted Date:</span>
                                <span>December 13, 2024</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Hiring Manager:</span>
                                <span>Sarah Johnson</span>
                            </div>
                        </div>
                    </div>

                    <div class="detail-section">
                        <h4>Description</h4>
                        <p>We're seeking an experienced Full Stack Developer to join our engineering team. You'll be responsible for building scalable web applications using modern technologies including React, Node.js, and cloud platforms.</p>
                    </div>

                    <div class="detail-section">
                        <h4>Requirements</h4>
                        <ul>
                            <li>5+ years of experience in full stack development</li>
                            <li>Strong proficiency in React and Node.js</li>
                            <li>Experience with cloud platforms (AWS, Azure, or GCP)</li>
                            <li>Knowledge of database design and optimization</li>
                            <li>Excellent problem-solving skills</li>
                        </ul>
                    </div>

                    <div class="detail-section">
                        <h4>Preferred Qualifications</h4>
                        <ul>
                            <li>Experience with TypeScript</li>
                            <li>Knowledge of CI/CD pipelines</li>
                            <li>Contribution to open-source projects</li>
                        </ul>
                    </div>

                    <div class="detail-section">
                        <h4>Application Statistics</h4>
                        <div class="stats-row">
                            <div class="stat-box">
                                <span class="stat-number">18</span>
                                <span class="stat-label">Total Applications</span>
                            </div>
                            <div class="stat-box">
                                <span class="stat-number">6</span>
                                <span class="stat-label">In Screening</span>
                            </div>
                            <div class="stat-box">
                                <span class="stat-number">3</span>
                                <span class="stat-label">Interviewing</span>
                            </div>
                            <div class="stat-box">
                                <span class="stat-number">1</span>
                                <span class="stat-label">Offers Made</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="form-actions">
                    <button class="btn btn-outline" onclick="editJob('${jobId}')">Edit Job</button>
                    <button class="btn btn-outline" onclick="viewCandidates('${jobId}')">View Candidates</button>
                    <button class="btn btn-primary" onclick="this.closest('.modal').remove()">Close</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
}

// Edit Job
function editJob(jobId) {
    showNotification('Opening job editor...', 'info');
    // Would open similar modal to createJobPosting but with pre-filled data
}

// Close Job
function closeJob(jobId) {
    if (confirm('Close this job posting? This will stop accepting new applications.')) {
        showNotification('Job posting closed', 'success');
        logAudit(`Closed job posting: ${jobId}`);
        setTimeout(() => location.reload(), 1000);
    }
}

// View Candidate Profile
function viewCandidate(candidateId) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 800px;">
            <div class="modal-header">
                <h2>Candidate Profile</h2>
                <button class="close-btn" onclick="this.closest('.modal').remove()">×</button>
            </div>
            <div class="modal-body">
                <div class="candidate-profile">
                    <div class="profile-header">
                        <div class="profile-avatar-large">JD</div>
                        <div class="profile-info">
                            <h3>John Doe</h3>
                            <p class="profile-title">Senior Software Engineer</p>
                            <p class="profile-contact">📧 john.doe@email.com | 📞 +971 50 123 4567</p>
                            <p class="profile-location">📍 San Francisco, CA</p>
                        </div>
                        <div class="profile-rating">
                            <div class="rating-stars">⭐⭐⭐⭐⭐</div>
                            <span>5.0 / 5.0</span>
                        </div>
                    </div>

                    <div class="profile-section">
                        <h4>Applied For</h4>
                        <p><strong>Senior Full Stack Developer</strong> - Applied 2 days ago</p>
                        <span class="badge badge-info">Applied</span>
                    </div>

                    <div class="profile-section">
                        <h4>Experience</h4>
                        <div class="experience-item">
                            <h5>Senior Software Engineer - Tech Corp</h5>
                            <p class="exp-duration">Jan 2020 - Present (4 years)</p>
                            <p>Led development of microservices architecture serving 1M+ users. Built scalable APIs using Node.js and React.</p>
                        </div>
                        <div class="experience-item">
                            <h5>Software Engineer - StartupCo</h5>
                            <p class="exp-duration">Jun 2017 - Dec 2019 (2.5 years)</p>
                            <p>Full stack development of customer-facing web applications. Worked with React, Python, and AWS.</p>
                        </div>
                    </div>

                    <div class="profile-section">
                        <h4>Skills</h4>
                        <div class="skills-list">
                            <span class="skill-tag">React</span>
                            <span class="skill-tag">Node.js</span>
                            <span class="skill-tag">TypeScript</span>
                            <span class="skill-tag">AWS</span>
                            <span class="skill-tag">PostgreSQL</span>
                            <span class="skill-tag">Docker</span>
                            <span class="skill-tag">Kubernetes</span>
                            <span class="skill-tag">CI/CD</span>
                        </div>
                    </div>

                    <div class="profile-section">
                        <h4>Education</h4>
                        <div class="education-item">
                            <h5>Bachelor of Science in Computer Science</h5>
                            <p>University of California, Berkeley - 2017</p>
                        </div>
                    </div>

                    <div class="profile-section">
                        <h4>Resume</h4>
                        <button class="btn btn-outline" onclick="viewResume('${candidateId}')">📄 View Resume</button>
                        <button class="btn btn-outline" onclick="downloadResume('${candidateId}')">📥 Download Resume</button>
                    </div>

                    <div class="profile-section">
                        <h4>Notes</h4>
                        <textarea rows="3" placeholder="Add notes about this candidate..."></textarea>
                        <button class="btn btn-sm btn-primary" onclick="saveCandidateNotes('${candidateId}')">Save Notes</button>
                    </div>
                </div>

                <div class="form-actions">
                    <button class="btn btn-danger" onclick="rejectCandidate('${candidateId}')">Reject</button>
                    <button class="btn btn-outline" onclick="scheduleInterview('${candidateId}')">Schedule Interview</button>
                    <button class="btn btn-primary" onclick="moveCandidateStage('${candidateId}', 'screening')">Move to Screening</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
}

// Move Candidate Stage
function moveCandidateStage(candidateId, newStage) {
    const stageNames = {
        'screening': 'Screening',
        'interview': 'Interview',
        'offer': 'Offer',
        'hired': 'Hired'
    };
    
    showNotification(`Moved candidate to ${stageNames[newStage]}`, 'success');
    logAudit(`Moved candidate ${candidateId} to ${newStage}`);
    
    // Close modal if open
    const modal = document.querySelector('.modal');
    if (modal) modal.remove();
    
    setTimeout(() => location.reload(), 1000);
}

// Schedule Interview
function scheduleInterview(candidateId) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h2>Schedule Interview</h2>
                <button class="close-btn" onclick="this.closest('.modal').remove()">×</button>
            </div>
            <div class="modal-body">
                <form id="scheduleInterviewForm">
                    <div class="form-group">
                        <label>Candidate</label>
                        <input type="text" value="${candidateId || 'Maria Brown'}" readonly>
                    </div>

                    <div class="form-group">
                        <label>Interview Type *</label>
                        <select required>
                            <option value="">Select type</option>
                            <option value="phone">Phone Screening</option>
                            <option value="video">Video Interview</option>
                            <option value="technical">Technical Interview</option>
                            <option value="onsite">On-site Interview</option>
                            <option value="final">Final Round</option>
                        </select>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Date *</label>
                            <input type="date" required>
                        </div>
                        <div class="form-group">
                            <label>Time *</label>
                            <input type="time" required>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Duration *</label>
                        <select required>
                            <option value="30">30 minutes</option>
                            <option value="60" selected>60 minutes</option>
                            <option value="90">90 minutes</option>
                            <option value="120">2 hours</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Interviewer *</label>
                        <select required>
                            <option value="">Select interviewer</option>
                            <option value="sarah">Sarah Johnson - Engineering Manager</option>
                            <option value="mike">Mike Chen - Senior Engineer</option>
                            <option value="jessica">Jessica Lee - Product Manager</option>
                            <option value="lisa">Lisa Wang - Design Lead</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Location/Meeting Link *</label>
                        <input type="text" required placeholder="e.g., Conference Room A or Zoom link">
                    </div>

                    <div class="form-group">
                        <label>Interview Notes</label>
                        <textarea rows="3" placeholder="Any preparation notes or topics to cover..."></textarea>
                    </div>

                    <div class="form-group">
                        <label class="checkbox-label">
                            <input type="checkbox" checked>
                            <span>Send calendar invite to candidate and interviewer</span>
                        </label>
                    </div>

                    <div class="form-actions">
                        <button type="button" class="btn btn-outline" onclick="this.closest('.modal').remove()">Cancel</button>
                        <button type="submit" class="btn btn-primary">Schedule Interview</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);

    document.getElementById('scheduleInterviewForm').addEventListener('submit', function(e) {
        e.preventDefault();
        showNotification('Interview scheduled successfully', 'success');
        document.querySelector('.modal').remove();
        logAudit(`Scheduled interview for ${candidateId}`);
        setTimeout(() => location.reload(), 1000);
    });
}

// Make Offer
function makeOffer(candidateId) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 700px;">
            <div class="modal-header">
                <h2>Make Job Offer</h2>
                <button class="close-btn" onclick="this.closest('.modal').remove()">×</button>
            </div>
            <div class="modal-body">
                <form id="makeOfferForm">
                    <div class="form-group">
                        <label>Candidate</label>
                        <input type="text" value="Tom Wilson" readonly>
                    </div>

                    <div class="form-group">
                        <label>Position</label>
                        <input type="text" value="UX/UI Designer" readonly>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Annual Salary *</label>
                            <input type="number" required placeholder="105000">
                        </div>
                        <div class="form-group">
                            <label>Signing Bonus</label>
                            <input type="number" placeholder="0">
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Start Date *</label>
                        <input type="date" required>
                    </div>

                    <div class="form-group">
                        <label>Benefits Package *</label>
                        <select required>
                            <option value="">Select package</option>
                            <option value="standard" selected>Standard Package</option>
                            <option value="premium">Premium Package</option>
                            <option value="executive">Executive Package</option>
                        </select>
                    </div>

                    <div class="benefits-preview" style="background: var(--bg-secondary); padding: 16px; border-radius: 8px; margin: 16px 0;">
                        <h4>Standard Package Includes:</h4>
                        <ul style="margin: 8px 0; padding-left: 20px;">
                            <li>Health, Dental, Vision Insurance</li>
                            <li>401(k) with 3% employer match</li>
                            <li>20 days PTO + 10 holidays</li>
                            <li>Professional development budget</li>
                            <li>Remote work flexibility</li>
                        </ul>
                    </div>

                    <div class="form-group">
                        <label>Offer Expiration Date *</label>
                        <input type="date" required>
                    </div>

                    <div class="form-group">
                        <label>Additional Terms</label>
                        <textarea rows="3" placeholder="Any special conditions or notes..."></textarea>
                    </div>

                    <div class="form-group">
                        <label class="checkbox-label">
                            <input type="checkbox" checked>
                            <span>Send offer letter via email</span>
                        </label>
                    </div>

                    <div class="form-actions">
                        <button type="button" class="btn btn-outline" onclick="this.closest('.modal').remove()">Cancel</button>
                        <button type="button" class="btn btn-outline" onclick="previewOffer()">Preview Offer Letter</button>
                        <button type="submit" class="btn btn-primary">Send Offer</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);

    document.getElementById('makeOfferForm').addEventListener('submit', function(e) {
        e.preventDefault();
        showNotification('Offer sent successfully', 'success');
        document.querySelector('.modal').remove();
        logAudit(`Sent job offer to ${candidateId}`);
        setTimeout(() => location.reload(), 1000);
    });
}

// View Offer
function viewOffer(candidateId) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 700px;">
            <div class="modal-header">
                <h2>Job Offer Details</h2>
                <button class="close-btn" onclick="this.closest('.modal').remove()">×</button>
            </div>
            <div class="modal-body">
                <div class="offer-details">
                    <div class="info-grid">
                        <div class="info-item">
                            <span class="info-label">Candidate:</span>
                            <span>Sarah Lee</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Position:</span>
                            <span>Senior Full Stack Developer</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Annual Salary:</span>
                            <span><strong>$145,000</strong></span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Signing Bonus:</span>
                            <span>$5,000</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Start Date:</span>
                            <span>January 15, 2025</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Offer Sent:</span>
                            <span>December 15, 2024</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Expires:</span>
                            <span>December 29, 2024</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Status:</span>
                            <span><span class="badge badge-warning">Pending Response</span></span>
                        </div>
                    </div>

                    <div class="offer-section">
                        <h4>Benefits Package</h4>
                        <ul>
                            <li>Health, Dental, Vision Insurance</li>
                            <li>401(k) with 3% employer match</li>
                            <li>20 days PTO + 10 holidays</li>
                            <li>$2,000 annual professional development budget</li>
                            <li>Remote work flexibility</li>
                        </ul>
                    </div>
                </div>

                <div class="form-actions">
                    <button class="btn btn-outline" onclick="downloadOfferLetter('${candidateId}')">📥 Download Offer Letter</button>
                    <button class="btn btn-outline" onclick="resendOffer('${candidateId}')">📧 Resend Offer</button>
                    <button class="btn btn-primary" onclick="this.closest('.modal').remove()">Close</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
}

// Reject Candidate
function rejectCandidate(candidateId) {
    if (confirm('Are you sure you want to reject this candidate?')) {
        showNotification('Candidate rejected', 'info');
        logAudit(`Rejected candidate: ${candidateId}`);
        const modal = document.querySelector('.modal');
        if (modal) modal.remove();
        setTimeout(() => location.reload(), 1000);
    }
}

// View Resume
function viewResume(candidateId) {
    showNotification('Opening resume viewer...', 'info');
}

// Download Resume
function downloadResume(candidateId) {
    showNotification('Downloading resume...', 'info');
    setTimeout(() => {
        showNotification('Resume downloaded successfully', 'success');
    }, 1000);
}

// Save Candidate Notes
function saveCandidateNotes(candidateId) {
    showNotification('Notes saved successfully', 'success');
    logAudit(`Updated notes for candidate: ${candidateId}`);
}

// View Interview
function viewInterview(interviewId) {
    showNotification('Opening interview details...', 'info');
}

// Reschedule Interview
function rescheduleInterview(interviewId) {
    showNotification('Opening reschedule dialog...', 'info');
}

// Cancel Interview
function cancelInterview(interviewId) {
    if (confirm('Cancel this interview?')) {
        showNotification('Interview cancelled', 'info');
        logAudit(`Cancelled interview: ${interviewId}`);
        setTimeout(() => location.reload(), 1000);
    }
}

// Filter Functions
function filterJobs(query) {
    // Real-time job search filtering
}

function filterCandidatesByPosition(position) {
    showNotification(`Filtering by ${position === 'all' ? 'all positions' : position}`, 'info');
}

function filterCandidatesByStage(stage) {
    showNotification(`Filtering by ${stage === 'all' ? 'all stages' : stage}`, 'info');
}

// Calendar Navigation
function previousWeek() {
    showNotification('Loading previous week...', 'info');
}

function nextWeek() {
    showNotification('Loading next week...', 'info');
}

// Analytics
function viewAnalytics() {
    // Switch to analytics tab
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('analytics-tab').classList.add('active');
    document.querySelectorAll('.tab-btn')[4].classList.add('active');
}

function changeAnalyticsPeriod(period) {
    showNotification(`Loading analytics for ${period}`, 'info');
}

// Show More Candidates
function showMoreCandidates(stage) {
    showNotification(`Loading more ${stage} candidates...`, 'info');
}

// View Candidates for Job
function viewCandidates(jobId) {
    // Switch to candidates tab with filter
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('candidates-tab').classList.add('active');
    document.querySelectorAll('.tab-btn')[1].classList.add('active');
}

// Offer Functions
function previewOffer() {
    showNotification('Generating offer letter preview...', 'info');
}

function downloadOfferLetter(candidateId) {
    showNotification('Downloading offer letter...', 'info');
    setTimeout(() => {
        showNotification('Offer letter downloaded', 'success');
    }, 1000);
}

function resendOffer(candidateId) {
    showNotification('Resending offer...', 'info');
    setTimeout(() => {
        showNotification('Offer resent successfully', 'success');
    }, 1000);
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
        module: 'Recruitment'
    });
    localStorage.setItem('auditLog', JSON.stringify(auditLog));
}

// Initialize Charts
function initializeCharts() {
    // Application Sources Chart
    const sourcesCtx = document.getElementById('sourcesCanvas');
    if (sourcesCtx) {
        new Chart(sourcesCtx, {
            type: 'doughnut',
            data: {
                labels: ['LinkedIn', 'Company Website', 'Indeed', 'Referrals', 'Other'],
                datasets: [{
                    data: [35, 25, 20, 15, 5],
                    backgroundColor: [
                        '#3B82F6',
                        '#10B981',
                        '#F59E0B',
                        '#8B5CF6',
                        '#6B7280'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
}

// CSS for Recruitment
const style = document.createElement('style');
style.textContent = `
    .job-cards {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .job-card {
        background: white;
        border: 1px solid var(--border-color);
        border-radius: 12px;
        padding: 24px;
        transition: all 0.3s ease;
    }

    .job-card:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        border-color: var(--primary-color);
    }

    .job-header {
        display: flex;
        justify-content: space-between;
        align-items: start;
        margin-bottom: 16px;
    }

    .job-header h4 {
        margin: 0 0 4px 0;
        color: var(--primary-color);
    }

    .job-meta {
        margin: 0;
        color: var(--text-secondary);
        font-size: 0.9em;
    }

    .job-content {
        margin-bottom: 16px;
    }

    .job-description {
        margin: 0 0 16px 0;
        color: var(--text-secondary);
    }

    .job-details {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 12px;
        margin-bottom: 16px;
        padding: 16px;
        background: var(--bg-secondary);
        border-radius: 8px;
    }

    .detail-item {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .detail-label {
        font-size: 0.85em;
        color: var(--text-secondary);
    }

    .pipeline-mini {
        display: flex;
        gap: 8px;
        padding: 12px;
        background: white;
        border: 1px solid var(--border-color);
        border-radius: 8px;
    }

    .pipeline-stage {
        flex: 1;
        text-align: center;
        padding: 8px;
        background: var(--bg-secondary);
        border-radius: 6px;
    }

    .stage-label {
        display: block;
        font-size: 0.85em;
        color: var(--text-secondary);
        margin-bottom: 4px;
    }

    .stage-count {
        display: block;
        font-size: 1.5em;
        font-weight: bold;
        color: var(--primary-color);
    }

    .job-actions {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
    }

    .candidate-pipeline {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
        margin-top: 16px;
    }

    .pipeline-column {
        background: var(--bg-secondary);
        border-radius: 12px;
        padding: 16px;
        min-height: 400px;
    }

    .pipeline-header {
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 2px solid var(--border-color);
    }

    .pipeline-header h4 {
        margin: 0;
        color: var(--primary-color);
    }

    .pipeline-cards {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .candidate-card {
        background: white;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        padding: 16px;
        cursor: move;
        transition: all 0.3s ease;
    }

    .candidate-card:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
    }

    .candidate-header {
        display: flex;
        gap: 12px;
        margin-bottom: 12px;
    }

    .candidate-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        flex-shrink: 0;
    }

    .candidate-info h5 {
        margin: 0 0 4px 0;
        font-size: 1em;
    }

    .candidate-info p {
        margin: 0;
        font-size: 0.85em;
        color: var(--text-secondary);
    }

    .candidate-meta {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-bottom: 12px;
    }

    .meta-item {
        font-size: 0.85em;
        color: var(--text-secondary);
    }

    .candidate-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-bottom: 12px;
    }

    .tag {
        display: inline-block;
        padding: 4px 8px;
        background: var(--primary-light);
        color: var(--primary-color);
        border-radius: 4px;
        font-size: 0.8em;
    }

    .tag-success {
        background: var(--secondary-light);
        color: var(--secondary-color);
    }

    .candidate-actions {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .show-more {
        padding: 12px;
        text-align: center;
        color: var(--primary-color);
        cursor: pointer;
        border: 1px dashed var(--border-color);
        border-radius: 8px;
        transition: all 0.3s ease;
    }

    .show-more:hover {
        background: white;
        border-color: var(--primary-color);
    }

    .interview-calendar {
        margin-top: 16px;
    }

    .calendar-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        padding: 16px;
        background: var(--bg-secondary);
        border-radius: 8px;
    }

    .calendar-header h4 {
        margin: 0;
    }

    .interview-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .interview-item {
        display: flex;
        gap: 20px;
        padding: 20px;
        background: white;
        border: 1px solid var(--border-color);
        border-radius: 12px;
        transition: all 0.3s ease;
    }

    .interview-item:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .interview-time {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 12px;
        background: var(--primary-light);
        border-radius: 8px;
        min-width: 80px;
    }

    .interview-time .date {
        font-weight: bold;
        color: var(--primary-color);
    }

    .interview-time .time {
        font-size: 0.9em;
        color: var(--text-secondary);
    }

    .interview-details {
        flex: 1;
    }

    .interview-details h5 {
        margin: 0 0 8px 0;
    }

    .interview-details p {
        margin: 0 0 12px 0;
        color: var(--text-secondary);
    }

    .interview-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        font-size: 0.9em;
        color: var(--text-secondary);
    }

    .interview-actions {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .analytics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        margin-bottom: 32px;
    }

    .metric-card {
        background: white;
        border: 1px solid var(--border-color);
        border-radius: 12px;
        padding: 24px;
        text-align: center;
    }

    .metric-card h4 {
        margin: 0 0 12px 0;
        color: var(--text-secondary);
        font-size: 0.9em;
        font-weight: normal;
    }

    .metric-value {
        font-size: 2.5em;
        font-weight: bold;
        color: var(--primary-color);
        margin-bottom: 8px;
    }

    .metric-change {
        font-size: 0.9em;
        color: var(--text-secondary);
    }

    .metric-change.positive {
        color: var(--secondary-color);
    }

    .mini-chart {
        margin-top: 16px;
        font-size: 2em;
    }

    .charts-row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 24px;
    }

    .chart-card {
        background: white;
        border: 1px solid var(--border-color);
        border-radius: 12px;
        padding: 24px;
    }

    .chart-card h4 {
        margin: 0 0 16px 0;
    }

    .chart-placeholder {
        height: 300px;
        position: relative;
    }

    .funnel-chart {
        display: flex;
        flex-direction: column;
        gap: 8px;
        align-items: center;
    }

    .funnel-stage {
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
        padding: 16px;
        border-radius: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: all 0.3s ease;
    }

    .funnel-stage:hover {
        transform: scale(1.02);
    }

    .profile-avatar-large {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2em;
        font-weight: bold;
    }

    .profile-header {
        display: flex;
        gap: 20px;
        margin-bottom: 24px;
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
    }

    .profile-info {
        flex: 1;
    }

    .profile-info h3 {
        margin: 0 0 4px 0;
    }

    .profile-title {
        margin: 0 0 8px 0;
        color: var(--text-secondary);
    }

    .profile-contact,
    .profile-location {
        margin: 4px 0;
        font-size: 0.9em;
        color: var(--text-secondary);
    }

    .profile-rating {
        text-align: right;
    }

    .rating-stars {
        font-size: 1.2em;
        margin-bottom: 4px;
    }

    .profile-section {
        margin-bottom: 24px;
    }

    .profile-section h4 {
        margin: 0 0 12px 0;
        padding-bottom: 8px;
        border-bottom: 2px solid var(--border-color);
    }

    .experience-item,
    .education-item {
        margin-bottom: 16px;
    }

    .experience-item h5,
    .education-item h5 {
        margin: 0 0 4px 0;
    }

    .exp-duration {
        margin: 0 0 8px 0;
        font-size: 0.9em;
        color: var(--text-secondary);
    }

    .skills-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }

    .skill-tag {
        padding: 8px 16px;
        background: var(--primary-light);
        color: var(--primary-color);
        border-radius: 20px;
        font-size: 0.9em;
    }

    .info-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
        margin-bottom: 24px;
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

    .stats-row {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
    }

    .stat-box {
        text-align: center;
        padding: 16px;
        background: var(--bg-secondary);
        border-radius: 8px;
    }

    .stat-number {
        display: block;
        font-size: 2em;
        font-weight: bold;
        color: var(--primary-color);
        margin-bottom: 4px;
    }

    .stat-label {
        display: block;
        font-size: 0.85em;
        color: var(--text-secondary);
    }

    .benefits-preview {
        background: var(--bg-secondary);
        padding: 16px;
        border-radius: 8px;
        margin: 16px 0;
    }

    .benefits-preview h4 {
        margin: 0 0 12px 0;
    }

    @media (max-width: 1200px) {
        .candidate-pipeline {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 768px) {
        .candidate-pipeline {
            grid-template-columns: 1fr;
        }

        .charts-row {
            grid-template-columns: 1fr;
        }

        .stats-row {
            grid-template-columns: repeat(2, 1fr);
        }

        .job-details {
            grid-template-columns: 1fr;
        }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
});

console.log('Recruitment management system initialized');
