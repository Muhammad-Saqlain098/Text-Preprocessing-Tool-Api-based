from flask import Flask, request, jsonify
from flask_cors import CORS
import re
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer, WordNetLemmatizer
from nltk import pos_tag

# Download required NLTK data
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

try:
    nltk.data.find('taggers/averaged_perceptron_tagger')
except LookupError:
    nltk.download('averaged_perceptron_tagger')

try:
    nltk.data.find('corpora/wordnet')
except LookupError:
    nltk.download('wordnet')

try:
    nltk.data.find('corpora/omw-1.4')
except LookupError:
    nltk.download('omw-1.4')

app = Flask(__name__)
CORS(app)

# Initialize stemmer and lemmatizer
stemmer = PorterStemmer()
lemmatizer = WordNetLemmatizer()

def preprocess_text(text, options):
    result = text
    tokens = []
    pos_tags = []
    stemmed_words = []
    lemmatized_words = []
    
    # Convert to lowercase
    if options.get('lowercase'):
        result = result.lower()
    
    # Remove punctuation
    if options.get('remove_punctuation'):
        result = re.sub(r'[^\w\s]', '', result)
    
    # Remove numbers
    if options.get('remove_numbers'):
        result = re.sub(r'\d+', '', result)
    
    # Remove extra spaces
    if options.get('remove_extra_spaces'):
        result = ' '.join(result.split())
    
    # Tokenize (required for most operations)
    if options.get('tokenize') or options.get('remove_stopwords') or options.get('stemming') or options.get('lemmatization') or options.get('pos_tagging'):
        tokens = word_tokenize(result)
    
    # Remove stopwords
    if options.get('remove_stopwords'):
        stop_words = set(stopwords.words('english'))
        tokens = [word for word in tokens if word.lower() not in stop_words]
        result = ' '.join(tokens)
    
    # Stemming
    if options.get('stemming') and tokens:
        stemmed_words = [stemmer.stem(word) for word in tokens]
        result = ' '.join(stemmed_words)
    
    # Lemmatization
    if options.get('lemmatization') and tokens:
        lemmatized_words = [lemmatizer.lemmatize(word) for word in tokens]
        result = ' '.join(lemmatized_words)
    
    # POS Tagging
    if options.get('pos_tagging') and tokens:
        pos_tags = pos_tag(tokens)
    
    return {
        'processed_text': result,
        'tokens': tokens if tokens else None,
        'stemmed_words': stemmed_words if stemmed_words else None,
        'lemmatized_words': lemmatized_words if lemmatized_words else None,
        'pos_tags': pos_tags if pos_tags else None,
        'original_length': len(text),
        'processed_length': len(result)
    }

@app.route('/preprocess', methods=['POST'])
def preprocess():
    data = request.json
    text = data.get('text', '')
    options = data.get('options', {})
    
    if not text:
        return jsonify({'error': 'No text provided'}), 400
    
    result = preprocess_text(text, options)
    return jsonify(result)

@app.route('/', methods=['GET'])
def home():
    return "Text Preprocessing API is running! 🚀"

if __name__ == '__main__':
    print("Starting server on http://localhost:5000")
    app.run(debug=True, port=5000)