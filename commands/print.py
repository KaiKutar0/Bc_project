import sqlite3
import base64

def read_data_from_database(database_file, table_name):
    try:
        conn = sqlite3.connect(database_file)
        cursor = conn.cursor()

        cursor.execute(f"SELECT id, name, image FROM {table_name}")

        data = cursor.fetchall()

        result = []
        for row in data:
            id_, name, image = row
            decoded_image = base64.b64encode(image).decode('utf-8')
            result.append((id_, name, decoded_image))

        # image = base64.b64encode(data[2][2]).decode('utf-8')
        return result
    
    except sqlite3.Error as e:
        print("Error reading data from SQLite database:", e)

    finally:
        if conn:
            conn.close()
    

database_file = '../backend/techDrawing.db'
table_name = 'drawing'

image = read_data_from_database(database_file, table_name)
print(image)
