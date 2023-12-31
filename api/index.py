from dotenv import load_dotenv, find_dotenv
import os
import certifi
from flask import Flask, jsonify, request
from pymongo import MongoClient, ReturnDocument
from bson.objectid import ObjectId
from bson import json_util
import json
import sys
from flask_cors import CORS, cross_origin
from datetime import datetime


load_dotenv(find_dotenv())

pw = os.environ.get("MONGO_PW")
un = os.environ.get("MONGO_USER")

connect_str = f"mongodb+srv://{un}:{pw}@forum-backend.ipia6hh.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(connect_str, tlsCAFile=certifi.where(), maxPoolSize=425)

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

    uid = parse_data.get("uid")
    major = parse_data.get("major")
    year = parse_data.get("year")
    doc = {
        "username": username,
        "uid": uid,
        "major": major,
        "year": year,
        "posts": [],
        "replies": [],
    }
    collection.insert_one(doc)


def create_post_document(parse_data):
    collection = db.posts

    uid = parse_data.get("uid")
    course_id = parse_data.get("course_id")
    timestamp = datetime.utcnow()
    post_title = parse_data.get("post_title")
    content = parse_data.get("content")
    replies = parse_data.get("replies")
    likes = parse_data.get("likes")
    views = 1
    dislikes = parse_data.get("dislikes")
    is_reply = parse_data.get("is_reply", False)
    parent_postID = None

    if is_reply:
        parent_postID = parse_data.get("parent_postID")

    doc = {
        "post_id": str(ObjectId()),
        "timestamp": timestamp,
        "uid": uid,
        "post_title": post_title,
        "content": content,
        "replies": replies,
        "views": views,
        "likes": likes,
        "dislikes": dislikes,
        "course_id": course_id,
        "is_reply": is_reply,
        "parent_postID": parent_postID

    }
    collection.insert_one(doc)
    return doc


