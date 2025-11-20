# Human Capital HR Management System

🌐 **Live Demo:** [View Website](https://cozmicdev.github.io/Development-stuff/)

A comprehensive HR management system with portals for Employees, Managers, HR Staff, and Administrators.

## 🚀 Quick Start

Click **"Quick Demo Login"** on the main page to explore:
- 👤 **Employee Portal** - Leave requests, benefits, profile management
- 👔 **Manager Portal** - Team management, approvals, performance reviews
- 💼 **HR Portal** - Employee management, onboarding, recruitment
- ⚙️ **Admin Portal** - System configuration, security, monitoring

## ✨ Features

- ✅ 25+ fully functional pages
- ✅ Interactive dashboards with real-time data
- ✅ Comprehensive form validation
- ✅ LocalStorage data persistence
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Modern UI with smooth animations
- ✅ Chart.js for analytics visualization
- ✅ 400+ interactive functions
- ✅ Complete navigation system

## 🛠️ Technology Stack

- **Frontend:** Pure HTML5, CSS3, JavaScript (Vanilla - No frameworks!)
- **Charts:** Chart.js for data visualization
- **Storage:** Browser LocalStorage for demo data
- **Icons:** Emoji-based icon system
- **Design:** Custom CSS with modern gradients and effects

## 📁 Project Structure

```
/
├── index.html              # Main portal/login page
├── employee/               # Employee portal (8 pages)
│   ├── employee-dashboard.html
│   ├── employee-profile.html
│   ├── employee-timesheet.html
│   ├── employee-leave.html
│   ├── employee-benefits.html
│   ├── employee-documents.html
│   ├── employee-learning.html
│   └── employee-performance.html
├── manager/                # Manager portal (5 pages)
│   ├── manager-dashboard.html
│   ├── manager-team.html
│   ├── manager-approvals.html
│   ├── manager-performance.html
│   └── manager-reports.html
├── hr/                     # HR staff portal (7 pages)
│   ├── hr-dashboard.html
│   ├── hr-employees.html
│   ├── hr-onboarding.html
│   ├── hr-offboarding.html
│   ├── hr-recruitment.html
│   ├── hr-payroll.html
│   └── hr-requests.html
├── admin/                  # Admin portal (8 pages)
│   ├── admin-dashboard.html
│   ├── admin-users.html
│   ├── admin-security.html
│   ├── admin-system.html
│   ├── admin-audit.html
│   ├── admin-integrations.html
│   ├── admin-workflows.html
│   └── admin-templates.html
├── css/
│   └── styles.css          # Unified stylesheet (~2000 lines)
├── js/                     # JavaScript modules
│   ├── data-service.js     # Centralized data management
│   ├── charts-service.js   # Chart.js wrapper
│   ├── login.js            # Authentication logic
│   └── [25+ page-specific modules]
└── docs/                   # Documentation
    ├── requirements/       # System requirements
    ├── figma-designs/      # Figma design guide
    ├── DOCUMENTATION.md    # Complete API docs
    ├── PROJECT-SUMMARY.md  # Project overview
    └── README.md           # Original project documentation
```

## 🎯 Portal Features

### 👤 Employee Portal
- Personal dashboard with quick stats
- Time & attendance tracking
- Leave request management
- Benefits enrollment
- Document repository
- Learning & development courses
- Performance goals tracking
- Profile management

### 👔 Manager Portal
- Team overview dashboard
- Approval workflows (leave, expenses, timesheets)
- Performance review management
- Team analytics & reports
- Direct report management
- Goal tracking

### 💼 HR Portal
- Employee database management
- Onboarding & offboarding workflows
- Recruitment pipeline management
- Payroll processing
- HR request handling
- Employee analytics
- Document management

### ⚙️ Admin Portal
- User & role management
- Security settings (2FA, password policies)
- System configuration
- Audit logs & monitoring
- Integration management (SSO, Email, Calendar)
- Workflow automation
- Email template management

## 💾 Demo Data

The system includes realistic dummy data for demonstration:
- 248 employees across 12 departments
- 150+ leave requests with various statuses
- 50+ pending approvals
- 30+ active job postings
- 100+ training courses
- Complete audit trail
- System analytics and reports

## 🌐 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (responsive design)

## 📖 Documentation

Full documentation available in the [`docs/`](docs/) folder:
- [System Requirements](docs/requirements/) - Detailed feature requirements
- [API Documentation](docs/DOCUMENTATION.md) - Complete API reference
- [Project Summary](docs/PROJECT-SUMMARY.md) - Development overview
- [Figma Design Guide](docs/figma-designs/FIGMA-DESIGN-GUIDE.md) - Design system documentation
- [Navigation Testing Report](docs/NAVIGATION-TESTING-REPORT.md) - QA documentation

## 🚀 Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/CozmicDev/Development-stuff.git
   ```

2. **Open in browser:**
   - Simply open `index.html` in your browser
   - No build process or dependencies required!

3. **Optional: Use a local server:**
   ```bash
   # Python
   python -m http.server 8000
   
   # Node.js
   npx http-server -p 8000
   
   # VS Code Live Server extension
   ```

4. **Access:**
   - Navigate to `http://localhost:8000`
   - Click "Quick Demo Login" to explore

## 🔒 Security Note

⚠️ **Important:** This is a demonstration/portfolio project with dummy data only.

- **NOT** intended for production use with real employee information
- No backend authentication or authorization
- All data stored in browser LocalStorage (demo only)
- No sensitive credentials included
- Perfect for demonstrations, learning, or portfolio showcase

## 📊 Project Stats

- **Total Files:** 60+
- **Total Lines of Code:** ~29,000+
- **HTML Pages:** 25
- **JavaScript Modules:** 29
- **CSS Lines:** ~2,000
- **Functions:** 400+
- **Forms:** 80+
- **Modals:** 150+
- **Development Time:** Complete project

## 🎨 Design System

- **Color Palette:**
  - Primary Blue: `#4F46E5`
  - Success Green: `#10B981`
  - Warning Orange: `#F59E0A`
  - Danger Red: `#EF4444`
  - Purple: `#8B5CF6`

- **Typography:** Inter font family
- **Spacing:** 8px grid system
- **Shadows:** Multi-level depth system
- **Animations:** Smooth transitions throughout

## 🤝 Contributing

This is a portfolio/demonstration project, but feedback and suggestions are welcome!

## 📄 License

This project is available as a demonstration and portfolio piece.

## 👨‍💻 Author

**CozmicDev**
- GitHub: [@CozmicDev](https://github.com/CozmicDev)

## 🙏 Acknowledgments

- Chart.js for data visualization
- Inter font family
- Modern CSS techniques and best practices

---

**Made with ❤️ using pure HTML, CSS, and JavaScript**

⚠️ **Disclaimer:** This is a mockup system with dummy data only. Not intended for production use with real employee information.
