# Stage 1: Build the React frontend
FROM node:16 AS frontend
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend .
RUN npm run build

# Stage 2: Set up the Flask backend with Conda
FROM continuumio/miniconda3 AS backend
WORKDIR /backend

# Copy environment.yml and install dependencies
COPY backend/environment.yml .
RUN conda env create -f environment.yml

# Activate the environment
ENV PATH=/opt/conda/envs/fluid/bin:$PATH
SHELL ["conda", "run", "-n", "fluid", "/bin/bash", "-c"]

# Copy backend code and React build
COPY backend .
COPY --from=frontend /frontend/build /backend/static

# Run the Flask app
CMD ["python", "app.py"]
