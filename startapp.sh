#!/bin/bash

# Ensure that an argument is provided
if [ -z "$1" ]; then
    echo "Usage: ./startapp.sh [backend|frontend]"
    exit 1
fi

# Initialize Conda so conda activate works correctly
if command -v conda >/dev/null 2>&1; then
    eval "$(conda shell.bash hook)"
else
    echo "Conda is not installed or not available in the PATH."
    exit 1
fi

# Decide which part to start
if [ "$1" = "backend" ]; then
    # Step 1: Start backend
    echo "Starting backend..."
    cd backend || exit
    conda activate fluid
    python app.py
elif [ "$1" = "frontend" ]; then
    # Step 2: Start frontend
    echo "Starting frontend..."
    cd frontend || exit
    npm start
else
    # Invalid argument
    echo "Invalid argument. Use 'backend' or 'frontend'."
    exit 1
fi
