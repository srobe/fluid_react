#!/bin/bash devcontainer-setup.sh

# Create .env in backend if it doesn't exist
if [ ! -f backend/.env ]; then
  echo -e "APP_ENV=development\nAPP_PORT=5001" > backend/.env
fi

# 2. Create the Conda environment if not already created
if conda env list | grep -q "fluid"; then
    echo "Conda environment 'fluid' already exists."
else
    echo "Creating Conda environment 'fluid' from backend/environment.yml..."
    conda env create -f backend/environment.yml
fi

# Create .env in frontend if it doesn't exist
if [ ! -f frontend/.env ]; then
  echo "REACT_APP_API_URL=http://localhost:5001" > frontend/.env
fi

# Install npm packages in frontend if not already installed
if [ ! -d frontend/node_modules ]; then
  npm install --prefix frontend
fi