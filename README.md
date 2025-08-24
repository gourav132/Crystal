# Crystal Gallery

A beautiful, modern photo gallery application built with React and Firebase. Share your images with custom galleries and manage them effortlessly.

## ✨ Features

- **📸 Image Upload**: Drag & drop or URL-based image uploads
- **🎨 Beautiful UI**: Modern, responsive design with smooth animations
- **🔐 User Authentication**: Secure login/register with Firebase Auth
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **⚡ Fast Performance**: Lazy loading and optimized image delivery
- **🔍 Search & Filter**: Find your images quickly
- **📤 Share Galleries**: Generate shareable links for your galleries
- **🔄 Real-time Updates**: Live updates when images are added/removed
- **📱 PWA Support**: Install as a native app on mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/crystal-gallery.git
   cd crystal-gallery
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Enable Storage
   - Copy your Firebase configuration

4. **Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_API_KEY=your_api_key_here
   REACT_APP_AUTH_DOMAIN=your_project.firebaseapp.com
   REACT_APP_PROJECT_ID=your_project_id
   REACT_APP_STORAGE_BUCKET=your_project.appspot.com
   REACT_APP_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_APP_ID=your_app_id
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

## 🛠️ Tech Stack

- **Frontend**: React 18, Framer Motion, Tailwind CSS
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Styling**: SCSS, Tailwind CSS
- **Icons**: React Icons
- **Forms**: React Hook Form
- **Routing**: React Router DOM

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Modal/          # Image modal component
│   ├── Navbar/         # Navigation bar
│   ├── Toast/          # Notification system
│   ├── ImageCard/      # Individual image display
│   └── SearchBar/      # Search functionality
├── hooks/              # Custom React hooks
├── Firebase/           # Firebase configuration
├── page/               # Page components
│   ├── Auth/           # Authentication pages
│   ├── Home/           # Main gallery page
│   └── Profile/        # User profile management
└── index.js            # App entry point
```

## 🔧 Configuration

### Firebase Security Rules

Update your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /images/{imageId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Storage Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 🎨 Customization

### Colors
Update the color scheme in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: "#7d3865",    // Main brand color
      secondary: "#c1a7b0",  // Secondary color
    }
  }
}
```

### Styling
Main styles are in `src/index.scss`. You can customize:
- Typography (Nunito Sans font)
- Layout spacing
- Component-specific styles

## 📱 PWA Features

The app includes Progressive Web App features:
- Offline support
- Install prompt
- App-like experience
- Background sync

## 🔒 Security Features

- Environment variables for sensitive data
- Firebase security rules
- Input validation
- XSS protection
- CSRF protection

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Netlify
1. Build the project: `npm run build`
2. Upload the `build` folder to Netlify
3. Add environment variables in Netlify dashboard

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Firebase](https://firebase.google.com/) for backend services
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React Icons](https://react-icons.github.io/react-icons/) for icons

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact us at support@crystalgallery.com
