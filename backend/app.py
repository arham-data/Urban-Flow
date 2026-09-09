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

cursor = db.cursor()

@app.route("/api/test", methods=["GET"])
def test():
    return jsonify({
       "message":"API IS WORKING"
    })

@app.route("/api/signup", methods=["POST"])
def signup():
    try:
        signup_data = request.get_json()

        name = signup_data["name"]
        username = signup_data["username"]
        number = signup_data["number"]
        email = signup_data["email"]
        password = signup_data["password"]

        cursor.execute(
            """
            INSERT INTO USERS
            (NAME, USERNAME, PHONE_NUMBER, E_MAIL, PASSWORD)
            VALUES (%s, %s, %s, %s, %s)
            """,
            (name, username, number, email, password)
        )

        db.commit()

        return jsonify({
            "message": "signup api working"
        }), 201

    except Exception as e:
        return jsonify({
            "message": str(e)
        }), 500


@app.route("/api/login", methods=["POST"])
def login():
    try:
        login_data = request.get_json()

        username = login_data["username"]
        password = login_data["password"]

        cursor.execute("SELECT * FROM USER")

        result = cursor.fetchall()   

        return jsonify({
            "message": "login api is working"
        }),201

    except Exception as e:
        return jsonify({
            "message": str(e)
        }), 500



if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)


