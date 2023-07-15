from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from dotenv import load_dotenv
import requests
import os
from urllib.parse import urlparse, parse_qs, urlunparse


load_dotenv()
USERNAME = os.getenv('neu_user')
PASSWORD = os.getenv('neu_pass')


def scrape_course():
    # cookies = [{'domain': '.applyweb.com', 'expiry': 1689518288, 'httpOnly': False, 'name': '_gid', 'path': '/', 'sameSite': 'Lax', 'secure': False, 'value': 'GA1.2.1489675217.1689431887'}, {'domain': '.applyweb.com', 'httpOnly': False, 'name': 'awBrowserCheck', 'path': '/', 'sameSite': 'None', 'secure': True, 'value': 'true'}, {'domain': '.applyweb.com', 'httpOnly': True, 'name': 'sdbid', 'path': '/', 'sameSite': 'None', 'secure': True, 'value': '36892'}, {'domain': '.applyweb.com', 'expiry': 1723991888, 'httpOnly': False, 'name': '_ga', 'path': '/', 'sameSite': 'Lax', 'secure': False, 'value': 'GA1.2.691658280.1689431887'}, {'domain': 'www.applyweb.com', 'httpOnly': True, 'name': 'JSESSIONID', 'path': '/eval/', 'sameSite': 'Lax', 'secure': False, 'value': 'F98A3EC011957F5711EECCB7952EB7DD'}, {'domain': 'www.applyweb.com', 'httpOnly': False, 'name': 'BIGipServerp-eval.applyweb.com', 'path': '/', 'sameSite': 'Lax', 'secure': False, 'value': '672401162.36895.0000'}, {'domain': '.applyweb.com', 'httpOnly': False, 'name': 'dtCookie', 'path': '/', 'sameSite': 'Lax', 'secure': False, 'value': 'v_4_srv_2_sn_9D6F157A8F096DCA5255B5784A78F5C4_perc_100000_ol_0_mul_1_app-3Aea7c4b59f27d43eb_0'},
    #            {'domain': '.applyweb.com', 'httpOnly': True, 'name': 'sid', 'path': '/', 'sameSite': 'None', 'secure': True, 'value': ''}, {'domain': '.applyweb.com', 'httpOnly': False, 'name': 'Blaze', 'path': '/', 'sameSite': 'Lax', 'secure': False, 'value': 'ZLKvTZcLY7eZtKPgI4nwLwAcjgc'}, {'domain': '.applyweb.com', 'expiry': 1723991888, 'httpOnly': False, 'name': '_ga_L6DBD46RX8', 'path': '/', 'sameSite': 'Lax', 'secure': False, 'value': 'GS1.2.1689431887.1.1.1689431888.59.0.0'}, {'domain': '.applyweb.com', 'expiry': 1689431947, 'httpOnly': False, 'name': '_gat', 'path': '/', 'sameSite': 'Lax', 'secure': False, 'value': '1'}, {'domain': 'www.applyweb.com', 'httpOnly': True, 'name': '_shibsession_6576616c2d6e657568747470733a2f2f636f72702e636f6c6c6567656e65742e636f6d2f73686962626f6c6574682d73702f', 'path': '/', 'sameSite': 'Lax', 'secure': True, 'value': '_72f89faac1843bd3aed36edbfc7c9f8a'}, {'domain': '.applyweb.com', 'httpOnly': False, 'name': 'workingTermCookie', 'path': '/eval', 'sameSite': 'Lax', 'secure': False, 'value': 'd29ya2luZ1Rlcm1Db29raWU6MTY0'}]

    # with open("cookies.txt", 'r') as file:
    #     cookies = file.read()
    query = {
        'embedded': 'true',
        'service': 'QuantitativeXls',
        'sp': [74790, 577, 155]
    }
    url = 'https://www.applyweb.com/eval/EvalGatekeeper/EvalGatekeeper'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_4_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
    }
    # session = requests.Session()
    # session.cookies.set(
    #     "sid", "v8jQlK6$rGv|TJ30dXVCE_RJbPOK_.C1DRZ8-BiNRo!Y*SGFyKnGH7MNRu*WU|6eh$.sSzMPlCvkogeBhNWk81p-msDDYtAe0iM~thLuKEwPa^M~tX4kINYyjsUJ^Up$")
    # session.cookies.set(
    #     "sdbid", '36892')
    # session.cookies.set(
    #     "awBrowserCheck", "true")

    # cookies = dict()
    # cookies["sid"] = "v8jQlK6$rGv|TJ30dXVCE_RJbPOK_.C1DRZ8-BiNRo!Y*SGFyKnGH7MNRu*WU|6eh$.sSzMPlCvkogeBhNWk81p-msDDYtAe0iM~thLuKEwPa^M~tX4kINYyjsUJ^Up$"
    # cookies["sdbid"] = "36892"
    # cookies["awBrowserCheck"] = "true"
    # cookies["JSESSIONID"] = "F98A3EC011957F5711EECCB7952EB7DD"
    cookies = {'sid': 'EfJV1!1TcaZ8vBuh1sgOHMWv4G23C|6qVBXC0Nf$CI^4vv2JvQZoP^pL44MkychJ8VBAwuS99Uh5G3|zhKud7Y-G^xS*RbF0tmCH26KgKgg_Za.LH4UCr90e7HCv~ehi',
               'sdbid': '36892', 'awBrowserCheck': 'true'}
    r = requests.get(url, query,
                     cookies=cookies, headers=headers)
    print(r.text)
    print(r.status_code)


