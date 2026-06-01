# ChefAI - Client

The React frontend for ChefAI, built with **Vite** for fast development and optimized builds.

## Project Structure

```
client/
├── src/                    # React source code
│   ├── main.jsx           # Entry point
│   ├── App.jsx            # Root component
│   ├── App.css            # App styling
│   └── index.css          # Global styles
├── index.html             # HTML template
├── vite.config.js         # Vite configuration
├── package.json           # Dependencies and scripts
├── .eslintrc.json         # ESLint configuration
└── .env.example           # Environment variables template
```

## Getting Started

### 1. Install Dependencies

```bash
cd client
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration.

### 3. Development Server

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

### 5. Preview Build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Technologies Used

- **React 18** - UI library
- **Vite 5** - Build tool and dev server
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Axios** - HTTP client

## Features

- ⚡ Fast HMR (Hot Module Replacement)
- 🔥 Optimized production builds
- 🎨 Modern React with Hooks
- 📦 Ready for deployment
- 🔌 API proxy configuration

## API Configuration

The development server is configured to proxy `/api` requests to `http://localhost:5000` (backend server).

Update the proxy in `vite.config.js` if your backend runs on a different port.

## Deployment

### Build the project:

```bash
npm run build
```

### Deploy the `dist/` folder to your hosting service:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Docker

## Troubleshooting

### Port 3000 Already in Use

Change the port in `vite.config.js`:

```javascript
server: {
  port: 3001, // Change to any available port
}
```

### CORS Issues

Ensure the backend server has proper CORS configuration for `http://localhost:3000`.

## Next Steps

- Set up routing with React Router
- Add state management (Redux, Zustand, etc.)
- Create component library
- Set up authentication
- Add API integration
