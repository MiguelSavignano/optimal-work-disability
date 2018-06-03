def perform(standar_time, age_value, gender_value, ocupation_value, comorbidity_value=1.0  ):
    return standar_time * ((age_value + gender_value + ocupation_value)/ 3) * comorbidity_value

# print(perform(90, 0.97, 0.99, 1.09, 1.05))
