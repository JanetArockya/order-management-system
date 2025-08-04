<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Order Management System - Copilot Instructions

This is a full-stack Order Management System with the following technical stack:

## Backend (Spring Boot)
- **Framework**: Spring Boot 3.2.0 with Java 17
- **Database**: AWS DynamoDB (NoSQL)
- **File Storage**: AWS S3 for invoice PDFs
- **Notifications**: AWS SNS for order notifications
- **Documentation**: OpenAPI/Swagger UI
- **Testing**: JUnit 5 with Spring Boot Test

### Key Backend Patterns:
- Use `@RestController` for REST endpoints
- Use `@Service` for business logic
- Use `@Repository` for data access
- Use AWS SDK v2 for all AWS integrations
- Use `DynamoDbEnhancedClient` for DynamoDB operations
- Follow Spring Boot best practices for configuration

## Frontend (React.js)
- **Framework**: React 18 with functional components and hooks
- **Routing**: React Router v6
- **Styling**: Tailwind CSS for responsive design
- **HTTP Client**: Axios for API calls
- **Notifications**: React Toastify
- **File Upload**: HTML5 file input with validation

### Key Frontend Patterns:
- Use functional components with hooks (useState, useEffect)
- Follow React best practices for state management
- Use proper error handling and loading states
- Implement responsive design with Tailwind classes
- Use proper TypeScript types when needed

## AWS Services Configuration:
- **DynamoDB**: Table name "Orders" with partition key "orderId"
- **S3**: Store files in "invoices/" prefix
- **SNS**: Publish order notifications with structured messages

## API Endpoints:
- `POST /orders` - Create order (multipart/form-data)
- `GET /orders` - List all orders
- `GET /orders/{id}` - Get order by ID

## Development Guidelines:
- Write clean, readable code with proper error handling
- Use meaningful variable and method names
- Add appropriate validation for all inputs
- Follow RESTful API design principles
- Implement proper CORS configuration
- Use environment-based configuration
- Write comprehensive tests for critical functionality

## Security Considerations:
- Validate all file uploads (PDF only, size limits)
- Sanitize all user inputs
- Use proper AWS IAM permissions
- Implement CORS properly for frontend integration
