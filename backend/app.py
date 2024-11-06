import os
import sys
from dotenv import load_dotenv
from typing import List
from flask import Flask, send_from_directory
from flask_cors import CORS
from api import api  # Import the blueprint

# Flask app setup
app: Flask = Flask(__name__, static_folder="static")
app.register_blueprint(api, url_prefix='/api')

# Environment variable to determine the mode
load_dotenv()
APP_ENV = os.getenv('APP_ENV', 'production')

# Development-only imports and settings
if APP_ENV == 'development':
    import watchdog_handler
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    app.add_url_rule('/shutdown', view_func=watchdog_handler.shutdown)

@app.route('/favicon.ico')
def favicon() -> object:
    """
    Route to serve the favicon.

    Returns:
        The favicon.ico file from the specified directory.
    """
    return send_from_directory(
        os.path.join(app.root_path, 'plots/icons'),
        'cats.ico', mimetype='image/vnd.microsoft.icon'
    )

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path: str) -> object:
    """
    Catch-all route to serve the React frontend.
    If the requested path is an existing static file, it serves that file.
    Otherwise, it serves the React app's index.html to enable client-side routing.

    Args:
        path (str): The requested path.

    Returns:
        The requested file if it exists, or index.html if not.
    """
    if path.startswith("api"):
        return "API route not found", 404

    # print(f"Catch-all route hit for path: {path}")
    full_path: str = os.path.join(app.static_folder, path)
    if os.path.exists(full_path) and not os.path.isdir(full_path):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, "index.html")

if __name__ == '__main__':
    """
    Main entry point for the Flask application.
    Sets up directory monitoring in a separate thread (in development) and starts the Flask app.
    """
    app_args=dict(debug=False)
    # Start watching directories in a separate thread (development only)
    if APP_ENV == 'development':
        extra_directories: List[str] = ['plots', 'data']  # This can stay in app.py as it is relevant to app behavior
        watchdog_handler.start_watch_thread(extra_directories)
        port=int(os.getenv('APP_PORT', 5001))
        app_args.update(dict(host="0.0.0.0",port=port,debug=True))
        
    # Start Flask app
    app.run(**app_args)

