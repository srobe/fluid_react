from flask import Flask, jsonify, send_from_directory
import json
import os

app = Flask(__name__, static_folder="static")

@app.route('/data')
def get_data():
    with open('data2.json') as f:
        data = json.load(f)
    return jsonify(data)

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):
    print(f"Requested path: {path}") 
    full_path = os.path.join(app.static_folder, path)
    if os.path.exists(full_path) and not os.path.isdir(full_path):
        return send_from_directory(app.static_folder, path)
    # Serve index.html for all other routes to enable client-side routing
    return send_from_directory(app.static_folder, "index.html")


if __name__ == '__main__':
    app.run(
        host="0.0.0.0", 
        debug=True)
