FROM python:3-slim-buster
WORKDIR /api
RUN apt-get update -y
COPY requirements.txt /api
RUN pip install -r  /api/requirements.txt
COPY . /api
EXPOSE 5005
EXPOSE 27017
