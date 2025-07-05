# NestJS Masterclass

This repository contains the code examples, exercises, and projects for the NestJS Masterclass.

## What is NestJS?

NestJS is a progressive Node.js framework for building efficient, reliable, and scalable server-side applications. It uses TypeScript by default and is heavily inspired by Angular, making it a great choice for developers familiar with Angular's architecture.

### Why NestJS?

If we have Node.js, why do we need NestJS? Node.js is a runtime environment that allows us to run JavaScript on the server side. However, it does not provide a structured way to build applications. NestJS fills this gap by providing a framework that encourages best practices, modular architecture, and dependency injection.

NestJS allows for scalable application development by providing features like:

- **Modularity**: Organize your code into modules for better maintainability.
- **Dependency Injection**: Manage dependencies in a clean and efficient way.
- **TypeScript Support**: Leverage TypeScript's features for better code quality and developer experience.
- **Extensive Ecosystem**: Use a wide range of libraries and tools that integrate seamlessly with NestJS.

### Why do we need structured code?

Structured code is essential for several reasons:

- **Maintainability**: Well-structured code is easier to read, understand, and modify. It reduces complexity and makes it easier to onboard new developers.
- **Scalability**: As applications grow, structured code helps manage complexity and allows for easier scaling. It enables teams to work on different parts of the application without stepping on each other's toes
- **Testability**: Structured code is easier to test. It allows for better isolation of components, making unit testing and integration testing more straightforward.
- **Consistency**: A consistent code structure helps developers follow best practices and reduces the likelihood of bugs. It also makes it easier to enforce coding standards across the team.

### How does NestJS make this possible?

NestJS provides a modular architecture that encourages developers to organize their code into modules, controllers, and services. This structure promotes separation of concerns, making it easier to manage dependencies and maintain the codebase.

NestJS provides out-of-the-box features like routing, middleware, exception handling, testing, documentation, plugins, and more.

### Use Cases for NestJS

NestJS is suitable for a wide range of applications, including:

- **RESTful APIs**: Build robust and scalable APIs for web and mobile applications.
- **GraphQL APIs**: Create flexible and efficient APIs using GraphQL.
- **Microservices**: Develop distributed systems with ease, leveraging NestJS's built-in support for microservices architecture.
- **Real-time Applications**: Build real-time applications using WebSockets and other real-time protocols.
- **Serverless Applications**: Deploy NestJS applications on serverless platforms
- **Enterprise Applications**: Develop large-scale applications with complex business logic and requirements.
- **CLI Tools**: Create command-line tools and utilities using NestJS's CLI capabilities.
- **MVC Applications**: Build full-stack applications with a clear separation of concerns between the model, view, and controller layers.

## Intro to Modules

### What are Modules?

Modules in NestJS are the fundamental building blocks of an application. They allow you to organize your code into cohesive blocks of functionality. Each module encapsulates related components, such as controllers, services, and providers, making it easier to manage dependencies and maintain the codebase.

Think of modules as a package of functionality that can be reused across your application. They help you break down your application into smaller, manageable pieces, promoting separation of concerns and modularity.

Whenever you create a new feature or functionality in your application, it's a good practice to encapsulate it within a module. This way, you can easily manage and scale your application as it grows.

A module is a package that encompasses all related files to one particular entity. For example, if you have a user management feature, you can create a `UserModule` that contains all the controllers, services, and providers related to user management.

Example of a user module:

```plaintext
users.module.ts
├── users.controller.ts
├── users.service.ts
├── users.entity.ts
└── users.controller.spec.ts
```

### Default Module

In NestJS, every application has a default module called `AppModule`. This module serves as the root module of your application and is where you can import other modules, configure providers, and set up the application's main components.

NestJS comes with default `AppModule`, which is the main entry point of your application. It is automatically created when you generate a new NestJS project using the CLI.

### Files in a Module

A typical module in NestJS consists of several files that define its structure and functionality. Here are the common files you might find in a module:

- `*.module.ts`: The main module file that defines the module and imports other related modules.
- `*.controller.ts`: The controller file that handles incoming requests and returns responses (contains routing logic/API endpoints).
- `*.service.ts`: The service file that contains the business logic and interacts with the data layer (logic related to a particular functionality).
- `*.entity.ts`: The entity file that defines the data model and its properties (e.g., database schema).
- `*.controller.spec.ts`: The test file for the controller, containing unit tests to verify its behavior (contains unit tests for the controller).

