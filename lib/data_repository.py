import pandas as pd
from flask import json

def all_diseases():
    return pd.read_csv("data/TE por DIAGNÓSTICO.csv").to_dict(orient='records')

def all_age_rage():
    return [{"name": "16-25"}, {"name": "26-35"}, {"name": "36-45"}, {"name": "46-55"}, {"name": "56-65"}]

def all_gender_rage():
    return [{"name": "hombre"}, {"name": "mujer"}]

def all_ocupation():
    return pd.read_csv("data/FC capitulos y ocupacion.csv").drop_duplicates(subset=['grupo_de_ocupacion']) \
    .to_dict(orient="records")

def optime_time_value(code=""):
    df = pd.read_csv("data/TE por DIAGNÓSTICO.csv")
    time = df[df["codigo"] == code].head(1).iloc[0][4]
    return time

def age_value(code="", age_rage=""):
    code = __supecode__(code)
    df = pd.read_csv("data/FC edad.csv")
    try:
        value = df[(df["codigo"] == code) & (df["grupo_edad"] == age_rage)].iloc[0][3]
    except:
        raise AgeValueException
    return value

def gender_value(code="", gender=""):
    code = __supecode__(code)
    df = pd.read_csv("data/FC sexo.csv")
    value = df[(df["codigo"] == code) & (df["sexo"] == gender)].iloc[0][3]
    return value

def ocupation_value(code="", ocupation_code=""):
    code = __supecode__(code)
    df = pd.read_csv("data/FC ocupación.csv")
    try:
        value = df[(df["codigo"] == code) & (df["grupo_de_opcupacion"] == int(ocupation_code))].iloc[0]["ratio"]
    except:
        raise OcupationValueException
    return value

def comorbidity_value(first_code="", second_code=""):
    first_code = __supecode__(first_code)
    second_code = __supecode__(second_code)
    df = pd.read_csv("data/COMORBILIDAD.csv")
    try:
        value = df[(df["codigo_principal"] == first_code) & (df["codigo_secundario"] == second_code)].iloc[0]["ratio"]
    except:
        raise ComorbidityValueException
    return value

def __supecode__(code):
    return code.split(".")[0]

class AgeValueException(Exception):
    pass

class OcupationValueException(Exception):
    pass
class ComorbidityValueException(Exception):
    pass
# print(optime_time_value("I21.1"))
# print(age_value("I21.1", "26-35"))
# print(gender_value("I21.1", "hombre"))
# print(ocupation_value("I21.1", "11"))
# print(comorbidity_value("I21.1", "E11"))
