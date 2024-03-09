from flask import Flask, jsonify
from flask_cors import CORS
import base64
from flask import request
from flask_migrate import Migrate

app = Flask(__name__)   
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///techDrawing.db'

from models.drawing import db
from models.drawing import Drawing
from models.drawing import ElementType

migrate = Migrate(app, db)

CORS(app, resources={r'/*': {'origins': '*'}})

@app.route('/')
def home():
    term = request.args.get('term')
    lang = request.args.get('lang')

    return fetch_table(term, lang)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

def fetch_table(term, lang):
    if term == None:
        data = db.session.execute(db.select(Drawing).order_by(Drawing.id)).all() 
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