### How Modules are Connected

Modules in NestJS are connected through imports and exports. When you create a module, you can import other modules to use their functionality. This allows you to build a modular architecture where each module can depend on others.

For example, if you have a `UsersModule` and a `PostsModule`, and you want to use the `UsersService` in the `PostsService`, you can import the `UsersModule` into the `PostsModule` and inject the `UsersService` where needed.

Example of Module Connection to AppModule:

```mermaid
graph LR
subgraph Modules
A[user.module.ts]
B[posts.module.ts]
end

subgraph Main Application
C[app.module.ts]
D[main.ts]
end

A --> C
B --> C
C --> D
```

## What is a REST API?

A REST API (Representational State Transfer Application Programming Interface) is a set of rules and conventions for building web services that allow different systems to communicate over HTTP. It is based on the principles of REST, which emphasizes stateless communication, resource-based interactions, and a uniform interface.

**Official Definition**: The REST API or RESTful API is an Application Programming Interface (API) that conforms to the design principles of Representational State Transfer (REST) architectural style of programming. It allows developers to access and manipulate resources using standard HTTP methods such as GET, POST, PUT, DELETE, and PATCH.

### REST Design Principles

REST APIs are designed around the following principles:

- **Statelessness**: Each request from a client to a server must contain all the information needed to understand and process the request. The server does not store any client context between requests.
- **Client-Server Decoupling**: The client and server are separate entities that can evolve independently. The client does not need to know the implementation details of the server, and vice versa.
- **Cacheability**: Responses from the server can be cached to improve performance and reduce the load on the server. This allows clients to reuse previously fetched data without making additional requests.
- **Layered System**: A REST API can be composed of multiple layers, such as load balancers, proxies, and gateways. Each layer can add functionality without affecting the overall architecture.
- **Uniform Interface**: REST APIs use a consistent and standardized way to interact with resources. This includes using standard HTTP methods (GET, POST, PUT, DELETE) and resource URIs (Uniform Resource Identifiers) to identify resources.
- **Code on Demand (optional)**: Servers can provide executable code to clients, allowing them to extend functionality without requiring a full application update. This is an optional principle and not commonly used in practice.

#### Client-Server Decoupling

Client-server decoupling is a key principle of REST APIs that allows the client and server to evolve independently. This means that changes made to the client do not require changes to the server, and vice versa. This decoupling is achieved through the use of standard protocols (like HTTP) and data formats (like JSON or XML).

In REST API design, the client and server applications must be completely independent of each other. The client should not need to know how the server is implemented, and the server should not need to know how the client is implemented. This allows for flexibility in development and deployment.

A client sends a request to the server, and the server responds with the requested data or performs the requested action. The interaction uses standard HTTP methods and status codes to communicate the outcome of the request.
The client can send HTTP methods such as GET, POST, PUT, DELETE, and PATCH to interact with the server's resources.

##### HTTP Request Methods

| Method  | Description                                                                     |
| ------- | ------------------------------------------------------------------------------- |
| GET     | Retrieve data from the server (read operation)                                  |
| POST    | Send data to the server to create a new resource (create operation)             |
| PUT     | Update an existing resource on the server (update operation)                    |
| DELETE  | Remove a resource from the server (delete operation)                            |
| PATCH   | Partially update an existing resource on the server (partial update operation)  |
| OPTIONS | Retrieve the supported HTTP methods for a resource (used for CORS preflight)    |
| HEAD    | Retrieve metadata about a resource without the response body (used for caching) |
| TRACE   | Echo back the received request (used for diagnostic purposes)                   |

#### Uniform Interface

The uniform interface is a fundamental principle of REST APIs that defines how clients and servers interact with resources. It provides a consistent and standardized way to access and manipulate resources, making it easier for developers to understand and use the API.

All API requests for the same resource should look the same or respond back the same, regardless of the client or server implementation. This means that the same HTTP methods, URIs, and data formats should be used consistently across the API.

