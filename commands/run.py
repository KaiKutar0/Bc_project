import sqlite3

database_file = '../backend/techDrawing.db'
table_name = 'drawing'
img_name = 'coupling_quick_release_seld_sealing '

conn = sqlite3.connect(database_file)
cursor = conn.cursor()

with open(f"{img_name}.jpg", 'rb') as file:
    image_data = file.read()

# adding items
# cursor.execute(f"INSERT INTO {table_name} (name, image) VALUES (?, ?)", (f"{img_name}", sqlite3.Binary(image_data)))

#updating items
cursor.execute(f"UPDATE {table_name} SET name = ? WHERE name = ?", ('coupling_quick_release_self_sealing ', 'coupling_quick_release_seld_sealing '))


#deleting items
# cursor.execute(f"DELETE FROM {table_name} WHERE id=?", ('2'))

conn.commit()
conn.close()

