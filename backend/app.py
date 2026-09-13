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

def get_cursor():
    return db.cursor()


@app.route("/api/test", methods=["GET"])
def test():
    return jsonify({
       "message":"API IS WORKING"
    })


@app.route("/api/signup", methods=["POST"])
def signup():
    cur = get_cursor()
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

        cur.execute("SELECT * FROM USERS WHERE USERNAME = %s OR E_MAIL = %s OR PHONE_NUMBER = %s", (username, email, number))
        existing_user = cur.fetchone()

        if existing_user:
            return jsonify({
                "message": "User already signed up. Please login instead."
            }), 409

        cur.execute(
            """
            INSERT INTO USERS
            (NAME, USERNAME, PHONE_NUMBER, E_MAIL, PASSWORD)
            VALUES (%s, %s, %s, %s, %s)
            """,
            (name, username, number, email, password)
        )

        db.commit()

        cur.execute("SELECT * FROM USERS WHERE USERNAME = %s", (username,))
        new_user = cur.fetchone()

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
    finally:
        cur.close()


@app.route("/api/login", methods=["POST"])
def login():
    cur = get_cursor()
    try:
        login_data = request.get_json()

        username = login_data["username"]
        password = login_data["password"]

        cur.execute("SELECT * FROM USERS WHERE USERNAME = %s AND PASSWORD = %s", (username, password))
        user = cur.fetchone()

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
    finally:
        cur.close()


@app.route("/api/resources", methods=["GET"])
def get_all_resources():
    cur = get_cursor()
    try:
        cur.execute(
            """
            SELECT r.RESOURCE_ID, r.USER_ID, r.TYPE, r.TITLE, r.LOCATION,
                   r.DESCRIPTION, r.PRICE, r.PRICE_UNIT, r.STATUS, r.DETAILS,
                   r.CREATED_AT, u.NAME
            FROM RESOURCES r
            JOIN USERS u ON r.USER_ID = u.USER_ID
            ORDER BY r.CREATED_AT DESC
            """
        )
        rows = cur.fetchall()

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
    finally:
        cur.close()


