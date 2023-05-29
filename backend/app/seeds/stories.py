from ..models import db, Story, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_story():
    story1 = Story(
        title="test",
        content="This is a  test",
        created_at=datetime.now(),
        updated_at=datetime.now(),
        category_id=1,
        user_id=1,

    )
    story2 = Story(
        title="test",
        content="This is a  test",
        created_at=datetime.now(),
        updated_at=datetime.now(),
        category_id=1,
        user_id=1,

    )
    story3 = Story(
        title="test",
        content="This is a  test",
        created_at=datetime.now(),
        updated_at=datetime.now(),
        category_id=1,
        user_id=1,

    )
    db.session.add_all([story1, story2, story3])
    db.session.commit()
def undo_story():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.stories RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM stories"))
    
    db.session.commit()