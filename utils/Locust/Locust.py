from locust import HttpLocust, TaskSet, task

class MyTaskSet(TaskSet):
    @task
    def content(self):
        self.client.get("/content")


class MyLocust(HttpLocust):
    task_set = MyTaskSet
    host = "http://35.193.175.216:443"
    min_wait = 5000
    max_wait = 10000

# https://docs.locust.io/en/stable/writing-a-locustfile.html