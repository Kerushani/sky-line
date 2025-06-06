# SkyLine

This project is a full-stack application for airlines. 

https://github.com/user-attachments/assets/9bd4fc36-f2e1-4915-a91c-3b49b31db9d6

## Technology Stack

- Typescript 
- Next.js
  ReactJS
- Tailwind CSS
- Express.js 
- Prisma ORM 
- PostgreSQL
- Docker

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



