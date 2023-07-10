from dotenv import load_dotenv, find_dotenv
import os
import certifi
from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson.objectid import ObjectId
from bson import json_util
import json

load_dotenv(find_dotenv())

pw = os.environ.get("MONGO_PW")
un = os.environ.get("MONGO_USER")

connect_str = f"mongodb+srv://{un}:{pw}@forum-backend.ipia6hh.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(connect_str, tlsCAFile=certifi.where())

# create new DB "production" & collections
db = client.production 
users = db.users
posts = db.posts
courses = db.courses


app = Flask(__name__)
# -- connect to database -- #
def connect_to_db():
    pass

# insert user
def create_user_document(parse_data):
    collection = db.users

    username = parse_data.get("username")
    firebase_UID = parse_data.get("firebase_UID")
    major = parse_data.get("major")
    year = parse_data.get("year")
    posts = parse_data.get("posts")
    replies = parse_data.get("replies")
    doc = {
        "username": username, 
           "firebase_UID": firebase_UID, 
           "major": major, 
           "year": year, 
           "posts": posts, 
           "replies": replies
           }
    collection.insert_one(doc)

def create_post_document(parse_data):
    collection = db.posts
    post_id = parse_data.get("post_id")
    timestamp = parse_data.get("timestamp")
    username = parse_data.get("username")
    post_title = parse_data.get("post_title")
    of_reply = parse_data.get("of_reply")
    content = parse_data.get("content")
    replies = parse_data.get("replies")
    likes = parse_data.get("likes")
    dislikes = parse_data.get("dislikes")
    doc = {
        "post_id": post_id, 
           "timestamp": timestamp, 
           "username": username, 
           "post_title": post_title, 
           "of_reply": of_reply, 
           "content": content,
           "replies": replies,
           "likes": likes,
           "dislikes": dislikes
           }
    collection.insert_one(doc)

# def create_course_document():
    # collection = db.courses
    # course_document = {
        # "course_id": "5001",
        # "course_title": "intro to cs: python",
        # "professor": ["Professor Bagley", "Professor etc.."],
        # "posts": [{"post_id": "57"}]
    # }
#     collection.insert_one(course_document)
# create_course_document()


# ---- endpoints ----- #

# home route
@app.route("/")
def welcome_page():
    return "<p> welcome </p>"

# -- routes for posts -- #
@app.route("/posts", methods=["POST"])
def post_post():
    post_data = request.args
    create_post_document(post_data)
    return jsonify("post created successfully")

@app.route("/posts", methods = ["GET"])
def get_posts():
    posts = get_all_posts()
    return jsonify(posts)

def get_all_posts():
    posts = db.posts.find()
    return [json.loads(json_util.dumps(post)) for post in posts]

@app.route("/posts/<post_id>", methods = ["DELETE"])
def delete_post(post_id):
    db.posts.delete_one({"post_id": post_id})
    return "post deleted successfully"



# -- routes for users -- #
@app.route("/users", methods=["POST"])
def post_user():
    user_data = request.args
    create_user_document(user_data)
    return jsonify("user created successfully")

@app.route("/users", methods = ["GET"])
def get_users():
    users = get_all_users_data()
    return jsonify(users)

def get_all_users_data():
    users = db.users.find()
    return [json.loads(json_util.dumps(user)) for user in users]

@app.route("/users/<firebase_UID>", methods = ["DELETE"])
def delete_user(firebase_UID):
    db.users.delete_one({"firebase_UID": firebase_UID})
    return "user deleted successfully"


# -- routes for courses -- #
@app.route("/courses", methods = ["GET"])
def list_all_courses():
    pass

# # if __name__ == "__main__":
# #     app.run(host="0.0.0.0", debug=True)
