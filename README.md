![Fluid from Figma (1)](https://github.com/user-attachments/assets/4e422bc0-510b-4de4-98ae-317e6ff34979)

# FLUID2.0 Project

Welcome to the FLUID2.0 project repository. This project is developed under NASA Goddard's GEOS tool called FLUID.

## Table of Contents

- [FLUID2.0 Project](#fluid20-project)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
    - [Requirements](#requirements)
  - [Setup Instructions](#setup-instructions)
    - [1. Clone the Repository](#1-clone-the-repository)
    - [2. Setting Up the Environment](#2-setting-up-the-environment)
    - [3. Starting Up the Backend (Flask)](#3-starting-up-the-backend-flask)
    - [4. Starting Up the Frontend (React)](#4-starting-up-the-frontend-react)
    - [5. Using Docker (Optional)](#5-using-docker-optional)
  - [Deployment](#deployment)
  - [Directory Structure](#directory-structure)
  - [Contributing](#contributing)
  
## Introduction

[FLUID](https://fluid.nccs.nasa.gov/weather/) (Framework for Live User-Invoked Data) is a tool designed to enhance the user experience of NASA Goddard's GEOS system. This project aims to provide an intuitive and user-friendly interface for managing and visualizing geophysical data.

This project is a major remodel of the frontend design to improve usability and efficiency. This updated web-based visualization tool is built using a React frontend and a Flask backend.

## Features

- User-friendly interface for data visualization
- Interactive dashboards and charts
- Seamless integration with GEOS system
- Real-time data updates and notifications

### Requirements

- **conda**: Conda is an open-source package and environment management system that helps you manage dependencies and environments for Python applications easily. It ensures all necessary libraries are installed in isolated environments.

  For more information about installing Conda, you can visit [Miniforge Installation Instructions](https://github.com/conda-forge/miniforge?tab=readme-ov-file#miniforge).
- **Flask**: A Python-based library used to serve the backend application.
- **React**: For building the interactive user interface.

Production only:
- **Docker**: Used for containerizing both backend and frontend, ensuring consistency across different environments.
   For more information about installing Docker, you can visit [Docker Get Started](https://www.docker.com/get-started/)

## Setup Instructions

### 1. Clone the Repository

In the location you'd like to place this app run:
```
mkdir fluid_react
cd fluid_react
git clone https://github.com/srobe/fluid_react.git
```

### 2. Setting Up the Environment 

The environment can be initialized by running:
```
./dev_init.sh
```
This will create the proper `.env` files in the frontend and backend directories and create the conda environment for the backend.

To ensure the proper configuration for both frontend and backend during development:

- **Backend `.env` File**:
  In the `backend` directory, a `.env` file with the following content is needed to enable development mode:
  ```
  APP_ENV=development
  APP_PORT=5001
  ```

- **Frontend `.env` File**:
  In the `frontend` directory, a `.env` file is needed to point to the backend API:
  ```
  REACT_APP_API_URL=http://localhost:5001
  ```
These files will be created with the `./dev_init.sh` command. By default, the port is set to 5001. This can be updated as long as the number matches in both `.env` files.

### 3. Starting Up the Backend (Flask)

- From the root directory, run:
  ```
  source startapp.sh backend
  ```
  This script will change directory to the backend, initiate the conda environment, and start the backend

### 4. Starting Up the Frontend (React)

- Open a new terminal 
- From the root directory, run:
  ```
  source startapp.sh frontend
  ```
  This script will change directory to the frontend and run `npm start`

  The frontend is configured with a proxy to communicate with the backend at `http://localhost:5001`.

### 5. Using Docker (Optional)

- Build the Docker images for both frontend and backend:
  ```
  docker-compose build
  ```
- Start the services:
  ```
  docker-compose up
  ```
  - The backend runs on port `5001`.
  - The combined app is accessible at `http://localhost:5002`.

## Deployment

- **Frontend with Sample JSON**: The frontend can run independently from the backend using the sample JSON files located in `frontend/public/data`. Follow [Step 4](#4-starting-up-the-frontend-react) to initiate the frontend.
  
- **Frontend with Backend**: For live updates, first follow [Step 3](#3-starting-up-the-backend-flask) (Startting up the Backend), then open a new terminal window and follow [Step 4](#4-starting-up-the-frontend-react) (Starting up the Frontend). Updates should occur when a file is changed. The current browser page may need to be reloaded for the change to be reflected. 
  
- **When to Use Docker**: Docker is a container that builds an independent environment based on `frontend/package.json` and `backend/environment.yml`. Before pushing changes to the main branch, make sure the app runs as expected in Docker. Follow [Step 5](#5-using-docker-optional) to run the combined app in Docker. 
 
## Directory Structure

```
.
├── backend
│   ├── app.py             # Flask application entry point
│   ├── data/              # JSON data files used for visualization
│   ├── plots/             # Generated plots stored here
│   ├── static/            # Static assets for the backend
│   └── environment.yml    # Conda environment configuration
├── frontend
│   ├── public/            # Public assets including linked plots
│   ├── src/               # Source files for React components
│   └── ...
├── docker-compose.yml     # Docker configuration for deployment
├── Dockerfile             # Combined Dockerfile
├── Dockerfile.backend     # Specific Dockerfile for backend service
├── Dockerfile.frontend    # Specific Dockerfile for frontend service
└── README.md              # Project documentation
```

## Contributing

We welcome contributions from the community. To contribute to the FLUID project, follow these steps:

1. **Fork the repository:**
   Click the "Fork" button at the top right corner of the repository page.

2. **Clone your forked repository:**
   ```bash
   git clone https://github.com/your-username/fluid_react.git
   ```

3. **Create a new branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes and commit them:**
   ```bash
   git add .
   git commit -m "Add your commit message"
   ```

5. **Push to your forked repository:**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a pull request:**
   Go to the original repository and create a pull request from your forked repository

Feel free to suggest new features or report bugs via GitHub Issues.

