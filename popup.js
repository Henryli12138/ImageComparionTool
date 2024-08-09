//Author: Shing Hei Li, Berlin Germany, 10/7/2024
//<button id="expand-block">Expand blocks (Under development)</button>

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('check-links').addEventListener('click', async () => {
    try {
      let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab) {
        console.error('No active tab found.');
        return;
      }
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: checkLinks
      }, () => {
        if (chrome.runtime.lastError) {
          console.error('Script injection failed:', chrome.runtime.lastError);
        } else {
          console.log('Script injected successfully');
        }
      });
    } catch (error) {
      console.error('Error executing content script:', error);
    }
  });

  document.getElementById('select-massive-hits').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: hitCountsCheck
      }, () => {
        if (chrome.runtime.lastError) {
          console.error('Script injection failed:', chrome.runtime.lastError);
        } else {
          console.log('Script injected successfully');
        }
      });
    });
  });

  document.getElementById('auto-scroll-down').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: startAutoScroll
      }, () => {
        if (chrome.runtime.lastError) {
          console.error('Script injection failed:', chrome.runtime.lastError);
        } else {
          console.log('Script injected successfully');
        }
      });
    });
  });

  document.getElementById('stop-scroll').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: stopAutoScroll
      }, () => {
        if (chrome.runtime.lastError) {
          console.error('Script injection failed:', chrome.runtime.lastError);
        } else {
          console.log('Script injected successfully');
        }
      });
    });
  });

  document.getElementById('img-comparison').addEventListener('click', function () {
    const similarityThreshold = parseFloat(document.getElementById('similarity-threshold').value);

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: (threshold) => {
          async function fetchSimilarity(url1, url2) {
            try {
              console.log('Sending request to server:', { url1, url2 });
              const response = await fetch('http://localhost:3000/compare', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url1, url2 })
              });
  
              if (!response.ok) {
                throw new Error('Error fetching similarity');
              }
  
              const result = await response.json();
              console.log('Received response from server:', result);
              return result.similarity;
            } catch (error) {
              console.error('Error fetching similarity:', error);
              throw error;
            }
          }
  
          async function comparePhotos(similarityThreshold) {
            const boxes = document.querySelectorAll('.wrapper.wrapper-content .ibox.result-set');
            console.log('Found boxes:', boxes.length);
  
            try {
              for (const box of boxes) {
                const rows = box.querySelectorAll('.hit-row');
                console.log('Found rows:', rows.length);
  
                for (const row of rows) {
                  const imgLinks = row.querySelectorAll('img[data-original]');
                  console.log('Found links:', imgLinks.length);
  
                  let originalImgLink, hitImgLink;
  
                  for (const link of imgLinks) {
                    const imgSrc = link.src || link.getAttribute('data-original');
  
                    if (imgSrc.includes('//cdn.copytrack.io/image/')) {
                      originalImgLink = imgSrc;
                    } else if (imgSrc.includes('//cdn.copytrack.io/hit/')) {
                      hitImgLink = imgSrc;
                    }
  
                    if (originalImgLink && hitImgLink) {
                      console.log('Original image link:', originalImgLink);
                      console.log('Hit image link:', hitImgLink);
  
                      const similarity = await fetchSimilarity(originalImgLink, hitImgLink);
                      console.log('Similarity:', similarity, 'Threshold:', similarityThreshold); // Added log for debugging
                      if (similarity >= similarityThreshold) {
                        console.log("The photos are a match!");
                        let checkbox = row.querySelector('input.hit-checkbox[type="checkbox"]');
                        if (checkbox) {
                          console.log('Checking checkbox:', checkbox);
                          checkbox.click();
                        }
                      } else {
                        console.log("The photos do not match.");
                      }
  
                      // Reset the links to check for the next row
                      originalImgLink = null;
                      hitImgLink = null;
                    }
                  }
                }
              }
            } catch (error) {
              console.error('Error loading images or calculating similarity:', error);
            }
          }
  
          comparePhotos(threshold);
        },
        args: [similarityThreshold]
      }, () => {
        if (chrome.runtime.lastError) {
          console.error('Script injection failed:', chrome.runtime.lastError);
        } else {
          console.log('Script injected successfully');
        }
      });
    });
  });

  document.getElementById('select-all').addEventListener('click', function () {
    const amount = document.getElementById('amount').value;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: selectAll,
        args: [amount]
      }, () => {
        if (chrome.runtime.lastError) {
          console.error('Script injection failed:', chrome.runtime.lastError);
        } else {
          console.log('Script injected successfully');
        }
      });
    });
  });

  document.getElementById('check-duplicate-names').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: checkDuplicateImageNames
      }, () => {
        if (chrome.runtime.lastError) {
          console.error('Script injection failed:', chrome.runtime.lastError);
        } else {
          console.log('Script injected successfully');
        }
      });
    });
  });

  document.getElementById('jump-to-selected-hit').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: jumpToSelectedHit
      }, () => {
        if (chrome.runtime.lastError) {
          console.error('Script injection failed:', chrome.runtime.lastError);
        } else {
          console.log('Script injected successfully');
        }
      });
    });
  });

  
});



