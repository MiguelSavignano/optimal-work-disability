import pandas as pd
def optime_time_value(code=""):
  df = pd.read_csv("data/Aplicación tiempos óptimos.csv")
  time = df[df["CÓDIGO "] == code].head(1).iloc[0][4]
  return time

print(optime_time_value("I21.1"))
