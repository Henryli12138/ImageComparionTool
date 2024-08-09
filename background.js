chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'executeContentScript') {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      files: ['content.js']
    });
  }
});

import * as mobilenet from 'script/@tensorflow-models/mobilenet';
import * as tf from 'script/@tensorflow/tfjs';



/*
  <script src="scripts/@tensorflow-models/mobilenet"></script>
  <script src="scripts/@tensorflow/tfjs"></script>
*/