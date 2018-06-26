import sys
sys.path.insert(0, './')
from lib import data_repository as repo
from lib.data_repository import AgeValueException
from lib.data_repository import OcupationValueException
from lib.data_repository import ComorbidityValueException

def run(code, ocupation_code, age_rage, gender, second_code=None):
    standar_time    = repo.optime_time_value(code)
    try:
        gender_value = repo.gender_value(code, gender)
    except:
        gender_value = 1
    try:
        age_value = repo.age_value(code, age_rage)
    except AgeValueException:
        age_value = 1.0
    try:
        ocupation_value = repo.ocupation_value(code, ocupation_code)
    except OcupationValueException:
        ocupation_value = 1.0

    if (second_code):
        try:
            comorbidity_value = repo.comorbidity_value(code, second_code)
        except ComorbidityValueException:
            comorbidity_value = 1.0
    else:
        comorbidity_value = 1.0
    return perform(standar_time, age_value, gender_value, ocupation_value, comorbidity_value)

def perform(standar_time, ocupation_value, age_value, gender_value, comorbidity_value=1.0):
    return (standar_time * ((age_value + gender_value + ocupation_value)/ 3) * comorbidity_value)

if __name__ == "__main__":
    try:
        second_code = sys.argv[5]
    except:
        second_code = None
    result = run(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], second_code)
    print(result)
# python3 lib/core.py "M54.3" "7" "36-45" "mujer"  "M51"
