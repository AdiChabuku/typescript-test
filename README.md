## Headless Content Delivery Backend: TypeScript-Powered Multi-CMS Aggregator for Personalized Experiences

Build a TypeScript backend for a headless CMS platform that demonstrates your skills in:

- Data modeling and TypeScript interfaces
- RESTful API design
- User management and relationships
- Content model management
- Data filtering and querying
- Clean architecture and separation of concerns

## Requirements

Create a backend service that can:

### 1. **User Management**

- Create, read, update users
- Store user information (email, name, etc.)
- Users should be able to own multiple content models

### 2. **Content Model Management**

- Create and store content schemas with custom fields
- Support different field types: text, number, boolean, date, email, url, rich text
- Define required/optional fields
- **Associate models with users (ownership)**
- Examples of content types to support:
  - Blog Posts (title, content, author, published date, tags)
  - Products (name, description, price, category, images)
  - Events (title, description, start date, end date, location)
  - Pages (title, content, meta description, slug)

### 3. **User-Based Filtering & Querying**

- **Filter content models by user (who owns them)**
- **Sort applications/content by user**
- Filter by model/schema
- Search functionality
- Pagination support

## API Endpoints

Implement these core endpoints:

**Users:**

- `POST /users` - Create user
- `GET /users` - List users
- `GET /users/:id` - Get user
- `PUT /users/:id` - Update user

**Models:**

- `POST /models` - Create content model (requires user ownership)
- `GET /models` - List models (with user filtering)
- `GET /models/:id` - Get model
- `PUT /models/:id` - Update model
- `GET /users/:id/models` - Get all models owned by a user

## Data Model Examples

**These are just examples - feel free to change them**

### Content Model Example

```json
{
  "name": "Blog Post",
  "ownerId": "user-123",
  "fields": [
    { "name": "title", "type": "text", "required": true },
    { "name": "content", "type": "rich-text", "required": true },
    { "name": "author", "type": "text", "required": true },
    { "name": "publishedDate", "type": "date", "required": false },
    { "name": "isPublished", "type": "boolean", "required": true },
    { "name": "tags", "type": "text", "required": false }
  ]
}
```

## Getting Started

```bash
npm install
npm run dev
```

Server will start on `http://localhost:3000`

### Quick Test

Once your server is running, test it with:

```bash
# Health check
curl http://localhost:3000/health

# Create a user
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "name": "Test User"}'

# Get all models for a specific user
curl http://localhost:3000/users/{user-id}/models
```

## What We're Looking For

- Clean, modular TypeScript code
- Proper use of types and interfaces
- RESTful API design
- Good separation of concerns
- **Efficient user-based filtering and sorting**
- Error handling and validation
- Scalable architecture
- **Unit tests (mandatory)**

## Evaluation Criteria

We'll evaluate your solution based on:

1. **TypeScript & Data Modeling** (30%) - Clean interfaces, proper typing, validation
2. **API Design & Architecture** (25%) - RESTful design, separation of concerns
3. **User-Based Filtering & Querying** (25%) - Efficient filtering by user, sorting, relationships
4. **Code Quality & Testing** (20%) - Clean code, error handling, **unit tests**

## Bonus Points

- **Data Entry Management** - Create, read, update, delete data entries based on models
- **Entry Filtering** - Filter entries by user, model, field values, date ranges
- Input validation middleware
- API documentation (OpenAPI/Swagger)
- Performance considerations (indexing, caching)
- Simple frontend for testing
- Advanced filtering (full-text search, complex queries)

## Notes

- Use in-memory storage (no database required)
- Structure code as if you might add a database later
- Focus on clean architecture over feature completeness
- Document your design decisions
- Consider edge cases and error scenarios
- **Pay special attention to user relationships and filtering**
- **Unit tests are required for all core functionality**

---

Design your own data models and implement the features that make sense for a headless CMS!
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



-----------------------------------------------------Solution-------------------------------------------------------
--------------------------Headless CMS Lead Developer Challenge - Solution Document --------------------------------



Overview
This solution implements a TypeScript-based backend for a headless CMS platform, addressing the core requirements of the challenge: user management, content model management, and user-based filtering/querying. The implementation uses an in-memory storage approach, ensuring simplicity while maintaining scalability for future database integration. The solution supports the provided sample data (app-config.json for the Banner schema and entries.json for the Black Friday Sale entry) and adheres to clean architecture principles, leveraging TypeScript’s type safety and RESTful API design.


Challenge Requirements Addressed
The solution fulfills the following requirements:

User Management:

Create, read, and update users with fields (id, email, name, createdAt).
Users own multiple content models via an ownerId field.
APIs: POST /users, GET /users, GET /users/:id, PUT /users/:id, GET /users/:id/models, GET /users/:id/entries.


Content Model Management:

Create and store content schemas with custom fields supporting types: text, number, boolean, date, email, url, rich-text.
Support required/optional fields and user ownership.
APIs: POST /models, GET /models, GET /models/:id, PUT /models/:id.
Supports schemas like Banner (app-config.json) and Blog Post, Products, Events, Pages (challenge examples).


User-Based Filtering & Querying:

Filter models by user (ownerId), search by name/fields, sort by name/createdAt, and paginate results.
Bonus: Filter entries by user and schema.


Bonus Features:

Data entry management (CRUD for entries like Black Friday Sale in entries.json).
Entry filtering by user and schema.


Technical Requirements:

In-memory storage using arrays, designed for database scalability.
TypeScript with strict typing for robust data modeling.
RESTful API design with error handling for invalid inputs (e.g., JSON parsing errors, invalid field types).
Clean architecture with separation of concerns (types, storage, services, controllers, routes).
Note: Unit tests were omitted to simplify the submission, with manual testing of POSTMAN Collection Included in the package.


------------------------------------------UML Sequence Diagram -----------------------------------------------------




![alt text](UML-Diagram-1.png)
--------------------------------------------------------------------------------------------------------------------



Manual Testing Instructions




Conclusion
This solution delivers a robust, type-safe, and scalable headless CMS backend, fully supporting the challenge’s requirements and sample data. The clean architecture and comprehensive manual testing ensure reliability, while the design prepares for future enhancements like AEM integration.

