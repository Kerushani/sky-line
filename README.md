# SkyLine

This project is a full-stack, type-safe application designed specifically for airlines. 

Still in progress

![demo_video](https://github.com/user-attachments/assets/48903b09-e263-4978-9f65-5b986a042f72)

### Authentication and Authorization
Users can register with secure password hashing. JWT tokens are issued for stateless, secure authentication.

### Dockerized Environment
Frontend and backend are dockerized.
Utilized PostgreSQL Docker image.

## Technology Stack

- **Next.js** - For providing server-side rendering, static site generation, and handling routes + backend logic.
- **ReactJS** - For creating a dynamic and interactive user interface with a component-based architecture.
- **Tailwind CSS** - For utility-first CSS styling, enabling rapid and responsive design with minimal custom CSS.
- **Typescript** - For adding static typing to JavaScript, improving code quality and maintainability with type safety.
- **Express.js** - For building a backend server.
- **Prisma ORM** - For seamless and type-safe database interactions with PostgreSQL.
- **PostgreSQL** - For storing and querying structured data.
- **Docker** - For containerizing the application, ensuring consistency across different environments and simplifying deployment.

## Get Started

To set up and run the project locally, follow these steps:

### 1. Clone the Repository

First, clone the repository to your local machine.

### 2. Set Up the PostgreSQL Database

The PostgreSQL database is dockerized for ease of setup. To build and run the Docker container:

1. Navigate to the Docker Directory:

    ```
    cd docker
    ```

2. Build the Docker Image:

    ```
    docker build -t my-postgres-db .
    ```

3. Run the Docker Container:

    ```
    docker run -d -p 5432:5432 --name my-postgres-container my-postgres-db
    ```

   This will start the PostgreSQL database, accessible at `localhost:5432`. Make sure your Docker setup is configured with the necessary environment variables and configurations.

### 3. Set Up the Frontend

1. Navigate to the Frontend Directory:

    ```
    cd frontend
    ```

2. Install Dependencies:

    ```
    npm install
    ```

3. Run the Development Server:

    ```
    npm run dev
    ```

   The frontend will be hosted at [http://localhost:3000](http://localhost:3000).

### 4. Set Up the Backend

1. Navigate to the Backend Directory:

    ```
    cd ../backend
    ```

2. Install Dependencies:

    ```
    npm install
    ```

3. Start the Server:

    ```
    npm run start
    ```

   The backend will be available at [http://localhost:4000](http://localhost:4000).

### 5. Verify Everything is Running

- Ensure the frontend is accessible at [http://localhost:3000](http://localhost:3000).
- Ensure the backend is accessible at [http://localhost:4000](http://localhost:4000).
- Verify the PostgreSQL database is running by connecting to `localhost:5432`.




