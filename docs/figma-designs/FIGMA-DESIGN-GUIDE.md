# Complete Figma Design Guide
## HR Management System - Design Recreation Documentation

This guide will walk you through recreating the entire HR Management System in Figma, matching the HTML mockup exactly.

---

## Table of Contents
1. [Setup & Preparation](#setup--preparation)
2. [Design System Foundation](#design-system-foundation)
3. [Component Library](#component-library)
4. [Page-by-Page Guide](#page-by-page-guide)
5. [Best Practices](#best-practices)

---

## Setup & Preparation

### 1. Create Figma Account & File
1. Go to [figma.com](https://figma.com) and sign up (free account works)
2. Create a new Design file: **"HR Management System"**
3. Set up your workspace with these pages:
   - 📐 **Design System** (colors, typography, components)
   - 🏠 **Main Portal**
   - 👤 **Employee Portal** (8 pages)
   - 👔 **Manager Portal** (5 pages)
   - 💼 **HR Portal** (7 pages)
   - ⚙️ **Admin Portal** (8 pages)

### 2. Install Plugins (Optional but Recommended)
- **Iconify** - For easy icon access
- **Content Reel** - For dummy data
- **Unsplash** - For placeholder images
- **Auto Layout** - Built-in, learn to use it!

---

## Design System Foundation

### Color Palette

Create color styles in Figma (Right-click color → Create Style):

#### Primary Colors
```
Primary Blue:     #4F46E5 (rgb(79, 70, 229))
Primary Green:    #10B981 (rgb(16, 185, 129))
Primary Orange:   #F59E0A (rgb(245, 158, 10))
Primary Purple:   #8B5CF6 (rgb(139, 92, 246))
```

#### Semantic Colors
```
Success:          #10B981 (Green)
Warning:          #F59E0A (Orange)
Danger:           #EF4444 (rgb(239, 68, 68))
Info:             #3B82F6 (rgb(59, 130, 246))
```

#### Neutral Colors
```
Gray 50:          #F9FAFB (Background light)
Gray 100:         #F3F4F6 (Background)
Gray 200:         #E5E7EB (Borders light)
Gray 300:         #D1D5DB (Borders)
Gray 400:         #9CA3AF (Disabled)
Gray 500:         #6B7280 (Text secondary)
Gray 600:         #4B5563 (Text)
Gray 700:         #374151 (Text dark)
Gray 800:         #1F2937 (Text darker)
Gray 900:         #111827 (Text darkest)
White:            #FFFFFF
```

#### Status Colors
```
Active:           #10B981 (Green)
Pending:          #F59E0A (Orange)
Rejected:         #EF4444 (Red)
Approved:         #10B981 (Green)
Draft:            #6B7280 (Gray)
```

### Typography

Create text styles in Figma (Text → Create Style):

#### Headings
```
H1 - Hero Title
  Font: Inter Bold
  Size: 48px
  Line Height: 56px (117%)
  Color: Gray 900

H2 - Page Title
  Font: Inter Bold
  Size: 32px
  Line Height: 40px (125%)
  Color: Gray 900

H3 - Section Title
  Font: Inter SemiBold
  Size: 24px
  Line Height: 32px (133%)
  Color: Gray 900

H4 - Card Title
  Font: Inter SemiBold
  Size: 20px
  Line Height: 28px (140%)
  Color: Gray 900

H5 - Subsection
  Font: Inter SemiBold
  Size: 16px
  Line Height: 24px (150%)
  Color: Gray 700
```

#### Body Text
```
Body Large
  Font: Inter Regular
  Size: 18px
  Line Height: 28px (156%)
  Color: Gray 700

Body Regular
  Font: Inter Regular
  Size: 16px
  Line Height: 24px (150%)
  Color: Gray 700

Body Small
  Font: Inter Regular
  Size: 14px
  Line Height: 20px (143%)
  Color: Gray 600

Caption
  Font: Inter Regular
  Size: 12px
  Line Height: 16px (133%)
  Color: Gray 500
```

#### Buttons & Labels
```
Button Large
  Font: Inter SemiBold
  Size: 16px
  Line Height: 24px (150%)
  Color: White

Button Regular
  Font: Inter SemiBold
  Size: 14px
  Line Height: 20px (143%)
  Color: White

Label
  Font: Inter Medium
  Size: 14px
  Line Height: 20px (143%)
  Color: Gray 700
```

### Spacing System

Use an 8px grid system. Common spacing values:
```
4px   - Micro spacing (between related text)
8px   - Tiny spacing (icon-text gap)
12px  - Small spacing (button padding vertical)
16px  - Medium spacing (card padding small)
20px  - Regular spacing (between elements)
24px  - Large spacing (card padding, section gaps)
32px  - XL spacing (between sections)
40px  - XXL spacing (major sections)
48px  - 3XL spacing (page padding)
64px  - 4XL spacing (major dividers)
```

### Border Radius
```
sm:  4px  - Small elements (badges, tags)
md:  6px  - Inputs, small buttons
lg:  8px  - Buttons, small cards
xl:  12px - Cards, modals
2xl: 16px - Large cards, feature sections
full: 9999px - Pills, avatars
```

### Shadows (Effects)

Create effect styles:

```
Shadow XS (Subtle)
  X: 0, Y: 1, Blur: 2, Spread: 0
  Color: #00000008 (Black 5%)

Shadow SM (Card Default)
  X: 0, Y: 2, Blur: 8, Spread: 0
  Color: #0000000F (Black 6%)

Shadow MD (Card Hover)
  X: 0, Y: 4, Blur: 16, Spread: 0
  Color: #00000014 (Black 8%)

Shadow LG (Dropdown)
  X: 0, Y: 8, Blur: 24, Spread: 0
  Color: #0000001A (Black 10%)

Shadow XL (Modal)
  X: 0, Y: 16, Blur: 48, Spread: 0
  Color: #00000029 (Black 16%)
```

---

## Component Library

### 1. Buttons

#### Primary Button
**Figma Steps:**
1. Create a frame: 140px × 44px
2. Add border radius: 8px
3. Fill: Primary Blue (#4F46E5)
4. Add text: "Button Text" (Button Regular style, White)
5. Center text using Auto Layout
6. Padding: 12px top/bottom, 24px left/right
7. Create component (⌥⌘K / Ctrl+Alt+K)
8. Add variants:
   - **State**: Default, Hover, Active, Disabled
   - **Size**: Small (36px), Medium (44px), Large (52px)
   - **Color**: Blue, Green, Orange, Purple, Red

**Component Properties:**
- Default: Blue background, white text
- Hover: Darker blue (#4338CA)
- Active: Even darker (#3730A3)
- Disabled: Gray 300 background, Gray 400 text, opacity 50%

#### Secondary Button
- Same structure as primary
- Fill: White
- Stroke: 1px, Gray 300
- Text: Gray 700
- Hover: Gray 50 background

#### Ghost Button
- No fill, no stroke
- Text: Primary Blue
- Hover: Blue 50 background (#EEF2FF)

### 2. Input Fields

#### Text Input
**Figma Steps:**
1. Frame: 320px × 44px
2. Fill: White
3. Stroke: 1px, Gray 300
4. Border radius: 6px
5. Add placeholder text: "Enter text..." (Body Regular, Gray 400)
6. Padding: 12px left/right
7. Create component with variants:
   - **State**: Default, Focus, Error, Disabled
   - **With Icon**: True/False
   - **With Label**: True/False

**States:**
- Focus: Border → Primary Blue, 2px width
- Error: Border → Red, helper text below in red
- Disabled: Background → Gray 50, text → Gray 400

#### Label + Input Combo
1. Frame (Auto Layout vertical)
2. Label text (Label style) - 4px margin bottom
3. Input field component instance
4. Helper text (Caption style, Gray 500) - 4px margin top

### 3. Cards

#### Basic Card
**Figma Steps:**
1. Frame: Variable width × height
2. Fill: White
3. Border radius: 12px
4. Shadow: Shadow SM
5. Padding: 24px all sides
6. Auto Layout: Vertical, 16px gap
7. Create component

**Variants:**
- **Padding**: Small (16px), Medium (24px), Large (32px)
- **Shadow**: None, SM, MD, LG
- **Hover**: Add Shadow MD on hover

#### Stat Card (Dashboard Widget)
1. Frame: 280px × 140px
2. Auto Layout vertical, 12px gap
3. Top row: Label (Gray 500) + Icon (24px)
4. Large number (H2 style)
5. Small text below (Caption, with trend arrow)

### 4. Navigation Components

#### Top Navigation Bar
**Dimensions:** Full width × 70px

**Structure:**
1. Frame with Auto Layout horizontal
2. Fill: White
3. Shadow: Shadow SM
4. Three sections (Auto Layout):
   - **Left**: Logo + Brand name (40px padding left)
   - **Center**: Navigation links (32px gap)
   - **Right**: Notifications + User profile (40px padding right)

**Logo Section:**
- Icon: 32px emoji or logo
- Text: "Human Capital" (24px Bold)
- 16px gap between

**Nav Links:**
- Height: 40px
- Padding: 8px 16px
- Border radius: 6px
- Active state: Colored background (10% opacity) + colored text
- Hover: Gray 100 background

**User Profile:**
- Avatar: 40px circle
- Name: 14px SemiBold
- Role: 12px Regular, Gray 500
- Auto Layout horizontal, 12px gap

#### Sidebar Navigation (if used)
**Dimensions:** 280px × Full height

**Structure:**
1. Fixed width frame
2. Fill: Gray 50
3. Border right: 1px, Gray 200
4. Auto Layout vertical
5. Sections with dividers

### 5. Tables

#### Data Table
**Header Row:**
- Height: 48px
- Background: Gray 50
- Text: Label style, Gray 700
- Padding: 12px 16px

**Data Row:**
- Height: 56px
- Background: White
- Border bottom: 1px, Gray 200
- Padding: 12px 16px
- Hover: Gray 50 background

**Cell Types:**
- Text cell: Body Small
- Status badge: Pill shape, colored background
- Action buttons: Icon buttons, 32px

### 6. Modals

#### Standard Modal
**Dimensions:** 600px width, auto height (max 80vh)

**Structure:**
1. **Overlay**: Full screen, Black 40% opacity
2. **Modal Container**:
   - Frame: 600px × auto
   - Fill: White
   - Border radius: 16px
   - Shadow: Shadow XL
3. **Header** (Auto Layout):
   - Height: 64px
   - Title (H4 style)
   - Close button (top right)
   - Border bottom: 1px, Gray 200
   - Padding: 24px
4. **Body**:
   - Padding: 24px
   - Auto Layout vertical, 20px gap
5. **Footer** (if needed):
   - Height: 72px
   - Border top: 1px, Gray 200
   - Padding: 24px
   - Buttons aligned right

### 7. Form Elements

#### Checkbox
- Size: 20px × 20px
- Border: 2px, Gray 300
- Border radius: 4px
- Checked: Fill Primary Blue, white checkmark icon

#### Radio Button
- Size: 20px × 20px
- Border: 2px, Gray 300
- Border radius: full (circle)
- Selected: Blue border, 6px blue dot inside

#### Toggle Switch
- Width: 44px, Height: 24px
- Border radius: full
- Off: Gray 300 background
- On: Primary Blue background
- Knob: 20px circle, white, 2px margin

#### Select Dropdown
- Same as text input
- Add chevron-down icon on right (16px)
- Dropdown menu: Card style, shadow LG

### 8. Badges & Tags

#### Status Badge
- Height: 24px
- Padding: 4px 12px
- Border radius: 12px (pill)
- Font: 12px SemiBold

**Colors:**
- Active: Green 100 bg, Green 800 text
- Pending: Orange 100 bg, Orange 800 text
- Rejected: Red 100 bg, Red 800 text
- Draft: Gray 200 bg, Gray 700 text

#### Count Badge (Notification)
- Circle: 20px diameter
- Fill: Red (#EF4444)
- Text: 11px Bold, White
- Position: Top right of parent (absolute)

### 9. Icons

**Icon System:**
- Use consistent icon set (Heroicons, Feather, or Lucide)
- Sizes: 16px, 20px, 24px, 32px
- Colors: Match text color or use primary colors
- Stroke width: 2px (medium)

**Common Icons Needed:**
- Dashboard: 📊
- Profile: 👤
- Calendar: 📅
- Documents: 📄
- Settings: ⚙️
- Clock: 🕒
- Leave: 🏖️
- Learning: 📚
- Benefits: 💊
- Performance: ⭐
- Teams: 👥
- Reports: 📈
- Search: 🔍
- Notifications: 🔔
- Plus/Add: ➕
- Edit: ✏️
- Delete: 🗑️
- Download: ⬇️
- Upload: ⬆️
- Check: ✓
- Close: ✕
- Arrow: →
- Chevron: ›

### 10. Charts (For Dashboard)

Use Figma's built-in shape tools or plugins:

#### Bar Chart
1. Create rectangles for bars
2. Different heights for data
3. Add axis lines (1px, Gray 300)
4. Labels below (Caption style)

#### Line Chart
1. Use Pen tool for line path
2. Stroke: 2px, Primary color
3. Add dots at data points (8px circles)
4. Grid lines: 1px, Gray 200

#### Donut Chart
1. Create circle
2. Use arc tool or masks for segments
3. Different colors for each segment
4. Center hole: 40% of diameter
5. Legend on side

---

## Page-by-Page Guide

### 🏠 Page 1: Main Portal (index.html)

**Canvas Size:** 1920 × 1080

#### Background
1. Create frame: 1920 × 1080
2. Add gradient fill:
   - Type: Linear
   - Angle: 135° (top-left to bottom-right)
   - Color 1: #4F86F5 (0%)
   - Color 2: #8B5CF6 (100%)

#### Header Section
1. Frame: 1920 × 120
2. Fill: White 10% opacity
3. Position: Top of page
4. Content:
   - Logo emoji 🏢 (36px) at X:80, Y:35
   - Text "ACME Corporation" (36px Bold, White) - 16px gap
   - Subtitle "HR Management System" (18px Regular, White 80%) below

#### Welcome Section (Centered)
1. Frame: 1200px width, auto height
2. Center horizontally (X: 360)
3. Position: Y: 200
4. Auto Layout vertical, 60px gap
5. Content:
   - "Welcome to Human Capital" (64px Bold, White)
   - "Your Complete HR Management Solution" (24px Regular, White 90%)
   - Both center-aligned

#### Portal Cards Row
1. Frame: 1200 × 480
2. Auto Layout horizontal, 40px gap
3. Position: Below welcome section

**Each Card (4 total):**
1. Frame: 280 × 480
2. Fill: White
3. Border radius: 16px
4. Shadow: Shadow MD
5. Auto Layout vertical, 24px gap
6. Padding: 40px 32px

**Card Content (top to bottom):**
1. **Icon**: 72px emoji, centered
   - Admin: ⚙️
   - Employee: 👤
   - Manager: 📊
   - HR: 💼
2. **Title**: 28px Bold, Gray 900, centered
   - "Admin Portal"
   - "Employee Portal"
   - "Manager Portal"
   - "HR Portal"
3. **Description**: 16px Regular, Gray 600, centered, line height 150%
   - Admin: "System administration, user management, security configuration, and system settings."
   - Employee: "Access your personal information, request leave, view payslips, and manage benefits."
   - Manager: "Manage your team, approve requests, conduct reviews, and view analytics."
   - HR: "Complete HR operations including onboarding, payroll, recruitment, and more."
4. **Features List** (Auto Layout vertical, 8px gap):
   - 4 items per card
   - Each: "✓ Feature Name" (14px Regular, Gray 500)
   - Examples:
     - Admin: User Management, Security & Access, Audit Logs, Integrations
     - Employee: Time & Attendance, Leave Requests, Performance Goals, Learning Courses
     - Manager: Team Management, Approvals, Performance Reviews, Team Analytics
     - HR: Onboarding/Offboarding, Payroll Processing, Recruitment Pipeline, Employee Database
5. **Button**: 216 × 48
   - Fill: Respective portal color
   - Text: "Enter Portal" (16px SemiBold, White)
   - Border radius: 8px
   - Centered

**Portal Colors:**
- Admin: #4F86F5 (Blue)
- Employee: #10B981 (Green)
- Manager: #F59E0A (Orange)
- HR: #8B5CF6 (Purple)

#### Footer
1. Frame: 1920 × 80
2. Position: Bottom (Y: 1000)
3. Fill: White 5% opacity
4. Text: "© 2024 ACME Corporation. All rights reserved." (14px Regular, White 70%)
5. Center aligned

---

### 👤 Page 2: Employee Dashboard

**Canvas Size:** 1920 × 1080

#### 1. Top Navigation Bar
- Use the Top Nav component created earlier
- Active link: "Dashboard" (green highlight)
- User: "John Smith" with avatar
- Notification badge: 3

#### 2. Page Header
**Position:** Below nav, 40px padding
**Dimensions:** 1840 × 80

Content (Auto Layout horizontal, space between):
- Left side:
  - "Welcome back, John! 👋" (32px Bold, Gray 900)
  - "Tuesday, November 18, 2025 • 9:47 AM" (16px Regular, Gray 500)
- Right side (Auto Layout horizontal, 12px gap):
  - Button: "🕒 Clock In" (Green, 140 × 44)
  - Button: "🏖️ Request Leave" (White/outlined, 160 × 44)

#### 3. Stats Cards Row
**Dimensions:** 1840 × 140
**Gap:** 24px between cards

Create 4 stat cards (each 442 × 140):

**Card 1: Hours This Week**
- Icon: 🕒 (top right, 24px)
- Label: "Hours This Week" (14px Regular, Gray 500)
- Value: "32.5" (36px Bold, Gray 900)
- Trend: "↑ 2.5 hours vs last week" (13px Regular, Green)

**Card 2: Leave Balance**
- Icon: 🏖️
- Label: "Leave Balance"
- Value: "18 Days"
- Details: "22 total • 4 used • 18 remaining" (Gray 500)

**Card 3: Pending Tasks**
- Icon: ✓
- Label: "Pending Tasks"
- Value: "5"
- Details: "3 urgent • 2 for this week" (Orange)

**Card 4: Performance Score**
- Icon: ⭐
- Label: "Performance Score"
- Value: "4.8/5.0"
- Details: "Excellent performance this quarter" (Green)

#### 4. Main Content Grid
**Dimensions:** 1840 × 622
**Layout:** 2 columns

**Left Column (1208px wide):**

**Upcoming Events Card** (1208 × 299):
- Header: "📅 Upcoming Events" + "View All →" link
- 2 event items:
  
  Event 1:
  - Date badge: 60 × 60 (Green 10% bg)
    - "NOV" (11px Bold, Green)
    - "22" (20px Bold, Green)
  - Title: "Team Building Event" (16px SemiBold)
  - Time: "10:00 AM - 2:00 PM • Conference Room A" (14px, Gray 500)

  Event 2:
  - Date badge: "NOV 25" (Purple colors)
  - Title: "Performance Review Meeting"
  - Time: "2:00 PM - 3:00 PM • With Sarah Johnson"

**Recent Activity Card** (1208 × 299):
- Header: "🔔 Recent Activity"
- 4 activity items (Auto Layout vertical, 12px gap):
  
  Each item:
  - Icon circle: 36px, colored background 10% opacity
  - Title: 15px SemiBold
  - Description: 13px Regular, Gray 500
  - Timestamp in description

  Examples:
  1. ✓ "Leave request approved" (Green icon)
  2. 📚 "New training course available" (Blue icon)
  3. 💰 "Payslip available" (Orange icon)
  4. ⭐ "Goal completed" (Purple icon)

**Right Sidebar (608px wide):**

**Quick Links Card** (608 × 299):
- Header: "🔗 Quick Links"
- 4 link items (each 560 × 50):
  - Background: Gray 50
  - Border radius: 8px
  - Icon + Text (Auto Layout horizontal, 12px gap)
  - Links:
    1. 👤 My Profile
    2. 📄 My Documents
    3. 💊 Benefits & Insurance
    4. 🎯 Performance Goals

**Team Card** (608 × 299):
- Background: Green gradient (#10B981 → #0A9A6B)
- All text: White
- Content:
  - Header: "👥 My Team"
  - Team name: "Engineering Department" (18px SemiBold)
  - Manager: "Manager: Sarah Johnson" (15px Regular)
  - 2 stat boxes (170 × 60 each, White 15% bg):
    - "12 Team Members"
    - "8 Active Projects"
  - Button: "View Team Directory" (White bg, Green text)

---

### 👤 Page 3: Employee Profile

**Canvas Size:** 1920 × 1080+

#### Layout Structure
1. Top Nav (same as dashboard)
2. Page title: "My Profile" (32px Bold)
3. Tab navigation: Personal Info | Employment | Documents
4. Content area

#### Profile Header Card
**Dimensions:** 1840 × 200

**Layout:**
- Left side: Avatar (120px circle) + Upload button
- Center:
  - Name: "John Smith" (28px Bold)
  - Employee ID: "EMP-2024-001" (14px, Gray 500)
  - Department: "Engineering" • Role: "Software Engineer"
  - Status badge: "Active" (Green)
- Right side:
  - Edit Profile button (Primary)
  - Download Resume button (Secondary)

#### Personal Information Section
**Card Layout** (1840 × auto):

Two-column form layout:

**Left Column:**
- First Name: "John"
- Email: "john.smith@acme.com"
- Date of Birth: "01/15/1990"
- Address: "123 Main St, City, State 12345"

**Right Column:**
- Last Name: "Smith"
- Phone: "+1 (555) 123-4567"
- Gender: "Male"
- Emergency Contact: "Jane Smith • +1 (555) 987-6543"

#### Employment Information Section
**Card Layout:**

- Join Date: "January 15, 2020"
- Department: "Engineering"
- Position: "Senior Software Engineer"
- Manager: "Sarah Johnson"
- Work Location: "Main Office"
- Employment Type: "Full-time"

#### Skills & Certifications
**Card Layout:**

- Skills tags (pill badges): JavaScript, React, Node.js, Python, AWS
- Certifications list with dates and icons

---

### 👤 Page 4: Employee Timesheet

**Canvas Size:** 1920 × 1080+

#### Page Header
- Title: "Timesheet" (32px Bold)
- Week selector: "< Nov 18 - Nov 24, 2025 >"
- Actions:
  - "Submit Timesheet" button (Primary)
  - "Save Draft" button (Secondary)

#### Weekly Summary Card
**Dimensions:** 1840 × 120

**Stats Row:**
- Total Hours: "32.5" (Large number + icon)
- Regular: "32.5"
- Overtime: "0.0"
- Status: "Draft" badge

#### Time Entry Table
**Table Structure:**

Headers:
- Date
- Project
- Task
- Start Time
- End Time
- Break (hrs)
- Total Hours
- Notes
- Actions

7 rows (Monday - Sunday)

**Example Row (Monday):**
- Date: "Mon, Nov 18"
- Project: Dropdown "HR System"
- Task: "Frontend Development"
- Start: "09:00 AM"
- End: "05:30 PM"
- Break: "0.5"
- Total: "8.0" (auto-calculated, Bold)
- Notes: Icon button
- Actions: Edit icon, Delete icon

**Add Time Entry Button:**
- Bottom of table
- "+ Add Entry" (Ghost button)

#### Footer Actions
- Submit button (Green)
- Save Draft button
- Cancel button

---

### 👤 Page 5: Employee Leave Management

**Canvas Size:** 1920 × 1080+

#### Page Structure
1. Top Nav
2. Page title: "Leave Management"
3. Two-column layout

#### Left Column (1200px)

**Leave Balance Card** (1200 × 180):
- Title: "Leave Balance - 2025"
- 4 columns showing:
  - Annual Leave: "18/22 days"
  - Sick Leave: "5/10 days"
  - Personal Leave: "2/5 days"
  - Comp Off: "3 days"
- Progress bars for each (Green fill)

**Request New Leave Card:**
- "Request Leave" button (Primary, Large)
- Quick dates: "This Friday" "Next Week" "Custom"

**Leave History Table:**

Headers:
- Leave Type
- Start Date
- End Date
- Days
- Status
- Applied On
- Actions

**Example Rows:**
1. Annual Leave | Dec 20, 2025 | Dec 22, 2025 | 3 | Approved (Green) | Nov 15 | View
2. Sick Leave | Nov 10, 2025 | Nov 11, 2025 | 2 | Approved | Nov 10 | View
3. Personal | Nov 5, 2025 | Nov 5, 2025 | 1 | Approved | Nov 1 | View

#### Right Sidebar (616px)

**Calendar Widget:**
- Mini calendar showing current month
- Leave days highlighted in colors:
  - Approved: Green
  - Pending: Orange
  - Rejected: Red
  - Holidays: Blue

**Team Leave Card:**
- "Who's Out Today"
- List of team members on leave
- Profile pictures + names + dates

**Leave Policies Link:**
- "View Leave Policies" button
- Quick links to HR policies

---

### 👤 Page 6: Employee Benefits

**Canvas Size:** 1920 × 1080+

#### Enrollment Status Card
**Dimensions:** 1840 × 120

- Current Plan: "Premium Health Plan"
- Coverage: "Self + Family"
- Status: "Active"
- Renewal Date: "January 1, 2026"

#### Benefits Categories (Cards Grid)

**Grid:** 2 columns × 2 rows, 24px gap

**Card 1: Health Insurance** (908 × 320):
- Icon: 💊 (large)
- Title: "Health Insurance" (24px Bold)
- Current Plan: "Premium Plan - Family Coverage"
- Coverage details:
  - Medical: $50,000
  - Dental: $5,000
  - Vision: $2,000
- Premium: "$350/month (Company pays 80%)"
- Actions:
  - "View Details" button
  - "Change Plan" link

**Card 2: Life Insurance** (908 × 320):
- Icon: 🛡️
- Title: "Life Insurance"
- Coverage: "$500,000"
- Beneficiary: "Jane Smith (Spouse)"
- Premium: "$50/month"
- Actions: View Details, Update Beneficiary

**Card 3: Retirement Plan** (908 × 320):
- Icon: 🏦
- Title: "401(k) Retirement Plan"
- Current Balance: "$125,450"
- Contribution: "6% (Company matches 4%)"
- YTD Contribution: "$12,000"
- Actions: View Statements, Update Contribution

**Card 4: Other Benefits** (908 × 320):
- Icon: 🎁
- Title: "Additional Benefits"
- List:
  - ✓ Gym Membership - $50/month allowance
  - ✓ Learning & Development - $2,000/year
  - ✓ Transportation - $100/month
  - ✓ Wellness Program - Free
- Actions: Explore All Benefits

#### Dependents Section
- "Manage Dependents" card
- List of covered family members
- Add Dependent button

---

### 👤 Page 7: Employee Documents

**Canvas Size:** 1920 × 1080+

#### Page Header
- Title: "My Documents"
- Actions:
  - Search bar
  - Filter dropdown
  - Upload button (Primary)

#### Document Categories Tabs
- All Documents (active)
- Contracts
- Payslips
- Tax Forms
- Certificates
- Personal

#### Documents Grid/List

**View Toggle:** Grid view | List view

**Grid View (Default):**
Cards: 280 × 320, 24px gap

**Document Card:**
- File icon (large, colored by type):
  - PDF: Red
  - DOCX: Blue
  - Image: Green
- File name: "Employment_Contract_2020.pdf"
- File size: "2.4 MB"
- Upload date: "Jan 15, 2020"
- Actions (hover): Download, Share, Delete

**Example Documents:**
1. Employment Contract (PDF)
2. Latest Payslip - November 2025 (PDF)
3. Tax Form W-2 (PDF)
4. Certificate - AWS Certified (PDF)
5. ID Proof (Image)
6. Address Proof (PDF)

**List View:**
Table with columns:
- Document Name
- Type
- Size
- Category
- Upload Date
- Actions

#### Recent Documents Section
- Quick access to last 5 documents
- Download icon for each

---

### 👤 Page 8: Employee Learning

**Canvas Size:** 1920 × 1080+

#### My Learning Dashboard

**Progress Overview Card** (1840 × 160):
- Total Courses: "12"
- In Progress: "3"
- Completed: "8"
- Certificates: "6"
- Progress bar: 67% complete

#### In Progress Courses

**Course Card** (596 × 240, 3 cards in row):

**Course Card Structure:**
- Course thumbnail (596 × 120, colored gradient)
- Course title: "Advanced Leadership Skills" (18px SemiBold)
- Progress bar: 45% complete
- Details: "6 of 12 lessons • 3h 20m remaining"
- "Continue Learning" button

**Example Courses:**
1. Advanced Leadership Skills - 45% complete
2. Project Management Fundamentals - 70% complete
3. Data Analytics with Python - 30% complete

#### Recommended Courses

Grid: 4 cards per row (442 × 280)

**Recommendation Card:**
- Course thumbnail
- Title
- Duration: "8 hours"
- Level: "Intermediate"
- Rating: ⭐ 4.8 (235 reviews)
- "Enroll Now" button

#### My Certificates

**Certificate Card** (596 × 180):
- Certificate icon/preview
- Course name
- Issue date
- Certificate ID
- "Download" and "Share" buttons

---

### 👤 Page 9: Employee Performance

**Canvas Size:** 1920 × 1080+

#### Performance Overview

**Summary Card** (1840 × 200):
- Overall Score: "4.8/5.0" (Large, with star icons)
- Current Period: "Q4 2025"
- Review Date: "December 15, 2025"
- Reviewer: "Sarah Johnson, Engineering Manager"
- Status: "In Progress" badge

#### Performance Metrics (4 Cards)

**Metric Card** (442 × 180):
- Category name
- Score: X/5.0
- Progress bar (colored)
- Trend: ↑ vs last quarter

**Categories:**
1. **Technical Skills**: 4.9/5.0 (Green)
2. **Communication**: 4.7/5.0 (Blue)
3. **Leadership**: 4.6/5.0 (Purple)
4. **Collaboration**: 5.0/5.0 (Green)

#### Goals Section

**Active Goals Card:**

**Goal Item** (Auto Layout):
- Goal title: "Complete Project X Migration" (16px SemiBold)
- Progress bar: 75%
- Due date: "Dec 31, 2025"
- Status: "On Track" (Green badge)
- Description: Brief text
- "Update Progress" button

**Example Goals:**
1. Complete Project X Migration - 75%
2. Mentor 2 Junior Developers - 50%
3. Complete AWS Certification - 100% ✓
4. Reduce Bug Count by 20% - 60%

#### Feedback Section

**Recent Feedback Card:**

**Feedback Item:**
- From: "Sarah Johnson" (with avatar)
- Date: "Nov 10, 2025"
- Type: "Positive" (Green badge)
- Comment: "Excellent work on the dashboard implementation..."
- Categories: Technical Skills, Problem Solving

#### Performance Reviews History

**Timeline View:**
- Q4 2025: In Progress
- Q3 2025: 4.8/5.0 - "View Details" →
- Q2 2025: 4.7/5.0 - "View Details" →
- Q1 2025: 4.6/5.0 - "View Details" →

---

### 📊 Manager Dashboard

**Canvas Size:** 1920 × 1080

Similar to Employee Dashboard but with manager-specific widgets:

#### Stats Cards (4):
1. **Team Size**: "12 Members" (icon: 👥)
2. **Pending Approvals**: "8" (icon: ✓) - Orange
3. **Team Attendance**: "92%" (icon: 📊)
4. **Open Positions**: "2" (icon: 💼)

#### Content Grid:

**Left Column:**
- **Pending Approvals Card**: List of leave requests, expense claims
- **Team Performance Card**: Chart showing team metrics

**Right Column:**
- **Team Roster Card**: List of direct reports with quick stats
- **Upcoming Reviews Card**: Performance reviews scheduled

---

### 📊 Page: Manager Team Management

**Team Members Grid:**

**Team Member Card** (596 × 280):
- Profile section:
  - Avatar (80px)
  - Name (20px SemiBold)
  - Role (14px Regular)
  - Employee ID (12px, Gray)
- Stats row:
  - Attendance: "95%"
  - Performance: 4.7/5.0
  - Tasks: "12 active"
- Quick actions:
  - View Profile
  - Send Message
  - More options (...)

**Grid:** 3 columns × 4 rows

---

### 📊 Page: Manager Approvals

#### Approval Tabs:
- Leave Requests (badge: 5)
- Expense Claims (badge: 2)
- Timesheet Approvals (badge: 8)
- All

#### Approval Cards:

**Leave Request Card** (1840 × 120):
- Left side:
  - Employee: Profile pic + Name + ID
  - Leave Type: "Annual Leave"
  - Dates: "Dec 20-22, 2025" (3 days)
  - Reason: Brief text
  - Applied: "Nov 15, 2025"
- Right side:
  - "Approve" button (Green)
  - "Reject" button (Red)
  - "View Details" link

---

### 💼 HR Dashboard

**Canvas Size:** 1920 × 1080

HR-specific metrics:

#### Stats Cards (4):
1. **Total Employees**: "248"
2. **New Hires (This Month)**: "6"
3. **Pending Onboarding**: "3"
4. **Open Requisitions**: "8"

#### Content Grid:

**Left Column:**
- **Recent Hires**: List with start dates
- **Recruitment Pipeline**: Funnel chart

**Right Column:**
- **Upcoming Birthdays/Anniversaries**
- **HR Requests**: Pending requests

---

### 💼 Page: HR Employee Management

#### Search & Filters Bar:
- Search box: "Search by name, ID, department..."
- Filters: Department, Location, Status, Employment Type
- Export button
- Add Employee button (Primary)

#### Employee Table:

**Headers:**
- Photo
- Employee ID
- Name
- Department
- Position
- Location
- Status
- Hire Date
- Actions

**Rows:** Alternating white/gray backgrounds

**Actions Column:**
- View icon
- Edit icon
- More menu (...)

**Pagination:**
- "Showing 1-20 of 248"
- Page numbers: 1, 2, 3... 13
- Next/Previous

---

### 💼 Page: HR Onboarding

#### Onboarding Pipeline:

**Kanban Board Layout:**

**Columns (4):**
1. **Offer Accepted** (3 cards)
2. **Pre-boarding** (2 cards)
3. **First Day** (1 card)
4. **In Progress** (4 cards)
5. **Completed** (recently completed)

**Onboarding Card** (320 × 200):
- Employee photo + name
- Position
- Start date
- Progress bar: X/15 tasks complete
- Assigned buddy
- "View Checklist" button

#### Onboarding Checklist Template:
- Pre-boarding tasks (5)
- First day tasks (8)
- First week tasks (10)
- First month tasks (7)

---

### 💼 Page: HR Offboarding

Similar to Onboarding:

**Stages:**
1. Resignation Submitted
2. Notice Period
3. Exit Process
4. Final Week
5. Completed

**Offboarding Card:**
- Employee info
- Last working day
- Exit interview status
- Clearance status
- "Manage Offboarding" button

---

### 💼 Page: HR Recruitment

#### Recruitment Dashboard:

**Pipeline Funnel:**
- Job Postings: 8 active
- Applications: 156
- Screening: 45
- Interviews: 23
- Offers: 8
- Hired: 6

#### Active Job Postings:

**Job Card** (896 × 180):
- Job title: "Senior Software Engineer"
- Department: "Engineering"
- Location: "Remote"
- Posted: "Nov 1, 2025"
- Applicants: "45"
- Status: "Active" (Green)
- Progress indicators:
  - New: 12
  - Screening: 15
  - Interview: 10
  - Offer: 8
- Actions: View Applications, Edit, Close

#### Candidate Pipeline:

**Candidate Card** (596 × 240):
- Photo + Name
- Applied for: Position
- Stage: "Interview Scheduled"
- Rating: ⭐⭐⭐⭐½
- Experience: "5 years"
- Notice period: "30 days"
- Interview date: "Nov 25, 2025"
- Actions: View Profile, Schedule, Move Stage

---

### 💼 Page: HR Payroll

#### Payroll Dashboard:

**Summary Card:**
- Current Period: "November 2025"
- Total Payroll: "$1,245,000"
- Employees: "248"
- Status: "Processing"
- Due Date: "Nov 30, 2025"

#### Payroll Breakdown (4 Cards):
1. **Gross Salary**: $1,450,000
2. **Deductions**: $205,000
3. **Net Payroll**: $1,245,000
4. **Taxes Withheld**: $320,000

#### Employee Payroll Table:

**Headers:**
- Employee ID
- Name
- Department
- Gross Pay
- Deductions
- Net Pay
- Status
- Actions

**Row Actions:**
- View payslip
- Edit
- Generate slip
- Send

#### Payroll Actions:
- "Process Payroll" (Primary)
- "Generate Reports"
- "Export Data"
- "Payroll Settings"

---

### 💼 Page: HR Requests

#### Request Categories (Tabs):
- All Requests
- Leave Approvals
- Document Requests
- Salary Revisions
- Policy Clarifications

#### Request Cards:

**Request Card** (1840 × 140):
- Left side:
  - Requestor: Photo + Name + ID
  - Request Type: Badge
  - Subject/Title
  - Details: Brief description
  - Submitted: Date & time
  - Priority: Badge (High/Medium/Low)
- Right side:
  - Assigned to: HR Staff name
  - Status: Pending/In Progress/Resolved
  - Action buttons
  - SLA timer (if urgent)

#### Filters Sidebar:
- Status
- Priority
- Date range
- Request type

---

### ⚙️ Admin Dashboard

**Canvas Size:** 1920 × 1080

System health metrics:

#### Stats Cards (4):
1. **Total Users**: "256"
2. **Active Sessions**: "189"
3. **System Health**: "98%" (Green)
4. **Failed Logins**: "3" (Warning)

#### Content Grid:

**Left Column:**
- **Recent Activity Log**: System events
- **Security Alerts**: Warnings/issues

**Right Column:**
- **System Status**: Server, Database, API status
- **Quick Actions**: Common admin tasks

---

### ⚙️ Page: Admin User Management

#### Users Table:

**Headers:**
- User ID
- Name
- Email
- Role
- Department
- Status
- Last Login
- Actions

**Row Features:**
- Status toggle (Active/Inactive)
- Role badge (colored)
- Action menu: Edit, Reset Password, Delete

#### Bulk Actions:
- Select all checkbox
- Bulk actions dropdown:
  - Activate selected
  - Deactivate selected
  - Export selected
  - Delete selected

#### Add User Button:
- Opens modal with form
- Fields: Name, Email, Role, Department, etc.

---

### ⚙️ Page: Admin Security Settings

#### Security Sections (Cards):

**Password Policy Card:**
- Minimum length: 8 characters
- Require uppercase
- Require numbers
- Require special characters
- Expiry: 90 days
- Edit button

**Two-Factor Authentication:**
- Status: Enabled (toggle)
- Enforcement: Required for admins, optional for others
- Methods: SMS, Authenticator app

**Session Management:**
- Session timeout: 30 minutes
- Concurrent sessions: Max 3
- Force logout on password change

**IP Whitelisting:**
- Enable/disable toggle
- IP addresses list
- Add IP button

**Audit Logs:**
- All security events logged
- Retention: 1 year
- "View Audit Logs" button

---

### ⚙️ Page: Admin System Settings

#### System Configuration Sections:

**General Settings:**
- Company Name
- Logo upload
- Time Zone
- Date Format
- Currency

**Email Settings:**
- SMTP configuration
- From email address
- Email templates
- Test email button

**Notification Settings:**
- Email notifications toggle
- SMS notifications toggle
- In-app notifications toggle
- Notification preferences per event type

**Backup & Recovery:**
- Automatic backup: Daily at 2 AM
- Last backup: Nov 18, 2025 2:15 AM
- "Backup Now" button
- "Restore from Backup" button

**Integration Settings:**
- Connected apps list
- API keys
- Webhooks

---

### ⚙️ Page: Admin Audit Logs

#### Audit Log Filters:

**Filter Bar:**
- Date range picker
- User dropdown
- Action type dropdown
- Module dropdown
- Search bar

#### Audit Log Table:

**Headers:**
- Timestamp
- User
- Action
- Module
- Details
- IP Address
- Status

**Example Rows:**
1. Nov 18, 2025 10:30 AM | John Smith | Login | Authentication | Successful login | 192.168.1.100 | Success
2. Nov 18, 2025 10:15 AM | Sarah Johnson | Update | Employee | Updated employee record EMP-001 | 192.168.1.105 | Success
3. Nov 18, 2025 09:45 AM | Admin User | Delete | Users | Deleted user account | 192.168.1.1 | Success

#### Export Options:
- Export to CSV
- Export to PDF
- Schedule report

---

### ⚙️ Page: Admin Integrations

#### Connected Integrations:

**Integration Card** (596 × 280):
- Logo/icon (large)
- Integration name: "Slack"
- Status: Connected (Green) / Not Connected
- Description: Brief text
- Connected on: Date
- Actions:
  - Configure
  - Disconnect
  - View logs

**Available Integrations:**
1. Slack - Notifications
2. Microsoft Teams - Communication
3. Zoom - Video conferencing
4. Google Workspace - Email & Calendar
5. Salesforce - CRM sync
6. ADP - Payroll sync
7. BambooHR - HR data
8. Jira - Project tracking

#### Add Integration:
- Browse marketplace
- Search for integrations
- API documentation link

---

## Best Practices

### 1. Organization
- **Pages**: Create separate pages for each section (Design System, Employee Portal, etc.)
- **Frames**: Name your frames descriptively (e.g., "Employee Dashboard - Desktop 1920")
- **Layers**: Use clear layer names (avoid "Rectangle 47")
- **Groups**: Group related elements with descriptive names

### 2. Components
- **Create Components Early**: Build your component library first
- **Use Variants**: Create component variants for different states
- **Keep Components Simple**: One responsibility per component
- **Name Conventions**: Use clear names like "Button/Primary/Large/Default"

### 3. Auto Layout
- **Use Extensively**: Apply Auto Layout to almost everything
- **Nested Layouts**: Combine Auto Layouts for complex structures
- **Spacing**: Use consistent spacing values (8px increments)
- **Alignment**: Use Auto Layout alignment instead of manual positioning

### 4. Styles
- **Create All Styles**: Colors, text styles, effects
- **Naming Convention**: Use descriptive names (e.g., "Text/Body/Regular")
- **Organize**: Group related styles with prefixes
- **Document**: Add descriptions to styles

### 5. Constraints
- **Responsive Design**: Use constraints for responsive behavior
- **Fixed Elements**: Pin nav bars and headers
- **Fluid Content**: Let content areas scale

### 6. Layout Grids
- **Desktop Grid**: 12 columns, 24px gutters
- **Use Consistently**: Apply grid to all frames
- **Alignment**: Snap elements to grid

### 7. Prototyping
- **Link Pages**: Create prototype flows
- **Interactions**: Add hover effects
- **Overlays**: Use for modals and dropdowns
- **Test**: Preview and test your prototype

### 8. Performance
- **Optimize Images**: Use appropriate sizes
- **Flatten Complex Shapes**: Flatten when needed
- **Components**: Reuse components, don't duplicate
- **Clean Up**: Delete unused layers

### 9. Documentation
- **Add Descriptions**: Document your design decisions
- **Comments**: Use Figma comments for questions/notes
- **Specs**: Include measurements in descriptions
- **Annotations**: Use text annotations for developers

### 10. Handoff
- **Inspect Mode**: Ensure proper layer naming for inspect
- **Export Settings**: Set up 1x, 2x, 3x exports for icons
- **Developer Notes**: Add notes for implementation
- **Design Tokens**: Export design tokens if possible

---

## Quick Reference: Common Measurements

### Layout
- Page width: 1920px (desktop standard)
- Content max-width: 1840px (with 40px padding each side)
- Two-column split: 1208px + 608px (with 24px gap)
- Three-column split: 596px each (with 24px gaps)
- Four-column split: 442px each (with 24px gaps)

### Heights
- Nav bar: 70px
- Page header: 80-100px
- Stat card: 140px
- Standard card: 240-320px (varies)
- Input field: 44px
- Button: 44px (medium), 36px (small), 52px (large)
- Table row: 56px

### Spacing
- Component padding: 24px
- Card padding: 24-32px
- Button padding: 12px 24px
- Input padding: 12px 16px
- Section gap: 32px
- Card gap: 24px
- Element gap: 16px

### Typography
- Page title: 32px
- Section title: 24px
- Card title: 20px
- Body text: 16px
- Small text: 14px
- Caption: 12px

### Border Radius
- Cards: 12px
- Buttons: 8px
- Inputs: 6px
- Badges: 12px (pill)

---

## Workflow Tips

### Starting a New Page

1. **Create Frame**: Press `F` → 1920 × 1080
2. **Name It**: "Employee Dashboard - Desktop"
3. **Add Background**: Gray 50 (#F9FAFB)
4. **Add Nav**: Insert nav component instance
5. **Add Grid**: Layout grid (12 columns)
6. **Build Content**: Start with Auto Layout frames
7. **Use Components**: Insert component instances
8. **Test Responsiveness**: Resize frame to test
9. **Prototype**: Link interactive elements
10. **Annotate**: Add notes for implementation

### Keyboard Shortcuts

Essential shortcuts:
- `F`: Frame tool
- `R`: Rectangle
- `T`: Text
- `O`: Ellipse
- `V`: Move tool
- `K`: Scale tool
- `Shift + A`: Add Auto Layout
- `⌘/Ctrl + G`: Group
- `⌘/Ctrl + D`: Duplicate
- `⌘/Ctrl + C/V`: Copy/Paste
- `⌥/Alt + Drag`: Duplicate while dragging
- `⌘/Ctrl + /`: Search everything
- `⌘/Ctrl + ⌥/Alt + K`: Create component

---

## Common Patterns

### Creating a Dashboard Card

1. Frame: 596 × 320
2. Fill: White
3. Border radius: 12px
4. Shadow: SM
5. Add Auto Layout:
   - Direction: Vertical
   - Padding: 24px
   - Gap: 16px
6. Add header (title + icon)
7. Add content
8. Make component

### Creating a Form

1. Frame with Auto Layout vertical
2. Gap: 20px
3. Add label + input pairs
4. Each pair in Auto Layout vertical, 4px gap
5. Add error text below (hidden by default)
6. Add button group at bottom
7. Make component with variants for states

### Creating a Table

1. Frame for table
2. Header row: Auto Layout horizontal
3. Header cells: 48px high, Gray 50 bg
4. Data rows: Auto Layout horizontal, 56px high
5. Add dividers: 1px Gray 200
6. Hover state: Gray 50
7. Make component for row

### Creating a Modal

1. Overlay: Full screen, Black 40%
2. Modal frame: 600 × auto, centered
3. Auto Layout vertical
4. Header: 64px, title + close
5. Body: Variable height
6. Footer: 72px, buttons
7. Add close interaction
8. Make component

---

## Resources & Inspiration

### Learn Figma
- [Figma Official Tutorial](https://help.figma.com/hc/en-us)
- [Figma YouTube Channel](https://www.youtube.com/c/Figmadesign)
- [Figma Community](https://www.figma.com/community)

### Design Systems to Study
- Material Design (Google)
- Human Interface Guidelines (Apple)
- Fluent Design (Microsoft)
- Polaris (Shopify)
- Carbon Design System (IBM)

### Icon Resources
- Heroicons
- Feather Icons
- Lucide Icons
- Material Icons
- Iconify

### Color Tools
- [Coolors.co](https://coolors.co) - Color palette generator
- [Adobe Color](https://color.adobe.com) - Color wheel
- [Contrast Checker](https://webaim.org/resources/contrastchecker/) - Accessibility

---

## Troubleshooting

### Common Issues

**Problem: Elements not aligning**
- Solution: Use Auto Layout instead of manual positioning

**Problem: Component instances not updating**
- Solution: Check if you detached the instance (⌥⌘B to reattach)

**Problem: Text overflowing**
- Solution: Set text to "Auto width" or "Auto height"

**Problem: Prototype links not working**
- Solution: Check if frames are on the same page

**Problem: Colors not consistent**
- Solution: Use color styles instead of manual colors

**Problem: Export quality poor**
- Solution: Use 2x or 3x export settings

---

## Conclusion

This guide provides everything you need to recreate the HR Management System in Figma. Start with the Design System page to establish your foundation, then work through each portal systematically.

**Recommended Order:**
1. ✅ Design System (colors, typography, components)
2. ✅ Component Library (buttons, inputs, cards, etc.)
3. 🏠 Main Portal page
4. 👤 Employee Portal (8 pages)
5. 📊 Manager Portal (5 pages)
6. 💼 HR Portal (7 pages)
7. ⚙️ Admin Portal (8 pages)

Take your time building the component library - it will save hours later!

Good luck! 🎨✨

---

**Need Help?**
- Check Figma Help Center
- Join Figma Community forums
- Watch tutorial videos
- Practice with small sections first

**Version:** 1.0
**Last Updated:** November 18, 2025
**Total Pages to Create:** 29 (1 main + 28 portal pages)
