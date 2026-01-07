# Firebase Setup Guide

This guide will help you set up Firebase for the admin dashboard.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard
4. Enable Google Analytics (optional)

## Step 2: Enable Authentication

1. In Firebase Console, go to **Authentication** > **Get Started**
2. Click on **Sign-in method** tab
3. Enable **Email/Password** provider
4. Save

## Step 3: Create Admin User

1. Go to **Authentication** > **Users**
2. Click **Add user**
3. Enter email and password for admin account
4. Save the credentials securely

## Step 4: Set Up Firestore Database

1. Go to **Firestore Database** > **Create database**
2. Start in **production mode** (you'll update security rules)
3. Choose a location closest to your users
4. Click **Enable**

## Step 5: Configure Security Rules

1. Go to **Firestore Database** > **Rules**
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read access for translations
    match /translations/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Public read, admin write
    match /config/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Admin only
    match /admin/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

3. Click **Publish**

## Step 6: Get Firebase Configuration

1. Go to **Project Settings** (gear icon) > **General**
2. Scroll down to "Your apps" section
3. Click on the **Web** icon (`</>`)
4. Register your app (app nickname: "Tomiris Web")
5. Copy the Firebase configuration object

## Step 7: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and fill in your Firebase config values:
   ```
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

## Step 8: Import Initial Data

Run the migration script to import your existing translations and data:

```bash
# Make sure you have Node.js installed
node scripts/import-data.js
```

**Note**: You'll need to update the Firebase config in `scripts/import-data.js` or set environment variables before running this script.

## Step 9: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/admin/login`
3. Login with the admin credentials you created in Step 3
4. You should see the admin dashboard

## Troubleshooting

### "Permission denied" errors
- Make sure security rules are published correctly
- Verify you're logged in as an authenticated user

### "Firebase app not initialized" errors
- Check that all environment variables are set correctly
- Make sure `.env` file exists and is in the project root
- Restart the dev server after changing `.env`

### Import script fails
- Verify Firebase config values in the script
- Make sure Firestore is enabled and in production mode
- Check that you have Node.js and Firebase SDK installed

## Security Best Practices

1. **Never commit `.env` file** - it's already in `.gitignore`
2. **Use environment variables** for all sensitive config
3. **Set up proper security rules** before going to production
4. **Limit admin users** - only create accounts for trusted administrators
5. **Monitor Firebase usage** - check the Firebase Console regularly

## Next Steps

- Customize the admin dashboard UI to match your brand
- Set up Firebase Hosting for production deployment
- Configure custom domain (optional)
- Set up backup strategy for Firestore data

