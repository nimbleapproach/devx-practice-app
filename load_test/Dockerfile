FROM python:3.13.1-slim

WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the locust file
COPY locustfile.py .

# Set the default command to run Locust
CMD ["locust", "-f", "locustfile.py", "--headless", "-u", "100", "-r", "10", "--run-time", "5m"]