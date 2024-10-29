import flask
from flask import Flask, jsonify, send_from_directory
import json
import os

EXTERNAL_PLOTS_DIR=f'{os.getcwd()}/plots'
app = Flask(__name__, static_folder="static")

regions_dict={      
            "Africa":"africa",
            "Australia":"australia",
            "Global":"global",
            "Mid Atlantic":"midatl",
            "North America":"nam",
            "North Polar":"nps",
            "Pacific":"pac",
            "South America":"sam",
            "Seven Seas":"sevenseas",
            "South Polar":"sps"
        }  


@app.route('/data', methods=['POST'])
def get_data():
    data = flask.request.json
    fn = data.get('name','data3.json')
    with open(fn) as f:
        data = json.load(f)
    return jsonify(data)

@app.route('/generate-graph', methods=['POST'])
def generate_graph():
    data = flask.request.json
    image= get_filename(data)
    # image='g5fpfc_precip_0_20241028T000000_sps_00.png'
    print(image)
    # return jsonify({"imagePath": image})
    return jsonify({"imagePath": f"/external-plot/{image}"})

@app.route('/external-plot/<path:filename>')
def serve_external_plot(filename):
    return send_from_directory(EXTERNAL_PLOTS_DIR, filename)

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):
    print(f"Requested path: {path}") 
    full_path = os.path.join(app.static_folder, path)
    if os.path.exists(full_path) and not os.path.isdir(full_path):
        return send_from_directory(app.static_folder, path)
    # Serve index.html for all other routes to enable client-side routing
    return send_from_directory(app.static_folder, "index.html")

def get_filename(request):
    tau=request.get('leadHours1','00')
    field=request.get('fields1','precip')
    level=request.get('levels','0')
    stream=request.get('stream','g5fpfc')
    time=request.get('initialTimes1','20241028T000000')
    tau=request.get('leadHours1','00')
    region=request.get('regions','nam')
    region=regions_dict[region]
      
    filename=f'{stream}_{field}_{level}_{time}_{region}_{tau}.png'
    
    return filename

if __name__ == '__main__':
    app.run(
        host="0.0.0.0", 
        debug=True)
