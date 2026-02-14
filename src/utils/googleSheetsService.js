const SHEETDB_URL = 'https://sheetdb.io/api/v1/o80zr95sm2wmo';

export const saveToGoogleSheet = async (data) => {
    try {
        // Map the data to match Google Sheet headers exactly
        // Headers: Timestamp, Type, Name 1, Name 2, Score, Message
        const payload = {
            data: {
                "Timestamp": new Date().toLocaleString(),
                "Type": data.type,
                "Name 1": data.name1,
                "Name 2": data.name2,
                "Score": data.score,
                "Message": data.message
            }
        };

        const response = await fetch(SHEETDB_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        console.log('Data sent to SheetDB:', result);
        return true;
    } catch (error) {
        console.error('Error sending data to SheetDB:', error);
        return false;
    }
};