```mermaid
graph LR
subgraph Clients
A[Client 1]
B[Client 2]
end

C[Server]

subgraph API Endpoints
  GET[GET /posts]
  POST[POST /posts]
  DELETE[DELETE /posts]
end

A --> GET
A --> POST
A --> DELETE
B --> GET
B --> POST
B --> DELETE
GET --> C
POST --> C
DELETE --> C
```

#### Statelessness

Statelessness is a key principle of REST APIs that requires each request from a client to the server to contain all the information needed to understand and process the request. The server does not store any client context between requests, meaning that each request is independent and self-contained.

REST APIs are stateless, meaning that the server does not store any client context between requests. Each request must contain all the information needed to process it, including authentication and authorization details.

```mermaid
flowchart LR
  A[Client] -- "POST /echo/post/json<br/>Authorization: Bearer {token}<br/>Host: example.com<br/>Accept: application/json<br/>Content-Type: application/json" --> B[Server]
```

#### Cacheability

Cacheability is a principle of REST APIs that allows responses from the server to be cached by clients or intermediaries. This improves performance and reduces the load on the server by allowing clients to reuse previously fetched data without making additional requests.

When possible, resources should be cacheable both on the client side and server side. This can be achieved by using HTTP headers like `Cache-Control`, `ETag`, and `Last-Modified` to control how responses are cached and when they should be revalidated.

```mermaid
flowchart LR
  Client[Client Browser]
  ClientCache[Client Cache]
  ProxyCache[Proxy/Edge Cache]
  Server[Server]

  Client -- "Request" --> ClientCache
  ClientCache -- "Request" --> ProxyCache
  ProxyCache -- "Request" --> Server
  Server -- "Response" --> ProxyCache
  ProxyCache -- "Response" --> ClientCache
  ClientCache -- "Response" --> Client
```

#### Layered System Architecture

A layered system architecture is a design principle of REST APIs that allows for the separation of concerns by organizing the application into layers. Each layer has its own responsibilities and can interact with other layers through well-defined interfaces.

This architecture allows for scalability, maintainability, and flexibility in the design of the API. It also enables the use of intermediaries, such as load balancers and caches, to improve performance and reliability.

REST APIs need to be designed so that neither the client nor the server can tell whether they are communicating directly or through an intermediary. This means that the API should be designed to work seamlessly with load balancers, proxies, and other intermediaries without affecting the functionality or performance of the API.

```mermaid
flowchart LR
  Client[Client]
  Proxy[Proxy/Load Balancer]
  Server[Server]

  Client -- "Request" --> Proxy
  Proxy -- "Request" --> Server
  Server -- "Response" --> Proxy
  Proxy -- "Response" --> Client
```

### Anatomy of a REST API Endpoint

A REST API endpoint is a specific URL that represents a resource or a collection of resources. It is the point of interaction between the client and the server, where the client can perform operations on the resource using standard HTTP methods.

An endpoint consists of the following components:

- **HTTP Method**: The action to be performed on the resource (e.g., GET, POST, PUT, DELETE).
- **URL/Domain**: The address of the resource, which includes the protocol (http or https), domain name, and path to the resource.
- **Route**: The specific path that identifies the resource within the API.
- **Parameters/Path Parameters**: Optional query parameters that can be included in the URL to filter or modify the request.
- **Query String**: A string of key-value pairs appended to the URL, used to pass additional information to the server.
- **Request Body**: The data sent in the request, typically used with POST and PUT methods to create or update resources.

```plaintext
GET https://api.example.com/users?sort=asc&limit=10
```

#### Params vs Query

In REST APIs, parameters can be passed in two main ways: as path parameters and as query parameters.

- **Path Parameters**: These are part of the URL path and are used to identify a specific resource. They are typically used to specify the resource ID or other unique identifiers.

  Example: `GET /users/{userId}` where `{userId}` is a path parameter.

- **Query Parameters**: These are appended to the URL and are used to filter or modify the request. They are typically used for pagination, sorting, and searching.

  Example: `GET /users?sort=asc&limit=10` where `sort` and `limit` are query parameters.

#### Body Object Example

The request body is used to send data to the server, typically in POST or PUT requests. It contains the data that the client wants to create or update on the server.

Example of a JSON body object for creating a new user:

