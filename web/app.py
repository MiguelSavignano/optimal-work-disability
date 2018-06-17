import sys
sys.path.insert(0, './')
from flask import Flask
from flask import Response, request, json,render_template
from lib import data_repository
from lib import core

app = Flask(__name__, static_url_path='')

# @app.route("/")
# def root():
#   return render_template('index.html')

@app.route("/all-diseases")
def all_diseases():
    data = data_repository.all_diseases()
    return Response(data, status=200, mimetype='application/json')

@app.route("/all-age-rage")
def all_age_rage():
    data = data_repository.all_age_rage()
    return Response(data, status=200, mimetype='application/json')

@app.route("/all-gender-rage")
def all_gender_rage():
    data = data_repository.all_gender_rage()
    return Response(data, status=200, mimetype='application/json')

@app.route("/all-ocupation")
def all_ocupation():
    data = data_repository.all_ocupation()
    return Response(data, status=200, mimetype='application/json')

@app.route("/optimal-time", methods = ['POST'])
def optimal_time():
    try:
      result = core.run(**request.json)
      data = { "result": result }
      return Response(json.dumps(data), status=200, mimetype='application/json')
    except:
      return Response(json.dumps({"result": "No existe un valor para esta combinación"}), status=200, mimetype='application/json')

