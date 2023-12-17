let capturedScreenshotDataUrl = null;

const nonce = generateNonce(16);

function takeScreenshot() {
  chrome.tabs.captureVisibleTab({ format: 'png' }, function (dataUrl) {
    // Save the screenshot data for later use
    capturedScreenshotDataUrl = dataUrl;

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "Screenshot.png";
    link.click();
  });
}

function uploadScreenshotToExcel() {
  if (capturedScreenshotDataUrl) {
    console.log("Captured Screenshot Data URL:", capturedScreenshotDataUrl);
  } else {
    console.error("No screenshot captured yet.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const screenshotBtn = document.getElementById("takeScreenshotButton");
  const uploadToExcelBtn = document.getElementById("uploadToExcelButton");

  if (screenshotBtn) {
    screenshotBtn.addEventListener("click", takeScreenshot);
  } else {
    console.error("Button Not Found.");
  }

  if (uploadToExcelBtn) {
    uploadToExcelBtn.addEventListener("click", uploadScreenshotToExcel);
  } else {
    console.error("Upload Button Not Found.");
  }
});

function generateNonce(length) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let nonce = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    nonce += charset[randomIndex];
  }
  return nonce;
}
