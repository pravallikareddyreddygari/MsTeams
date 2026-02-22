# Microsoft Teams Clone

A mini Microsoft Teams clone built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

- **Sidebar Navigation** - Quick access to Chat, Teams, and Channels
- **Team Management** - View and switch between different teams
- **Channel Navigation** - Browse channels within selected teams
- **Real-time Chat** - Send and receive messages in channels
- **Responsive Design** - Clean, modern interface using Tailwind CSS

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React** - UI component library

## Getting Started

1. Navigate to the project directory:
   ```bash
   cd teams-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
teams-clone/
├── app/
│   ├── components/
│   │   ├── Chat.tsx          # Chat interface component
│   │   ├── Sidebar.tsx       # Sidebar navigation
│   │   ├── ChatList.tsx      # Chat list view
│   │   ├── Teams.tsx         # Teams view
│   │   └── Channels.tsx      # Channels view
│   ├── types.ts              # TypeScript type definitions
│   ├── TeamsApp.tsx          # Main application component
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles
├── public/                   # Static assets
├── .eslintrc.json           # ESLint configuration
├── next.config.js           # Next.js configuration
├── package.json             # Dependencies
└── tsconfig.json            # TypeScript configuration
```

## Usage

1. **Sidebar** - Use the left sidebar to navigate between Chat, Teams, and Channels views
2. **Teams** - Select a team to view its channels
3. **Channels** - Browse and select channels to chat in
4. **Chat** - Send messages in the selected channel

## Customization

- Add more teams in `TeamsApp.tsx`
- Customize colors in `tailwind.config.ts`
- Add more features like file uploads, reactions, or user profiles
