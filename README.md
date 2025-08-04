# 🚀 Order Management System

> A modern, full-stack order management application built with React.js and Spring Boot, featuring AWS cloud integration and a beautiful, responsive UI.

![Order Management System](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![React](https://img.shields.io/badge/Frontend-React%2018-61DAFB?logo=react)
![Spring Boot](https://img.shields.io/badge/Backend-Spring%20Boot%203.2-6DB33F?logo=springboot)
![AWS](https://img.shields.io/badge/Cloud-AWS%20Services-FF9900?logo=amazonaws)
![Tailwind](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC?logo=tailwindcss)

## ✨ Features

### 🎨 **Modern UI/UX**
- **Gradient Design**: Beautiful blue-to-purple gradient themes throughout
- **Responsive Layout**: Mobile-first design with Tailwind CSS
- **Interactive Elements**: Hover animations and smooth transitions
- **Professional Cards**: Modern card layouts with backdrop blur effects
- **Real-time Feedback**: Toast notifications and loading states

### 🔧 **Core Functionality**
- **Order Management**: Create, read, and track orders efficiently
- **File Upload**: PDF invoice upload with validation
- **Dashboard Analytics**: Real-time stats with total orders, revenue, and averages
- **Search & Filter**: Easy order lookup and management
- **RESTful API**: Clean, well-documented API endpoints

### ☁️ **AWS Cloud Integration**
- **DynamoDB**: NoSQL database for scalable order storage
- **S3 Storage**: Secure file storage for invoice PDFs
- **SNS Notifications**: Automated order notifications
- **IAM Security**: Proper access controls and permissions

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│   React.js      │◄──►│  Spring Boot    │◄──►│  AWS Services   │
│   Frontend      │    │   Backend       │    │                 │
│                 │    │                 │    │                 │
│ • Tailwind CSS │    │ • RESTful API   │    │ • DynamoDB      │
│ • Axios HTTP   │    │ • Spring Data   │    │ • S3 Storage    │
│ • React Router │    │ • AWS SDK v2    │    │ • SNS Messaging │
│ • Toast UI     │    │ • JUnit Tests   │    │ • IAM Security  │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16+ and npm
- **Java** 17+ and Maven
- **AWS Account** (for cloud features)
- **Git** for version control

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/order-management-system.git
cd order-management-system
```

### 2. Backend Setup (Spring Boot)
```bash
cd order-service
mvn clean install
mvn spring-boot:run
```
Backend runs on: `http://localhost:8080`

### 3. Frontend Setup (React)
```bash
cd order-ui
npm install
npm start
```
Frontend runs on: `http://localhost:3000`

### 4. Mock Backend (Alternative)
For quick testing without Java/Maven:
```bash
cd mock-backend
npm install
npm start
```
Mock backend runs on: `http://localhost:8081`

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Toastify** - Beautiful notifications

### Backend
- **Spring Boot 3.2** - Enterprise Java framework
- **Spring Data** - Data access abstraction
- **AWS SDK v2** - Cloud service integration
- **Maven** - Dependency management
- **JUnit 5** - Testing framework

### Cloud Services
- **AWS DynamoDB** - NoSQL database
- **AWS S3** - Object storage
- **AWS SNS** - Push notifications
- **AWS IAM** - Identity and access management

## 🔧 API Documentation

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/orders` | Retrieve all orders |
| `POST` | `/orders` | Create new order |
| `GET` | `/orders/{id}` | Get order by ID |

### Example API Call
```javascript
// Create new order
const response = await fetch('/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  body: formData
});
```

## 🏃‍♂️ Development

### Project Structure
```
order-management-system/
├── order-service/          # Spring Boot backend
│   ├── src/main/java/      # Java source code
│   ├── src/main/resources/ # Configuration files
│   └── pom.xml            # Maven dependencies
├── order-ui/              # React frontend
│   ├── src/components/    # React components
│   ├── src/services/      # API services
│   └── package.json       # npm dependencies
├── mock-backend/          # Node.js mock server
└── .github/               # GitHub workflows
```

## 🧪 Testing

### Backend Tests
```bash
cd order-service
mvn test
```

### Frontend Tests
```bash
cd order-ui
npm test
```

## 🚀 Deployment

### Using GitHub Actions
The project includes CI/CD pipeline configuration:
- Automated testing on pull requests
- Build and deployment to AWS
- Environment-specific configurations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Features Roadmap

- [ ] **User Authentication** - JWT-based auth system
- [ ] **Order Status Tracking** - Real-time status updates
- [ ] **Email Notifications** - Automated email alerts
- [ ] **Advanced Analytics** - Charts and reporting
- [ ] **Multi-tenant Support** - Organization management
- [ ] **Mobile App** - React Native companion app

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Portfolio: [your-portfolio.com](https://your-portfolio.com)

## 🙏 Acknowledgments

- Built for internship application demonstration
- Inspired by modern e-commerce platforms
- Thanks to the React and Spring Boot communities

---

<div align="center">
  <strong>⭐ Star this repository if you found it helpful!</strong>
</div>
