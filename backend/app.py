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
course_professors = db.course_professors


app = Flask(__name__)
# -- connect to database -- #
def connect_to_db():
    pass

# insert user
def create_user_document(parse_data):
    collection = db.users

    username = parse_data.get("username")
    #check if username is unique
    if collection.find_one({"username":username}):
        raise ValueError(f"Username {username} is already in use")


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
    #Add user_id
    firebase_UID = parse_data.get("firebase_UID")
    doc = {
        "post_id": post_id, 
           "timestamp": timestamp, 
           "username": username, 
           "firebase_UID": firebase_UID, 
           "post_title": post_title, 
           "of_reply": of_reply, 
           "content": content,
           "replies": replies,
           "likes": likes,
           "dislikes": dislikes
           }
    collection.insert_one(doc)
    


def create_course_document(parse_data):
    collection = db.courses
    print(parse_data)
    course_id = parse_data.get("course_id")
    course_title = parse_data.get("course_title")
    professors = parse_data.get("professor")
    #Add course-by-professors
    course_document = {
        "course_id": course_id,
        "course_title": course_title,
        "professor": ["Professor Bagley", "Professor etc.."],
        "posts": [{"post_id": "57"}],
        "course_by_professors":[]
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



# Get posts by user id
@app.route("/<firebase_UID>/posts", methods = ["GET"])
def get_posts_by_id(firebase_UID):
    user = db.users.find_one({"firebase_UID": firebase_UID})
    # send back error message if user id is wrong
    if not user:
        return jsonify({"error": "User not found"}), 404
    #post_ids = user.get("posts", [])
    #posts = db.posts.find({"post_id": {"$in": post_ids}})
    posts = user.get("posts",[])
    return jsonify(posts)

#Get posts by course id
@app.route("/<course_id>/posts", methods = ["GET"])
def get_posts_by_course(course_id):
    course = db.courses.find_one({"course_id": course_id})
    if not course:
        return jsonify({"error": "Course not found"}), 404

    #post_ids = user.get("posts", [])
    #posts = db.posts.find({"post_id": {"$in": post_ids}})
    posts = course.get("posts",[])
    return jsonify(posts)


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
#create a new course
@app.route("/courses", methods = ["POST"])
def post_courses():
    course_data = request.args
    create_course_document(course_data)
    return jsonify({"message": "Course created successfully", "course_id": course_data}), 201

#create course by professor
@app.route("/courses/<course_id>", methods = ["POST"])
def post_professor(course_id):
    professor_data = request.args

    url_course_id = course_id.lower().strip()
    data_course_id = professor_data.get("course_id").lower().strip()
    if data_course_id != url_course_id:
        return jsonify({"error": "Course ID mismatch"}), 400
    course_by_professor_id = create_course_by_professor_document(professor_data)

    db.courses.update_one(
        {"course_id":course_id}, #query
        {"$push":{"course_by_professors": str(course_by_professor_id)}} #update
    )

    return jsonify({"message": "Professor added successfully"}),201


@app.route("/courses", methods = ["GET"])
def get_courses():
    courses = get_all_courses()
    return jsonify(courses)


@app.route("/courses/<course_id>", methods = ["GET"])
def get_course(course_id):
    course = db.courses.find_one({"course_id": course_id})
    if not course:
        return jsonify({"error": "Course not found"}), 404

    #post_ids = user.get("posts", [])
    #posts = db.posts.find({"post_id": {"$in": post_ids}})
    return json.loads(json_util.dumps(course))



def get_all_courses():
    courses = db.courses.find()
    return [json.loads(json_util.dumps(course)) for course in courses]

# if __name__ == "__main__":
#     app.run(host="0.0.0.0", debug=True)
