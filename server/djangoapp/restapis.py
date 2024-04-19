"""
    RestApi function to get results from backend docker &
    sentiment_analyzer_url docker images API's
"""
import os
from dotenv import load_dotenv
import requests

load_dotenv()

backend_url = os.getenv(
    'backend_url', default="http://localhost:3030")
sentiment_analyzer_url = os.getenv(
    'sentiment_analyzer_url',
    default="http://localhost:5050/")


def get_request(endpoint, **kwargs):
    """
        Backend request function with url endpoint &
        kwargs for params variables
    """
    params = ""
    if kwargs:
        for key, value in kwargs.items():
            params = params+key+"="+value+"&"

    request_url = backend_url+endpoint+"?"+params

    print(f"GET from {request_url} ")

    try:
        # Call get method of requests library with URL and parameters
        response = requests.get(request_url, timeout=20)
        return response.json()
    except ValueError:
        # If any error occurs
        print("Network exception occurred")


def analyze_review_sentiments(text):
    """
        Sentiment_analyzer function
        return positive, nautral or negative
    """
    request_url = sentiment_analyzer_url+"/analyze/"+text
    try:
        # Call get method of requests library with URL and parameters
        response = requests.get(request_url, timeout=20)
        return response.json()
    except Exception as err:
        print(f"Unexpected {err=}, {type(err)=}")
        print("Network exception occurred")


def post_review(data_dict):
    """
        Like she said
    """
    request_url = backend_url+"/insert_review"
    try:
        response = requests.post(request_url, json=data_dict, timeout=20)
        print(response.json())
        return response.json()
    except ValueError:
        print("Network exception occurred")
