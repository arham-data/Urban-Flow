from flask import Flask,Request,jsonify
import mysql.connector
import os

app = Flask(__name__)

db = mysql.connector.connect(
    host = os.getenv("MYSQLHOST"),
    user = os.getenv("MYSQLUSER"),
    port = os.getenv("MYSQLPORT"),
    password = os.getenv("MYSQLPASSWORD"),
    database = os.getenv("MYSQLDATABASE")
)

@app.route("/api/signup", methods=["GET"])
def signup():
    return jsonify({
        "message": "API is working"
    })

if __name__ == "__main__":
    port = int(os.environ.get("PORT",5000))
    app.run(host="0.0.0.0", port=port)