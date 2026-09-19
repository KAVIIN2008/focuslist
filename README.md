# FocusList

A clean, responsive task management application built with React, TypeScript, Vite, and Tailwind CSS.

FocusList helps users organize everyday tasks, assign priorities, track progress, and quickly find tasks using search and filters. Tasks are stored locally in the browser, so they remain available after refreshing the page.

## 🚀 Live Demo

https://focuslist-opal.vercel.app/

## ✨ Features

- Create tasks with a title and priority
- Set priorities:
  - High
  - Medium
  - Low
- Mark tasks as completed or active
- Edit task titles and priorities
- Delete tasks with confirmation
- Search tasks by title
- Filter by:
  - All
  - Active
  - Completed
  - Priority
- Live task statistics:
  - Total
  - Completed
  - Pending
- Persistent storage using browser `localStorage`
- Responsive desktop and mobile interface
- Accessible buttons, labels, focus states, and status feedback

## 🛠️ Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS v4
- Lucide React
- Playwright

## 📁 Project Structure

```text
focuslist/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── TaskFilters.tsx
│   │   ├── TaskForm.tsx
│   │   ├── TaskItem.tsx
│   │   ├── TaskList.tsx
│   │   └── TaskStats.tsx
│   ├── hooks/
│   │   └── useLocalStorage.ts
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── types.ts
├── tests/
│   └── focuslist.spec.ts
├── playwright.config.ts
├── package.json
├── vite.config.ts
└── README.md