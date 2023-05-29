flask db migrate -m "migration."
flask db upgrade
flask seed all
flask run