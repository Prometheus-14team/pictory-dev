import os
import numpy as np
from PIL import Image

from flask import (
    Flask, 
    render_template, 
    request, 
    redirect, 
    url_for,
    jsonify,
    send_from_directory
)
from flask_cors import CORS
"""
app = Flask(__name__)
diary_data = {}
image_data = {}
audio_data = {}


@app.route("/")
def calendar():
    return render_template("calendar.html")


@app.route("/diary/<date>")
def diary(date):
    content = diary_data.get(date, "")
    return render_template("diary.html", date=date, content=content)


@app.route("/diary/<date>/write", methods=["POST"])
def write_diary(date):
    content = request.form.get("content")
    diary_data[date] = content
    return redirect(url_for("calendar"))


@app.route("/diary/<date>/delete", methods=["POST"])
def delete_diary(date):
    if date in diary_data:
        del diary_data[date]
    return redirect(url_for("calendar"))


@app.route("/diary/<date>/create", methods=["GET", "POST"])
def create(date):
    image = image_data.get(date, "")
    audio = audio_data.get(date, "")
    image_url = url_for('static', filename=f'images/{date}_image.png')
    print(image_url)
    return render_template("create.html", date=date, image=image)


@app.route("/diary/<date>/create/image", methods=["POST"])
def create_image(date):
    color = np.random.randint(0,3)
    image = np.zeros((512,512,3), dtype=np.uint8)
    image[:,:,color] = 255
    image = Image.fromarray(image)
    image_data[date] = f"/static/images/{date}_image.png"
    image.save(f"./static/images/{date}_image.png")
    return redirect(url_for("create", date=date))


@app.route("/diary/<date>/create/audio", methods=["POST"])
def create_audio(date):
    content = diary_data.get(date)
    return redirect(url_for("create", date=date))
"""

app = Flask(__name__, static_folder="../calendar-web/build")
CORS(app)


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react_app(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")


@app.route('/api/image', methods=["POST"])
def send_image():
    pass


@app.route('/api/audio', methods=["POST"])
def send_audio():
    pass


@app.route('/api/text', methods=["POST"])
def send_text():
    pass

@app.route("/get/text", methods=["POST"])
def get_text():
    data = request.get_json()
    print(data)
    return jsonify({"message": "Success"})


if __name__ == '__main__':
    app.run(debug=True)
