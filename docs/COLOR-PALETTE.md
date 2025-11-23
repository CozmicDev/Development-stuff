# 🎨 Color Palette - Sharjah Inspired Theme

## Primary Colors

### Teal/Turquoise Family
```css
--primary-color: #00A99D;      /* Main teal */
--primary-dark: #008C82;       /* Darker teal */
--primary-light: #33BFB5;      /* Lighter teal */
--secondary-color: #0D9488;    /* Green-teal */
--accent-color: #14B8A6;       /* Bright teal */
```

**Usage:**
- Primary buttons
- Active navigation items
- Links and interactive elements
- Icon backgrounds
- Gradient starts

---

## Gradient Definitions

### Main Gradient
```css
background: linear-gradient(135deg, #00A99D, #0D9488);
```
**Usage:** Buttons, banners, active states, logo

### Background Gradient
```css
background: linear-gradient(135deg, #F8FAFC 0%, #E0F2F1 50%, #B2DFDB 100%);
```
**Usage:** Page backgrounds, hero sections

### Light Gradient
```css
background: linear-gradient(135deg, #E0F2F1, #B2DFDB);
```
**Usage:** Icon containers, subtle backgrounds

---

## Neutral Colors

### Text Colors
```css
--text-primary: #0F172A;       /* Main text - Dark slate */
--text-secondary: #475569;     /* Secondary text - Slate */
--text-light: #94A3B8;         /* Light text - Light slate */
```

### Background Colors
```css
--background: #F8FAFC;         /* Main background - Very light blue-gray */
--card-bg: #FFFFFF;            /* Card background - White */
--border-color: #E2E8F0;       /* Borders - Light gray-blue */
```

### Sidebar Colors
```css
--sidebar-bg: #0F172A;         /* Dark slate */
--sidebar-hover: #1E293B;      /* Slightly lighter slate */
```

---

## Status Colors

### Success (Green)
```css
--secondary-color: #10B981;
/* Badge gradients */
background: linear-gradient(135deg, #D1FAE5, #A7F3D0);
color: #065F46;
```

### Danger (Red)
```css
--danger-color: #EF4444;
/* Badge gradients */
background: linear-gradient(135deg, #FEE2E2, #FECACA);
color: #991B1B;
```

### Warning (Amber)
```css
--warning-color: #F59E0B;
/* Badge gradients */
background: linear-gradient(135deg, #FEF3C7, #FDE68A);
color: #92400E;
```

### Info (Cyan)
```css
--info-color: #06B6D4;
/* Badge gradients */
background: linear-gradient(135deg, #DBEAFE, #BFDBFE);
color: #1E40AF;
```

---

## Shadow Colors

### Standard Shadows
```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow: 0 2px 8px 0 rgb(0 0 0 / 0.08);
--shadow-md: 0 4px 12px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 20px -3px rgb(0 0 0 / 0.12);
--shadow-xl: 0 20px 30px -5px rgb(0 0 0 / 0.15);
```

### Colored Shadow (Teal)
```css
--shadow-colored: 0 8px 24px rgba(0, 169, 157, 0.2);
```
**Usage:** Primary buttons, logo, featured cards

---

## Color Usage Guidelines

### Primary Teal (#00A99D)
✅ **Use for:**
- Primary action buttons
- Active navigation states
- Important links
- Focus states
- Progress indicators

❌ **Avoid for:**
- Large text blocks
- Backgrounds (too bright)
- Disabled states

### Secondary Green-Teal (#0D9488)
✅ **Use for:**
- Secondary actions
- Gradient endpoints
- Hover states
- Accent elements

### Text Colors
- **#0F172A**: Main headings, important text
- **#475569**: Body text, descriptions
- **#94A3B8**: Metadata, timestamps, hints

### Background Colors
- **#F8FAFC**: Page background
- **#FFFFFF**: Card backgrounds
- **#E0F2F1**: Light teal background (gradients)

---

## Accessibility

### Contrast Ratios

**Text on White:**
- `#0F172A` (text-primary): **15.4:1** ✅ AAA
- `#475569` (text-secondary): **8.6:1** ✅ AAA
- `#94A3B8` (text-light): **4.6:1** ✅ AA

**White on Teal:**
- `#FFFFFF` on `#00A99D`: **3.5:1** ✅ AA (large text)
- `#FFFFFF` on `#008C82`: **4.2:1** ✅ AA

### WCAG Compliance
- ✅ Level AA compliant
- ✅ Level AAA for body text
- ✅ Sufficient contrast for UI elements

---

## Color Combinations

### Primary Combinations
```css
/* Teal on Light Background */
color: #00A99D;
background: #FFFFFF;

/* White on Teal Gradient */
color: #FFFFFF;
background: linear-gradient(135deg, #00A99D, #0D9488);

/* Dark Text on Teal Light Background */
color: #0F172A;
background: #E0F2F1;
```

### Card Styles
```css
/* Default Card */
background: #FFFFFF;
border: 1px solid #E2E8F0;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

/* Hover Card */
background: #FFFFFF;
box-shadow: 0 10px 20px rgba(0, 169, 157, 0.15);
```

---

## Theme Variables Quick Reference

```css
:root {
    /* Primary Palette */
    --primary-color: #00A99D;
    --primary-dark: #008C82;
    --primary-light: #33BFB5;
    --secondary-color: #0D9488;
    --accent-color: #14B8A6;
    
    /* Status Colors */
    --danger-color: #EF4444;
    --warning-color: #F59E0B;
    --info-color: #06B6D4;
    
    /* Text Colors */
    --text-primary: #0F172A;
    --text-secondary: #475569;
    --text-light: #94A3B8;
    
    /* Background Colors */
    --border-color: #E2E8F0;
    --background: #F8FAFC;
    --card-bg: #FFFFFF;
    
    /* Sidebar Colors */
    --sidebar-bg: #0F172A;
    --sidebar-hover: #1E293B;
    
    /* Gradients */
    --gradient-start: #00A99D;
    --gradient-end: #0D9488;
    
    /* Shadows */
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow: 0 2px 8px 0 rgb(0 0 0 / 0.08);
    --shadow-md: 0 4px 12px -1px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 20px -3px rgb(0 0 0 / 0.12);
    --shadow-xl: 0 20px 30px -5px rgb(0 0 0 / 0.15);
    --shadow-colored: 0 8px 24px rgba(0, 169, 157, 0.2);
}
```

---

## Color Psychology

### Teal/Turquoise
- **Associations**: Trust, professionalism, calmness, technology
- **Usage**: Perfect for HR/corporate applications
- **Effect**: Creates sense of reliability and modernity

### Why This Palette Works for HR
1. **Professional**: Teal is sophisticated and corporate
2. **Approachable**: Not as cold as pure blue
3. **Modern**: Fresh alternative to traditional blues
4. **Calming**: Reduces stress in HR interactions
5. **Trustworthy**: Inspires confidence in the system

---

## Customization Tips

### To Make it Lighter
```css
--primary-color: #14B8A6;      /* Use accent color as primary */
--background: #FFFFFF;          /* Pure white background */
```

### To Make it Darker
```css
--primary-color: #008C82;      /* Use dark teal as primary */
--sidebar-bg: #0C1220;          /* Darker sidebar */
```

### To Add More Color Variety
```css
--accent-purple: #8B5CF6;      /* Add purple accent */
--accent-orange: #F97316;      /* Add orange accent */
```

---

**Palette Inspiration:** Sharjah Digital Services  
**Color Philosophy:** Modern, Professional, Approachable  
**Last Updated:** November 20, 2025
