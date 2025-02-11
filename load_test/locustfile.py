from locust import HttpUser, TaskSet, task, between
import random

class UserBehavior(TaskSet):
    token = None
    user_suffix = None
    user_id = None

    def on_start(self):
        self.sign_up()
        self.log_in()
        self.get_user_id()
    
    def on_stop(self):
        self.client.delete(f"/users/{self.user_id}", name="/users/[user_id]", headers={"Authorization": f"Bearer {self.token}"})

    def sign_up(self):
        self.user_suffix = random.randint(1, 1000000)
        self.client.post("/users", json={"username": f"testuser_{self.user_suffix}", "password": f"password_{self.user_suffix}", "email": f"testuser_{self.user_suffix}@example.com"})

    def log_in(self):
        response = self.client.post("/login", json={"username": f"testuser_{self.user_suffix}", "password": f"password_{self.user_suffix}"})
        self.token = response.json().get("access_token")

    def get_user_id(self):
        self.user_id = self.client.get(f"/users/testuser_{self.user_suffix}", name="/users/[username]", headers={"Authorization": f"Bearer {self.token}"}).json().get("id")

    @task
    def visit_dashboard(self):
        self.client.get(f"/transactions/user/{self.user_id}", name="/transactions/user/[user_id]", headers={"Authorization": f"Bearer {self.token}"})

    @task
    def add_transaction(self):
        amount = random.randint(1, 1000)
        self.client.post("/transactions", json={"amount": amount, "description": "Test transaction", "user_id": self.user_id}, headers={"Authorization": f"Bearer {self.token}"})

class WebsiteUser(HttpUser):
    host = "http://localhost:3001"
    tasks = [UserBehavior]
    wait_time = between(1, 2)