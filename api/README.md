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
   git clone <repository-url> (Not necessary if entire repo has been cloned from the top level)
   cd api
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

5. **Set up Docker**
  
  ### Windows set up
  - Install WSL2 and Ubuntu from the Microsoft Store
  - Open PowerShell as an Administrator and run `wsl --install`
  - Set WSL2 as the default version by running `wsl --set-default-version 2`
  - Install Docker Engine in WSL2 by opening your Ubuntu terminal and running: 
      ```
         sudo apt update
         sudo apt install -y ca-certificates curl gnupg lsb-release
         curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
         echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
      $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
         sudo apt update
         sudo apt install -y docker-ce docker-ce-cli containerd.io
      ```
   - Start Docker Daemon in WSL2 by running `sudo service docker start`
   - Verify Docker is working by running `sudo docker run hello-world`
   - Install Docker engine by running `sudo apt install -y ca-certificates curl gnupg lsb-release`
   - Add Docker's official GPG key by running `sudo mkdir -p /etc/apt/keyrings curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg`
   - Set up the Docker repository: `echo \ "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \ $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null`
   - Update your package index again: `sudo apt update`
   - Start Docker: `sudo service docker start`
   - cd into the root of the project (where the docker-compose.yaml is located)
   - Run `docker-compose up -dc`

6. **Run the application:**
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
