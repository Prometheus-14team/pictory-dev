import os
import numpy as np
from PIL import Image
import json
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
#CORS(app)
CORS(app, resources={r"/*": {"origins": "*"}})  # 모든 출처에서 요청 허용

# 임시
# JSON 데이터 불러오기
with open("diary_data.json", "r", encoding="utf-8") as file:
    diary_data = json.load(file)
    
def save_diary_data():
    """diary_data를 diary_data.json 파일에 저장합니다."""
    with open("diary_data.json", "w", encoding="utf-8") as file:
        json.dump(diary_data, file, ensure_ascii=False, indent=4)


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

#이전
# @app.route("/get/text", methods=["POST"])
# def get_text():
#     data = request.get_json()
#     print(data)
#     return jsonify({"message": "Success"})

#이 아래 모두 임시
@app.route("/get/text", methods=["POST"])
def post_text():
    data = request.get_json()
    user_id = data.get("user_id")
    content = data.get("content")

    if not user_id or not content:
        return jsonify({"message": "user_id와 일기 내용을 적어주세요."}), 400

    if user_id not in diary_data:
        diary_data[user_id] = {}

    diary_data[user_id]["content"] = content
    diary_data[user_id]["ai_output"] = {
        "summary": "",
        "key_nouns": [],
        "image_path": "",
        "audio_path": ""
    }

    save_diary_data()
    
    return jsonify({"message": "Data saved successfully", "data": diary_data[user_id]}), 200


@app.route("/post/text", methods=["GET"])
def get_text():
    user_id = request.args.get("user_id")

    if not user_id:
        return jsonify({"message": "Missing required query parameter: user_id"}), 400

    user_data = diary_data.get(user_id)
    if not user_data:
        return jsonify({"message": "User not found"}), 404

    return jsonify({"message": "Success", "data": user_data}), 200



if __name__ == '__main__':
    app.run(debug=True)
