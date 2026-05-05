import { useState } from "react";

export default function App() {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    chrome.runtime.sendMessage({ action: "summarize" }, (response: { summary: string }) => {
      setSummary(response.summary || "Error generating summary.");
      setLoading(false);
    });
  };

  return (
    <div className="p-4 w-80 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-lg font-bold mb-2">AI Page Summarizer</h1>
      <button
        onClick={handleSummarize}
        className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
      >
        Summarize Page
      </button>
      {loading && <p className="mt-2 text-sm">⏳ Summarizing...</p>}
      {summary && (
        <div className="mt-3 max-h-60 overflow-y-auto text-sm whitespace-pre-line">
          {summary}
        </div>
      )}
      <button
        onClick={() => setSummary("")}
        className="mt-2 text-xs text-gray-500 underline"
      >
        Clear
      </button>
    </div>
  );
}
