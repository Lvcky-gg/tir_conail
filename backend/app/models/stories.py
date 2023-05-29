from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Story(db.Model):
    __tablename__ = "stories"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}  
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(), nullable=False)
    content = db.Column(db.String(), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)
    category_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("categories.id")), nullable=False
    )
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    user = db.relationship("User", back_populates="user_stories")
    category = db.relationship("Category", back_populates="category_stories")

    def to_dict(self):
        return {
            "id":self.id,
            "title":self.title,
            "content":self.content,
            "created_at":self.created_at,
            "updated_at":self.updated_at,
            "category_id":self.category_id,
            "user_id":self.user_id,
            "user":self.user.to_dict(),
            "category":self.category.to_dict()
        }