```json
{
  "username": "john_doe",
  "email": "john_doe@example.com",
  "password": "password"
}
```

## Controllers

Controllers in NestJS are responsible for handling incoming requests and returning responses. They define the routes and endpoints of your application, mapping HTTP requests to specific methods that process the request and return the appropriate response.

Controllers are the routing mechanism in NestJS, allowing you to define how your application responds to different HTTP requests. They are typically decorated with the `@Controller()` decorator, which specifies the base route for the controller.

A controller receives an incoming request, processes it and decides which method should it trigger in order to process the request.

One controller file can process multiple routes, and each route can have its own method to handle the request. This allows you to group related routes together in a single controller.

```typescript
import { Controller } from '@nestjs/common'

@Controller('users')
export class UsersController {
  // Define your routes and methods here
}
```

We can also generate a controller using the NestJS CLI:

```bash
nest generate controller users
```

## Intro to Providers

Providers in NestJS are classes that encapsulate business logic and can be injected into controllers or other providers. They are the backbone of the application's functionality, allowing you to define services, repositories, and other components that can be reused across your application.

Think of providers as the services that handle the business logic of your application. They are responsible for processing data, interacting with databases, and performing other operations that are not directly related to handling HTTP requests.

You can also think of providers as additional classes in a module that help you add business logic to your module. They can be used to encapsulate complex logic, interact with external APIs, or perform data transformations.

While the job of the controller is handle routing logic, the job of the provider is to handle business logic. You should not be writing business logic in your controllers, as it can lead to tightly coupled code and make it harder to maintain and test your application.

Providers are typically decorated with the `@Injectable()` decorator, which allows them to be injected into other components, such as controllers or other providers.

```typescript
import { Injectable } from '@nestjs/common'

@Injectable()
export class UsersService {
  // Business logic for user management
}
```

You can also generate a provider using the NestJS CLI:

```bash
nest generate service users
```

## Validation and Pipes

### What are Pipes?

Pipes in NestJS are used to transform or validate incoming data before it reaches the route handler. They allow you to perform operations such as data validation, transformation, and sanitization on the request data.

Pipes are a powerful feature of NestJS that help you ensure that the data your application receives is in the expected format and meets certain criteria. They can be used to validate incoming data, transform it into a different format, or even throw exceptions if the data is invalid.

Pipes can be applied to individual route handlers or globally to all routes in your application. They are typically used to validate request parameters, query strings, and request bodies.

When we talk about an incoming request, it does not hit the controller directly. Instead, it goes through a layer of middleware and `Pipes` before reaching the controller. This allows you to perform operations on the request data before it is processed by the controller.

This also applies to the response. After the controller processes the request, the response goes through a layer of `Interceptors` and `Filters` before being sent back to the client. This allows you to modify the response data, handle errors, and perform other operations before the response is sent.

Request-Response lifecycle in NestJS:

```mermaid
flowchart LR
  A[Request]
  B[Middleware]
  C[Filters Start]
  D[Guards]
  E[Interceptors - Before]
  F[Pipes]
  G[Controller]
  H[Interceptors - After]
  I[Filters End]
  J[Response]

  A --> B --> C --> D --> E --> F --> G --> H --> I --> J
```

For errors or exceptions, as long as the error or exception occur within the `Filter` boundary, NestJS will handle it gracefully and return a proper error response to the client. This allows you to centralize error handling and ensure that your application responds consistently to errors.
You as a programmer don't have to worry about the error handling logic in your controllers or services, as it is handled by the `Filter` layer.

#### Why use Pipes?

Pipes are used in NestJS for several reasons:

- **Data Validation**: Ensure that incoming data meets specific criteria before processing it. This helps prevent invalid data from causing issues in your application.
  - Evaluates input data and if valid, passes it through unchanged; otherwise, it throws an exception.
  - Example: Validating that a user ID is a valid UUID or that a string is not empty.
- **Data Transformation**: Convert incoming data into a different format or structure that is easier to work with. This can include parsing strings into numbers, converting dates, or transforming objects.
  - Transforms input data to the desired form (e.g., converting a string to a number or parsing a date).
  - Example: Converting a string representation of a date into a JavaScript Date object.
