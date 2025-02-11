# Load Tests

Locust based load tests that run a scenario where users are creating accounts, logging in and repeatedly viewing their dashboard and adding transactions.

Users and transactions are cleaned up at the end of the test.

## Setup 

1. **Create a virtual environment:**
   ```
   python3 -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

2. **Install dependencies:**
   ```
   pip install -r requirements.txt
   ```

## Running the tests

1. **Run dependencies:**
   You will need the `database` and `api` components running for the test to work.

2. **Run the test:**
   ```
   locust -f locustfile.py --headless -u 100 -r 10 --run-time 1m
   ```
