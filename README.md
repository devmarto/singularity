# Singularity - AI-Powered Face Detection Platform

![Singularity Banner](https://i.ibb.co/W4m60x7B/banner-singularity.png)

**Singularity** is a modern web-based face detection platform built with React and powered by Clarifai's advanced AI models. The application provides a seamless experience for detecting and analyzing faces in images with enterprise-grade accuracy and performance.

The name "Singularity" represents the convergence of artificial intelligence and human identity recognition, creating a unique point where technology meets individual identification.

---

## ✨ Key Features

- **🔍 AI-Powered Face Detection:** Advanced face detection using Clarifai's state-of-the-art machine learning models
- **👥 Multi-Face Recognition:** Simultaneously detect and identify multiple faces in a single image
- **📱 Responsive Design:** Modern, mobile-first interface that works seamlessly across all devices
- **🔐 User Authentication:** Secure user registration and login system with protected routes
- **📊 Usage Analytics:** Track and monitor your face detection usage with detailed analytics
- **💳 Flexible Pricing:** Multiple subscription plans to fit different usage needs
- **🌐 International Support:** Multi-language phone number validation and international formatting
- **🎨 Beautiful UI:** Clean, modern interface built with Tailwind CSS and Headless UI components

---

## 🛠️ Tech Stack

### Frontend
- **[React 19.1.0](https://reactjs.org/)** - Modern JavaScript library for building user interfaces
- **[Vite 5.4.19](https://vitejs.dev/)** - Fast build tool and development server
- **[React Router 7.6.3](https://reactrouter.com/)** - Declarative routing for React applications
- **[Tailwind CSS 3.4.17](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Headless UI 2.2.4](https://headlessui.com/)** - Unstyled, accessible UI components

### Form Management & Validation
- **[Formik](https://formik.org/)** - Build forms without tears
- **[Yup 1.6.1](https://github.com/jquense/yup)** - Object schema validation
- **[React International Phone 4.6.0](https://github.com/goveo/react-international-phone)** - International phone number input
- **[Google Libphonenumber 3.2.42](https://github.com/google/libphonenumber)** - Phone number parsing and validation

### UI Components & Icons
- **[React Icons 5.5.0](https://react-icons.github.io/react-icons/)** - Popular icon libraries for React
- **[React Toastify 11.0.5](https://github.com/fkhadra/react-toastify)** - Notification system

### AI & Machine Learning
- **[Clarifai API](https://www.clarifai.com/)** - Advanced AI models for face detection
- **Computer Vision Models** - Pre-trained models for accurate face recognition

### Development Tools
- **[ESLint 9.29.0](https://eslint.org/)** - JavaScript linting utility
- **[PostCSS 8.5.6](https://postcss.org/)** - CSS transformation tool
- **[Autoprefixer 10.4.21](https://github.com/postcss/autoprefixer)** - CSS vendor prefixing

---

## 🚀 Live Demo

🔗 **[View Live Demo](https://singularity-ai-face-detection.vercel.app)** *(Deploy your app and update this link)*

---

## 📁 Project Structure

```
singularity/
├── app/                          # Main application directory
│   ├── public/                   # Static assets
│   │   ├── logo.png             # Application logo
│   │   ├── logo-dark.png        # Dark theme logo
│   │   └── vite.svg             # Vite icon
│   ├── src/                     # Source code
│   │   ├── components/          # React components
│   │   │   ├── Auth/           # Authentication components
│   │   │   ├── FaceRecognition/ # Face detection display
│   │   │   ├── ImageLinkForm/   # Image URL input form
│   │   │   ├── Navigation/      # Navigation bar
│   │   │   ├── Plans/          # Pricing plans
│   │   │   ├── Register/       # User registration
│   │   │   ├── SignIn/         # User login
│   │   │   ├── Usage/          # Usage analytics
│   │   │   └── ProtectedRoute/ # Route protection
│   │   ├── assets/             # Static assets
│   │   ├── App.jsx             # Main app component
│   │   ├── main.jsx            # App entry point
│   │   └── index.css           # Global styles
│   ├── .env                    # Environment variables
│   ├── package.json            # Dependencies and scripts
│   ├── tailwind.config.js      # Tailwind configuration
│   └── vite.config.js          # Vite configuration
└── README.md                   # Project documentation
```

---

## 🔧 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Clarifai API Key** (sign up at [clarifai.com](https://www.clarifai.com/))

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/devmarto/singularity.git
   cd singularity
   ```

2. **Navigate to the app directory:**
   ```bash
   cd app
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Set up environment variables:**
   Create a `.env` file in the `app` directory and add your Clarifai API key:
   ```env
   VITE_CLARIFAI_PAT=your_clarifai_api_key_here
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

---

## 🌟 Features Overview

### Face Detection
- Upload images via URL input
- Real-time face detection processing
- Visual bounding boxes around detected faces
- Support for multiple faces in single image
- Color-coded face identification

### User Management
- Secure user registration with validation
- Email and password authentication
- International phone number support
- Protected routes and authentication guards
- User profile management

### Analytics & Usage
- Track face detection usage
- Monitor API call history
- Usage limits and quotas
- Historical data visualization

### Pricing & Plans
- Free tier with basic features
- Enterprise plans for high-volume usage
- Usage-based pricing model
- Flexible subscription options

---

## 🔐 Environment Variables

Create a `.env` file in the `app` directory with the following variables:

```env
# Clarifai API Configuration
VITE_CLARIFAI_PAT=your_clarifai_personal_access_token

# Optional: Backend API URL (if using custom backend)
VITE_API_URL=http://localhost:3000
```

---

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on every push

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Set environment variables in Netlify dashboard

### Manual Deployment
1. Build the project: `npm run build`
2. Upload the `dist` folder to your web server
3. Configure your server to serve the SPA correctly

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Clarifai](https://www.clarifai.com/) for providing the AI face detection API
- [React](https://reactjs.org/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Headless UI](https://headlessui.com/) for accessible UI components


---

**Built with ❤️ by [devmarto](https://github.com/devmarto)**