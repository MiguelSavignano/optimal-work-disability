import sys
sys.path.insert(0, './')
from lib import data_repository as repo
from lib.data_repository import AgeValueException
from lib.data_repository import OcupationValueException

def run(code, age_rage, gender, ocupation_code, second_code=None):
    standar_time    = repo.optime_time_value(code)
    age_value       = repo.age_value(code, age_rage)
    gender_value    = repo.gender_value(code, gender)
    ocupation_value = repo.ocupation_value(code, ocupation_code)
    if (second_code):
        comorbidity_value = repo.comorbidity_value(code, second_code)
    else:
        comorbidity_value = 1.0
    return perform(standar_time, age_value, gender_value, ocupation_value, comorbidity_value)

def perform(standar_time, age_value, gender_value, ocupation_value, comorbidity_value=1.0):
    return (standar_time * ((age_value + gender_value + ocupation_value)/ 3) * comorbidity_value)

if __name__ == "__main__":
    code = sys.argv[1]
    age_rage = sys.argv[2]
    gender = sys.argv[3]
    ocupation_code = sys.argv[4]
    try:
        result = run(code, age_rage, gender, ocupation_code)
        print(result)
    except OcupationValueException:
        print("No existe un calculo previo para esta enfermedad y ocupación")
    except AgeValueException:
        print("No se pudo calcular coeficiente para la edad")
# python3 lib/core.py "A09" "26-35" "hombre" "2"
