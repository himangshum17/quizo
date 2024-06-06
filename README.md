# Quiz Application

Welcome to the Quiz Application! This project is in its very early stages and aims to provide a platform for creating and taking quizzes. The frontend is built using React, TypeScript, and several other modern libraries, while the backend is powered by Node.js and Express.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create and manage quizzes
- Take quizzes and receive scores
- User authentication (planned)
- Admin panel for quiz management (planned)

## Technologies

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A superset of JavaScript that adds static types.
- **react-router-dom**: Declarative routing for React applications.
- **shadcn/ui**: A component library for building user interfaces.
- **react-hook-form**: Performant, flexible, and extensible forms with easy-to-use validation.
- **zod**: TypeScript-first schema declaration and validation library.

### Backend

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A fast, unopinionated, minimalist web framework for Node.js.

## Getting Started

### Prerequisites

- Node.js (version 18 or later)
- pnpm (version 8 or later)

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/himangshum17/quizo.git
cd quizo
```

2. **Install dependencies:**

```bash
cd frontend
pnpm install

cd ..

cd backend
pnpm install
```

### Running the Application

1. **Start the backend server:**

```bash
cd backend
pnpm dev
```

The backend server will run on http://localhost:5000.

2. **Start the frontend development server:**

```bash
cd frontend
pnpm dev
```

The frontend server will run on http://localhost:5173.

### Contributing

**Contributions are welcome! Please follow these steps to contribute:**

- Fork the repository
- Create a new branch (git checkout -b username/feature/your-feature-name)
- Make your changes
- Commit your changes (git commit -m 'Add some feature')
- Push to the branch (git push origin feature/your-feature-name)
- Open a pull request

### License

This project is licensed under the MIT License
