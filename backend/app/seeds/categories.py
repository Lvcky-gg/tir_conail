from ..models import db, Category, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_cat():
    category1 = Category(
        name="test1",
        created_at=datetime.now(),
        updated_at=datetime.now(),
        user_id=1,

    )
    category2 = Category(
        name="test2",
        created_at=datetime.now(),
        updated_at=datetime.now(),
        user_id=1,

    )
    category3 = Category(
        name="test3",
        created_at=datetime.now(),
        updated_at=datetime.now(),
        user_id=1,

    )
    db.session.add_all([category1, category2, category3])
    db.session.commit()
def undo_cat():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM categories"))
    
    db.session.commit()