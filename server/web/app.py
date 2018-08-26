import sys
sys.path.insert(0, './')
from flask import Flask
from flask import Response, request, json,render_template
from lib import data_repository
from lib import core
from lib.data_repository import AgeValueException
from lib.data_repository import OcupationValueException

app = Flask(__name__, static_url_path='')

import graphene
from flask_graphql import GraphQLView

class OptimalTime(graphene.Mutation):
    class Arguments:
        code = graphene.String(required=True)
        ocupation_code = graphene.String(required=True)
        age_rage = graphene.String(required=True)
        gender = graphene.String(required=True)
        second_code = graphene.String(required=False)

    response = graphene.Field(graphene.Float)

    def mutate(self, info, **agrs):
        response = core.run(**agrs)
        return OptimalTime(response=response)

class SimpleObject(graphene.ObjectType):
    name = graphene.String()

class Disease(graphene.ObjectType):
    numero = graphene.Int()
    capitulo = graphene.String()
    codigo  = graphene.String()
    descripcion = graphene.String()
    tiempo_estandar = graphene.Int()

class Disease(graphene.ObjectType):
    numero = graphene.Int()
    capitulo = graphene.String()
    codigo  = graphene.String()
    descripcion = graphene.String()
    tiempo_estandar = graphene.Int()

class OcupationData(graphene.ObjectType):
    capitulo_de_diagnostico = graphene.Int()
    grupo = graphene.Int()
    grupo_de_ocupacion = graphene.String()
    ratio = graphene.Int()

class Query(graphene.ObjectType):
    # age_rage = graphene.List(Disease.Field())
    all_age_rage = graphene.List(SimpleObject)
    all_gender_rage = graphene.List(SimpleObject)
    all_diseases = graphene.List(Disease)
    all_ocupation = graphene.List(OcupationData)

    def resolve_all_age_rage(self, info):
        return map(lambda i: SimpleObject(**i), data_repository.all_age_rage())
    def resolve_all_gender_rage(self, info):
        return map(lambda i: SimpleObject(**i), data_repository.all_gender_rage())
    def resolve_all_diseases(self, info):
        return map(lambda i: Disease(**i), data_repository.all_diseases())
    def resolve_all_ocupation(self, info):
        return map(lambda i: OcupationData(**i), data_repository.all_ocupation())

class Mutation(graphene.ObjectType):
    optimal_time = OptimalTime.Field()

schema = graphene.Schema(query=Query,mutation=Mutation, types=[SimpleObject, Disease, OcupationData])

app.add_url_rule('/graphql', view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True))

@app.route("/")
def root():
  return render_template('index.html')

@app.errorhandler(404)
def page_not_found(e):
  return render_template('index.html')

@app.route("/all-diseases")
def all_diseases():
    data = json.dumps(data_repository.all_diseases())
    return Response(data, status=200, mimetype='application/json')

@app.route("/all-age-rage")
def all_age_rage():
    data = json.dumps(data_repository.all_age_rage())
    return Response(data, status=200, mimetype='application/json')

@app.route("/all-gender-rage")
def all_gender_rage():
    data = json.dumps(data_repository.all_gender_rage())
    return Response(data, status=200, mimetype='application/json')

@app.route("/all-ocupation")
def all_ocupation():
    data = json.dumps(data_repository.all_ocupation())
    return Response(data, status=200, mimetype='application/json')

@app.route("/optimal-time", methods = ['POST'])
def optimal_time():
    result = core.run(**request.json)
    return Response(json.dumps({"result": result}), status=200, mimetype='application/json')
