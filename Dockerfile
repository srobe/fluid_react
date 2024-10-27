# Stage 1: Build the React frontend
FROM node:16 AS frontend
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend .
RUN npm run build

# Stage 2: Set up Flask backend with Conda
FROM continuumio/miniconda3 AS backend
WORKDIR /backend

# Copy environment.yml and install dependencies with Conda
COPY backend/environment.yml .
RUN conda env create -f environment.yml

# Set the environment path
ENV PATH /opt/conda/envs/fluid/bin:$PATH
SHELL ["conda", "run", "-n", "fluid", "/bin/bash", "-c"]

# Copy backend code
COPY backend .

# Copy the React build to the backend’s static files directory
COPY --from=frontend /frontend/build /backend/static

# Expose Flask port
EXPOSE 5000

# Run Flask
CMD ["conda", "run", "-n", "fluid", "python", "app.py"]

