FROM python:3.7-slim

RUN mkdir /app
WORKDIR /app
ENV FLASK_DEBUG=1
ENV FLASK_APP=webapp.py
ENV FLASK_ENV=development
COPY requirements.txt requirements.txt
RUN pip3 install -U -r requirements.txt
COPY . .

CMD ["flask", "run", "--host=0.0.0.0"]