def create_course_document(parse_data):
    collection = db.courses
    course_id = parse_data.get("course_id")
    course_title = parse_data.get("course_title")
    professors = parse_data.get("professor")
    posts = parse_data.get("posts")

    # Add course-by-professors
    course_document = {
        "course_id": course_id,
        "course_title": course_title,
        "professor": professors,
        "posts": posts,
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


# ---routes for posts--- #
@app.route("/api/courses/<course_id>", methods=["POST"])
@cross_origin()
def post_post(course_id):
    course_id = course_id.upper()
    post_data = request.get_json(force=True)
    post = create_post_document(post_data)
    db.users.update_one(
        {"uid": post.get("uid")},  # query
        {"$push": {"posts": str(post.get("post_id"))}}  # update
    )

    db.courses.update_one(
        {"course_id": course_id},
        {"$push": {"posts": str(post.get("post_id"))}}
    )

    # post = db.posts.find_one({"post_id": post.get("post_id")})
    return jsonify({"message": "post created successfully", "post_id": post.get("post_id")}), 201


@app.route("/api/posts", methods=["GET"])
@cross_origin()
def get_posts():
    posts = get_all_posts()
    return jsonify(posts)


@app.route("/api/posts/<post_id>", methods=["DELETE"])
@cross_origin()
def delete_post(post_id):
    post = db.posts.find({"post_id": post_id})
    # If the post is a reply, remove it from the parent post's replies array
    if post["is_reply"]:
        parent_post_id = post["parent_postID"]
        db.posts.update_one({"post_id": parent_post_id}, {
                            "$pull": {"replies": post_id}})

    db.posts.delete_one({"post_id": post_id})
    return "post deleted successfully"


@app.route("/api/posts/<post_id>", methods=["PATCH"])
@cross_origin()
def patch_post(post_id):
    # db.posts.delete_one({"post_id": post_id})
    updates = request.get_json(force=True)
    db.posts.find_one_and_update({"post_id": post_id}, {"$set": updates})
    # create_post_document(
    #     request.get_json(force=True))
    updated_post = db.posts.find_one({"post_id": post_id})
    if updated_post is None:
        return jsonify({'post': None}), 404
    return json.loads(json_util.dumps(updated_post))


@app.route("/api/posts/<post_id>/like", methods=["GET"])
@cross_origin()
def get_post_like(post_id):
    post = db.posts.find_one({"post_id": post_id})
    return json.loads(json_util.dumps(post))


@app.route("/api/posts/<post_id>/like", methods=["PATCH"])
@cross_origin()
def like_post(post_id):
    action = request.get_json(force=True).get('action')
    # updated_post = None
    # if action == "like":
    #     updated_post = db.posts.find_one_and_update(
    #         {"post_id": post_id},
    #         {"$inc": {"likes": 1}},
    #         return_document=ReturnDocument.AFTER
    #     )
    # elif action == "unlike":
    #     updated_post = db.posts.find_one_and_update(
    #         {"post_id": post_id},
    #         {"$inc": {"likes": -1}},
    #         return_document=ReturnDocument.AFTER
    #     )

    # if updated_post is None:
    #     return jsonify({'post': None}), 404

    # return json.loads(json_util.dumps(updated_post))
    update = {}
    if action == True:
        update = {"$inc": {"likes": 1}}
    else:
        update = {"$inc": {"likes": -1}}

    db.posts.find_one_and_update({"post_id": post_id}, update,
                                 return_document=ReturnDocument.AFTER)

    updated_post = db.posts.find_one({"post_id": post_id})
    if updated_post is None:
        return jsonify({'post': None}), 404
    return json.loads(json_util.dumps(updated_post))


@app.route("/api/posts/<post_id>/dislike", methods=["PATCH"])
@cross_origin()
def dislike_post(post_id):
    action = request.get_json(force=True).get('action')
    # updated_post = None
    # if action == True:
    #     updated_post = db.posts.find_one_and_update(
    #         {"post_id": post_id},
    #         {"$inc": {"dislikes": 1}},
    #         return_document=ReturnDocument.AFTER
    #     )
    # elif action == False:
    #     updated_post = db.posts.find_one_and_update(
    #         {"post_id": post_id},
    #         {"$inc": {"dislikes": -1}},
    #         return_document=ReturnDocument.AFTER
    #     )

    # if updated_post is None:
    #     return jsonify({'post': None}), 404

    # return json.loads(json_util.dumps(updated_post))
    if action == True:
        update = {"$inc": {"dislikes": 1}}
    elif action == False:
        update = {"$inc": {"dislikes": -1}}

    db.posts.find_one_and_update({"post_id": post_id}, update)

    updated_post = db.posts.find_one({"post_id": post_id})
    if updated_post is None:
        return jsonify({'post': None}), 404
    return json.loads(json_util.dumps(updated_post))


@app.route("/api/posts/<post_id>/view", methods=["PATCH"])
@cross_origin()
def view_post(post_id):
    updated_post = db.posts.find_one_and_update(
        {"post_id": post_id},
        {"$inc": {"views": 1}},
        return_document=ReturnDocument.AFTER
    )

    if updated_post is None:
        return jsonify({'post': None}), 404

    return json.loads(json_util.dumps(updated_post))


@app.route("/api/posts/latest", methods=["GET"])
@cross_origin()
def get_latest_posts():
    number = 5
    if "number" in request.args:
        number = int(request.args["number"])
    posts = get_all_posts()
    validPosts = []
    for post in posts:
        if not post:
            continue
        if "likes" not in post or "timestamp" not in post:
            continue
        validPosts.append(post)
    validPosts.sort(key=lambda post: (
        post["likes"] if post["likes"] else 1), reverse=True)
    trending_posts = validPosts[:number]
    return jsonify(trending_posts)


@app.route("/api/posts/<post_id>", methods=["GET"])
@cross_origin()
def get_post_by_id(post_id):
    post = db.posts.find_one({"post_id": post_id})
    if post is None:
        return jsonify({'post': None}), 404
    return json.loads(json_util.dumps(post))


# --- routes for replies --- #
@app.route("/api/posts/<post_id>/comments", methods=["POST"])
@cross_origin()
def post_comment(post_id):
    comment_data = request.get_json(force=True)
    comment = create_post_document(comment_data)
    db.users.update_one(
        {"uid": comment.get("uid")},  # query
        {"$push": {"posts": str(comment.get("post_id"))}}  # update
    )

    db.posts.update_one(
        {"post_id": post_id},
        {"$push": {"replies": str(comment.get("post_id"))}}
    )

    # post = db.posts.find_one({"post_id": post.get("post_id")})
    # return jsonify({"message": "comment created successfully", "post_id": comment.get("post_id")}), 201
    return json.loads(json_util.dumps(comment)), 201


@app.route("/api/posts/<post_id>/comments", methods=["GET"])
@cross_origin()
def get_comments_by_id(post_id):
    post = db.posts.find_one({"post_id": post_id})
    if post is None:
        return jsonify({'post': None}), 404
    return json.loads(json_util.dumps(post["replies"]))


# @app.route("/api/posts/latest", methods=["GET"])
# @cross_origin()
# def get_latest_posts():
#     number = 6
#     if "number" in request.args:
#         number = int(request.args["number"])

#     posts = get_all_posts()
#     print(posts, file=sys.stderr)
#     posts.sort(key=lambda post: post["likes"])
#     return posts[-1::-1][:number]


# Get posts by user id
@app.route("/api/<uid>/posts", methods=["GET"])
@cross_origin()
def get_posts_by_id(uid):
    user = db.users.find_one({"uid": uid})
    # if not user:
    #     return jsonify({"error": "User not found"}), 404
    posts = user.get("posts", [])
    return jsonify(posts)


@app.route("/api/courses/<course_id>/posts", methods=["GET"])
@cross_origin()
def get_posts_by_course(course_id):
    course = db.courses.find_one(
        {"course_id": {"$regex": f"^{course_id}$", "$options": 'i'}})
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


@app.route("/api/users/<uid>", methods=["DELETE"])
@cross_origin()
def delete_user(uid):
    db.users.delete_one({"uid": uid})
    return "user deleted successfully"


@app.route("/api/users/<uid>", methods=["GET"])
@cross_origin()
def get_user(uid):
    data = db.users.find_one({"uid": uid})
    if data is not None:
        return json.loads(json_util.dumps(data))
    else:
        return jsonify({"error": "User not found"}), 404


# -- routes for courses -- #
# create a new course
@app.route("/api/courses", methods=["POST"])
@cross_origin()
def post_courses():
    course_data = request.get_json(force=True)
    create_course_document(course_data)
    return jsonify({"message": "Course created successfully", "course_id": course_data}), 201

# create course by professor


# @app.route("/api/courses/professor/<course_id>", methods=["POST"])
# @cross_origin()
# def post_professor(course_id):
#     professor_data = request.get_json(force=True)

#     url_course_id = course_id.lower().strip()
#     data_course_id = professor_data.get("course_id").lower().strip()
#     if data_course_id != url_course_id:
#         return jsonify({"error": "Course ID mismatch"}), 400
#     course_by_professor_id = create_course_by_professor_document(
#         professor_data)

#     db.courses.update_one(
#         {"course_id": course_id},  # query
#         {"$push": {"course_by_professors": str(
#             course_by_professor_id)}}  # update
#     )

#     return jsonify({"message": "Professor added successfully"}), 201


@app.route("/api/courses", methods=["GET"])
@cross_origin()
def get_courses():
    courses = get_all_courses()
    return jsonify(courses)


@app.route("/api/courses/<course_id>", methods=["GET"])
@cross_origin()
def get_course(course_id):
    course = db.courses.find_one(
        {"course_id": {"$regex": f'^{course_id}$', "$options": 'i'}})
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


@app.route("/api/professors", methods=["POST"])
@cross_origin()
def post_professor():
    professor_data = request.get_json(force=True)
    db.professors.insert_one(professor_data)
    return jsonify({"message": "Professor added successfully"})


@app.route("/api/professors/<prof_id>", methods=["GET"])
@cross_origin()
def get_professor_by_id(prof_id):
    prof_data = db.professors.find_one({"prof_id": prof_id})
    return json.loads(json_util.dumps(prof_data))
