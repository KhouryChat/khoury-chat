from dotenv import load_dotenv, find_dotenv
import os
import certifi
from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson.objectid import ObjectId
from bson import json_util
import json
import datetime
import sys
from flask_cors import CORS, cross_origin

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
course_professors = db.course_professors


app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config["CORS_HEADERS"] = 'Content-Type'
# -- connect to database -- #


def connect_to_db():
    pass
    pass

# insert user


def create_user_document(parse_data):
    collection = db.users

    username = parse_data.get("username")
    # check if username is unique
    if collection.find_one({"username": username}):
        raise ValueError(f"Username {username} is already in use")

    firebase_UID = parse_data.get("firebase_UID")
    major = parse_data.get("major")
    year = parse_data.get("year")
    doc = {
        "username": username,
        "firebase_UID": firebase_UID,
        "major": major,
        "year": year,
        "posts": [],
        "replies": []
    }
    collection.insert_one(doc)


def create_post_document(parse_data):
    collection = db.posts
    username = parse_data.get("username")
    post_title = parse_data.get("post_title")
    of_reply = parse_data.get("of_reply")
    content = parse_data.get("content")
    replies = parse_data.get("replies")
    likes = parse_data.get("likes")
    views = 1
    dislikes = parse_data.get("dislikes")
    views = 1
    # Add user_id
    firebase_UID = parse_data.get("firebase_UID")
    course_id = parse_data.get("course_id")

    doc = {
        "post_id": str(ObjectId()),
        "timestamp": datetime.datetime.utcnow(),
        "username": username,
        "firebase_UID": firebase_UID,
        "post_title": post_title,
        "of_reply": of_reply,
        "content": content,
        "replies": replies,
        "views": views,
        "likes": likes,
        "dislikes": dislikes,
        "course_id": course_id
    }
    collection.insert_one(doc)
    return doc


def create_course_document(parse_data):
    collection = db.courses
    course_id = parse_data.get("course_id")
    course_title = parse_data.get("course_title")
    professors = parse_data.get("professor")

    # Add course-by-professors
    course_document = {
        "course_id": course_id,
        "course_title": course_title,
        "professor": ["Professor Bagley", "Professor etc.."],
        "posts": [{"post_id": "57"}],
        "course_by_professors": []
    }
    collection.insert_one(course_document)


# schema for course by specific professor
def create_course_by_professor_document(parse_data):
    collection = db.course_professors
    course_id = parse_data.get("course_id")
    professor = parse_data.get("professor")
    difficulty = parse_data.get("difficulty")
    learning = parse_data.get("learning")
    teaching_effectiveness = parse_data.get("teaching_effectiveness")

    course_by_professor_document = {
        "course_id": course_id,
        "professor": professor,
        "difficulty": difficulty,
        "learning": learning,
        "teaching_effectiveness": teaching_effectiveness
    }

    result = collection.insert_one(course_by_professor_document)
    return result.inserted_id


def get_all_posts():
    posts = db.posts.find()
    return [json.loads(json_util.dumps(post)) for post in posts]
# ---- endpoints ----- #

# home route


@app.route("/api/")
@cross_origin()
def welcome_page():
    response = jsonify(message="Simple server is running")
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@app.route("/api/courses/<course_id>", methods=["POST"])
@cross_origin()
def post_post(course_id):
    post_data = request.get_json(force=True)
    post = create_post_document(post_data)
    db.users.update_one(
        {"firebase_UID": post.get("firebase_UID")},  # query
        {"$push": {"posts": str(post.get("post_id"))}}  # update
    )
    return jsonify("post created successfully")


@app.route("/api/posts", methods=["GET"])
@cross_origin()
def get_posts():
    posts = get_all_posts()
    return jsonify(posts)


@app.route("/api/posts/<post_id>", methods=["DELETE"])
@cross_origin()
def delete_post(post_id):
    db.posts.delete_one({"post_id": post_id})
    return "post deleted successfully"