def convert_url(original_url):
    # Parse the original URL
    parsed_url = urlparse(original_url)
    query_params = parse_qs(parsed_url.query)

    # Modify the parsed URL with the desired parameters
    parsed_url = parsed_url._replace(
        path='/eval/EvalGatekeeper/EvalGatekeeper')
    query_params['service'] = ['QuantitativeXls']

    # Reconstruct the modified URL
    modified_url = urlunparse(parsed_url._replace(query='&'.join(
        f'{key}={value[0]}' for key, value in query_params.items())))

    return modified_url


def login(username, password):
    # global cookies
    # driver = webdriver.Chrome()

    # driver.get("https://www.applyweb.com/eval/shibboleth/neu/36892")

    # WebDriverWait(driver, 5).until(
    #     EC.presence_of_element_located((By.ID, "username")))
    # driver.find_element(By.ID, "username").send_keys(username)
    # driver.find_element(By.ID, "password").send_keys(password)
    # driver.find_element(By.CLASS_NAME, "form-button").click()

    # WebDriverWait(driver, 30).until(EC.title_contains("My Evaluations"))

    # driver.get("https://www.applyweb.com/eval/new/reportbrowser")

    # WebDriverWait(driver, 5).until(EC.title_contains(
    #     "Report Browser - Eval25"))

    # original_window = driver.current_window_handle

    # WebDriverWait(driver, 10).until(
    #     EC.frame_to_be_available_and_switch_to_it((By.ID, "contentFrame")))
    # with open("links.txt", "w") as ff:
    #     for i in range(1, 30):
    #         WebDriverWait(driver, 10).until(
    #             EC.presence_of_element_located((By.LINK_TEXT, "View")))
    #         links = driver.find_elements(By.LINK_TEXT, "View")
    #         for link in links:
    #             ff.write(link.get_attribute("href"))
    #             ff.write("\n")
    #             print(f"Parsing Page {i}")

    #         driver.find_element(By.LINK_TEXT, f"{i + 1}").click()

    # WebDriverWait(driver, 10).until(
    #     EC.frame_to_be_available_and_switch_to_it((By.ID, "contentFrame")))

    # WebDriverWait(driver, 5).until(EC.title_is("Eval25"))
    driver = webdriver.Chrome()

    driver.get("https://www.applyweb.com/eval/shibboleth/neu/36892")
    WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.ID, "username")))
    driver.find_element(By.ID, "username").send_keys(username)
    driver.find_element(By.ID, "password").send_keys(password)
    driver.find_element(By.CLASS_NAME, "form-button").click()
    WebDriverWait(driver, 20).until(EC.title_contains("My Evaluations"))
    i = 1
    with open("links.txt", 'r') as links:
        for link in links:
            i += 1
            if i > 378:
                driver.get(link)
    # try:
    #     # Wait for javascript redirect to happen

    #     WebDriverWait(driver, 5).until(EC.title_contains(
    #         "Report Browser - Eval25"))

    #     # WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, "tr.ng-scope")))
    #     cookies = dict()
    #     cookies["sid"] = driver.get_cookie("sid")["value"]
    #     cookies["sdbid"] = driver.get_cookie("sdbid")["value"]
    #     cookies["JSESSIONID"] = driver.get_cookie("JSESSIONID")["value"]
    #     cookies["awBrowserCheck"] = "true"
    #     return cookies
    # finally:
    #     driver.quit()


def auth_get(url, params, username, password, headers):
    cookies = login(username, password)

    r = requests.get(url, params, cookies=cookies, headers=headers)

    if r.status_code == 401:
        # Retry
        cookies = login(username, password)
        r = requests.get(url, params, cookies=cookies, headers=headers)
        if r.status_code == 401:
            raise Exception('Could not log in!')
    return r


if __name__ == "__main__":
    import sys
    # scrape_course()
    # url = 'https://www.applyweb.com/eval/EvalGatekeeper/EvalGatekeeper'
    # params = {
    #     'embedded': 'true',
    #     'service': 'QuantitativeXls',
    #     'sp': [74790, 577, 155]
    # }
    # headers = {
    #     'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_4_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
    # }
    # auth_get(url, params, "patel.neel5", "I want to be 21$", headers)
    login("patel.neel5", "I want to be 21$")
