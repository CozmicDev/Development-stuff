// Employee Learning & Development
document.addEventListener('DOMContentLoaded', function() {
    loadLearningData();
    initCharts();
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

// Initialize Charts
function initCharts() {
    // Skills Development Chart
    const skillsCtx = document.getElementById('skillsChart');
    if (skillsCtx) {
        new Chart(skillsCtx, {
            type: 'radar',
            data: {
                labels: ['Technical', 'Leadership', 'Communication', 'Problem Solving', 'Collaboration', 'Innovation'],
                datasets: [{
                    label: 'Current Level',
                    data: [85, 70, 75, 90, 88, 72],
                    backgroundColor: 'rgba(79, 70, 229, 0.2)',
                    borderColor: 'var(--primary-color)',
                    borderWidth: 2
                }, {
                    label: 'Target Level',
                    data: [95, 85, 85, 95, 90, 85],
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    borderColor: 'var(--secondary-color)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }
    
    // Activity Chart
    const activityCtx = document.getElementById('activityChart');
    if (activityCtx) {
        new Chart(activityCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
                datasets: [{
                    label: 'Learning Hours',
                    data: [4, 6, 8, 5, 7, 6, 4, 8, 6, 10, 8],
                    backgroundColor: 'var(--primary-color)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// Load Learning Data
function loadLearningData() {
    const learningData = JSON.parse(localStorage.getItem('learningData')) || getDefaultLearningData();
    localStorage.setItem('learningData', JSON.stringify(learningData));
}

// Get Default Learning Data
function getDefaultLearningData() {
    return {
        enrolledCourses: [],
        completedCourses: [],
        certificates: [],
        learningHours: 42
    };
}

// View Learning Path
function viewLearningPath() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 900px;">
            <div class="modal-header">
                <h3>My Learning Path - Senior Software Engineer</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <p style="margin-bottom: 24px; color: var(--text-secondary);">
                    Your personalized learning path based on your role and career goals
                </p>
                
                <div class="learning-path">
                    <div class="path-stage completed">
                        <div class="stage-header">
                            <span class="stage-icon">✓</span>
                            <h4>Stage 1: Foundation</h4>
                            <span class="badge badge-success">Completed</span>
                        </div>
                        <ul class="stage-courses">
                            <li>✓ JavaScript Fundamentals</li>
                            <li>✓ Git & Version Control</li>
                            <li>✓ REST API Design</li>
                            <li>✓ SQL Database Fundamentals</li>
                        </ul>
                    </div>
                    
                    <div class="path-stage in-progress">
                        <div class="stage-header">
                            <span class="stage-icon">⏱️</span>
                            <h4>Stage 2: Advanced Technical Skills</h4>
                            <span class="badge badge-primary">In Progress</span>
                        </div>
                        <ul class="stage-courses">
                            <li>✓ JavaScript Advanced Concepts (Completed)</li>
                            <li>⏱️ Advanced React Patterns (60% complete)</li>
                            <li>⏱️ AWS Solutions Architect (17% complete)</li>
                            <li>○ Docker & Kubernetes Mastery (Not started)</li>
                        </ul>
                    </div>
                    
                    <div class="path-stage pending">
                        <div class="stage-header">
                            <span class="stage-icon">○</span>
                            <h4>Stage 3: Leadership & Soft Skills</h4>
                            <span class="badge badge-secondary">Upcoming</span>
                        </div>
                        <ul class="stage-courses">
                            <li>○ Leadership Fundamentals</li>
                            <li>⏱️ Effective Communication Skills (67% complete)</li>
                            <li>○ Technical Mentorship</li>
                            <li>○ Presentation Skills for Engineers</li>
                        </ul>
                    </div>
                    
                    <div class="path-stage pending">
                        <div class="stage-header">
                            <span class="stage-icon">○</span>
                            <h4>Stage 4: Specialization</h4>
                            <span class="badge badge-secondary">Locked</span>
                        </div>
                        <ul class="stage-courses">
                            <li>○ System Architecture & Design</li>
                            <li>○ Microservices Architecture</li>
                            <li>○ Cloud Security Best Practices</li>
                            <li>○ DevOps & CI/CD Mastery</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Close</button>
                <button class="btn btn-primary" onclick="customizePath()">Customize Path</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function customizePath() {
    showSuccessNotification('Opening path customization...');
}

// Browse Catalog
function browseCatalog() {
    // Switch to catalog tab
    switchTab('catalog');
}

// Continue Course
function continueCourse(courseId) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 1000px; max-height: 90vh;">
            <div class="modal-header">
                <h3>Advanced React Patterns</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body" style="padding: 0;">
                <div style="display: grid; grid-template-columns: 300px 1fr; height: 600px;">
                    <!-- Course Outline -->
                    <div style="padding: 24px; background: var(--background); border-right: 1px solid #E5E7EB; overflow-y: auto;">
                        <h4 style="margin: 0 0 16px 0;">Course Content</h4>
                        
                        <div class="course-section">
                            <div class="section-title">✓ 1. Introduction (3 lessons)</div>
                            <div class="lesson completed">1.1 Course Overview</div>
                            <div class="lesson completed">1.2 Setup Environment</div>
                            <div class="lesson completed">1.3 Prerequisites Review</div>
                        </div>
                        
                        <div class="course-section">
                            <div class="section-title">⏱️ 2. Hooks Deep Dive (5 lessons)</div>
                            <div class="lesson completed">2.1 useState & useEffect</div>
                            <div class="lesson completed">2.2 useContext & useReducer</div>
                            <div class="lesson active">2.3 Custom Hooks ⏱️</div>
                            <div class="lesson">2.4 useCallback & useMemo</div>
                            <div class="lesson">2.5 useRef & useImperativeHandle</div>
                        </div>
                        
                        <div class="course-section">
                            <div class="section-title">○ 3. Advanced Patterns (6 lessons)</div>
                            <div class="lesson">3.1 Render Props</div>
                            <div class="lesson">3.2 Higher-Order Components</div>
                            <div class="lesson">3.3 Compound Components</div>
                            <div class="lesson">3.4 Controlled vs Uncontrolled</div>
                            <div class="lesson">3.5 State Reducer Pattern</div>
                            <div class="lesson">3.6 Props Getters</div>
                        </div>
                        
                        <div class="course-section">
                            <div class="section-title">○ 4. Performance (4 lessons)</div>
                            <div class="lesson">4.1 React.memo</div>
                            <div class="lesson">4.2 Code Splitting</div>
                            <div class="lesson">4.3 Lazy Loading</div>
                            <div class="lesson">4.4 Profiling</div>
                        </div>
                        
                        <div class="course-section">
                            <div class="section-title">○ 5. Final Project (2 lessons)</div>
                            <div class="lesson">5.1 Project Requirements</div>
                            <div class="lesson">5.2 Implementation & Review</div>
                        </div>
                    </div>
                    
                    <!-- Video Player -->
                    <div style="padding: 24px; display: flex; flex-direction: column;">
                        <div style="flex: 1; background: #000; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                            <div style="text-align: center; color: white;">
                                <div style="font-size: 64px; margin-bottom: 16px;">▶️</div>
                                <h3 style="color: white; margin: 0 0 8px 0;">Lesson 2.3: Custom Hooks</h3>
                                <p style="color: #999; margin: 0;">Duration: 15:32</p>
                            </div>
                        </div>
                        
                        <div style="display: flex; gap: 12px;">
                            <button class="btn btn-outline" onclick="previousLesson()">⏮️ Previous</button>
                            <button class="btn btn-primary" style="flex: 1;" onclick="markComplete()">Mark Complete & Continue</button>
                            <button class="btn btn-outline" onclick="nextLesson()">Next ⏭️</button>
                        </div>
                        
                        <div style="margin-top: 24px;">
                            <h4 style="margin: 0 0 12px 0;">Lesson Notes</h4>
                            <div style="padding: 16px; background: var(--background); border-radius: 8px;">
                                <p style="margin: 0; font-size: 14px; line-height: 1.6; color: var(--text-secondary);">
                                    In this lesson, you'll learn how to create custom hooks to extract and reuse 
                                    component logic. We'll cover best practices, naming conventions, and common patterns.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function previousLesson() {
    showSuccessNotification('Loading previous lesson...');
}

function nextLesson() {
    showSuccessNotification('Loading next lesson...');
}

function markComplete() {
    showSuccessNotification('✓ Lesson marked as complete!');
}

// Search Courses
function searchCourses(query) {
    const cards = document.querySelectorAll('#catalog-tab .course-card');
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(query.toLowerCase()) ? 'block' : 'none';
    });
}

// Filter by Category
function filterByCategory(category) {
    const cards = document.querySelectorAll('#catalog-tab .course-card');
    cards.forEach(card => {
        if (category === 'all') {
            card.style.display = 'block';
        } else {
            const cardCategory = card.getAttribute('data-category');
            card.style.display = cardCategory === category ? 'block' : 'none';
        }
    });
}

// Filter by Level
function filterByLevel(level) {
    const cards = document.querySelectorAll('#catalog-tab .course-card');
    cards.forEach(card => {
        if (level === 'all') {
            card.style.display = 'block';
        } else {
            const cardLevel = card.getAttribute('data-level');
            card.style.display = cardLevel === level ? 'block' : 'none';
        }
    });
}

// View Course Details
function viewCourseDetails(courseId) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 800px;">
            <div class="modal-header">
                <h3>Docker & Kubernetes Mastery</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div style="display: flex; gap: 24px; margin-bottom: 24px;">
                    <div style="flex: 1;">
                        <p style="font-size: 16px; line-height: 1.6; color: var(--text-secondary); margin-bottom: 16px;">
                            Master containerization with Docker and orchestration with Kubernetes. Learn to build, 
                            deploy, and scale cloud-native applications.
                        </p>
                        
                        <div style="display: flex; gap: 16px; margin-bottom: 16px;">
                            <div>
                                <strong>Duration:</strong> 16 hours
                            </div>
                            <div>
                                <strong>Level:</strong> Advanced
                            </div>
                            <div>
                                <strong>Rating:</strong> ⭐ 4.8 (234 reviews)
                            </div>
                        </div>
                        
                        <div class="course-tags" style="margin-bottom: 24px;">
                            <span class="tag">DevOps</span>
                            <span class="tag">Cloud</span>
                            <span class="tag">Containers</span>
                        </div>
                    </div>
                </div>
                
                <div style="margin-bottom: 24px;">
                    <h4 style="margin: 0 0 12px 0;">What You'll Learn</h4>
                    <ul style="line-height: 2; color: var(--text-secondary);">
                        <li>Docker fundamentals and containerization concepts</li>
                        <li>Building and optimizing Docker images</li>
                        <li>Container networking and storage</li>
                        <li>Kubernetes architecture and components</li>
                        <li>Deploying applications on Kubernetes</li>
                        <li>Scaling and load balancing</li>
                        <li>Monitoring and logging strategies</li>
                        <li>CI/CD integration with containers</li>
                    </ul>
                </div>
                
                <div style="margin-bottom: 24px;">
                    <h4 style="margin: 0 0 12px 0;">Prerequisites</h4>
                    <ul style="line-height: 2; color: var(--text-secondary);">
                        <li>Basic Linux command line knowledge</li>
                        <li>Understanding of web applications</li>
                        <li>Familiarity with cloud concepts (recommended)</li>
                    </ul>
                </div>
                
                <div style="margin-bottom: 24px;">
                    <h4 style="margin: 0 0 12px 0;">Course Outline</h4>
                    <div style="background: var(--background); padding: 16px; border-radius: 8px;">
                        <p><strong>Section 1:</strong> Docker Fundamentals (4 hours)</p>
                        <p><strong>Section 2:</strong> Advanced Docker (3 hours)</p>
                        <p><strong>Section 3:</strong> Kubernetes Basics (4 hours)</p>
                        <p><strong>Section 4:</strong> Kubernetes Advanced (3 hours)</p>
                        <p><strong>Section 5:</strong> Real-world Projects (2 hours)</p>
                    </div>
                </div>
                
                <div style="padding: 16px; background: var(--primary-light); border-radius: 8px;">
                    <p style="margin: 0; font-size: 14px;">
                        <strong>Instructor:</strong> David Wilson<br>
                        <strong>Certificate:</strong> Yes, upon completion<br>
                        <strong>Access:</strong> Lifetime access to course materials
                    </p>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Close</button>
                <button class="btn btn-primary" onclick="enrollCourse('${courseId}')">Enroll Now</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Enroll Course
function enrollCourse(courseId) {
    if (confirm('Are you sure you want to enroll in this course?')) {
        document.querySelectorAll('.modal').forEach(m => m.remove());
        showSuccessNotification('✓ Successfully enrolled! Course added to "My Courses".');
        
        if (typeof window.dataService !== 'undefined' && window.dataService.auditLog) {
            window.dataService.auditLog.log({
                action: 'course_enrolled',
                details: `Enrolled in course: ${courseId}`,
                severity: 'info'
            });
        }
    }
}

// View Certificate
function viewCertificate(certId) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 900px;">
            <div class="modal-header">
                <h3>Certificate of Completion</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div style="padding: 60px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; text-align: center; color: white; position: relative;">
                    <div style="position: absolute; top: 20px; right: 20px; font-size: 100px; opacity: 0.1;">🏆</div>
                    
                    <h2 style="color: white; margin: 0 0 16px 0; font-size: 32px;">CERTIFICATE OF COMPLETION</h2>
                    <p style="color: rgba(255,255,255,0.9); margin: 0 0 40px 0;">This certifies that</p>
                    
                    <h1 style="color: white; margin: 0 0 40px 0; font-size: 48px; font-weight: 700;">Mohammed Al Hashimi</h1>
                    
                    <p style="color: rgba(255,255,255,0.9); margin: 0 0 16px 0;">has successfully completed</p>
                    
                    <h3 style="color: white; margin: 0 0 40px 0; font-size: 28px;">JavaScript Advanced Concepts</h3>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px; margin: 40px 0;">
                        <div>
                            <p style="color: rgba(255,255,255,0.7); margin: 0; font-size: 12px;">COMPLETED</p>
                            <p style="color: white; margin: 4px 0 0 0; font-weight: 600;">November 15, 2024</p>
                        </div>
                        <div>
                            <p style="color: rgba(255,255,255,0.7); margin: 0; font-size: 12px;">DURATION</p>
                            <p style="color: white; margin: 4px 0 0 0; font-weight: 600;">12 Hours</p>
                        </div>
                        <div>
                            <p style="color: rgba(255,255,255,0.7); margin: 0; font-size: 12px;">SCORE</p>
                            <p style="color: white; margin: 4px 0 0 0; font-weight: 600;">95%</p>
                        </div>
                    </div>
                    
                    <div style="border-top: 2px solid rgba(255,255,255,0.3); padding-top: 24px; margin-top: 40px;">
                        <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 14px;">
                            <strong>ACME Learning Academy</strong><br>
                            Certificate ID: CERT-2024-JS-12345
                        </p>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Close</button>
                <button class="btn btn-outline" onclick="downloadCertificate('${certId}')">Download PDF</button>
                <button class="btn btn-primary" onclick="shareCertificate('${certId}')">Share on LinkedIn</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Download Certificate
function downloadCertificate(certId) {
    showSuccessNotification('✓ Downloading certificate...');
}

// Share Certificate
function shareCertificate(certId) {
    showSuccessNotification('✓ Opening LinkedIn share dialog...');
}

// Share All Certificates
function shareAllCertificates() {
    showSuccessNotification('✓ Preparing certificates for LinkedIn...');
}

// Filter History
function filterHistory(period) {
    showSuccessNotification(`Filtering history: ${period}`);
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

// Add CSS for learning components
const style = document.createElement('style');
style.textContent = `
    .courses-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 24px;
    }
    
    .course-card {
        padding: 24px;
        border: 1px solid #E5E7EB;
        border-radius: 8px;
        transition: all 0.3s ease;
        position: relative;
    }
    
    .course-card:hover {
        box-shadow: 0 8px 16px rgba(0,0,0,0.1);
        transform: translateY(-4px);
    }
    
    .course-badge {
        position: absolute;
        top: 12px;
        right: 12px;
        padding: 4px 12px;
        background: var(--primary-color);
        color: white;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
    }
    
    .course-icon {
        font-size: 48px;
        margin-bottom: 16px;
    }
    
    .course-card h4 {
        margin: 0 0 8px 0;
        font-size: 18px;
    }
    
    .course-instructor {
        font-size: 13px;
        color: var(--text-secondary);
        margin: 0 0 12px 0;
    }
    
    .course-description {
        font-size: 14px;
        color: var(--text-secondary);
        line-height: 1.6;
        margin-bottom: 16px;
        min-height: 60px;
    }
    
    .course-meta {
        display: flex;
        gap: 12px;
        font-size: 13px;
        color: var(--text-secondary);
        margin-bottom: 16px;
        flex-wrap: wrap;
    }
    
    .course-progress {
        margin: 16px 0;
    }
    
    .course-tags {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        margin: 16px 0;
    }
    
    .course-actions {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 16px;
    }
    
    .certificates-grid {
        display: grid;
        gap: 20px;
    }
    
    .certificate-card {
        padding: 24px;
        border: 1px solid #E5E7EB;
        border-radius: 8px;
        transition: all 0.3s ease;
    }
    
    .certificate-card:hover {
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    
    .certificate-header {
        display: flex;
        gap: 16px;
        margin-bottom: 16px;
    }
    
    .certificate-icon {
        font-size: 48px;
        flex-shrink: 0;
    }
    
    .certificate-header h4 {
        margin: 0 0 4px 0;
        font-size: 18px;
    }
    
    .certificate-issuer {
        font-size: 13px;
        color: var(--text-secondary);
        margin: 0;
    }
    
    .certificate-details {
        margin: 16px 0;
        padding: 16px;
        background: var(--background);
        border-radius: 8px;
    }
    
    .certificate-details p {
        margin: 4px 0;
        font-size: 14px;
        color: var(--text-secondary);
    }
    
    .certificate-actions {
        display: flex;
        gap: 8px;
        margin-top: 16px;
    }
    
    .learning-path {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }
    
    .path-stage {
        padding: 24px;
        border: 2px solid #E5E7EB;
        border-radius: 8px;
    }
    
    .path-stage.completed {
        border-color: var(--secondary-color);
        background: var(--secondary-light);
    }
    
    .path-stage.in-progress {
        border-color: var(--primary-color);
        background: var(--primary-light);
    }
    
    .stage-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 16px;
    }
    
    .stage-icon {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        background: white;
        flex-shrink: 0;
    }
    
    .stage-header h4 {
        margin: 0;
        flex: 1;
    }
    
    .stage-courses {
        margin: 0;
        padding-left: 44px;
        line-height: 2;
    }
    
    .course-section {
        margin-bottom: 16px;
    }
    
    .section-title {
        font-weight: 600;
        margin-bottom: 8px;
        padding: 8px;
        background: var(--background);
        border-radius: 4px;
    }
    
    .lesson {
        padding: 8px 12px;
        margin-bottom: 4px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s;
    }
    
    .lesson:hover {
        background: var(--background);
    }
    
    .lesson.completed {
        color: var(--secondary-color);
    }
    
    .lesson.active {
        background: var(--primary-light);
        color: var(--primary-color);
        font-weight: 600;
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
