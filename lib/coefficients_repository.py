import pandas as pd

def all_diseases():
    return pd.read_csv("data/TE por DIAGNÓSTICO.csv").to_json(orient='records')

def all_age_rage():
    return [{"name": "16-25"}, {"name": "26-35"}, {"name": "36-45"}, {"name": "46-55"}, {"name": "56-65"}]

def all_gender_rage():
    return [{"name": "hombre"}, {"name": "mujer"}]

def all_ocupation():
    return pd.read_csv("Ocupación Laboral.csv").to_json(orient='records')

def optime_time_value(code=""):
    df = pd.read_csv("data/TE por DIAGNÓSTICO.csv")
    time = df[df["CÓDIGO "] == code].head(1).iloc[0][4]
    return time

def age_value(code="", age_rage=""):
    code = __supecode__(code)
    df = pd.read_csv("data/FC edad.csv")
    value = df[(df["CÓDIGO"] == code) & (df["GRUPO EDAD"] == age_rage)].head(1).iloc[0][3]
    return value

def gender_value(code="", gender=""):
    code = __supecode__(code)
    df = pd.read_csv("data/FC sexo.csv")
    value = df[(df["CÓDIGO"] == code) & (df["SEXO"] == gender)].head(1).iloc[0][3]
    return value

def ocupation_value(code="", ocupation_code=""):
    code = __supecode__(code)
    df = pd.read_csv("data/FC ocupación.csv")
    value = df[(df["CÓDIGO"] == code) & (df["GRUPO DE OCUPACIÓN"] == int(ocupation_code))].head(1).iloc[0]["RATIO"]
    return value

def comorbidity_value(first_code="", second_code=""):
    first_code = __supecode__(first_code)
    second_code = __supecode__(second_code)
    df = pd.read_csv("data/COMORBILIDAD.csv")
    value = df[(df["CÓDIGO PRINCIPAL"] == first_code) & (df["CÓDIGO SECUNDARIO"] == second_code)].head(1).iloc[0]["RATIO"]
    return value

def __supecode__(code):
    return code.split(".")[0]

# print(optime_time_value("I21.1"))
# print(age_value("I21.1", "26-35"))
# print(gender_value("I21.1", "hombre"))
# print(ocupation_value("I21.1", "11"))
# print(comorbidity_value("I21.1", "E11"))
