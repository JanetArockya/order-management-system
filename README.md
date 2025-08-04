# Real-Time Order Management System

A full-stack Order Management System built with Spring Boot (Java) backend and React.js frontend, integrated with AWS services for cloud storage and notifications.

## 🏗️ Architecture

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Spring Boot (Java 17)
- **Database**: AWS DynamoDB
- **File Storage**: AWS S3
- **Notifications**: AWS SNS
- **CI/CD**: GitHub Actions
- **Documentation**: Swagger UI/OpenAPI

## 📋 Features

### Backend (Spring Boot)
- RESTful API endpoints for order management
- AWS DynamoDB integration for data persistence
- AWS S3 integration for invoice file storage
- AWS SNS integration for order notifications
- Swagger UI for API documentation
- Input validation and error handling
- CORS configuration for frontend integration

### Frontend (React.js)
- Responsive dashboard displaying all orders
- Create order form with file upload
- Order detail view with invoice download
- Toast notifications for user feedback
- Clean and modern UI with Tailwind CSS
- Client-side routing with React Router

### AWS Integration
- **DynamoDB**: Stores order data with partition key on orderId
- **S3**: Stores invoice PDF files and returns accessible URLs
- **SNS**: Publishes notifications when new orders are created

## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- Node.js 18 or higher
- AWS CLI configured with appropriate credentials
- Maven 3.6 or higher

### AWS Setup

1. **Create DynamoDB Table**
   ```bash
   aws dynamodb create-table \
     --table-name Orders \
     --attribute-definitions AttributeName=orderId,AttributeType=S \
     --key-schema AttributeName=orderId,KeyType=HASH \
     --billing-mode PAY_PER_REQUEST \
     --region us-east-1
   ```

2. **Create S3 Bucket**
   ```bash
   aws s3 mb s3://your-order-management-bucket --region us-east-1
   ```

3. **Create SNS Topic**
   ```bash
   aws sns create-topic --name order-notifications --region us-east-1
   ```

4. **Subscribe to SNS Topic** (Optional - for email notifications)
   ```bash
   aws sns subscribe \
     --topic-arn arn:aws:sns:us-east-1:your-account:order-notifications \
     --protocol email \
     --notification-endpoint your-email@example.com
   ```

### Local Development

#### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd order-service
   ```

2. Update `application.properties` with your AWS configuration:
   ```properties
   aws.region=us-east-1
   aws.dynamodb.orders-table=Orders
   aws.s3.bucket-name=your-order-management-bucket
   aws.sns.topic-arn=arn:aws:sns:us-east-1:your-account:order-notifications
   ```

3. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

The backend will start on `http://localhost:8080`

#### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd order-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will start on `http://localhost:3000`

## 📡 API Reference

### Base URL
```
http://localhost:8080
```

### Endpoints

#### Create Order
```http
POST /orders
Content-Type: multipart/form-data

Parameters:
- customerName (string, required): Name of the customer
- orderAmount (number, required): Order amount in USD
- invoiceFile (file, optional): PDF invoice file
```

#### Get All Orders
```http
GET /orders
```

#### Get Order by ID
```http
GET /orders/{orderId}
```

### API Documentation
Access the interactive API documentation at: `http://localhost:8080/swagger-ui.html`

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

### GitHub Actions CI/CD
The project includes automated CI/CD pipeline using GitHub Actions:

1. **Test Stage**: Runs tests for both backend and frontend
2. **Build Stage**: Builds both applications
3. **Deploy Stage**: Deploys to AWS (Elastic Beanstalk for backend, S3 for frontend)

### Required GitHub Secrets
Configure the following secrets in your GitHub repository:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `S3_BUCKET_NAME`
- `CLOUDFRONT_DISTRIBUTION_ID` (if using CloudFront)

### Manual Deployment

#### Backend to AWS Elastic Beanstalk
```bash
cd order-service
mvn clean package
eb init -p java-17 order-management-backend
eb create order-management-env
eb deploy
```

#### Frontend to AWS S3
```bash
cd order-ui
npm run build
aws s3 sync build/ s3://your-frontend-bucket --delete
```

## 🛠️ Development

### Project Structure
```
├── order-service/          # Spring Boot backend
│   ├── src/main/java/
│   │   └── com/orderms/orderservice/
│   │       ├── config/     # AWS configuration
│   │       ├── controller/ # REST controllers
│   │       ├── model/      # Entity models
│   │       ├── repository/ # Data access layer
│   │       └── service/    # Business logic
│   └── src/main/resources/
│       └── application.properties
├── order-ui/              # React.js frontend
│   ├── public/
│   └── src/
│       ├── components/     # React components
│       └── services/       # API services
└── .github/workflows/     # CI/CD pipeline
```

### Adding Features
1. **Backend**: Add new endpoints in controllers, business logic in services
2. **Frontend**: Create new components and update routing
3. **AWS**: Update AWS configurations as needed

## 🔧 Configuration

### Environment Variables
Create `.env` files for local development:

**Backend** (`order-service/src/main/resources/application-local.properties`):
```properties
aws.region=us-east-1
aws.dynamodb.orders-table=Orders-Dev
aws.s3.bucket-name=your-dev-bucket
aws.sns.topic-arn=arn:aws:sns:us-east-1:account:dev-notifications
```

**Frontend** (`order-ui/.env.local`):
```
REACT_APP_API_URL=http://localhost:8080
```

## 📊 Monitoring and Logging

- **Backend**: Uses Spring Boot Actuator for health checks
- **AWS**: CloudWatch for monitoring DynamoDB, S3, and SNS
- **Frontend**: Console logging and error boundaries

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

For support, email your-email@example.com or create an issue in this repository.
