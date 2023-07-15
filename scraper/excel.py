import pandas as pd
import os
import requests
downloads_folder = os.path.expanduser("~/Downloads")
files = os.listdir(downloads_folder)
QUESTION_MAP = {
    'nan': 'unused',
    'The syllabus was accurate and helpful in delineating expectations and course outcomes.': 'syllabus',
    'Required and additional course materials were helpful in achieving course outcomes.': 'course-material',
    'In-class sessions were helpful for learning.': 'in-class',
    'Out-of-class assignments and/or fieldwork were helpful for learning.': 'assignments',
    'This course was intellectually challenging.': 'challenging',
    'I learned a lot in this course.': 'learning',
    'The instructor came to class prepared to teach.': 'prepared',
    'The instructor used class time effectively.': 'efficient',
    'The instructor clearly communicated ideas and information.': 'communication',
    'The instructor provided sufficient feedback.': 'feedback',
    'The instructor fairly evaluated my performance.': 'fair',
    'The instructor was available to assist students outside of class.': 'out-class',
    'The instructor facilitated a respectful and inclusive learning environment.': 'inclusive',
    'The instructor displayed enthusiasm for the course.': 'enthusiasm',
    "What is your overall rating of this instructor's teaching effectiveness?": 'overall',
    'Online course materials were organized to help me navigate through the course week by week.': 'online-material',
    'Online interactions with my instructor created a sense of connection in the virtual classroom.': 'interaction',
    'Online course interactions created a sense of community and connection to my classmates.': 'community',
    'I had the necessary computer skills and technology to successfully complete the course.': 'computer-skills',
    'How often did you attend this class both in-person and remotely?': 'attend',
    'The number of hours per week I devoted to this course outside scheduled class meeting times.': 'hours'}
COURSES = {}
PROFESSORS = {}

for file in files:
    file_path = os.path.join(downloads_folder, file)
    if not file.endswith(".xls"):
        continue
    xls = pd.ExcelFile(file_path)
    df = pd.read_excel(xls, "Evaluations Summary")
    df2 = pd.read_excel(xls, "All Responses")
    course = df["Northeastern University Online Course Evaluations Course Evaluations Fall 2022"][1].split(
        " ")
    professor = df["Northeastern University Online Course Evaluations Course Evaluations Fall 2022"][2]

    courseID = course[0] + "" + course[1]
    courseName = ' '.join(course[2:-2])[:-1]
    enrollment = df["Unnamed: 1"][4]
    completed = df["Unnamed: 1"][5]
    ratingInfo = df["Northeastern University Online Course Evaluations Course Evaluations Fall 2022"]
    meanCol1 = df["Unnamed: 6"]
    meanCol2 = df["Unnamed: 7"]
    ratings = {}
    for i in range(10, 31):
        if i in [14, 25, 26, 27, 29]:
            continue
        if i < 14:
            ratings[ratingInfo[i]] = meanCol2[i]
        else:
            ratings[ratingInfo[i]] = meanCol1[i]
    first = df2["Northeastern University Online Course Evaluations Course Evaluations Fall 2022"]
    all_ratings = {}
    try:
        for each in df2.iloc[8]:
            if isinstance(each, str):
                all_ratings[QUESTION_MAP[each]] = []

        for i in range(9, len(first)):
            j = 1
            for k in range(1, len(df2.iloc[i][1:])):
                if isinstance(df2.iloc[i][k], int):
                    all_ratings[QUESTION_MAP[df2.iloc[8][j]]].append(
                        df2.iloc[i][k])
                j += 1
        prof_id = '-'.join(professor.lower().split(" "))
        if prof_id in PROFESSORS:
            if courseID not in PROFESSORS[prof_id]["courses"]:
                PROFESSORS[prof_id]["courses"].append(courseID)
            for rating in all_ratings:
                PROFESSORS[prof_id]["ratings"][rating] += all_ratings[rating]

        else:
            PROFESSORS[prof_id] = {
                "name": professor,
                "prof_id": prof_id,
                "courses": [],
                "ratings": {}
            }
            for rating in all_ratings:
                PROFESSORS[prof_id]["ratings"][rating] = all_ratings[rating]
    except:
        continue
    if courseID in COURSES and professor not in COURSES[courseID]["professor"]:
        COURSES[courseID]["professor"].append(professor)
    else:
        COURSES[courseID] = {
            "course_id": courseID,
            "course_title": courseName,
            "professor": [professor],
            "posts": [],
            "course_by_professors": []
        }

# print(PROFESSORS["virgil-pavlu"])
# print(COURSES)
# for course in COURSES:
#     # if COURSES[course]["course_id"] == "CS5004":
#     #     print(COURSES[course])
#     # if "Keith Bagley" in COURSES[course]["professor"]:
#     #     print(COURSES[course])
#     response = requests.post(
#         "https://www.khourychat.com/api/courses", json=COURSES[course])
#     print("Added course: ", COURSES[course]["course_id"])

for professor in PROFESSORS:
    if PROFESSORS[professor]:
        print(PROFESSORS[professor])
        response = requests.post(
            "https://www.khourychat.com/api/professors", json=PROFESSORS[professor])
        print("Added professor: ", PROFESSORS[professor]["name"])
