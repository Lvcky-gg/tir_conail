from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Category(db.Model):
    __tablename__ = "categories"
    if environment == "production":
        __table_args__ = {"schema":SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String(), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)
    user_id= db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )

    user = db.relationship("User", back_populates="user_categories")
    category_stories = db.relationship("Story",back_populates="category", cascade="all, delete")

    def to_dict(self):
       return{
           "id":self.id,
           "name":self.name,
           "created_at":self.created_at,
           "updated_at":self.updated_at,
           "user_id":self.user_id,
           "user":self.user.to_dict()

       } 
