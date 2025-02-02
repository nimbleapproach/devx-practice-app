# API

This project is a Flask application that implements CRUD (Create, Read, Update, Delete) operations for User and Transaction resources, with JWT authentication.

## Project Structure

```
api
├── app
│   ├── __init__.py
│   ├── models.py
│   ├── routes
│   │   ├── __init__.py
│   │   ├── user_routes.py
│   │   └── transaction_routes.py
│   ├── services
│   │   ├── __init__.py
│   │   ├── auth_service.py
│   │   └── user_service.py
│   ├── utils
│   │   ├── __init__.py
│   │   └── jwt.py
│   └── config.py
├── migrations
│   └── ...
├── requirements.txt
├── run.py
└── README.md
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd flask-crud-app
   ```

2. **Create a virtual environment:**
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install dependencies:**
   ```
   pip install -r requirements.txt
   ```

4. **Set up the database:**
   - Update the database connection details in `app/config.py`.
   - Run migrations to set up the database schema.

5. **Run the application:**
   ```
   python run.py
   ```

## Usage

- **Authentication:**
  - Use the `/token` endpoint to obtain a JWT token.
  
- **User Endpoints:**
  - `POST /users` - Create a new user.
  - `GET /users` - Retrieve all users.
  - `GET /users/<id>` - Retrieve a user by ID.
  - `PUT /users/<id>` - Update a user by ID.
  - `DELETE /users/<id>` - Delete a user by ID.

- **Transaction Endpoints:**
  - `POST /transactions` - Create a new transaction.
  - `GET /transactions` - Retrieve all transactions.
  - `GET /transactions/<id>` - Retrieve a transaction by ID.
  - `PUT /transactions/<id>` - Update a transaction by ID.
  - `DELETE /transactions/<id>` - Delete a transaction by ID.
  - `POST /transactions/user/<id>` - Retrieve all transactions for this user.

## Tests

Run the tests with:
```sh
pytest
```
