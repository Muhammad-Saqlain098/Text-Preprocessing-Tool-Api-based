# Text Preprocessing API using Flask and NLTK

This project implements a **configurable text preprocessing API** using **Python, Flask, and NLTK**.
It allows users to preprocess text dynamically by selecting different NLP operations through a JSON request.

The API supports common **Natural Language Processing (NLP) preprocessing steps** such as tokenization, stopword removal, stemming, lemmatization, and POS tagging.

---

## Project Objective

* Build a reusable **text preprocessing backend API**
* Apply core **NLP preprocessing techniques**
* Allow users to enable or disable preprocessing steps dynamically
* Return structured preprocessing results in JSON format

---

## Technologies Used

* Python 3
* Flask
* Flask-CORS
* NLTK (Natural Language Toolkit)
* Regular Expressions (re)
* JSON-based API communication

---

## NLP Operations Supported

The API supports the following preprocessing options:

| Operation           | Description                       |
| ------------------- | --------------------------------- |
| Lowercasing         | Converts text to lowercase        |
| Remove punctuation  | Removes punctuation symbols       |
| Remove numbers      | Removes numeric characters        |
| Remove extra spaces | Normalizes whitespace             |
| Tokenization        | Splits text into words            |
| Stopword removal    | Removes common English stopwords  |
| Stemming            | Reduces words to root form        |
| Lemmatization       | Converts words to dictionary form |
| POS tagging         | Assigns part-of-speech tags       |

Each option can be turned **on or off independently**.

---

## API Endpoints

### Home

**GET /**

```
http://localhost:5000/
```

Returns a simple message indicating that the API is running.

---

### Preprocess Text

**POST /preprocess**

#### Request Body (JSON):

```json
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
```

---

#### Response (JSON):

```json
{
  "processed_text": "natur languag process interest",
  "tokens": ["natural", "language", "processing", "interesting"],
  "stemmed_words": ["natur", "languag", "process", "interest"],
  "lemmatized_words": null,
  "pos_tags": [["natural", "JJ"], ["language", "NN"], ["processing", "NN"], ["interesting", "JJ"]],
  "original_length": 46,
  "processed_length": 33
}
```

---

## How It Works

1. User sends raw text with preprocessing options
2. API applies selected NLP operations sequentially
3. Results are returned with:

   * Processed text
   * Tokens
   * Stemmed / lemmatized words (if enabled)
   * POS tags (if enabled)
   * Original and processed text length

NLTK resources are automatically downloaded if not available.

---

## How to Run the Project

### Install Dependencies

```bash
pip install flask flask-cors nltk
```

### Run the Server

```bash
python app.py
```

### Access API

```
http://localhost:5000
```

---

## Project Structure

```
├── app.py
├── README.md
```

---

## Key Highlights

* Modular and configurable preprocessing pipeline
* Supports multiple NLP techniques in one API
* Automatic NLTK resource handling
* Suitable for frontend or ML pipeline integration
* Beginner-friendly and educational

---

## Use Cases

* NLP preprocessing service
* Machine learning text pipelines
* Academic NLP demonstrations
* Backend support for sentiment analysis or classification
* Data cleaning for text analytics

---

## Learning Outcomes

* Understanding NLP preprocessing steps
* Practical experience with NLTK
* Building REST APIs using Flask
* Handling configurable data processing pipelines
* JSON-based client-server communication

---

## Author

**Muhammad Abdullah Nazir**
AI | Machine Learning | NLP | Python | Flask

