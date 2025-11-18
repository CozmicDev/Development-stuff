// Charts and Analytics Integration
// Using Chart.js for data visualization

const ChartService = {
    // Chart.js CDN - add this to pages that need charts
    CDN: 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js',

    // Default chart colors
    colors: {
        primary: '#4F46E5',
        secondary: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        info: '#3B82F6',
        purple: '#8B5CF6',
        pink: '#EC4899',
        teal: '#14B8A6'
    },

    // Initialize Chart.js
    async init() {
        if (typeof Chart === 'undefined') {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = this.CDN;
                script.onload = () => {
                    console.log('✅ Chart.js loaded successfully');
                    resolve();
                };
                script.onerror = () => {
                    console.error('❌ Failed to load Chart.js');
                    reject();
                };
                document.head.appendChild(script);
            });
        }
        return Promise.resolve();
    },

    // Employee Dashboard Charts
    EmployeeDashboard: {
        // Leave balance chart (doughnut)
        createLeaveBalanceChart(canvasId, balances) {
            const ctx = document.getElementById(canvasId);
            if (!ctx) return null;

            return new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Vacation', 'Sick Leave', 'Personal', 'Bereavement'],
                    datasets: [{
                        data: [
                            balances.vacation || 0,
                            balances.sick || 0,
                            balances.personal || 0,
                            balances.bereavement || 0
                        ],
                        backgroundColor: [
                            ChartService.colors.primary,
                            ChartService.colors.warning,
                            ChartService.colors.secondary,
                            ChartService.colors.info
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        },
                        title: {
                            display: true,
                            text: 'Available Leave Days'
                        }
                    }
                }
            });
        },

        // Monthly attendance chart (line)
        createAttendanceChart(canvasId, data) {
            const ctx = document.getElementById(canvasId);
            if (!ctx) return null;

            return new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Days Present',
                        data: data || [22, 20, 23, 21, 22, 21, 23, 22, 20, 23, 21, 22],
                        borderColor: ChartService.colors.primary,
                        backgroundColor: ChartService.colors.primary + '20',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'Attendance Trend (2024)'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 25
                        }
                    }
                }
            });
        }
    },

    // Manager Dashboard Charts
    ManagerDashboard: {
        // Team performance chart (bar)
        createTeamPerformanceChart(canvasId, teamData) {
            const ctx = document.getElementById(canvasId);
            if (!ctx) return null;

            return new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: teamData?.names || ['John', 'Sarah', 'Mike', 'Emily', 'David', 'Lisa'],
                    datasets: [{
                        label: 'Performance Rating',
                        data: teamData?.ratings || [4.5, 4.8, 4.2, 4.6, 4.3, 4.7],
                        backgroundColor: ChartService.colors.primary,
                        borderRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'Team Performance Ratings'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 5
                        }
                    }
                }
            });
        },

        // Leave requests by type (pie)
        createLeaveTypeChart(canvasId, data) {
            const ctx = document.getElementById(canvasId);
            if (!ctx) return null;

            return new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Vacation', 'Sick', 'Personal', 'Other'],
                    datasets: [{
                        data: data || [45, 25, 20, 10],
                        backgroundColor: [
                            ChartService.colors.primary,
                            ChartService.colors.warning,
                            ChartService.colors.secondary,
                            ChartService.colors.info
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        },
                        title: {
                            display: true,
                            text: 'Leave Requests by Type'
                        }
                    }
                }
            });
        },

        // Approval trend (line)
        createApprovalTrendChart(canvasId, data) {
            const ctx = document.getElementById(canvasId);
            if (!ctx) return null;

            return new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                    datasets: [
                        {
                            label: 'Approved',
                            data: data?.approved || [12, 15, 18, 14],
                            borderColor: ChartService.colors.secondary,
                            backgroundColor: ChartService.colors.secondary + '20',
                            tension: 0.4,
                            fill: true
                        },
                        {
                            label: 'Rejected',
                            data: data?.rejected || [2, 1, 3, 2],
                            borderColor: ChartService.colors.danger,
                            backgroundColor: ChartService.colors.danger + '20',
                            tension: 0.4,
                            fill: true
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Monthly Approval Trend'
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
    },

    // HR Dashboard Charts
    HRDashboard: {
        // Department headcount (bar)
        createDepartmentChart(canvasId, data) {
            const ctx = document.getElementById(canvasId);
            if (!ctx) return null;

            return new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data?.departments || ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations'],
                    datasets: [{
                        label: 'Employees',
                        data: data?.counts || [45, 38, 22, 12, 18, 25],
                        backgroundColor: [
                            ChartService.colors.primary,
                            ChartService.colors.secondary,
                            ChartService.colors.warning,
                            ChartService.colors.info,
                            ChartService.colors.purple,
                            ChartService.colors.teal
                        ],
                        borderRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'Employees by Department'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        },

        // Hiring trend (line)
        createHiringTrendChart(canvasId, data) {
            const ctx = document.getElementById(canvasId);
            if (!ctx) return null;

            return new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [
                        {
                            label: 'New Hires',
                            data: data?.hires || [8, 12, 6, 15, 10, 14, 8, 11, 13, 9, 7, 10],
                            borderColor: ChartService.colors.secondary,
                            backgroundColor: ChartService.colors.secondary + '20',
                            tension: 0.4,
                            fill: true
                        },
                        {
                            label: 'Terminations',
                            data: data?.terminations || [2, 3, 1, 2, 4, 2, 3, 1, 2, 3, 2, 1],
                            borderColor: ChartService.colors.danger,
                            backgroundColor: ChartService.colors.danger + '20',
                            tension: 0.4,
                            fill: true
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Hiring & Turnover Trend (2024)'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        },

        // Employee status distribution (doughnut)
        createEmployeeStatusChart(canvasId, data) {
            const ctx = document.getElementById(canvasId);
            if (!ctx) return null;

            return new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Active', 'On Leave', 'New Hires', 'Terminated'],
                    datasets: [{
                        data: data || [238, 9, 8, 2],
                        backgroundColor: [
                            ChartService.colors.secondary,
                            ChartService.colors.warning,
                            ChartService.colors.primary,
                            ChartService.colors.danger
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        },
                        title: {
                            display: true,
                            text: 'Employee Status Distribution'
                        }
                    }
                }
            });
        }
    },

    // Admin Dashboard Charts
    AdminDashboard: {
        // System performance (line)
        createSystemPerformanceChart(canvasId, data) {
            const ctx = document.getElementById(canvasId);
            if (!ctx) return null;

            return new Chart(ctx, {
                type: 'line',
                data: {
                    labels: Array.from({length: 24}, (_, i) => `${i}:00`),
                    datasets: [
                        {
                            label: 'CPU %',
                            data: data?.cpu || Array.from({length: 24}, () => Math.random() * 60 + 20),
                            borderColor: ChartService.colors.primary,
                            backgroundColor: ChartService.colors.primary + '20',
                            tension: 0.4,
                            fill: true
                        },
                        {
                            label: 'Memory %',
                            data: data?.memory || Array.from({length: 24}, () => Math.random() * 40 + 40),
                            borderColor: ChartService.colors.warning,
                            backgroundColor: ChartService.colors.warning + '20',
                            tension: 0.4,
                            fill: true
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'System Performance (Last 24 Hours)'
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
        },

        // User activity (bar)
        createUserActivityChart(canvasId, data) {
            const ctx = document.getElementById(canvasId);
            if (!ctx) return null;

            return new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Active Users',
                        data: data || [230, 245, 238, 242, 235, 85, 92],
                        backgroundColor: ChartService.colors.primary,
                        borderRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'Active Users by Day'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        },

        // Storage usage (doughnut)
        createStorageChart(canvasId, data) {
            const ctx = document.getElementById(canvasId);
            if (!ctx) return null;

            return new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Used', 'Available'],
                    datasets: [{
                        data: data || [2.4, 2.6],
                        backgroundColor: [
                            ChartService.colors.primary,
                            '#E5E7EB'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        },
                        title: {
                            display: true,
                            text: 'Storage Usage (TB)'
                        }
                    }
                }
            });
        }
    },

    // Utility functions
    destroyChart(chart) {
        if (chart && typeof chart.destroy === 'function') {
            chart.destroy();
        }
    },

    updateChart(chart, newData) {
        if (chart && newData) {
            chart.data = newData;
            chart.update();
        }
    }
};

// Make available globally
window.ChartService = ChartService;

console.log('📊 Chart Service initialized');