@app.route("/api/resources/mine/<int:user_id>", methods=["GET"])
def get_my_resources(user_id):
    cur = get_cursor()
    try:
        cur.execute(
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
        rows = cur.fetchall()

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
    finally:
        cur.close()


@app.route("/api/resources", methods=["POST"])
def add_resource():
    cur = get_cursor()
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

        cur.execute(
            """
            INSERT INTO RESOURCES
            (USER_ID, TYPE, TITLE, LOCATION, DESCRIPTION, PRICE, PRICE_UNIT, STATUS, DETAILS)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            """,
            (user_id, resource_type, title, location, description, price, price_unit, status, details_json)
        )

        db.commit()

        return jsonify({
            "message": "Resource added successfully"
        }), 201

    except Exception as e:
        return jsonify({
            "message": str(e)
        }), 500
    finally:
        cur.close()


@app.route("/api/resources/<int:resource_id>", methods=["PUT"])
def update_resource(resource_id):
    cur = get_cursor()
    try:
        data = request.get_json()

        if "title" not in data and "status" in data:
            cur.execute("UPDATE RESOURCES SET STATUS = %s WHERE RESOURCE_ID = %s", (data["status"], resource_id))
            db.commit()
            return jsonify({
                "message": "Resource status updated successfully"
            }), 200

        resource_type = data.get("type")
        title = data.get("title")
        location = data.get("location", "")
        description = data.get("description", "")
        price = data.get("price")
        price_unit = data.get("price_unit", "")
        status = data.get("status", "available")

        if not title or not resource_type:
            return jsonify({
                "message": "Title and type are required"
            }), 400

        cur.execute(
            """
            UPDATE RESOURCES
            SET TYPE = %s, TITLE = %s, LOCATION = %s, DESCRIPTION = %s,
                PRICE = %s, PRICE_UNIT = %s, STATUS = %s
            WHERE RESOURCE_ID = %s
            """,
            (resource_type, title, location, description, price, price_unit, status, resource_id)
        )

        db.commit()

        return jsonify({
            "message": "Resource updated successfully"
        }), 200

    except Exception as e:
        return jsonify({
            "message": str(e)
        }), 500
    finally:
        cur.close()


@app.route("/api/resources/<int:resource_id>", methods=["DELETE"])
def delete_resource(resource_id):
    cur = get_cursor()
    try:
        cur.execute("DELETE FROM REQUESTS WHERE RESOURCE_ID = %s", (resource_id,))
        db.commit()
        cur.execute("DELETE FROM RESOURCES WHERE RESOURCE_ID = %s", (resource_id,))
        db.commit()

        return jsonify({
            "message": "Resource deleted successfully"
        }), 200

    except Exception as e:
        return jsonify({
            "message": str(e)
        }), 500
    finally:
        cur.close()


@app.route("/api/requests", methods=["POST"])
def add_request():
    cur = get_cursor()
    try:
        data = request.get_json()

        sender_id = data.get("sender_id")
        resource_id = data.get("resource_id")
        message = data.get("message", "")

        if not sender_id or not resource_id:
            return jsonify({
                "message": "Sender and resource are required"
            }), 400

        cur.execute("SELECT USER_ID, TITLE FROM RESOURCES WHERE RESOURCE_ID = %s", (resource_id,))
        resource = cur.fetchone()

        if not resource:
            return jsonify({
                "message": "Resource not found"
            }), 404

        receiver_id = resource[0]
        resource_title = resource[1]

        if int(sender_id) == int(receiver_id):
            return jsonify({
                "message": "You cannot request your own resource"
            }), 400

        cur.execute(
            "SELECT * FROM REQUESTS WHERE SENDER_ID = %s AND RESOURCE_ID = %s AND STATUS = 'pending'",
            (sender_id, resource_id)
        )
        duplicate = cur.fetchall()

        if duplicate:
            return jsonify({
                "message": "You already have a pending request for this resource"
            }), 409

        cur.execute(
            """
            INSERT INTO REQUESTS
            (SENDER_ID, RECEIVER_ID, RESOURCE_ID, STATUS, MESSAGE)
            VALUES (%s, %s, %s, %s, %s)
            """,
            (sender_id, receiver_id, resource_id, "pending", message)
        )
        db.commit()

        return jsonify({
            "message": "Request sent successfully",
            "resource_title": resource_title
        }), 201

    except Exception as e:
        return jsonify({
            "message": str(e)
        }), 500
    finally:
        cur.close()


@app.route("/api/requests/user/<int:user_id>", methods=["GET"])
def get_user_requests(user_id):
    cur = get_cursor()
    try:
        cur.execute(
            """
            SELECT req.REQUEST_ID, req.SENDER_ID, req.RECEIVER_ID, req.RESOURCE_ID,
                   req.STATUS, req.MESSAGE, req.CREATED_AT,
                   u1.NAME, u2.NAME,
                   r.TYPE, r.TITLE, r.LOCATION, r.PRICE, r.PRICE_UNIT
            FROM REQUESTS req
            JOIN USERS u1 ON req.SENDER_ID = u1.USER_ID
            JOIN USERS u2 ON req.RECEIVER_ID = u2.USER_ID
            JOIN RESOURCES r ON req.RESOURCE_ID = r.RESOURCE_ID
            WHERE req.SENDER_ID = %s OR req.RECEIVER_ID = %s
            ORDER BY req.CREATED_AT DESC
            """,
            (user_id, user_id)
        )
        rows = cur.fetchall()

        incoming = []
        outgoing = []
        for row in rows:
            item = {
                "request_id": row[0],
                "sender_id": row[1],
                "receiver_id": row[2],
                "resource_id": row[3],
                "status": row[4],
                "message": row[5],
                "created_at": str(row[6]),
                "sender_name": row[7],
                "receiver_name": row[8],
                "resource_type": row[9],
                "resource_title": row[10],
                "resource_location": row[11],
                "resource_price": str(row[12]) if row[12] is not None else None,
                "resource_unit": row[13]
            }
            if int(row[2]) == int(user_id):
                incoming.append(item)
            else:
                outgoing.append(item)

        return jsonify({
            "incoming": incoming,
            "outgoing": outgoing
        }), 200

    except Exception as e:
        return jsonify({
            "message": str(e)
        }), 500
    finally:
        cur.close()


@app.route("/api/requests/<int:request_id>", methods=["PUT"])
def update_request(request_id):
    cur = get_cursor()
    try:
        data = request.get_json()
        status = data.get("status")

        if status not in ("pending", "accepted", "declined", "completed"):
            return jsonify({
                "message": "Invalid status"
            }), 400

        cur.execute("SELECT * FROM REQUESTS WHERE REQUEST_ID = %s", (request_id,))
        existing = cur.fetchone()

        if not existing:
            return jsonify({
                "message": "Request not found"
            }), 404

        cur.execute("UPDATE REQUESTS SET STATUS = %s WHERE REQUEST_ID = %s", (status, request_id))
        db.commit()

        return jsonify({
            "message": "Request updated successfully"
        }), 200

    except Exception as e:
        return jsonify({
            "message": str(e)
        }), 500
    finally:
        cur.close()



if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)