from flask import Flask, jsonify,request
from flask_cors import CORS, cross_origin
import requests


app = Flask(__name__)
CORS(app)

def download_pdf(url, filename):
    # Send a GET request to the URL
    response = requests.get(url)
    
    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        # Open the file in binary write mode and write the response content (PDF data) to it
        with open(filename, 'wb') as file:
            file.write(response.content)
        print(f"PDF downloaded successfully and saved as '{filename}'")
    else:
        print(f"Failed to download PDF. Status code: {response.status_code}")

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
