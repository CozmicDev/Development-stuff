// Centralized Data Service for HR System
// Manages all localStorage operations, sessions, and data validation

const DataService = {
    // Storage keys
    KEYS: {
        USER_SESSION: 'hrpro_user_session',
        LEAVE_REQUESTS: 'hrpro_leave_requests',
        LEAVE_BALANCES: 'hrpro_leave_balances',
        USER_PROFILE: 'hrpro_user_profile',
        EMERGENCY_CONTACTS: 'hrpro_emergency_contacts',
        BENEFITS_ENROLLMENT: 'hrpro_benefits',
        BENEFICIARIES: 'hrpro_beneficiaries',
        TEAM_DATA: 'hrpro_team_data',
        APPROVAL_REQUESTS: 'hrpro_approvals',
        HR_EMPLOYEES: 'hrpro_hr_employees',
        HR_REQUESTS: 'hrpro_hr_requests',
        SYSTEM_SETTINGS: 'hrpro_system_settings',
        AUDIT_LOG: 'hrpro_audit_log'
    },

    // User Session Management
    Session: {
        create(userData) {
            const session = {
                userId: userData.userId,
                username: userData.username,
                email: userData.email,
                role: userData.role,
                name: userData.name,
                department: userData.department,
                loginTime: new Date().toISOString(),
                lastActivity: new Date().toISOString()
            };
            localStorage.setItem(DataService.KEYS.USER_SESSION, JSON.stringify(session));
            DataService.AuditLog.log('user_login', `User ${userData.username} logged in`);
            return session;
        },

        get() {
            const session = localStorage.getItem(DataService.KEYS.USER_SESSION);
            if (!session) return null;
            
            const sessionData = JSON.parse(session);
            
            // Update last activity
            sessionData.lastActivity = new Date().toISOString();
            localStorage.setItem(DataService.KEYS.USER_SESSION, JSON.stringify(sessionData));
            
            return sessionData;
        },

        update(updates) {
            const session = this.get();
            if (!session) return null;
            
            const updatedSession = { ...session, ...updates, lastActivity: new Date().toISOString() };
            localStorage.setItem(DataService.KEYS.USER_SESSION, JSON.stringify(updatedSession));
            return updatedSession;
        },

        destroy() {
            const session = this.get();
            if (session) {
                DataService.AuditLog.log('user_logout', `User ${session.username} logged out`);
            }
            localStorage.removeItem(DataService.KEYS.USER_SESSION);
        },

        isValid() {
            const session = this.get();
            if (!session) return false;
            
            // Check if session is older than 24 hours
            const loginTime = new Date(session.loginTime);
            const now = new Date();
            const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
            
            return hoursDiff < 24;
        }
    },

    // Leave Management
    Leave: {
        getBalances() {
            const balances = localStorage.getItem(DataService.KEYS.LEAVE_BALANCES);
            return balances ? JSON.parse(balances) : {
                vacation: 15,
                sick: 10,
                personal: 5,
                bereavement: 3
            };
        },

        updateBalances(balances) {
            localStorage.setItem(DataService.KEYS.LEAVE_BALANCES, JSON.stringify(balances));
            DataService.AuditLog.log('leave_balance_update', 'Leave balances updated');
        },

        getRequests() {
            const requests = localStorage.getItem(DataService.KEYS.LEAVE_REQUESTS);
            return requests ? JSON.parse(requests) : [];
        },

        addRequest(request) {
            const requests = this.getRequests();
            const newRequest = {
                id: `LR-${Date.now()}`,
                ...request,
                status: 'pending',
                submittedDate: new Date().toISOString()
            };
            requests.push(newRequest);
            localStorage.setItem(DataService.KEYS.LEAVE_REQUESTS, JSON.stringify(requests));
            DataService.AuditLog.log('leave_request_submit', `Leave request ${newRequest.id} submitted`);
            return newRequest;
        },

        updateRequest(id, updates) {
            const requests = this.getRequests();
            const index = requests.findIndex(r => r.id === id);
            if (index !== -1) {
                requests[index] = { ...requests[index], ...updates };
                localStorage.setItem(DataService.KEYS.LEAVE_REQUESTS, JSON.stringify(requests));
                DataService.AuditLog.log('leave_request_update', `Leave request ${id} updated`);
                return requests[index];
            }
            return null;
        },

        deleteRequest(id) {
            const requests = this.getRequests();
            const filtered = requests.filter(r => r.id !== id);
            localStorage.setItem(DataService.KEYS.LEAVE_REQUESTS, JSON.stringify(filtered));
            DataService.AuditLog.log('leave_request_delete', `Leave request ${id} deleted`);
        }
    },

    // Profile Management
    Profile: {
        get() {
            const profile = localStorage.getItem(DataService.KEYS.USER_PROFILE);
            return profile ? JSON.parse(profile) : null;
        },

        update(profileData) {
            const currentProfile = this.get() || {};
            const updatedProfile = { ...currentProfile, ...profileData, updatedAt: new Date().toISOString() };
            localStorage.setItem(DataService.KEYS.USER_PROFILE, JSON.stringify(updatedProfile));
            DataService.AuditLog.log('profile_update', 'User profile updated');
            return updatedProfile;
        },

        getEmergencyContacts() {
            const contacts = localStorage.getItem(DataService.KEYS.EMERGENCY_CONTACTS);
            return contacts ? JSON.parse(contacts) : [];
        },

        addEmergencyContact(contact) {
            const contacts = this.getEmergencyContacts();
            const newContact = {
                id: `EC-${Date.now()}`,
                ...contact,
                createdAt: new Date().toISOString()
            };
            contacts.push(newContact);
            localStorage.setItem(DataService.KEYS.EMERGENCY_CONTACTS, JSON.stringify(contacts));
            DataService.AuditLog.log('emergency_contact_add', 'Emergency contact added');
            return newContact;
        },

        updateEmergencyContact(id, updates) {
            const contacts = this.getEmergencyContacts();
            const index = contacts.findIndex(c => c.id === id);
            if (index !== -1) {
                contacts[index] = { ...contacts[index], ...updates };
                localStorage.setItem(DataService.KEYS.EMERGENCY_CONTACTS, JSON.stringify(contacts));
                DataService.AuditLog.log('emergency_contact_update', `Emergency contact ${id} updated`);
                return contacts[index];
            }
            return null;
        },

        deleteEmergencyContact(id) {
            const contacts = this.getEmergencyContacts();
            const filtered = contacts.filter(c => c.id !== id);
            localStorage.setItem(DataService.KEYS.EMERGENCY_CONTACTS, JSON.stringify(filtered));
            DataService.AuditLog.log('emergency_contact_delete', `Emergency contact ${id} deleted`);
        }
    },

    // Benefits Management
    Benefits: {
        getEnrollment() {
            const enrollment = localStorage.getItem(DataService.KEYS.BENEFITS_ENROLLMENT);
            return enrollment ? JSON.parse(enrollment) : null;
        },

        updateEnrollment(enrollmentData) {
            const currentEnrollment = this.getEnrollment() || {};
            const updatedEnrollment = { ...currentEnrollment, ...enrollmentData, updatedAt: new Date().toISOString() };
            localStorage.setItem(DataService.KEYS.BENEFITS_ENROLLMENT, JSON.stringify(updatedEnrollment));
            DataService.AuditLog.log('benefits_enrollment_update', 'Benefits enrollment updated');
            return updatedEnrollment;
        },

        getBeneficiaries() {
            const beneficiaries = localStorage.getItem(DataService.KEYS.BENEFICIARIES);
            return beneficiaries ? JSON.parse(beneficiaries) : [];
        },

        addBeneficiary(beneficiary) {
            const beneficiaries = this.getBeneficiaries();
            const newBeneficiary = {
                id: `BEN-${Date.now()}`,
                ...beneficiary,
                createdAt: new Date().toISOString()
            };
            beneficiaries.push(newBeneficiary);
            localStorage.setItem(DataService.KEYS.BENEFICIARIES, JSON.stringify(beneficiaries));
            DataService.AuditLog.log('beneficiary_add', 'Beneficiary added');
            return newBeneficiary;
        },

        updateBeneficiary(id, updates) {
            const beneficiaries = this.getBeneficiaries();
            const index = beneficiaries.findIndex(b => b.id === id);
            if (index !== -1) {
                beneficiaries[index] = { ...beneficiaries[index], ...updates };
                localStorage.setItem(DataService.KEYS.BENEFICIARIES, JSON.stringify(beneficiaries));
                DataService.AuditLog.log('beneficiary_update', `Beneficiary ${id} updated`);
                return beneficiaries[index];
            }
            return null;
        },

        deleteBeneficiary(id) {
            const beneficiaries = this.getBeneficiaries();
            const filtered = beneficiaries.filter(b => b.id !== id);
            localStorage.setItem(DataService.KEYS.BENEFICIARIES, JSON.stringify(filtered));
            DataService.AuditLog.log('beneficiary_delete', `Beneficiary ${id} deleted`);
        }
    },

    // Approval Management
    Approvals: {
        getRequests() {
            const requests = localStorage.getItem(DataService.KEYS.APPROVAL_REQUESTS);
            return requests ? JSON.parse(requests) : [];
        },

        approve(requestId, comments = '') {
            const requests = this.getRequests();
            const index = requests.findIndex(r => r.id === requestId);
            if (index !== -1) {
                requests[index].status = 'approved';
                requests[index].approvedBy = DataService.Session.get()?.username;
                requests[index].approvedAt = new Date().toISOString();
                requests[index].comments = comments;
                localStorage.setItem(DataService.KEYS.APPROVAL_REQUESTS, JSON.stringify(requests));
                DataService.AuditLog.log('approval_approve', `Request ${requestId} approved`);
                return requests[index];
            }
            return null;
        },

        reject(requestId, reason) {
            const requests = this.getRequests();
            const index = requests.findIndex(r => r.id === requestId);
            if (index !== -1) {
                requests[index].status = 'rejected';
                requests[index].rejectedBy = DataService.Session.get()?.username;
                requests[index].rejectedAt = new Date().toISOString();
                requests[index].rejectionReason = reason;
                localStorage.setItem(DataService.KEYS.APPROVAL_REQUESTS, JSON.stringify(requests));
                DataService.AuditLog.log('approval_reject', `Request ${requestId} rejected`);
                return requests[index];
            }
            return null;
        }
    },

    // HR Employee Management
    HREmployees: {
        getAll() {
            const employees = localStorage.getItem(DataService.KEYS.HR_EMPLOYEES);
            return employees ? JSON.parse(employees) : [];
        },

        add(employee) {
            const employees = this.getAll();
            const newEmployee = {
                id: `EMP${String(employees.length + 1).padStart(3, '0')}`,
                ...employee,
                createdAt: new Date().toISOString(),
                status: 'active'
            };
            employees.push(newEmployee);
            localStorage.setItem(DataService.KEYS.HR_EMPLOYEES, JSON.stringify(employees));
            DataService.AuditLog.log('employee_add', `Employee ${newEmployee.id} added`);
            return newEmployee;
        },

        update(id, updates) {
            const employees = this.getAll();
            const index = employees.findIndex(e => e.id === id);
            if (index !== -1) {
                employees[index] = { ...employees[index], ...updates, updatedAt: new Date().toISOString() };
                localStorage.setItem(DataService.KEYS.HR_EMPLOYEES, JSON.stringify(employees));
                DataService.AuditLog.log('employee_update', `Employee ${id} updated`);
                return employees[index];
            }
            return null;
        },

        delete(id) {
            const employees = this.getAll();
            const filtered = employees.filter(e => e.id !== id);
            localStorage.setItem(DataService.KEYS.HR_EMPLOYEES, JSON.stringify(filtered));
            DataService.AuditLog.log('employee_delete', `Employee ${id} deleted`);
        }
    },

    // HR Requests Management
    HRRequests: {
        getAll() {
            const requests = localStorage.getItem(DataService.KEYS.HR_REQUESTS);
            return requests ? JSON.parse(requests) : [];
        },

        process(requestId, action, notes = '') {
            const requests = this.getAll();
            const index = requests.findIndex(r => r.id === requestId);
            if (index !== -1) {
                requests[index].status = action;
                requests[index].processedBy = DataService.Session.get()?.username;
                requests[index].processedAt = new Date().toISOString();
                requests[index].processingNotes = notes;
                localStorage.setItem(DataService.KEYS.HR_REQUESTS, JSON.stringify(requests));
                DataService.AuditLog.log('hr_request_process', `HR request ${requestId} ${action}`);
                return requests[index];
            }
            return null;
        }
    },

    // System Settings
    Settings: {
        get() {
            const settings = localStorage.getItem(DataService.KEYS.SYSTEM_SETTINGS);
            return settings ? JSON.parse(settings) : this.getDefaults();
        },

        getDefaults() {
            return {
                theme: 'light',
                language: 'en',
                notifications: {
                    email: true,
                    push: true,
                    sms: false
                },
                security: {
                    mfaEnabled: false,
                    sessionTimeout: 24,
                    passwordExpiry: 90
                },
                features: {
                    leaveManagement: true,
                    benefitsEnrollment: true,
                    performanceReviews: true,
                    timeTracking: true
                }
            };
        },

        update(settingPath, value) {
            const settings = this.get();
            const keys = settingPath.split('.');
            let current = settings;
            
            for (let i = 0; i < keys.length - 1; i++) {
                if (!current[keys[i]]) current[keys[i]] = {};
                current = current[keys[i]];
            }
            
            current[keys[keys.length - 1]] = value;
            localStorage.setItem(DataService.KEYS.SYSTEM_SETTINGS, JSON.stringify(settings));
            DataService.AuditLog.log('settings_update', `Setting ${settingPath} updated`);
            return settings;
        }
    },

    // Audit Log
    AuditLog: {
        log(action, description, metadata = {}) {
            const logs = this.getAll();
            const session = DataService.Session.get();
            
            const logEntry = {
                id: `LOG-${Date.now()}`,
                timestamp: new Date().toISOString(),
                action: action,
                description: description,
                userId: session?.userId || 'system',
                username: session?.username || 'system',
                metadata: metadata,
                ipAddress: 'N/A' // Would be from server in real implementation
            };
            
            logs.push(logEntry);
            
            // Keep only last 1000 logs
            if (logs.length > 1000) {
                logs.shift();
            }
            
            localStorage.setItem(DataService.KEYS.AUDIT_LOG, JSON.stringify(logs));
        },

        getAll() {
            const logs = localStorage.getItem(DataService.KEYS.AUDIT_LOG);
            return logs ? JSON.parse(logs) : [];
        },

        getRecent(count = 50) {
            const logs = this.getAll();
            return logs.slice(-count).reverse();
        },

        search(filters) {
            const logs = this.getAll();
            return logs.filter(log => {
                if (filters.action && log.action !== filters.action) return false;
                if (filters.userId && log.userId !== filters.userId) return false;
                if (filters.startDate && new Date(log.timestamp) < new Date(filters.startDate)) return false;
                if (filters.endDate && new Date(log.timestamp) > new Date(filters.endDate)) return false;
                if (filters.searchTerm && !log.description.toLowerCase().includes(filters.searchTerm.toLowerCase())) return false;
                return true;
            });
        },

        clear() {
            localStorage.setItem(DataService.KEYS.AUDIT_LOG, JSON.stringify([]));
            this.log('audit_log_clear', 'Audit log cleared');
        }
    },

    // Utility functions
    Utils: {
        clearAll() {
            if (confirm('This will clear all data. Are you sure?')) {
                Object.values(DataService.KEYS).forEach(key => {
                    localStorage.removeItem(key);
                });
                console.log('All data cleared');
                return true;
            }
            return false;
        },

        export() {
            const allData = {};
            Object.entries(DataService.KEYS).forEach(([name, key]) => {
                const data = localStorage.getItem(key);
                if (data) {
                    allData[name] = JSON.parse(data);
                }
            });
            return allData;
        },

        import(data) {
            Object.entries(data).forEach(([name, value]) => {
                const key = DataService.KEYS[name];
                if (key) {
                    localStorage.setItem(key, JSON.stringify(value));
                }
            });
            console.log('Data imported successfully');
        },

        getStorageSize() {
            let total = 0;
            Object.values(DataService.KEYS).forEach(key => {
                const item = localStorage.getItem(key);
                if (item) {
                    total += item.length + key.length;
                }
            });
            return {
                bytes: total,
                kilobytes: (total / 1024).toFixed(2),
                megabytes: (total / (1024 * 1024)).toFixed(2)
            };
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataService;
}

// Make available globally
window.DataService = DataService;

console.log('✅ Data Service initialized');
console.log('📊 Storage size:', DataService.Utils.getStorageSize());