- **Data Sanitization**: Remove any unwanted or potentially harmful data from the request. This can help prevent security vulnerabilities such as SQL injection or cross-site scripting (XSS) attacks.
  - Sanitizes input data to remove any unwanted characters or formats (e.g., trimming whitespace, removing HTML tags).
- **Reusability**: Pipes can be reused across different routes and controllers, promoting code reuse and reducing duplication.

#### Types of Pipes

Pipes in NestJS can be categorized into two main types:

- **Built-in Pipes**: NestJS provides several built-in pipes that can be used for common tasks such as validation, transformation, and sanitization. Some of the most commonly used built-in pipes include:
  - `ValidationPipe`: Validates incoming data against a set of rules defined using class-validator decorators.
  - `ParseIntPipe`: Converts a string to an integer.
  - `ParseBoolPipe`: Converts a string to a boolean.
  - `ParseUUIDPipe`: Validates and parses a UUID string.
  - `DefaultValuePipe`: Sets a default value for a parameter if it is not provided.
  - `TrimPipe`: Trims whitespace from strings.
- **Custom Pipes**: You can create your own custom pipes to handle specific validation or transformation logic that is not covered by the built-in pipes. Custom pipes can be created by implementing the `PipeTransform` interface and defining the `transform` method.

Example of a custom pipe:

```typescript
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common'
@Injectable()
export class CustomPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // Custom validation or transformation logic
    if (typeof value !== 'string') {
      throw new Error('Value must be a string')
    }
    return value.trim() // Example transformation: trim whitespace
  }
}
```

You can also create custom pipes using the NestJS CLI:

```bash
nest generate pipe custom
```

### Introduction to Data Transfer Objects (DTOs)

Data Transfer Objects (DTOs) are objects that define the structure of data that is sent over the network. They are used to validate and transform incoming data before it reaches the controller or service layer. DTOs help ensure that the data your application receives is in the expected format and meets certain criteria.

DTOs are typically used in conjunction with pipes to validate and transform incoming data. They allow you to define the expected structure of the data, including required fields, data types, and validation rules.

DTOs are often defined as classes with properties that correspond to the expected data structure. You can use decorators from libraries like `class-validator` to define validation rules for each property.

Example of a DTO:

```typescript
import { IsString, IsInt, IsOptional } from 'class-validator'

export class CreateUserDto {
  @IsString()
  name: string

  @IsInt()
  age: number

  @IsOptional()
  @IsString()
  email?: string
}
```

## Intro to Inversion of Control (IoC)

Inversion of Control (IoC) is a design principle that allows for the decoupling of components in an application. It enables developers to create flexible and maintainable code by allowing the framework to manage the flow of control and dependencies between components.

In NestJS, IoC is implemented through the use of dependency injection (DI). This means that instead of a component creating its own dependencies, the framework injects them into the component when it is instantiated. This allows for better separation of concerns, easier testing, and improved maintainability.

### What is a dependency?

A dependency is a component or module that a class or function relies on to perform its tasks. In the context of NestJS and IoC, dependencies are typically services or other classes that are injected into a component to provide specific functionality.

For example, we have a user class, post class, and a page class. Both the post and page classes depend on the user class to perform certain operations, such as fetching user data or validating user permissions.

```typescript
import { UserService } from './user.service'

@Injectable()
export class PostService {
  // This service depends on the UserService to fetch post authors
  constructor(private userService: UserService) {}

  async getPostAuthor(postId: string) {
    const post = await this.findPostById(postId)
    return this.userService.findById(post.authorId)
  }
}

@Injectable()
export class PageService {
  // This service also depends on the UserService to fetch page owners

  constructor(private userService: UserService) {}

  async getPageOwner(pageId: string) {
    const page = await this.findPageById(pageId)
    return this.userService.findById(page.ownerId)
  }
}
```

### What is Dependency Injection (DI)?

Dependency Injection (DI) is a design pattern that allows a class to receive its dependencies from an external source rather than creating them itself. This promotes loose coupling between components and makes it easier to manage dependencies, test components in isolation, and swap out implementations without affecting the rest of the application.

With dependency injection, the framework (in this case, NestJS) is responsible for creating and managing the lifecycle of dependencies. This means that you can focus on writing your business logic without worrying about how dependencies are created or managed.

