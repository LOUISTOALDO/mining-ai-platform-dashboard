# Elysium Systems Dashboard

A modern, responsive enterprise dashboard built with Next.js 14, TailwindCSS, and shadcn/ui, featuring advanced AI and data analytics capabilities with a futuristic design aesthetic.

## Features

- 🎨 **Elysium Systems Design**: Dark theme with deep blues, purples, and gradient accents
- 📱 **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- 🎭 **Smooth Animations**: Framer Motion animations for enhanced user experience
- 📊 **Interactive Charts**: Recharts integration for beautiful data visualization
- 🎯 **Modern UI Components**: Built with shadcn/ui and Radix UI primitives
- 🔧 **Collapsible Sidebar**: Smooth sidebar collapse/expand functionality
- 🎨 **Glassmorphism Effects**: Subtle backdrop blur and glow effects

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: TailwindCSS with custom dark theme
- **UI Components**: shadcn/ui + Radix UI
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dashboard-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── globals.css     # Global styles and CSS variables
│   ├── layout.tsx      # Root layout component
│   └── page.tsx        # Dashboard page
├── components/         # React components
│   ├── ui/            # shadcn/ui components
│   ├── sidebar.tsx    # Collapsible sidebar
│   ├── navbar.tsx     # Top navigation bar
│   ├── stat-cards.tsx # KPI stat cards
│   ├── charts.tsx     # Chart components
│   ├── data-table.tsx # Data table component
│   └── layout.tsx     # Main layout wrapper
└── lib/
    └── utils.ts       # Utility functions
```

## Components

### Sidebar
- Collapsible navigation with smooth animations
- Icon + label navigation items
- System status indicator
- Responsive mobile overlay

### Navbar
- Search functionality
- Notification bell with badge
- User profile dropdown
- Mobile menu toggle

### Dashboard
- KPI stat cards with trend indicators
- Interactive charts (Line, Bar, Pie)
- Data table with actions
- Responsive grid layout

## Customization

### Colors
The color scheme is defined in `src/app/globals.css` using CSS custom properties. You can easily modify the theme by updating these variables.

### Components
All components are built with shadcn/ui and can be customized by modifying the component files in `src/components/ui/`.

### Animations
Framer Motion animations can be adjusted in individual component files by modifying the motion props.

## Deployment

The app can be deployed to any platform that supports Next.js:

- **Vercel** (recommended)
- **Netlify**
- **AWS Amplify**
- **Railway**

Build the app:
```bash
npm run build
```

## License

MIT License - feel free to use this project for your own purposes.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

Built with ❤️ using Next.js, TailwindCSS, and shadcn/ui
