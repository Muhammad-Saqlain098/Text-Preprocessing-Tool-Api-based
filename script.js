const API_URL = 'http://localhost:5000/preprocess';

// POS Tag descriptions
const POS_DESCRIPTIONS = {
    'NN': 'Noun',
    'NNS': 'Noun Plural',
    'NNP': 'Proper Noun',
    'NNPS': 'Proper Noun Plural',
    'VB': 'Verb',
    'VBD': 'Verb Past',
    'VBG': 'Verb Gerund',
    'VBN': 'Verb Past Participle',
    'VBP': 'Verb Present',
    'VBZ': 'Verb 3rd Person',
    'JJ': 'Adjective',
    'JJR': 'Adjective Comparative',
    'JJS': 'Adjective Superlative',
    'RB': 'Adverb',
    'RBR': 'Adverb Comparative',
    'RBS': 'Adverb Superlative',
    'PRP': 'Pronoun',
    'PRP$': 'Possessive Pronoun',
    'DT': 'Determiner',
    'IN': 'Preposition',
    'CC': 'Conjunction',
    'TO': 'to',
    'CD': 'Number',
    'WP': 'Wh-pronoun',
    'WRB': 'Wh-adverb'
};

document.getElementById('processBtn').addEventListener('click', async () => {
    const inputText = document.getElementById('inputText').value;
    
    if (!inputText.trim()) {
        alert('⚠️ Please enter some text to process!');
        return;
    }

    // Get selected options
    const options = {
        lowercase: document.getElementById('lowercase').checked,
        remove_punctuation: document.getElementById('remove_punctuation').checked,
        remove_numbers: document.getElementById('remove_numbers').checked,
        remove_extra_spaces: document.getElementById('remove_extra_spaces').checked,
        tokenize: document.getElementById('tokenize').checked,
        remove_stopwords: document.getElementById('remove_stopwords').checked,
        stemming: document.getElementById('stemming').checked,
        lemmatization: document.getElementById('lemmatization').checked,
        pos_tagging: document.getElementById('pos_tagging').checked
    };

    try {
        // Show loading state
        const btn = document.getElementById('processBtn');
        btn.textContent = '⏳ Processing...';
        btn.disabled = true;

        // Call backend API
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: inputText,
                options: options
            })
        });

        if (!response.ok) {
            throw new Error('Server error');
        }

        const result = await response.json();

        // Display results
        document.getElementById('outputText').value = result.processed_text;
        
        // Display stats
        const statsDiv = document.getElementById('stats');
        statsDiv.innerHTML = `
            <strong>📊 Statistics:</strong><br>
            Original Length: ${result.original_length} characters<br>
            Processed Length: ${result.processed_length} characters<br>
            Reduction: ${result.original_length - result.processed_length} characters
        `;
        statsDiv.classList.add('show');

        // Display tokens if available
        const tokensDiv = document.getElementById('tokens');
        if (result.tokens && result.tokens.length > 0 && options.tokenize) {
            const tokenHTML = result.tokens.map(token => 
                `<span class="token">${token}</span>`
            ).join('');
            
            tokensDiv.innerHTML = `
                <h3>🔤 Tokens (${result.tokens.length}):</h3>
                <div class="token-list">${tokenHTML}</div>
            `;
            tokensDiv.classList.add('show');
        } else {
            tokensDiv.classList.remove('show');
        }

        // Display stemmed words
        const stemmedDiv = document.getElementById('stemmed');
        if (result.stemmed_words && result.stemmed_words.length > 0 && options.stemming) {
            const stemHTML = result.stemmed_words.map(word => 
                `<span class="stem">${word}</span>`
            ).join('');
            
            stemmedDiv.innerHTML = `
                <h3>🌿 Stemmed Words (${result.stemmed_words.length}):</h3>
                <div class="stemmed-list">${stemHTML}</div>
                <p style="margin-top: 10px; font-size: 13px; color: #155724;">
                    <strong>Stemming:</strong> Reduces words to their root form (e.g., "running" → "run", "better" → "better")
                </p>
            `;
            stemmedDiv.classList.add('show');
        } else {
            stemmedDiv.classList.remove('show');
        }

        // Display lemmatized words
        const lemmatizedDiv = document.getElementById('lemmatized');
        if (result.lemmatized_words && result.lemmatized_words.length > 0 && options.lemmatization) {
            const lemmaHTML = result.lemmatized_words.map(word => 
                `<span class="lemma">${word}</span>`
            ).join('');
            
            lemmatizedDiv.innerHTML = `
                <h3>📖 Lemmatized Words (${result.lemmatized_words.length}):</h3>
                <div class="lemma-list">${lemmaHTML}</div>
                <p style="margin-top: 10px; font-size: 13px; color: #084298;">
                    <strong>Lemmatization:</strong> Converts words to their dictionary form (e.g., "better" → "good", "running" → "run")
                </p>
            `;
            lemmatizedDiv.classList.add('show');
        } else {
            lemmatizedDiv.classList.remove('show');
        }

        // Display POS tags
        const posDiv = document.getElementById('pos');
        if (result.pos_tags && result.pos_tags.length > 0 && options.pos_tagging) {
            const posHTML = result.pos_tags.map(([word, tag]) => {
                const description = POS_DESCRIPTIONS[tag] || tag;
                return `
                    <div class="pos-tag">
                        <span class="pos-word">${word}</span>
                        <span class="pos-label">${description}</span>
                    </div>
                `;
            }).join('');
            
            posDiv.innerHTML = `
                <h3>🏷️ POS Tags (Part of Speech) - ${result.pos_tags.length} words:</h3>
                <div class="pos-list">${posHTML}</div>
                <p style="margin-top: 10px; font-size: 13px; color: #721c24;">
                    <strong>POS Tagging:</strong> Identifies grammatical role of each word (Noun, Verb, Adjective, etc.)
                </p>
            `;
            posDiv.classList.add('show');
        } else {
            posDiv.classList.remove('show');
        }

    } catch (error) {
        alert('❌ Error: Make sure the backend server is running!\n\nRun: python app.py');
        console.error('Error:', error);
    } finally {
        // Reset button
        const btn = document.getElementById('processBtn');
        btn.textContent = '🚀 Process Text';
        btn.disabled = false;
    }
});