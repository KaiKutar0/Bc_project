from app import app as app
from flask_sqlalchemy import SQLAlchemy
import enum

db = SQLAlchemy(app)

class ElementType(enum.Enum):
    GRIPPER = "Gripper" #DONE
    LINE_EQUIPMENT = "Line Equipment" #DONE?
    FITTINGS_N_TUBES = "Fittings and Tubes"
    FLOW_CONTROL_EQUIPMENT = "Flow Control Equipment"
    MECHANICAL_N_AIR_OPERATED_VALVES = "Mechanical and Air Operated Valves"
    PNEUMATIC_ACTUATORS = "Pneumatic Actuators"
    PRESSURE_N_VACUUM_SWITCHES = "Pressure and Vacuum Switches"
    PROCESS_TECHNOLOGY = "Process Technology"
    ROTARY_ACTUATOR = "Rotary actuator"
    SAFETY_PRESSURE_RELEASE_VALVES = "Safety pressure release valves"
    SOLENOID_VALVES = "Solenoid Valves"
    VACUUM_EQUIPMENT = "Vacuum Equipment"

    OTHER = "Other"


class Drawing(db.Model):
    id = db.Column(db.Integer, primary_key = True)

    name_en = db.Column(db.String(128))
    name_sk = db.Column(db.String(128))
    name_ua = db.Column(db.String(128))

    element_type = db.Column(db.Enum(ElementType))

    image = db.Column(db.LargeBinary)

    description_en = db.Column(db.String(500))
    description_sk = db.Column(db.String(500))
    description_ua = db.Column(db.String(500))


    def __repr__(self):
        return '%r' % [self.id, 
                       self.name_en, 
                       self.name_sk,
                       self.name_ua,
                       self.element_type,
                       self.image, 
                       self.description_en,
                       self.description_sk,
                       self.description_ua]
   
    def __init__(self, 
                 name_en, 
                 name_sk,
                 name_ua,
                 element_type,
                 image, 
                 description_en,
                 description_sk,
                 description_ua):
        self.name_en = name_en
        self.name_sk = name_sk
        self.name_ua = name_ua
        self.element_type = element_type
        self.image = image
        self.description_en = description_en
        self.description_sk = description_sk
        self.description_ua = description_ua