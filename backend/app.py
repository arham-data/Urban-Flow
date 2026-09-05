from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import os

app = Flask(__name__)
CORS(app)

db = mysql.connector.connect(
    host = os.getenv("MYSQLHOST"),
    user = os.getenv("MYSQLUSER"),
    port = os.getenv("MYSQLPORT"),
    password = os.getenv("MYSQLPASSWORD"),
    database = os.getenv("MYSQLDATABASE")
)

@app.route("/api/test", methods=["GET"])
def test():
    return jsonify({
       "message":"API IS WORKING"
    })


@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.get_json()

    username = data["username"]
    password = data["password"]

    return jsonify({
        "message": "signup api working"
    }),201


@app.route("/api/login", methods=["POST"])
def login():
    login_data = request.get_json()

    username = login_data["username"]

    return jsonify({
        "message": "login api is working"
    })



if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)