In NestJS, you can inject dependencies into classes using the `@Injectable()` decorator and constructor injection. When a class is decorated with `@Injectable()`, it becomes a provider that can be injected into other components, such as controllers or services.

```typescript
import { Injectable } from '@nestjs/common'
@Injectable()
export class UserService {
  // This service can be injected into other components
  findById(userId: string) {
    // Logic to find a user by ID
  }
}
```

### Advantages of Dependency Injection

Dependency Injection offers several advantages that contribute to better software design and development practices:

- **Decoupling**: Components are less dependent on specific implementations, allowing for easier changes and maintenance.
- **Testability**: Dependencies can be easily mocked or replaced in unit tests, making it easier to test components in isolation.
- **Reusability**: Components can be reused across different parts of the application without being tightly coupled to specific implementations.
- **Flexibility**: You can easily swap out implementations of dependencies without affecting the rest of the application.
- **Configuration**: Dependencies can be configured and managed centrally, allowing for better control over the application's behavior.

### How module encapsulates everything

In NestJS, modules encapsulate related components, such as controllers, services, and providers, into cohesive units of functionality. This modular architecture promotes separation of concerns and allows for better organization of code.

Each module can export its components, making them available for use in other modules. This encourages a clear structure and helps manage dependencies more effectively. By grouping related functionality together, modules also make it easier to understand the overall architecture of the application.

### Types of Dependencies

In NestJS, dependencies can be categorized into several types based on their scope and usage:

- **Singleton Dependencies**: These are created once and shared across the entire application. They are typically used for services that do not maintain state or require a single instance.
- **Request-scoped Dependencies**: These are created for each incoming request and are typically used for services that need to maintain state or context specific to a request.
- **Transient Dependencies**: These are created each time they are requested and are typically used for services that require a fresh instance for each use.
- **Global Dependencies**: These are available throughout the entire application and can be injected into any component. They are typically used for services that provide shared functionality across multiple modules.

- **Intra-Module Dependencies**: These are dependencies that are specific to a module and are not shared with other modules. They are typically used for services that provide functionality only within the context of a specific module.
- **Inter-Module Dependencies**: These are dependencies that are shared between multiple modules. They are typically used for services that provide functionality that is needed across different parts of the application.
- **Cross-Module Dependencies**: These are dependencies that span multiple modules and may require coordination between them. They are typically used for services that need to interact with components from different modules.

## Documenting Code

Documentation is an essential part of software development that helps developers understand how to use and maintain code. In NestJS, you can document your code using comments, JSDoc annotations, and tools like Swagger for API documentation.

### Types of Documentation

- **API Documentation**: This type of documentation describes the endpoints, request/response formats, and usage of the API. It is typically generated automatically from the code using tools like Swagger.
  - Useful for clients and developers who need to understand how to interact with the API.
  - For API documentation, NestJS uses OpenAPI, previously known as Swagger, to generate interactive API documentation.
  - The documentation is hosted at a specific endpoint (e.g., `/api-docs`) and provides details about the available endpoints, request parameters, response formats, and example requests/responses.
- **Code Documentation**: This type of documentation provides explanations and comments within the code itself. It helps developers understand the purpose and functionality of specific classes, methods, and properties.
  - Useful for developers who need to maintain or extend the codebase.
  - For code documentation, NestJS uses Compodoc, which is a documentation generator for TypeScript projects.
  - Compodoc uses JSDoc annotations to generate documentation for classes, methods, properties, and modules.

### OpenAPI vs. Swagger

OpenAPI and Swagger are often used interchangeably, but they refer to different aspects of API documentation:

- **OpenAPI**: This is a specification for building APIs that describes the structure of the API, including endpoints, request/response formats, and authentication methods. It is a standard format for API documentation.
- **Swagger**: This is a set of tools and libraries that implement the OpenAPI specification. It includes a user interface for exploring and testing APIs, as well as tools for generating client libraries and server stubs.

## Understanding Repository Pattern

The Repository Pattern is a design pattern that provides a way to manage data access and encapsulate the logic for retrieving and storing data. It acts as an intermediary between the application and the data source, allowing you to abstract away the details of data access and focus on the business logic.

