# Installation Guide for Order Management System

## Prerequisites Installation

### 1. Install Java 17

**Option A: Using Chocolatey (Recommended)**
```powershell
# Install Chocolatey if not already installed
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Install OpenJDK 17
choco install openjdk17
```

**Option B: Manual Download**
1. Download OpenJDK 17 from: https://adoptium.net/temurin/releases/?version=17
2. Install and set JAVA_HOME environment variable
3. Add Java to PATH

### 2. Install Maven

**Using Chocolatey:**
```powershell
choco install maven
```

**Manual Installation:**
1. Download Maven from: https://maven.apache.org/download.cgi
2. Extract to C:\Program Files\Maven
3. Add to PATH: C:\Program Files\Maven\bin
4. Set M2_HOME environment variable

### 3. Verify Installation
```powershell
java -version
mvn -version
node -version
npm -version
```

## AWS Setup

### 1. Install AWS CLI
```powershell
choco install awscli
```

### 2. Configure AWS Credentials
```bash
aws configure
```

### 3. Create AWS Resources

#### DynamoDB Table
```bash
aws dynamodb create-table \
  --table-name Orders \
  --attribute-definitions AttributeName=orderId,AttributeType=S \
  --key-schema AttributeName=orderId,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region us-east-1
```

#### S3 Bucket
```bash
aws s3 mb s3://your-order-management-bucket-12345 --region us-east-1
```

#### SNS Topic
```bash
aws sns create-topic --name order-notifications --region us-east-1
```

#### Subscribe to SNS (Optional)
```bash
aws sns subscribe \
  --topic-arn arn:aws:sns:us-east-1:YOUR_ACCOUNT_ID:order-notifications \
  --protocol email \
  --notification-endpoint your-email@example.com
```

## Running the Application

### Backend (Spring Boot)
```powershell
cd order-service
mvn spring-boot:run
```

### Frontend (React.js)
```powershell
cd order-ui
npm start
```

### Access Points
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- Swagger UI: http://localhost:8080/swagger-ui.html

## Configuration

Update `order-service/src/main/resources/application.properties`:
```properties
aws.region=us-east-1
aws.dynamodb.orders-table=Orders
aws.s3.bucket-name=your-order-management-bucket-12345
aws.sns.topic-arn=arn:aws:sns:us-east-1:YOUR_ACCOUNT_ID:order-notifications
```

## Troubleshooting

### Common Issues
1. **Java not found**: Ensure JAVA_HOME is set and Java is in PATH
2. **Maven not found**: Ensure Maven is in PATH
3. **AWS permissions**: Ensure proper IAM permissions for DynamoDB, S3, and SNS
4. **CORS issues**: Verify CORS configuration in Spring Boot

### Testing
```powershell
# Backend tests
cd order-service
mvn test

# Frontend tests
cd order-ui
npm test
```
