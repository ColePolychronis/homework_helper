FROM python:3.6

EXPOSE 5000

WORKDIR /app

RUN pip install --trusted-host pypi.python.org pystan
RUN pip install --trusted-host pypi.python.org pandas

COPY requirements.txt /app
RUN pip install -r requirements.txt

COPY app.py /app
CMD python app.py
