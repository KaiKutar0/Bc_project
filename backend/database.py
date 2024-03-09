from app import app as app
from models.drawing import db as db, Drawing
import sqlite3
from flask_sqlalchemy import SQLAlchemy
from models.drawing import ElementType
######
"""
UPDATE 
"""
######
img_name = "/home/yurii/Pictures/Screenshots/30AEQ"
name_en = 'Plug'
name_sk = 'Zátky'
name_ua = "Заглушка"
element_type = ElementType.LINE_EQUIPMENT.name
description_en = "Plug - A type of fitting used to close or block an opening in a system or component. Plugs are typically inserted into a port, hole, or pipe to prevent the flow of fluid, gas, or other substances. They come in various shapes, sizes, and materials to suit different applications. Plugs may have threaded, push-in, or compression designs, providing a secure and leak-proof seal when properly installed. They are commonly used in plumbing, pneumatic systems, hydraulic systems, and electrical applications for sealing unused ports, conducting pressure tests, or temporarily blocking flow."
description_sk = 'Zátky - Typ spojovacieho prvku používaného na zatváranie alebo blokovanie otvoru v systéme alebo komponente. Zátky sa zvyčajne vkladajú do portu, otvoru alebo rúry, aby sa zabránilo prúdeniu tekutiny, plynu alebo iných látok. Existujú v rôznych tvaroch, veľkostiach a materiáloch, aby vyhovovali rôznym aplikáciám. Zátky môžu mať závitový, stlačovací alebo stláčací dizajn, poskytujúci bezpečné a tesné utvorenie tesnenia pri správnej inštalácii. Sú bežne používané v hydraulických systémoch, pneumatických systémoch, elektrických aplikáciách alebo iných oblastiach, na utvorenie tesného uzatvorenia nevyužitých portov, vykonávanie tlakových testov alebo dočasné blokovanie prúdenia.'
description_ua = "Заглушка - Тип з'єднувального елементу, який використовується для закриття або блокування отвору в системі або компоненті. Заглушки зазвичай вставляються в порт, отвір або трубу для запобігання потоку рідини, газу або інших речовин. Вони існують у різних формах, розмірах та матеріалах для відповідності різним застосуванням. Заглушки можуть мати різні типи кріплення, такі як різьблення, натиск або стиснення, забезпечуючи надійне та герметичне ущільнення при належній установці. Вони широко використовуються в гідравлічних системах, пневматичних системах, електричних апаратах та інших галузях для ущільнення не використовуваних портів, проведення випробувань на міцність або тимчасового блокування потоку."

def add():
    with open(f"{img_name}.png", 'rb') as file:
        image_data = file.read()
    with app.app_context():

        item = Drawing(name_en, name_sk, name_ua, element_type, sqlite3.Binary(image_data), description_en, description_sk, description_ua )

        db.session.add(item)
        db.session.commit()

def remove(id):
    with app.app_context():
        Drawing.query.filter(Drawing.name_en == 'Filter Regulator w Manual Drain').delete()
        db.session.commit()

def update(id):
    with app.app_context():
        upd = (update(Drawing).where(Drawing.name_sk == "Tlakový spínač").values(name_en="Pressure Switch"))
        # db.session.commit()
        print(upd)


#uncomment when adding an item
add()

#uncomment when update an item
# update(1)

#uncomment when deleting an item
# remove(3)

#####