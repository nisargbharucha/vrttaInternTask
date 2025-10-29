import os
from flask import Flask
from flask_cors import CORS
from . import database  # Import the database module from the app folder

def create_app(test_config=None):
    # Create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    
    # Set default config
    app.config.from_mapping(
        DATABASE=os.path.join(app.instance_path, "vrtta.db"),
    )

    if test_config is None:
        # Load the instance config, if it exists, when not testing
        app.config.from_pyfile("config.py", silent=True)
    else:
        # Load the test config if passed in
        app.config.from_mapping(test_config)

    # Ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # --- Configure CORS ---
    CORS(app, origins=['http://localhost:3000', 'http://127.0.0.1:3000'], supports_credentials=True)
    
    # --- Initialize Database ---
    # Register the close_db and init_db functions with the app
    app.teardown_appcontext(database.close_db)
    with app.app_context():
        database.init_db()

    # --- Register Blueprints ---
    # Import your routes from the 'api' sub-directory
    from .routers import routes as api_blueprint
    
    # Register the blueprint with the app
    # This is the line that fixes your error
    app.register_blueprint(api_blueprint)


    # A simple test route
    @app.route('/hello')
    def hello():
        return 'Hello, World!'

    return app