In NestJS, the Repository Pattern is commonly used with TypeORM to manage database interactions. By defining repositories for your entities, you can centralize data access logic and promote code reusability.

## Entities and Understanding the Structure

Entities in NestJS represent the data model of your application. They define the structure of the data and how it is stored in the database. Entities are typically decorated with TypeORM decorators to specify their properties, relationships, and constraints.

An entity is a class that represents a table in the database. Each instance of the entity corresponds to a row in the table, and each property of the entity corresponds to a column in the table.

When we talk about a user entity, we are referring to the user table in the database. It is nothing but a file that defines the structure of the user table, including its properties and relationships with other entities.

**Remember: An entity is a class that represents a table in the database.**

Once you define an entity, you are able to inject a repository for that entity into your services or controllers. The repository provides methods for performing CRUD (Create, Read, Update, Delete) operations on the entity.

You do not create the repository manually. Instead, TypeORM automatically creates a repository for each entity when you import the entity into your module. You can then inject the repository into your services or controllers using dependency injection.

### Example of a User Entity

```typescript
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  email: string

  @Column()
  password: string

  @Column({ default: true })
  isActive: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
```

This example defines a `User` entity with properties such as `id`, `username`, `email`, `password`, `isActive`, `createdAt`, and `updatedAt`. Each property is decorated with TypeORM decorators to specify its type and constraints.

### Example of a UsersService

```typescript
Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find()
  }
}
```

## Relational Databases

### Relationships in Relational Databases

Relational databases use relationships to connect different entities (tables) based on their associations. These relationships allow you to model complex data structures and enforce data integrity.

There are three main types of relationships in relational databases:

- **One-to-One**: Each record in one table is associated with exactly one record in another table. For example, a user can have one profile.
- **One-to-Many**: A record in one table can be associated with multiple records in another table. For example, a user can have multiple posts.
- **Many-to-Many**: Records in one table can be associated with multiple records in another table, and vice versa. For example, a user can have multiple roles, and a role can be assigned to multiple users.

### Why Use Relational Databases?

Relational databases are widely used for several reasons:

- **Avoid Data Duplication**: By using relationships, you can avoid duplicating data across multiple tables, which helps maintain data integrity and reduces storage requirements.
- **Accurate Data**: Relational databases enforce data integrity through constraints and relationships, ensuring that the data remains accurate and consistent.
- **Flexibility**: Relational databases allow you to model complex data structures and relationships, making it easier to represent real-world scenarios.

## Environments

### Intro to Environments

Environments in software development refer to the different configurations and settings that an application can run in. They allow developers to define specific behaviors, features, and configurations based on the environment in which the application is deployed.

In NestJS, environments are typically defined using environment variables, which can be set in a `.env` file or through the system's environment variables. These variables can be used to configure various aspects of the application, such as database connections, API keys, and feature flags.

The whole point of environments is to allow you to have different set of environments for different stages of development, such as development, testing, staging, and production. Each environment can have its own configuration, allowing you to test and deploy your application in a controlled manner.

## Exception Handling

### Intro to Exception Handling

Exception handling is a crucial aspect of software development that allows developers to gracefully handle errors and unexpected situations in their applications. In NestJS, exception handling is built into the framework, providing a consistent way to manage errors and return appropriate responses to clients.

When an error occurs in your application, it can disrupt the normal flow of execution and lead to unexpected behavior. Exception handling allows you to catch these errors, log them, and return meaningful error messages to the client without crashing the application.

We have previously discussed how there is a layer of `Filter` boundary that surrounds `Guards`, `Interceptors`, `Pipes`, and `Controllers`. This layer is responsible for handling exceptions and errors that occur during the request-response lifecycle.

When an exception occurs, NestJS automatically catches it and passes it to the appropriate exception filter. The exception filter can then handle the exception, log it, and return a proper error response to the client.

If any exception occurs within the `Filter` boundary, NestJS will automatically handle the exception and return a proper error response to the client. This allows you to centralize error handling and ensure that your application responds consistently to errors.

### Built-in HTTP Exceptions

NestJS provides several built-in HTTP exceptions that you can use to handle common error scenarios. These exceptions are subclasses of the `HttpException` class and can be thrown in your controllers or services to indicate specific error conditions.

