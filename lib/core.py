import sys
sys.path.insert(0, './')
from lib import data_repository as repo

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
    result = run(code="I21.1", age_rage="26-35", gender="hombre", ocupation_code="11", second_code="E11")
    print(result)
