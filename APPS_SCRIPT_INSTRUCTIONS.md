# Google Apps Script Setup Instructions

To save data to a Google Sheet, you need to set up a small script that acts as a bridge between your React app and the Sheet.

## Step 1: Create the Google Sheet
1.  Go to [sheets.new](https://sheets.new) to create a new spreadsheet.
2.  Name it "Love Calculator Results".
3.  In the first row (Row 1), add these headers:
    - **A1**: Timestamp
    - **B1**: Type
    - **C1**: Name 1
    - **D1**: Name 2
    - **E1**: Score
    - **F1**: Message

## Step 2: Create the Script
1.  In your Google Sheet, go to **Extensions** > **Apps Script**.
2.  Delete any code in the `Code.gs` file and paste the following:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    const data = JSON.parse(e.postData.contents);
    
    // Add a new row with the data
    sheet.appendRow([
      new Date(),       // Timestamp
      data.type,        // Type (Calculation or Proposal)
      data.name1,       // Your Name / Prank Victim
      data.name2,       // Partner Name
      data.score,       // Score if applicable
      data.message      // Result message
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3.  Click the **Save** icon (floppy disk).

## Step 3: Deploy as Web App
1.  Click the **Deploy** button (top right) > **New deployment**.
2.  Click the **Select type** gear icon (⚙️) > **Web app**.
3.  Fill in the details:
    - **Description**: Love Calculator Backend
    - **Execute as**: Me (your email)
    - **Who has access**: **Anyone** (This is important! It allows the app to write to the sheet without the user signing in).
4.  Click **Deploy**.
5.  **Authorize** the script if asked (Click "Review permissions", choose your account, click "Advanced" > "Go to ... (unsafe)" > "Allow").
6.  **Copy the Web App URL**. It will look like `https://script.google.com/macros/s/.../exec`.

## Step 4: Connect to React App
1.  Open `src/utils/googleSheetsService.js` (I will create this file next).
2.  Replace `Replace_With_Your_Web_App_URL` with the URL you just copied.