Some of the most commonly used built-in HTTP exceptions include:

- `BadRequestException`: Indicates that the request is invalid or malformed.
- `UnauthorizedException`: Indicates that the request requires authentication or the provided credentials are invalid.
- `NotFoundException`: Indicates that the requested resource could not be found.
- `ForbiddenException`: Indicates that the client does not have permission to access the requested resource.
- `RequestTimeoutException`: Indicates that the request timed out.
- `ConflictException`: Indicates that the request could not be completed due to a conflict with the current state of the resource.
- `GoneException`: Indicates that the requested resource is no longer available.
- `ImATeapotException`: Indicates that the server is a teapot and cannot brew coffee (a humorous exception).
- and many more...

You can throw these exceptions in your controllers or services to indicate specific error conditions. When an exception is thrown, NestJS automatically catches it and returns the appropriate HTTP response to the client.

### Handle Exceptions in Services

In NestJS, you can handle exceptions in services by using the `try-catch` block. This allows you to catch specific exceptions and handle them gracefully, returning appropriate responses or logging the errors.

```typescript
import { Injectable } from '@nestjs/common'
import { BadRequestException } from '@nestjs/common'

@Injectable()
export class AppService {
  async findUser(id: string) {
    try {
      // Simulate a user lookup
      const user = await this.userRepository.findOne(id)
      if (!user) {
        throw new NotFoundException('User not found')
      }
      return user
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new BadRequestException('Invalid user ID')
    }
  }
}
```

In this example, we are using a `try-catch` block to handle exceptions that may occur during the user lookup. If the user is not found, we throw a `NotFoundException`, which will be caught by NestJS and returned as an HTTP response. If any other error occurs, we throw a `BadRequestException` to indicate that the request was invalid.

### Identifying Points of Failure

Identifying points of failure in your application is crucial for effective exception handling. By understanding where errors are likely to occur, you can implement appropriate error handling strategies and ensure that your application remains robust and resilient.

Some common points of failure in a NestJS application include:

- **Database Operations**: Errors can occur when interacting with the database, such as connection issues, query errors, or data validation failures.
- **External API Calls**: When making requests to external APIs, you may encounter network errors, timeouts, or unexpected responses.
- **User Input Validation**: Invalid user input can lead to errors when processing requests, such as missing required fields or incorrect data formats.
- **Business Logic Errors**: Errors can occur in the application logic, such as invalid state transitions, incorrect calculations, or unexpected conditions.
- **File Operations**: Errors can occur when reading or writing files, such as file not found, permission denied, or disk space issues.
- **Configuration Errors**: Issues with configuration files or environment variables can lead to errors when starting the application or during runtime.
- **Third-party Library Errors**: Errors can occur when using third-party libraries or dependencies, such as version incompatibilities or unexpected behavior.

#### Querying a Database

When querying a database, you may encounter various errors, such as connection issues, query syntax errors, or data validation failures. It is important to handle these errors gracefully and return appropriate responses to the client.

Interacting with a database like creating, deleting, querying, or updating data can be a point of failure in your application. It's always a good practice to handle exceptions that may occur during database operations and return appropriate error responses to the client.

#### Model Constraints in a Database

Model constraints in a database refer to the rules and restrictions that are applied to the data stored in the database. These constraints help ensure data integrity and consistency by enforcing specific conditions on the data.

Some common types of model constraints include:

- **Primary Key**: A unique identifier for each record in a table. It ensures that no two records can have the same primary key value.
- **Foreign Key**: A reference to a primary key in another table. It establishes a relationship between two tables and ensures that the referenced record exists.
- **Unique Constraint**: Ensures that a specific column or combination of columns has unique values across all records in the table.
- **Not Null Constraint**: Ensures that a specific column cannot have a null value. It enforces that every record must have a value for that column.
- **Check Constraint**: Enforces a specific condition on the values in a column. It allows you to define custom validation rules for the data.

#### Interacting with External APIs

When interacting with external APIs, you may encounter various errors, such as network issues, timeouts, or unexpected responses. It is important to handle these errors gracefully and return appropriate responses to the client.

When making requests to external APIs, you should always handle exceptions that may occur during the request. This includes network errors, timeouts, and unexpected responses from the API.
