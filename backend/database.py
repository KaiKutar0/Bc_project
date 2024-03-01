from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

class Base(DeclarativeBase):
  pass

db = SQLAlchemy(model_class=Base)

class User(db.Model):
     id = mapped_column(Integer, primary_key=True)
     name = mapped_column(String(50), nullable=False)
     image = mapped_column(bytearray)
    #  nickname = mapped_column(String(30))
