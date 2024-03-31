from flask import Flask, jsonify,request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)


@app.route('/pdffiles', methods=['POST'])
def get_array():
    files = request.json
    print(files)
    return jsonify({"length" : len(files)})

if __name__ == '__main__':
    app.run(debug=True,port=5000)
