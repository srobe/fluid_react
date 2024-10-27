from flask import Flask, jsonify, send_from_directory
import json
import os

app = Flask(__name__, static_folder="static",static_url_path="/static")

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
    # Check if the file exists in the static folder or nested folders like "assets" or "static"
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    elif os.path.exists(os.path.join(app.static_folder, "assets", path)):
        return send_from_directory(os.path.join(app.static_folder, "assets"), path)
    elif os.path.exists(os.path.join(app.static_folder, "css", path)):
        return send_from_directory(os.path.join(app.static_folder, "css"), path)
    elif os.path.exists(os.path.join(app.static_folder, "js", path)):
        return send_from_directory(os.path.join(app.static_folder, "js"), path)
    elif os.path.exists(os.path.join(app.static_folder, "static/css", path)):
        return send_from_directory(os.path.join(app.static_folder, "static/css"), path)
    elif os.path.exists(os.path.join(app.static_folder, "static/js", path)):
        return send_from_directory(os.path.join(app.static_folder, "static/js"), path)
    else:
        # Serve index.html for any other route
        return send_from_directory(app.static_folder, "index.html")
# def serve_react(path):
#     if path != "" and os.path.exists(app.static_folder + "/" + path):
#         return send_from_directory(app.static_folder, path)
#     else:
#         return send_from_directory(app.static_folder, "index.html")


if __name__ == '__main__':
    app.run(
        host="0.0.0.0", 
        debug=True)
