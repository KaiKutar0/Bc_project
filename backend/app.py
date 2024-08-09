from flask import Flask, jsonify
from flask_cors import CORS
import base64
from flask import request
from flask_migrate import Migrate
import torch
import torchvision
from PIL import Image, ImageDraw, ImageFont
import io
import numpy as np
import sqlite3
from datetime import datetime



model = torch.load('nn/model/pneumatic_recognitionV1.pth')
app = Flask(__name__)   
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///techDrawing.db'

from models.drawing import db
from models.drawing import Drawing
from models.drawing import User_Drawing
from models.drawing import ElementType

migrate = Migrate(app, db)

CORS(app, resources={r'/*': {'origins': '*'}})

@app.route('/load-docs')
def load_docs():
    term = request.args.get('term')
    lang = request.args.get('lang')

    return fetch_table(term, lang)

@app.route('/load-images')
def load_list():
    data = db.session.execute(db.select(User_Drawing)).all()
    response = []
    for record in data:
        for row in record:
            response.append({
                'id' : row.id,
                'name' : row.name,
                'date' : row.date,
                'notes' : row.notes,
                'photo' : base64.b64encode(row.photo).decode('utf-8')
            })
    return response

@app.route('/load-item')
def load_item():
    id = request.args.get('id')
    item = User_Drawing.query.filter_by(id=id).first()

    if item:
        response = {
            'id' : item.id,
            'name' : item.name,
            'date' : item.date,
            'notes' : item.notes,
            'photo' : base64.b64encode(item.photo).decode('utf-8')
        }
        # print(response['photo'])
        return response
    else:
        return "Error"

@app.route('/analyze')
def analyze():
    img_id = request.args.get('id')
    transform = torchvision.transforms.Compose([
                # Resize(size=(1024,1024)),
                torchvision.transforms.ToTensor(),
                # Normalize([0.,], [1.])
            ])
    user_drawing = User_Drawing.query.filter_by(id=img_id).first()  # Assuming User_Drawing is your model name
    if user_drawing:
        blob_bytes = user_drawing.photo
        image_str = io.BytesIO(blob_bytes)

        image = Image.open(image_str)

        x =  transform(image)
        x = x[:3, :, :]
        x = [x]

        model.eval()
        predictions = model(x)
        for prediction in predictions:
            boxes = prediction['boxes'].detach().cpu().numpy().tolist()
            labels = prediction['labels'].detach().cpu().numpy().tolist()
            scores = prediction['scores'].detach().cpu().numpy().tolist()

        image = image.convert("RGB")

        for box, label, score in zip(boxes, labels, scores):
                if score > 0.80:
                    x1, y1, x2, y2 = map(int, box)
                    center_x = (x1 + x2 - x2 / 7) // 2
                    center_y = y1 - 65 
                    draw = ImageDraw.Draw(image)
                    draw.rectangle([x1, y1, x2, y2], outline=color_border(label), width=6)
                    label_text = label_out(label)
                    label_font = ImageFont.load_default(size=58)  # Use the default font
                    label_width = label_font.getlength(label_text)
                    label_position = (center_x - label_width // 2, center_y)
                    draw.text(label_position, label_text, fill="black", font=label_font)

        buffer = io.BytesIO()
        image.save(buffer, format="JPEG")
        base64_image = base64.b64encode(buffer.getvalue()).decode("utf-8")            
        return base64_image
    else:
        return "Image not found"
    
@app.route('/delete')
def delete():
    id = request.args.get('id')
    User_Drawing.query.filter(User_Drawing.id == id).delete()
    db.session.commit()

    return []

@app.route('/update')
def update():
    id = request.args.get('id')
    notes = request.args.get('notes')
    item = User_Drawing.query.filter_by(User_Drawing.id == id).first()
    item.notes = notes
    db.session.commit()

@app.route('/add', methods=['POST'])
def add():
    data = request.json
    img = data['image']
    name = data['name']
    # img = request.args.get('image')
    # notes = request.args.get('notes')
    # name = request.args.get('name')
    notes = 'null'
    date = datetime.now()
    img = img.replace("data:image/png;base64,", "")
    padding_len = len(img) % 4
    if padding_len > 0:
        img += '=' * (4 - padding_len)
    
    try:
        decoded_img = base64.b64decode(img)
        item = User_Drawing(name, date, notes, sqlite3.Binary(decoded_img))
        db.session.add(item)
        db.session.commit()
        return []
    except Exception as e:
        # Handle decoding errors
        return str(e), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

def fetch_table(term, lang):
    if term == None:
        data = db.session.execute(db.select(Drawing).order_by(Drawing.name)).all() 
    else:
        if lang == 'en':
            data = db.session.execute(db.select(Drawing).filter(db.func.lower(Drawing.name_en).like(f'%{term.lower()}%')).order_by(Drawing.id)).all()
        if lang == 'sk':
            data = db.session.execute(db.select(Drawing).filter(db.func.lower(Drawing.name_sk).like(f'%{term.lower()}%')).order_by(Drawing.id)).all()
        if lang == 'ua':
            data = db.session.execute(db.select(Drawing).filter(db.func.lower(Drawing.name_ua).like(f'%{term.lower()}%')).order_by(Drawing.id)).all()

    response = []
    for record in data:
        for row in record:
            response.append({
                'id' : row.id,
                'name_en' : row.name_en,
                'name_sk' : row.name_sk,
                'name_ua' : row.name_ua,
                'type' : ElementType(row.element_type).name,
                'description_en' : row.description_en,
                'description_sk' : row.description_sk,
                'description_ua' : row.description_ua,
                'image' : base64.b64encode(row.image).decode('utf-8')
            })
    return response

def color_border(number):
    if number == 1:
        return (255, 0, 0, 255)  # Red
    elif number == 2:
        return (0, 255, 0, 255)  # Green
    elif number == 3:
        return (0, 0, 255, 255)  # Blue
    elif number == 4:
        return (255, 255, 0, 255)  # Yellow
    elif number == 5:
        return (255, 0, 255, 255)  # Magenta
    elif number == 6:
        return (0, 255, 255, 255)  # Cyan
    elif number == 7:
        return (255, 165, 0, 255)  # Orange
    else:
        return (0, 0, 0, 255)  
    
def label_out(num):
    labels = {
        1: "piston",
        2: "filter",
        3: "valve",
        4: "source",
        5: "tank",
        6: "gauge",
        7: "regulator"
    }
    return labels.get(num, "unknown")