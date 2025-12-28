This project presents a flexible and configurable Text Preprocessing REST API developed using Python, Flask, and NLTK.
The API enables users to perform multiple Natural Language Processing (NLP) preprocessing tasks on text by simply toggling options in a JSON request.

It is designed as a reusable backend service that can be integrated into machine learning pipelines, NLP applications, or frontend systems.

Project Purpose

The main goals of this project are:

To design a reusable NLP preprocessing backend

To implement essential text cleaning and normalization techniques

To allow dynamic control over preprocessing steps

To return well-structured JSON responses for downstream use

Technology Stack

The project uses the following tools and libraries:

Python 3

Flask – REST API framework

Flask-CORS – Cross-origin request handling

NLTK (Natural Language Toolkit) – NLP operations

Regular Expressions (re) – Text cleaning

JSON – API communication format

Supported NLP Preprocessing Features

Users can enable or disable each preprocessing step independently:

Feature	Functionality Description
Lowercasing	Converts all characters to lowercase
Punctuation Removal	Eliminates punctuation symbols
Number Removal	Removes numeric values
Whitespace Cleanup	Normalizes extra spaces
Tokenization	Splits text into individual words
Stopword Filtering	Removes common English stopwords
Stemming	Reduces words to their root form
Lemmatization	Converts words to dictionary base form
POS Tagging	Assigns grammatical tags to words

Each operation is optional and configurable via the request payload.

API Routes
Root Endpoint

GET /

http://localhost:5000/


Returns a confirmation message indicating that the API server is active.

Text Preprocessing Endpoint

POST /preprocess

Request Payload (JSON)
{
  "text": "Natural Language Processing is very interesting!",
  "options": {
    "lowercase": true,
    "remove_punctuation": true,
    "remove_numbers": true,
    "remove_extra_spaces": true,
    "tokenize": true,
    "remove_stopwords": true,
    "stemming": true,
    "lemmatization": false,
    "pos_tagging": true
  }
}

Sample Response (JSON)
{
  "processed_text": "natur languag process interest",
  "tokens": ["natural", "language", "processing", "interesting"],
  "stemmed_words": ["natur", "languag", "process", "interest"],
  "lemmatized_words": null,
  "pos_tags": [["natural", "JJ"], ["language", "NN"], ["processing", "NN"], ["interesting", "JJ"]],
  "original_length": 46,
  "processed_length": 33
}

Processing Workflow

The client sends raw text along with preprocessing preferences

The API applies selected NLP steps sequentially

The response includes:

Cleaned and processed text

Tokenized output

Stemmed or lemmatized words (if enabled)

Part-of-speech tags (if enabled)

Original vs processed text length

All required NLTK datasets are automatically downloaded if missing.

Running the Application
Install Required Packages
pip install flask flask-cors nltk

Start the Server
python app.py

Access the API
http://localhost:5000

Project Directory Layout
├── app.py
├── README.md

Notable Features

Highly modular preprocessing pipeline

Supports multiple NLP operations through a single endpoint

Dynamic configuration via JSON

Automatic handling of NLTK dependencies

Beginner-friendly code structure

Easily extendable for additional NLP features

Practical Applications

NLP preprocessing microservice

Text cleaning for machine learning models

Academic and educational NLP demonstrations

Backend for sentiment analysis or text classification

Data preparation for analytics and AI systems

Skills & Concepts Gained

Hands-on experience with NLP preprocessing techniques

Practical use of the NLTK library

REST API development with Flask

Building configurable data processing pipelines

Client–server communication using JSON

Author

Muhammad Saqlain
AI • Machine Learning • NLP • Python • Flask
