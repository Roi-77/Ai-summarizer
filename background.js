async function callAIAPI(text) {
  const response = await fetch("http://localhost:3000/summarize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });
  const data = await response.json();
  return data.summary;
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "summarize") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "extract" }, async (res) => {
        try {
          const summary = await callAIAPI(res.content);
          sendResponse({ summary });
        } catch (err) {
          sendResponse({ summary: "❌ Error: " + err.message });
        }
      });
    });
    return true; // keep channel open
  }
});