@app.route("/api/posts/<post_id>", methods=["PATCH"])
@cross_origin()
def patch_post(post_id):
    db.posts.delete_one({"post_id": post_id})
    create_post_document(
        request.get_json(force=True))
    return "post updated successfully"


@app.route("/api/posts/latest", methods=["GET"])
@cross_origin()
def get_latest_posts():
    number = 6
    if "number" in request.args:
        number = int(request.args["number"])

    posts = get_all_posts()

    posts.sort(key=lambda post: post["timestamp"]["$date"])
    return posts[-1::-1][:number]


# Get posts by user id
@app.route("/api/<firebase_UID>/posts", methods=["GET"])
@cross_origin()
def get_posts_by_id(firebase_UID):
    user = db.users.find_one({"firebase_UID": firebase_UID})
    # send back error message if user id is wrong
    if not user:
        return jsonify({"error": "User not found"}), 404
    posts = user.get("posts", [])
    return jsonify(posts)


@app.route("/api/<course_id>/posts", methods=["GET"])
@cross_origin()
def get_posts_by_course(course_id):
    course = db.courses.find_one({"course_id": course_id})
    if not course:
        return jsonify({"error": "Course not found"}), 404

    posts = course.get("posts", [])
    return jsonify(posts)

# -- routes for users -- #


@app.route("/api/users", methods=["POST"])
@cross_origin()
def post_user():
    user_data = request.get_json(force=True)
    create_user_document(user_data)
    return jsonify("user created successfully")


@app.route("/api/users", methods=["GET"])
@cross_origin()
def get_users():
    users = get_all_users_data()
    return jsonify(users)


def get_all_users_data():
    users = db.users.find()
    return [json.loads(json_util.dumps(user)) for user in users]


@app.route("/api/users/<firebase_UID>", methods=["DELETE"])
@cross_origin()
def delete_user(firebase_UID):
    db.users.delete_one({"firebase_UID": firebase_UID})
    return "user deleted successfully"


# -- routes for courses -- #
# create a new course
@app.route("/api/courses", methods=["POST"])
@cross_origin()
def post_courses():
    course_data = request.get_json(force=True)
    create_course_document(course_data)
    return jsonify({"message": "Course created successfully", "course_id": course_data}), 201

# create course by professor


@app.route("/api/courses/professor/<course_id>", methods=["POST"])
@cross_origin()
def post_professor(course_id):
    professor_data = request.get_json(force=True)

    url_course_id = course_id.lower().strip()
    data_course_id = professor_data.get("course_id").lower().strip()
    if data_course_id != url_course_id:
        return jsonify({"error": "Course ID mismatch"}), 400
    course_by_professor_id = create_course_by_professor_document(
        professor_data)

    db.courses.update_one(
        {"course_id": course_id},  # query
        {"$push": {"course_by_professors": str(
            course_by_professor_id)}}  # update
    )

    return jsonify({"message": "Professor added successfully"}), 201


@app.route("/api/courses", methods=["GET"])
@cross_origin()
def get_courses():
    courses = get_all_courses()
    return jsonify(courses)


@app.route("/api/courses/<course_id>", methods=["GET"])
@cross_origin()
def get_course(course_id):
    course = db.courses.find_one({"course_id": course_id})
    if not course:
        return jsonify({"error": "Course not found"}), 404

    return json.loads(json_util.dumps(course))


def get_all_courses():
    courses = db.courses.find()
    return [json.loads(json_util.dumps(course)) for course in courses]


# get course by professor information given course_id and professor name
@app.route("/api/courses/<course_id>/<professor_id>", methods=["GET"])
@cross_origin()
def get_course_by_professor(course_id, professor_id):
    course_by_professor = db.course_professors.find(
        {"course_id": course_id, "_id": ObjectId(professor_id)})
    if not course_by_professor:
        return jsonify({"error": "Professor not found"}), 404

    return json.loads(json_util.dumps(course_by_professor))
