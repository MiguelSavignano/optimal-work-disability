import sys
sys.path.insert(0, './')
from web.app import app
from flask_cors import CORS
CORS(app)

if __name__ == '__main__':
    app.run()
