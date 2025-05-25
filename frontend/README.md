# Resume Ranking System - Frontend

A modern web application built with React and Vite that provides an intuitive interface for automated resume ranking and skill matching.

## Features

- 📄 Upload and process multiple resumes
- 🎯 Define job requirements and skill categories
- 🔍 Smart skill extraction and matching
- 📊 Interactive result visualization
- 🌓 Light/Dark theme support
- 🎨 Beautiful gradient UI with responsive design

## Tech Stack

- React 18
- Vite
- TailwindCSS
- Axios for API communication
- Context API for state management

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd resume-ranking-system/frontend
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### Environment Variables

Create a `.env` file in the frontend root directory with:

```env
VITE_API_URL=http://localhost:5000
```

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── context/       # React Context providers
│   ├── utils/         # Utility functions
│   └── App.jsx        # Main application component
├── public/            # Static assets
└── index.html         # Entry HTML file
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - See LICENSE file for details
