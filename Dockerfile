# Stage 1: Build the React frontend
FROM node:16 AS frontend
WORKDIR /frontend
COPY frontend/package*.json ./
# RUN npm install
RUN [ ! -d "node_modules" ] && npm install || echo "Using existing node_modules"
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

# # Clean previous conflicting files
RUN rm -rf /backend/static
# Copy the React build files explicitly to match the frontend-only structure
COPY --from=frontend /frontend/build/static /backend/static
COPY --from=frontend /frontend/build/assets /backend/static/assets
COPY --from=frontend /frontend/build/manifest.json /backend/static/manifest.json
COPY --from=frontend /frontend/build/*.html /backend/static
RUN rm -rf /backend/static/js && mkdir -p /backend/static/js
COPY --from=frontend /frontend/build/static/js /backend/static/js

# Expose Flask port
EXPOSE 5000

# Run Flask
CMD ["conda", "run", "-n", "fluid", "python", "app.py"]


