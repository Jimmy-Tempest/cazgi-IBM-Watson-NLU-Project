const express = require('express');
const dotenv = require("dotenv");
const app = new express();
dotenv.config()

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });

    return naturalLanguageUnderstanding
}


app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/", (req, res) => {
    res.render('index.html');
});

app.get("/url/emotion", (req, res) => {

    const analyzeParams = {
        'url': req.query.url,
        'features': {
            'emotion': {}
        }
    };
    getNLUInstance().analyze(analyzeParams)
        .then(analysisResults =>
            JSON.stringify(analysisResults, null, 2)
        )
        .then(result => {
            return res.send(result);
        })
        .catch(err => {
            console.log('error:', err);
        });
});

app.get("/url/sentiment", (req, res) => {
    const analyzeParams = {
        'url': req.query.url,
        'features': {
            'sentiment': {}
        }
    };
    getNLUInstance().analyze(analyzeParams)
        .then(analysisResults =>
            JSON.stringify(analysisResults, null, 2)
        )
        .then(result => {
            return res.send(result);
        })
        .catch(err => {
            console.log('error:', err);
        });
});

app.get("/text/emotion", (req, res) => {
    const analyzeParams = {
        'features': {
            'emotion': {}
        },
        'text': toString(req.query.text)
    };
    getNLUInstance().analyze(analyzeParams)
        .then(analysisResults =>
            JSON.stringify(analysisResults, null, 2)
        )
        .then(anaresult => {
            return res.send(anaresult);
        })
        .catch(err => {
            console.log('error:', err);
        });
});

app.get("/text/sentiment", (req, res) => {
    const analyzeParams = {
        'features': {
            'sentiment': {}
        },
        'text': toString(req.query.text)
    };
    getNLUInstance().analyze(analyzeParams)
        .then(analysisResults =>
            JSON.stringify(analysisResults, null, 2)
        )
        .then(result => {
            return res.send(result);
        })
        .catch(err => {
            console.log('error:', err);
        });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

