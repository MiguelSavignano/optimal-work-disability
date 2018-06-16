
# Python support can be specified down to the minor or micro version
# (e.g. 3.6 or 3.6.3).
# OS Support also exists for jessie & stretch (slim and full).
# See https://hub.docker.com/r/library/python/ for all supported Python
# tags from Docker Hub.
FROM python

# If you prefer miniconda:
#FROM continuumio/miniconda3

LABEL Name=optimal-work-disability Version=0.0.1
EXPOSE 5000

WORKDIR /app
ADD . /app

ENV FLASK_DEBUG=1
ENV FLASK_APP=web/app.py
ENV FLASK_ENV=development
# Using pip:
RUN pip3 install -r requirements.txt
CMD ["flask", "run", "--host=0.0.0.0"]