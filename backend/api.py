# backend/api.py

from flask import Blueprint, jsonify, request, send_from_directory, Response
import os
import json
from typing import Optional
from pathlib import Path
import urllib.parse

import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
from flask_cors import cross_origin

# Define the root directory and external plots directory
script_dir = os.path.dirname(os.path.abspath(__file__))
rootdir = os.path.dirname(script_dir)
EXTERNAL_PLOTS_DIR = os.path.join(rootdir, 'plots')
DATA_DIR = os.path.join(script_dir, 'data')

# Create the external plots directory if it doesn't exist
os.makedirs(EXTERNAL_PLOTS_DIR, mode=0o755, exist_ok=True)

# Create a Blueprint instance
api = Blueprint('api', __name__)

@api.route('/data', methods=['POST'])
def get_data() -> Response:
    """
    Endpoint to retrieve JSON data from a specified file.

    Expects JSON payload with a 'name' key specifying the file name.

    Returns:
        Flask Response containing the data from the file in JSON format.

    Raises:
        400 Bad Request if an invalid file path is provided.
        404 Not Found if the file does not exist.
        500 Internal Server Error if an unexpected exception occurs.
    """
    try:
        print("Data endpoint hit.")
        data = request.get_json()
        fn = data.get('name', 'data5.json')
        print(f"Filename requested: {fn}")

        # Construct the full path and resolve it
        file_path = (Path(DATA_DIR) / fn).resolve()

        # Ensure the file is within DATA_DIR to prevent path traversal
        if not str(file_path).startswith(str(Path(DATA_DIR).resolve())):
            return jsonify({"error": "Invalid file path."}), 400

        if not file_path.exists():
            return jsonify({"error": f"File {fn} not found."}), 404

        with open(file_path, 'r') as f:
            file_data = json.load(f)
        return jsonify(file_data)
    except json.JSONDecodeError:
        return jsonify({"error": "Invalid JSON format in file."}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/generate-graph', methods=['POST'])
@cross_origin()
def generate_graph() -> Response:
    """
    Endpoint to generate a graph by fetching an image from a dynamically constructed URL.

    Expects JSON payload with the following keys:
        - 'instance': The instance name.
        - 'url_theme': The URL theme.
        - 'stream': The stream parameter.
        - 'selected': A dictionary of selected values.
            - Expected keys in 'selected': 'fields', 'levels', 'initialTimes', 'regions', 'leadHours', 'tracks'

    Returns:
        Flask Response containing a JSON with an 'imagePath' key.

    Raises:
        400 Bad Request if required parameters are not provided.
        404 Not Found if no image is found.
        500 Internal Server Error if an unexpected exception occurs.
    """
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400

        # Extract required parameters
        instance = data.get('instance')
        url_theme = data.get('url_theme')
        stream = data.get('stream')
        selected = data.get('selected')

        # Validate required parameters
        if not all([instance, url_theme, stream, selected]):
            return jsonify({"error": "Missing required parameters"}), 400

        # Generate the URL dynamically
        url = generate_url(data)

        # Use the generated URL to save the image
        image_name = save_img(url)
        if image_name is None:
            return jsonify({"error": "No image found"}), 404

        print(f"Generated image filename: {image_name}")
        return jsonify({"imagePath": f"/api/external-plot/{image_name}"})
    except Exception as e:
        print(f"Error in generate_graph: {e}")
        return jsonify({"error": str(e)}), 500
    
@api.route('/external-plot/<path:filename>')
def serve_external_plot(filename: str) -> Response:
    """
    Endpoint to serve external plot images.

    Args:
        filename: The name of the image file to serve.

    Returns:
        Flask Response containing the image file.

    Raises:
        404 Not Found if the file does not exist.
    """
    try:
        return send_from_directory(EXTERNAL_PLOTS_DIR, filename)
    except FileNotFoundError:
        return jsonify({"error": "File not found."}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def generate_url(data: dict) -> str:
    """
    Generates a URL based on the provided data dictionary.

    Args:
        data: A dictionary containing 'instance', 'url_theme', 'stream', and 'selected' keys.

    Returns:
        A string representing the generated URL.
    """
    instance = data.get('instance')
    url_theme = data.get('url_theme')
    stream = data.get('stream')
    selected = data.get('selected')

    # Ensure 'selected' contains all necessary keys
    # required_keys = ['fields', 'levels', 'initialTimes', 'regions', 'leadHours', 'tracks']
    required_keys = [] #Leaving this to include keys later
    if not all(key in selected for key in required_keys):
        raise ValueError("Missing keys in 'selected' parameter")

    base_url = f"https://fluid.nccs.nasa.gov/{instance}/{url_theme}/"

    # Prepare query parameters
    params = {
        'stream': stream,
    'field': selected.get('fields', ''),
    'level': selected.get('levels', ''),
    'fcst': selected.get('initialTimes', ''),
    'region': selected.get('regions', ''),
    'tau': selected.get('leadHours', ''),
    'track': selected.get('tracks', '')
    }

    # Remove None or empty values from params
    params = {k: v for k, v in params.items() if v}
    
    # Encode the query parameters to handle special characters
    query_string = urllib.parse.urlencode(params)

    # Construct the full URL
    url = f"{base_url}?{query_string}"

    print(f"Generated URL: {url}")  # For debugging purposes
    return url

def save_img(url: str) -> Optional[str]:
    """
    Saves the first image found on the given webpage URL that contains 'plots' in its URL.

    Args:
        url: The URL of the webpage to scrape for images.

    Returns:
        The name of the saved image file if successful, None otherwise.
    """
    try:
        response = requests.get(url)
        response.raise_for_status()
        html_content = response.text

        soup = BeautifulSoup(html_content, 'html.parser')
        img_tags = soup.find_all('img')

        if img_tags:
            for img in img_tags:
                img_src = img.get('src')
                if not img_src:
                    continue
                img_url = urljoin(url, img_src)

                if 'plots' not in img_url:
                    continue

                try:
                    img_response = requests.get(img_url)
                    img_response.raise_for_status()

                    img_name = os.path.basename(urllib.parse.urlparse(img_url).path)
                    img_filename = os.path.join(EXTERNAL_PLOTS_DIR, img_name)

                    with open(img_filename, 'wb') as f:
                        f.write(img_response.content)
                    print(f'Image saved as {img_filename}')
                    return img_name  # Return the image name here

                except requests.exceptions.RequestException as e:
                    print(f'Failed to download image from {img_url}: {e}')
                    continue
        else:
            print('No images found on the page.')
        return None  # Explicitly return None if no image was saved
    except requests.exceptions.RequestException as e:
        print(f'Failed to retrieve webpage: {e}')
        return None