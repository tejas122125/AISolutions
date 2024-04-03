export const  generateRandomString = (length:any)=> {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

export const  generateUniqueApiKey = ()=> {
    // Generate a random string
    const randomString = Math.random().toString(36).substring(2, 10); // Generate a random string of length 8

    // Get the current timestamp
    const timestamp = Date.now().toString(36);

    // Combine the random string and timestamp to create a unique API key
    const apiKey = randomString + timestamp;

    return apiKey;
}


