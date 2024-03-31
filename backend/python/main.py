from flask import Flask, jsonify,request
from flask_cors import CORS, cross_origin

from backend.python.functions import download_pdf


app = Flask(__name__)
CORS(app)



@app.route('/pdffiles', methods=['POST'])
def getlink():
    links = request.json
    for i in range(len(links)):
        filename = f"test{i}.pdf"
        link = links[i]
        download_pdf(link,filename)
    
    
    return jsonify({"length" : len(links)})

if __name__ == '__main__':
    app.run(debug=True,port=5000)
