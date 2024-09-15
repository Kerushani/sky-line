# SkyLine

This project is a full-stack, type-safe application for airlines. 

Still in progress

https://github.com/user-attachments/assets/9bd4fc36-f2e1-4915-a91c-3b49b31db9d6

### Authentication and Authorization
Users can register with secure password hashing. JWT tokens are issued for secure, stateless authorization.

### Dockerized Environment
The application is dockerized.
Also, utilized PostgreSQL Docker image.

## Technology Stack

- **Typescript** - For adding static typing to JavaScript, improving code quality and maintainability with type safety.
- **Next.js**
- **ReactJS**
- **Tailwind CSS** - For utility-first CSS styling, enabling rapid and responsive design with minimal custom CSS.
- **Express.js** 
- **Prisma ORM** - For type-safe database interactions with PostgreSQL.
- **PostgreSQL**
- **Docker** - For containerizing the application, ensuring consistency across different environments and simplifying deployment.

## Get Started

To set up and run the project locally, follow these steps:

### 1. Clone the Repository

First, clone the repository to your local machine.

### 2. Set Up Docker

To set up and run the Docker containers using Docker Compose, follow these steps:

1. **Ensure Docker and Docker Compose are installed** on your machine. If not, you can download and install them from [Docker's official site](https://docs.docker.com/get-docker/).

2. **Run Docker Compose** to build and start the containers. Open your terminal, navigate to the root of your project directory, and run:

    ```bash
    docker-compose up --build
    ```

   This command will build the Docker images and start the containers as defined in the `docker-compose.yml` file.

3. **Verify Everything is Running**:

    - The frontend should be accessible at [http://localhost:3000](http://localhost:3000).
    - The backend should be accessible at [http://localhost:4000](http://localhost:4000).
    - The PostgreSQL database should be accessible at `localhost:5432`.

If you need to stop the containers, use:

```bash
docker-compose down



