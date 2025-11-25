// Manager Reports & Analytics
let performanceChart, activityChart, seniorityChart, departmentChart;
let attendanceTrendChart, ratingsDistChart, goalsChart;
let leaveTypeChart, productivityTrendChart, projectTimelineChart;

document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
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
    
    // Reinitialize charts when switching tabs
    setTimeout(() => {
        if (tabName === 'attendance' && !attendanceTrendChart) {
            initAttendanceCharts();
        } else if (tabName === 'performance' && !ratingsDistChart) {
            initPerformanceCharts();
        } else if (tabName === 'leave' && !leaveTypeChart) {
            initLeaveCharts();
        } else if (tabName === 'productivity' && !productivityTrendChart) {
            initProductivityCharts();
        }
    }, 100);
}

// Initialize All Charts
function initializeCharts() {
    initOverviewCharts();
}

// Overview Charts
function initOverviewCharts() {
    // Performance Chart - Radar
    const perfCtx = document.getElementById('performanceChart');
    if (perfCtx) {
        performanceChart = new Chart(perfCtx, {
            type: 'radar',
            data: {
                labels: ['Technical Skills', 'Communication', 'Problem Solving', 'Team Collaboration', 'Time Management', 'Innovation'],
                datasets: [{
                    label: 'Team Average',
                    data: [4.3, 4.1, 4.5, 4.2, 3.9, 4.0],
                    backgroundColor: 'rgba(79, 70, 229, 0.2)',
                    borderColor: 'rgb(79, 70, 229)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgb(79, 70, 229)'
                }, {
                    label: 'Previous Quarter',
                    data: [4.0, 3.9, 4.2, 4.0, 3.7, 3.8],
                    backgroundColor: 'rgba(156, 163, 175, 0.2)',
                    borderColor: 'rgb(156, 163, 175)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgb(156, 163, 175)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 5,
                        ticks: {
                            stepSize: 1
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    // Activity Trend Chart - Line
    const activityCtx = document.getElementById('activityChart');
    if (activityCtx) {
        activityChart = new Chart(activityCtx, {
            type: 'line',
            data: {
                labels: ['Oct Week 1', 'Oct Week 2', 'Oct Week 3', 'Oct Week 4', 
                         'Nov Week 1', 'Nov Week 2', 'Nov Week 3', 'Nov Week 4',
                         'Dec Week 1', 'Dec Week 2', 'Dec Week 3'],
                datasets: [{
                    label: 'Tasks Completed',
                    data: [42, 48, 45, 52, 50, 55, 49, 58, 54, 60, 56],
                    borderColor: 'rgb(79, 70, 229)',
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'Goals Achieved',
                    data: [8, 10, 9, 12, 11, 13, 10, 15, 12, 14, 13],
                    borderColor: 'rgb(16, 185, 129)',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // Seniority Distribution - Doughnut
    const seniorityCtx = document.getElementById('seniorityChart');
    if (seniorityCtx) {
        seniorityChart = new Chart(seniorityCtx, {
            type: 'doughnut',
            data: {
                labels: ['Senior', 'Mid-Level', 'Junior'],
                datasets: [{
                    data: [2, 4, 2],
                    backgroundColor: [
                        'rgb(79, 70, 229)',
                        'rgb(59, 130, 246)',
                        'rgb(147, 197, 253)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom'
                    },
                    title: {
                        display: true,
                        text: 'Seniority Distribution'
                    }
                }
            }
        });
    }
    
    // Department Distribution - Doughnut
    const deptCtx = document.getElementById('departmentChart');
    if (deptCtx) {
        departmentChart = new Chart(deptCtx, {
            type: 'doughnut',
            data: {
                labels: ['Engineering', 'Design', 'Product'],
                datasets: [{
                    data: [5, 2, 1],
                    backgroundColor: [
                        'rgb(16, 185, 129)',
                        'rgb(245, 158, 11)',
                        'rgb(139, 92, 246)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom'
                    },
                    title: {
                        display: true,
                        text: 'Department Distribution'
                    }
                }
            }
        });
    }
}

// Attendance Charts
function initAttendanceCharts() {
    const ctx = document.getElementById('attendanceTrendChart');
    if (ctx && !attendanceTrendChart) {
        attendanceTrendChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10', 'Week 11', 'Week 12', 'Week 13'],
                datasets: [{
                    label: 'Present',
                    data: [39, 38, 40, 39, 40, 37, 39, 38, 40, 39, 38, 39, 40],
                    backgroundColor: 'rgb(16, 185, 129)',
                    stack: 'Stack 0'
                }, {
                    label: 'Late',
                    data: [1, 0, 0, 1, 0, 2, 1, 1, 0, 1, 2, 0, 1],
                    backgroundColor: 'rgb(245, 158, 11)',
                    stack: 'Stack 0'
                }, {
                    label: 'Absent',
                    data: [0, 2, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0],
                    backgroundColor: 'rgb(239, 68, 68)',
                    stack: 'Stack 0'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom'
                    },
                    title: {
                        display: true,
                        text: 'Weekly Attendance Trend (Q4 2024)'
                    }
                },
                scales: {
                    x: {
                        stacked: true
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// Performance Charts
function initPerformanceCharts() {
    // Ratings Distribution
    const ratingsCtx = document.getElementById('ratingsDistChart');
    if (ratingsCtx && !ratingsDistChart) {
        ratingsDistChart = new Chart(ratingsCtx, {
            type: 'bar',
            data: {
                labels: ['Exceptional (5.0)', 'Exceeds (4.0-4.9)', 'Meets (3.0-3.9)', 'Needs Improvement (2.0-2.9)', 'Unsatisfactory (1.0-1.9)'],
                datasets: [{
                    label: 'Number of Employees',
                    data: [1, 4, 2, 1, 0],
                    backgroundColor: [
                        'rgb(16, 185, 129)',
                        'rgb(59, 130, 246)',
                        'rgb(245, 158, 11)',
                        'rgb(239, 68, 68)',
                        'rgb(127, 29, 29)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Team Performance Rating Distribution'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }
    
    // Goals Achievement
    const goalsCtx = document.getElementById('goalsChart');
    if (goalsCtx && !goalsChart) {
        goalsChart = new Chart(goalsCtx, {
            type: 'bar',
            data: {
                labels: ['Fatima Al Mazrouei', 'Rashid Al Shamsi', 'Khalid Al Shamsi', 'Layla Al Zarooni', 'Mariam Al Ketbi'],
                datasets: [{
                    label: 'Achieved',
                    data: [12, 10, 9, 8, 6],
                    backgroundColor: 'rgb(16, 185, 129)'
                }, {
                    label: 'In Progress',
                    data: [3, 4, 5, 3, 5],
                    backgroundColor: 'rgb(59, 130, 246)'
                }, {
                    label: 'Behind Schedule',
                    data: [1, 2, 2, 1, 3],
                    backgroundColor: 'rgb(239, 68, 68)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom'
                    },
                    title: {
                        display: true,
                        text: 'Goal Achievement Status by Employee'
                    }
                },
                scales: {
                    x: {
                        stacked: true
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// Leave Charts
function initLeaveCharts() {
    const ctx = document.getElementById('leaveTypeChart');
    if (ctx && !leaveTypeChart) {
        leaveTypeChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Annual Leave', 'Sick Leave', 'Personal Leave', 'Unpaid Leave'],
                datasets: [{
                    label: 'Days Used',
                    data: [59, 20, 12, 4],
                    backgroundColor: 'rgb(79, 70, 229)'
                }, {
                    label: 'Days Remaining',
                    data: [101, 30, 13, 0],
                    backgroundColor: 'rgb(209, 213, 219)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom'
                    },
                    title: {
                        display: true,
                        text: 'Leave Balance by Type (Team Total)'
                    }
                },
                scales: {
                    x: {
                        stacked: true
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// Productivity Charts
function initProductivityCharts() {
    // Productivity Trend
    const prodCtx = document.getElementById('productivityTrendChart');
    if (prodCtx && !productivityTrendChart) {
        productivityTrendChart = new Chart(prodCtx, {
            type: 'line',
            data: {
                labels: ['Oct Week 1', 'Oct Week 2', 'Oct Week 3', 'Oct Week 4', 
                         'Nov Week 1', 'Nov Week 2', 'Nov Week 3', 'Nov Week 4',
                         'Dec Week 1', 'Dec Week 2', 'Dec Week 3', 'Dec Week 4'],
                datasets: [{
                    label: 'Team Productivity Score',
                    data: [78, 82, 80, 85, 83, 87, 85, 90, 88, 92, 91, 94],
                    borderColor: 'rgb(79, 70, 229)',
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'Target',
                    data: Array(12).fill(85),
                    borderColor: 'rgb(16, 185, 129)',
                    borderDash: [5, 5],
                    borderWidth: 2,
                    pointRadius: 0,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom'
                    },
                    title: {
                        display: true,
                        text: 'Team Productivity Trend (Q4 2024)'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }
    
    // Project Timeline
    const timelineCtx = document.getElementById('projectTimelineChart');
    if (timelineCtx && !projectTimelineChart) {
        projectTimelineChart = new Chart(timelineCtx, {
            type: 'bar',
            data: {
                labels: ['React Migration', 'Mobile App', 'API Redesign', 'Dashboard v2', 'AWS Migration', 'Security Audit', 'Design System', 'Testing Framework'],
                datasets: [{
                    label: 'Planned Days',
                    data: [30, 45, 20, 35, 40, 15, 25, 20],
                    backgroundColor: 'rgb(209, 213, 219)'
                }, {
                    label: 'Actual Days',
                    data: [28, 42, 22, 35, 38, 14, 27, 19],
                    backgroundColor: 'rgb(79, 70, 229)'
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom'
                    },
                    title: {
                        display: true,
                        text: 'Project Delivery Time (Planned vs Actual)'
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// Update Reports based on filters
function updateReports() {
    const period = document.getElementById('reportPeriod').value;
    const department = document.getElementById('departmentFilter').value;
    
    showSuccessNotification(`Updating reports for ${period} (${department})...`);
    
    // In a real application, this would fetch new data and update charts
    setTimeout(() => {
        showSuccessNotification('✓ Reports updated successfully!');
    }, 1000);
}

// Export Chart
function exportChart(chartId) {
    showSuccessNotification(`Exporting ${chartId} as image...`);
}

// Export All Data
function exportAllData() {
    showSuccessNotification('✓ Exporting all data to Excel...');
}

// Customize Reports
function customizeReports() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h3>Customize Reports</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Report Name</label>
                    <input type="text" placeholder="My Custom Report">
                </div>
                
                <div class="form-group">
                    <label>Metrics to Include</label>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <label><input type="checkbox" checked> Performance Ratings</label>
                        <label><input type="checkbox" checked> Attendance</label>
                        <label><input type="checkbox" checked> Goals Achievement</label>
                        <label><input type="checkbox"> Leave Balance</label>
                        <label><input type="checkbox"> Productivity</label>
                        <label><input type="checkbox"> Time Tracking</label>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Chart Types</label>
                    <select>
                        <option>Bar Chart</option>
                        <option>Line Chart</option>
                        <option>Pie Chart</option>
                        <option>Radar Chart</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Schedule</label>
                    <select>
                        <option>One-time</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                        <option>Quarterly</option>
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Cancel</button>
                <button class="btn btn-primary" onclick="saveCustomReport()">Save Report</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function saveCustomReport() {
    document.querySelector('.modal').remove();
    showSuccessNotification('✓ Custom report saved successfully!');
}

// View Employee Report
function viewEmployeeReport(employeeId) {
    showSuccessNotification(`Loading detailed report for ${employeeId}...`);
}

// View Attendance Calendar
function viewAttendanceCalendar() {
    showSuccessNotification('Opening attendance calendar...');
}

// Export Attendance
function exportAttendance() {
    showSuccessNotification('✓ Exporting attendance report...');
}

// Filter Attendance Table
function filterAttendanceTable(query) {
    const rows = document.querySelectorAll('#attendance-tab table tbody tr');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query.toLowerCase()) ? '' : 'none';
    });
}

// View Attendance Details
function viewAttendanceDetails(employeeId) {
    showSuccessNotification(`Loading attendance details for ${employeeId}...`);
}

// View Performance Report
function viewPerformanceReport(employeeId) {
    showSuccessNotification(`Loading performance report for ${employeeId}...`);
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
            <span style="font-size: 20px;">📊</span>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS for report components
const style = document.createElement('style');
style.textContent = `
    .filter-section {
        background: white;
        padding: 24px;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        margin-bottom: 24px;
    }
    
    .filter-row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
    }
    
    .two-col-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 24px;
    }
    
    .performers-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    
    .performer-item {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 16px;
        background: var(--background);
        border-radius: 8px;
        border: 1px solid #E5E7EB;
    }
    
    .performer-rank {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: var(--primary-light);
        color: var(--primary-color);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        font-weight: bold;
    }
    
    .performer-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    
    .performer-info strong {
        font-size: 16px;
    }
    
    .performer-info span {
        font-size: 14px;
        color: var(--text-secondary);
    }
    
    .performer-stats {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
    }
    
    .stat-badge {
        padding: 4px 12px;
        background: white;
        border: 1px solid #E5E7EB;
        border-radius: 16px;
        font-size: 13px;
        font-weight: 500;
    }
    
    .mini-stat-card {
        padding: 16px;
        background: white;
        border: 1px solid #E5E7EB;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    
    .mini-stat-label {
        font-size: 14px;
        color: var(--text-secondary);
    }
    
    .mini-stat-value {
        font-size: 24px;
        font-weight: 700;
        color: var(--primary-color);
    }
    
    .timeline-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    
    .timeline-item {
        display: flex;
        gap: 16px;
        padding: 16px;
        background: var(--background);
        border-radius: 8px;
        border-left: 4px solid var(--primary-color);
    }
    
    .timeline-date {
        font-weight: 600;
        color: var(--primary-color);
        min-width: 100px;
    }
    
    .timeline-content {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;
    }
    
    .progress-bar {
        height: 8px;
        background: #E5E7EB;
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 4px;
    }
    
    .progress-fill {
        height: 100%;
        transition: width 0.3s ease;
    }
    
    @media (max-width: 768px) {
        .two-col-grid {
            grid-template-columns: 1fr;
        }
        
        .performer-item {
            flex-direction: column;
            align-items: flex-start;
        }
        
        .filter-row {
            grid-template-columns: 1fr;
        }
    }
`;
document.head.appendChild(style);
