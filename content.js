import { Readability } from "@mozilla/readability";

function extractContent() {
  let article = new Readability(document.cloneNode(true)).parse();
  return article?.textContent || document.body.innerText;
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "extract") {
    sendResponse({ content: extractContent() });
  }
});
