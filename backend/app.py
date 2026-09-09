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

        if len(number) != 10 or not number.isdigit():
            return jsonify({
                "message": "Phone number must be exactly 10 digits"
            }), 400

        cursor.execute("SELECT * FROM USERS WHERE USERNAME = %s OR E_MAIL = %s OR PHONE_NUMBER = %s", (username, email, number))
        existing_user = cursor.fetchone()

        if existing_user:
            return jsonify({
                "message": "User already signed up. Please login instead."
            }), 409

        cursor.execute(
            """
            INSERT INTO USERS
            (NAME, USERNAME, PHONE_NUMBER, E_MAIL, PASSWORD)
            VALUES (%s, %s, %s, %s, %s)
            """,
            (name, username, number, email, password)
        )

        db.commit()
        cursor.fetchall()

        cursor.execute("SELECT * FROM USERS WHERE USERNAME = %s", (username,))
        new_user = cursor.fetchone()

        return jsonify({
            "message": "Signup successful",
            "user": {
                "id": new_user[0],
                "name": new_user[1],
                "username": new_user[2],
                "phone": new_user[3],
                "email": new_user[4]
            }
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

        cursor.execute("SELECT * FROM USERS WHERE USERNAME = %s AND PASSWORD = %s", (username, password))
        user = cursor.fetchone()

        if not user:
            return jsonify({
                "message": "Invalid username or password"
            }), 401

        return jsonify({
            "message": "Login successful",
            "user": {
                "id": user[0],
                "name": user[1],
                "username": user[2],
                "phone": user[3],
                "email": user[4]
            }
        }), 200

    except Exception as e:
        return jsonify({
            "message": str(e)
        }), 500



if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)


