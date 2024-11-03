#!/bin/bash

# Ensure that an argument is provided
if [ -z "$1" ]; then
    echo "Usage: ./startapp.sh [backend|frontend]"
    exit 1
fi

if [ "$1" == "backend" ]; then
    # Step 1: Start backend
    cd backend || exit
    conda activate fluid
    python app.py
elif [ "$1" == "frontend" ]; then
    # Step 2: Start frontend
    cd frontend || exit
    npm start
else
    # Invalid argument
    echo "Invalid argument. Use 'backend' or 'frontend'."
    exit 1
fi