from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3
import base64
from flask import request
from flask_sqlalchemy import SQLAlchemy

database_file = 'techDrawing.db'
table_name = 'drawing'

def read_data_from_database(database_file, table_name, term):
    data = []
    result = []
    try:
        conn = sqlite3.connect(database_file)
        cursor = conn.cursor()

        if term == None:
            cursor.execute(f"SELECT id, name, image FROM {table_name}")
        else:
            cursor.execute(f"SELECT id, name, image FROM {table_name} WHERE name LIKE ?", ('%' + term + '%',))



        data = cursor.fetchall()

        for row in data:
            id, name, image  = row
            decoded_image = base64.b64encode(image).decode('utf-8')
            result.append((id, name, decoded_image))
        return result
    
    except sqlite3.Error as e:
        print("Error reading data from SQLite database:", e)

    finally:
        if conn:
            conn.close()
    
app = Flask(__name__)   
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///techDrawing.db'

# db = SQLAlchemy(app)

# class drawing(db.Model):
#    id = db.Column(db.Integer, primary_key = True)
#    name = db.Column(db.Text)
#    image = db.Column(db.BLOB)

# def __init__(self, name):
#    self.name = name

CORS(app, resources={r'/*': {'origins': '*'}})

@app.route('/')
def home():
    # drawings = drawing.query.all()
    return {'message': 'drawings'}

@app.route('/drawing')
def fetch_table():
    term = request.args.get('term')
    # cathegory=request.args.get('term')
    return {'drawings': read_data_from_database(database_file, table_name, term)}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)