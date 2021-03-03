FROM python:3.9.1

ENV FLASK_APP "lib/app.py"
ENV FLASK_ENV "production"

WORKDIR /usr/src/app
COPY requirements.txt .

RUN pip install -r requirements.txt
ADD . .
RUN cd /lib
CMD ["flask", "run"]