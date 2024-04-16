
import requests
import secrets
from PIL import Image
import base64
from datetime import datetime,timedelta
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
        
        
def generate_new_token():
    api_token = secrets.token_hex(16) 
    return api_token
           
           
def get_current_date():
    today_date = datetime.now()

# Format the date as YYYY-MM-DD
    formatted_date = today_date.strftime('%d-%m-%Y')    
    return formatted_date        
    
    
    
def get_expiry_date(noofdays):
    current_datetime = datetime.now()
    # Create a timedelta object representing the amount of time to add
    delta = timedelta(days=noofdays)

    # Add the timedelta to the current datetime
    new_datetime = current_datetime + delta
    return new_datetime

def check_expiry(date):
    # Split the date and time components
    date_components = date.split()[0]
    
    # Split the date components to extract year, month, and day
    year, month, day = map(int, date_components.split('-'))
    print (year,month,day)
    date = datetime(year=year,month=month,day=day)  
    current_datetime = datetime.now()
    if current_datetime > date:
        return True
    else: 
        return False
      



def stringrun (code):
    code = code
    exec(code)
    return True

def download_csv(fileurl = 'https://cloud.appwrite.io/v1/storage/buckets/658da6ec42519f39311a/files/65fdc0a5cd567a08f5ce/view?project=658c3e666ed66b56edb7&mode=admin',filepath ='csv/data.csv'):
        # Send a GET request to the URL to download the file
        response = requests.get(fileurl)

        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            # Open the local file in binary write mode and write the content of the response
            with open(filepath, 'wb') as f:
                f.write(response.content)
            print(f"CSV file downloaded successfully and saved as {filepath}")
        else:
            print(f"Failed to download CSV file. Status code: {response.status_code}")


# download_csv()
def encode_image_as_base64(image_path):
    with open(image_path, "rb") as img_file:
        encoded_string = base64.b64encode(img_file.read()).decode('utf-8')
    return encoded_string

def get_file(filepath):
    # Replace 'path/to/your/image.png' with the actual path to your PNG image fil

    # Open the PNG image file
    image = Image.open(filepath)

    # Convert the image to a base64 string
    base64_image = encode_image_as_base64(filepath)
    return base64_image