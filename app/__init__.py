from flask import Flask
from dotenv import load_dotenv
import os

from app.database import *
from .routers import routes  # Change from .routers.routes import routes

def create_app():
    load_dotenv()

    app = Flask(__name__)
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")

    app.register_blueprint(routes)

    @app.before_request
    def before_request():
        init_db()

    @app.teardown_appcontext
    def teardown(exception):
        close_db()
    return app