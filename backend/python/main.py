from flask import Flask, jsonify

app = Flask(__name__)



@app.route('/pdffiles', methods=['GET'])
def get_array(files):
    print(files)

if __name__ == '__main__':
    app.run(debug=True,port=5000)
