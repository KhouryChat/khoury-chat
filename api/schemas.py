# def create_user_document():
#     collection = db.users
#     user_document = {
        # "username": "chase",
        # "firebase_UID": "5837", 
        # "major": "computer science",
        # "year" : "MS",
        # "posts": [{"post_id": 25}],
        # "replies": [{"reply_id": 30}]
#     }
#     collection.insert_one(user_document)
# create_user_document()

# def create_post_document():
#     collection = db.posts
#     post_document = {
#         "post_id": "984",
#         "timestamp" : "15:30",
#         "username": "reference from users",
#         "post_title": "my first post", 
#         "of_reply" : False,
#         "content": ["today...."],
#         "replies": [{"post_id": 30}],
#         "likes": "74",
#         "dislikes": "384"
#     }
#     collection.insert_one(post_document)
# create_post_document()