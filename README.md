# Tomiris Insurance App

A modern insurance comparison platform built with React, Vite, and Firebase.

## Features

- 🎨 Modern, responsive UI with Tailwind CSS
- 🌐 Multi-language support (Turkish/English)
- 🔥 Firebase-powered admin dashboard
- 📱 Mobile-first design
- ⚡ Fast and optimized with Vite

## Admin Dashboard

This project includes a comprehensive admin dashboard powered by Firebase that allows you to manage all site content without a traditional database server.

### Admin Features

- **Content Management**: Edit translations, campaigns, testimonials, FAQ items
- **Product Management**: Configure product listings and metadata
- **Statistics**: Update site statistics dynamically
- **Contact Info**: Manage contact page information
- **About Page**: Edit mission, values, milestones, and awards
- **Secure Authentication**: Firebase Authentication for admin access

### Accessing the Admin Dashboard

1. Navigate to `/admin/login`
2. Login with your Firebase admin credentials
3. Manage all content through the intuitive dashboard

## Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase account

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase (see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md))

4. Create `.env` file with your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

5. Import initial data:
   ```bash
   node scripts/import-data.js
   ```

6. Start development server:
   ```bash
   npm run dev
   ```

## Firebase Setup

For detailed Firebase setup instructions, see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md).

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── admin/       # Admin dashboard components
│   ├── home/        # Home page sections
│   ├── layout/      # Layout components (Header, Footer)
│   └── ui/          # Base UI components
├── context/         # React contexts (Language, AdminAuth)
├── pages/           # Page components
│   └── admin/       # Admin dashboard pages
├── services/        # Firebase service layer
├── config/          # Configuration files
└── data/            # Static data (fallback)
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technologies Used

- React 19
- Vite
- Firebase (Firestore + Authentication)
- React Router
- Framer Motion
- Tailwind CSS
- Lucide React (Icons)

## License

Private project - All rights reserved
