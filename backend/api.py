from flask import Blueprint, jsonify, request, send_from_directory
import os
import json

EXTERNAL_PLOTS_DIR = f'{os.getcwd()}/plots'

# Create a Blueprint instance
api = Blueprint('api', __name__)

@api.route('/data', methods=['POST'])
def get_data():
    try:
        print("Data endpoint hit.")
        data = request.json
        fn = data.get('name', 'data/data5.json')
        print(f"Filename requested: {fn}")
        
        # file_path = os.path.join("data", fn)
        if not os.path.exists(fn):
            raise FileNotFoundError(f"File {fn} not found.")

        with open(fn) as f:
            data = json.load(f)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/generate-graph', methods=['POST'])
def generate_graph():
    try:
        data = request.json
        image = get_filename(data)
        print(f"Generated image filename: {image}")
        return jsonify({"imagePath": f"/api/external-plot/{image}"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/external-plot/<path:filename>')
def serve_external_plot(filename):
    return send_from_directory(EXTERNAL_PLOTS_DIR, filename)

def get_filename(request):
    tau = request.get('leadHours1', '00')
    field = request.get('fields1', 'precip')
    level = request.get('levels', '0')
    stream = request.get('stream', 'g5fpfc')
    time = request.get('initialTimes1', '20241028T000000')
    region = request.get('regions', 'nam')
    
    filename = f'{stream}_{field}_{level}_{time}_{region}_{tau}.png'
    return filename