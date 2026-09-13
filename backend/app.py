from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import os
import json

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



@app.route("/api/resources", methods=["GET"])
def get_all_resources():
    try:
        cursor.execute(
            """
            SELECT r.RESOURCE_ID, r.USER_ID, r.TYPE, r.TITLE, r.LOCATION,
                   r.DESCRIPTION, r.PRICE, r.PRICE_UNIT, r.STATUS, r.DETAILS,
                   r.CREATED_AT, u.NAME
            FROM RESOURCES r
            JOIN USERS u ON r.USER_ID = u.USER_ID
            ORDER BY r.CREATED_AT DESC
            """
        )
        rows = cursor.fetchall()

        resources = []
        for row in rows:
            resources.append({
                "resource_id": row[0],
                "user_id": row[1],
                "type": row[2],
                "title": row[3],
                "location": row[4],
                "description": row[5],
                "price": str(row[6]) if row[6] is not None else None,
                "price_unit": row[7],
                "status": row[8],
                "details": json.loads(row[9]) if row[9] else {},
                "created_at": str(row[10]),
                "owner_name": row[11]
            })

        return jsonify({"resources": resources}), 200

    except Exception as e:
        return jsonify({
            "message": str(e)
        }), 500


@app.route("/api/resources/mine/<int:user_id>", methods=["GET"])
def get_my_resources(user_id):
    try:
        cursor.execute(
            """
            SELECT r.RESOURCE_ID, r.USER_ID, r.TYPE, r.TITLE, r.LOCATION,
                   r.DESCRIPTION, r.PRICE, r.PRICE_UNIT, r.STATUS, r.DETAILS,
                   r.CREATED_AT
            FROM RESOURCES r
            WHERE r.USER_ID = %s
            ORDER BY r.CREATED_AT DESC
            """,
            (user_id,)
        )
        rows = cursor.fetchall()

        resources = []
        for row in rows:
            resources.append({
                "resource_id": row[0],
                "user_id": row[1],
                "type": row[2],
                "title": row[3],
                "location": row[4],
                "description": row[5],
                "price": str(row[6]) if row[6] is not None else None,
                "price_unit": row[7],
                "status": row[8],
                "details": json.loads(row[9]) if row[9] else {},
                "created_at": str(row[10])
            })

        return jsonify({"resources": resources}), 200

    except Exception as e:
        return jsonify({
            "message": str(e)
        }), 500


@app.route("/api/resources", methods=["POST"])
def add_resource():
    try:
        data = request.get_json()

        user_id = data["user_id"]
        resource_type = data["type"]
        title = data["title"]
        location = data.get("location", "")
        description = data.get("description", "")
        price = data.get("price")
        price_unit = data.get("price_unit", "")
        status = data.get("status", "available")
        details = data.get("details", {})

        if not title or not resource_type:
            return jsonify({
                "message": "Title and type are required"
            }), 400

        details_json = json.dumps(details)

        cursor.execute(
            """
            INSERT INTO RESOURCES
            (USER_ID, TYPE, TITLE, LOCATION, DESCRIPTION, PRICE, PRICE_UNIT, STATUS, DETAILS)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            """,
            (user_id, resource_type, title, location, description, price, price_unit, status, details_json)
        )

        db.commit()
        cursor.fetchall()

        return jsonify({
            "message": "Resource added successfully"
        }), 201

    except Exception as e:
        return jsonify({
            "message": str(e)
        }), 500


@app.route("/api/resources/<int:resource_id>", methods=["PUT"])
def update_resource(resource_id):
    try:
        data = request.get_json()

        status = data.get("status")

        if not status:
            return jsonify({
                "message": "Status is required"
            }), 400

        cursor.execute(
            """
            UPDATE RESOURCES
            SET STATUS = %s
            WHERE RESOURCE_ID = %s
            """,
            (status, resource_id)
        )

        db.commit()
        cursor.fetchall()

        return jsonify({
            "message": "Resource updated successfully"
        }), 200

    except Exception as e:
        return jsonify({
            "message": str(e)
        }), 500


@app.route("/api/resources/<int:resource_id>", methods=["DELETE"])
def delete_resource(resource_id):
    try:
        cursor.execute("DELETE FROM RESOURCES WHERE RESOURCE_ID = %s", (resource_id,))
        db.commit()
        cursor.fetchall()

        return jsonify({
            "message": "Resource deleted successfully"
        }), 200

    except Exception as e:
        return jsonify({
            "message": str(e)
        }), 500



if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)


