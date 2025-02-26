import os
from PIL import Image
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
from models.image_captioning import generate_caption
from models.summary_agent import summarize_image

app = Flask(__name__)
cors = CORS(app, resources={r"/upload_image": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'


UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# API route to upload image submitted by User
@app.route('/upload_image', methods=['POST', 'OPTIONS'])
@cross_origin(origin='*', headers=['Content-Type'])
def upload_image():
    if "photo" not in request.files:
        return jsonify({'error': 'No image uploaded!'}), 400

    photo = request.files['photo']
    filename = secure_filename(photo.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    photo.save(filepath)
    
    # generate photo caption
    caption = generate_caption(filepath)

    # generate summary of the caption
    summary = summarize_image(caption)
    print(summary)

    return jsonify({'caption': caption, 'summary': summary}), 200

if __name__ == '__main__':
    app.run(debug=True)