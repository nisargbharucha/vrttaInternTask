Vrtta Flask Backend
This is the backend server for the Vrtta project, built using Flask.

Project Structure
The project follows a standard Flask application factory pattern:

Vrtta/
├── .env                # Stores environment variables (e.g., SECRET_KEY, PORT)
├── README.md           # You are here
├── main.py             # Main entry point to run the application
├── requirements.txt    # Python dependencies
├── venv/               # Virtual environment directory
├── tests/              # (Empty for now)
└── app/                # The main Flask application package
    ├── __init__.py     # Application factory (contains create_app())
    ├── models/         # (Empty for now - for database models)
    ├── services/       # (Empty for now - for business logic)
    └── routers/        # Contains all API route blueprints
        ├── __init__.py # Makes 'routers' a package
        └── routes.py   # Defines the main routes for the app
How to Run the Server
Follow these steps to set up and run the server locally.

1. Setup
Clone the repository (if you haven't):

Bash

git clone <your-repo-url>
cd Vrtta
Create and activate a virtual environment:

Bash

# Create the virtual environment
python3 -m venv venv

# Activate it (on macOS/Linux)
source venv/bin/activate
Install dependencies:

Bash

pip install -r requirements.txt
2. Environment Variables
Create a file named .env in the root of the project (Vrtta/). This file holds your secret keys and configuration.

File: .env

# A strong, random secret key for Flask sessions
SECRET_KEY="your-very-strong-random-secret-key"

# The port you want the server to run on
PORT=5000
3. Run the Server
With your virtual environment still active, run main.py:

Bash

python main.py
The server will start in debug mode and automatically reload when you save changes.

You should see output similar to this:

 * Serving Flask app 'app'
 * Debug mode: on
 * Running on http://127.0.0.1:5000
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: XXX-XXX-XXX
You can now access the server at http://127.0.0.1:5000 in your browser.