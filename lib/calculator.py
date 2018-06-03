def perform(standar_time, age_value, gender_value, profecion_value, comorbidity_value  ):
    return standar_time * ((age_value + gender_value + profecion_value)/ 3) * comorbidity_value

# print(perform(90, 0.97, 0.99, 1.09, 1.05))
