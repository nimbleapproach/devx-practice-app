from app import create_app, init_app

app = create_app()
init_app(app)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=3001)
