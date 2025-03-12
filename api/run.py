from app import create_app, init_app
import os
from prometheus_flask_exporter import PrometheusMetrics

port = os.getenv('API_PORT', 3001)

app = create_app()
init_app(app)
metrics = PrometheusMetrics(app)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=port)
