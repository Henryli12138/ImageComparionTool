function deleteBar() {
  console.log('Executing content script');
  const targetDiv = document.querySelector('.row.wrapper.border-bottom.white-bg.page-heading');
  if (targetDiv) {
    targetDiv.remove();
    console.log('Target div removed.');
  } else {
    console.log('Target div not found.');
  }
}

/*
let checkbox = link.closest('.hit-row').querySelector('input.hit-checkbox[type="checkbox"]');
              if (checkbox) {
                console.log('Checking checkbox:', checkbox);
                checkbox.click();
              }
*/

function checkLinks() {
  console.log('Executing content script');
  let count = 0;
        // Add more debug logs to trace the flow of execution
        const keywords = ["stock", 'getty', 'imago', '123rf', 'fotolia', 'deposit', 'dreamstime', 'alamy'];
        console.log('Keywords:', keywords);
    
        const boxes = document.querySelectorAll('.wrapper.wrapper-content .ibox.result-set');
        console.log('Found boxes:', boxes.length);
    
        boxes.forEach(box => {
          const links = box.querySelectorAll('a[href]');
          console.log('Found links:', links.length);
    
          links.forEach(link => {
            const href = link.getAttribute('href');
            console.log('Checking link:', href);
    
            const containsKeyword = keywords.some(keyword => href.toLowerCase().includes(keyword.toLowerCase()));
            console.log('Contains keyword:', containsKeyword);
    
            if (containsKeyword) {
              let whitelist = link.closest('.hit-row').querySelector('a.btn.btn-white.btn-sm[data-type="whitelist"]');
              if (whitelist) {
                console.log('Clicking whitelist:', whitelist);
                whitelist.click();
              }
              count++;
            }
          });
        });
}
/*
let checkbox = box.querySelector('input.hit-checkbox');
                      if (checkbox) {
                          console.log('Checking checkbox:', checkbox);
                          checkbox.click();
                      }
*/

function hitCountsCheck () {
  const boxes = document.querySelectorAll('.wrapper.wrapper-content .ibox.result-set');
              console.log('Found boxes:', boxes.length);
        
              boxes.forEach(box => {
                const hitCountElement = box.querySelector('span.hit-count');
                if (hitCountElement) {
                  const hitCount = parseInt(hitCountElement.textContent.trim(), 10); // Convert to integer
                  console.log('Hit count:', hitCount);
                  
                  if (!isNaN(hitCount) && hitCount >= 5) {
                      let illegal = box.querySelector('button.btn.btn-danger.btn-xs');
                      if (illegal) {
                        console.log('Clicking illegal:',illegal);
                        illegal.click();
                      }
                  }
              }
              });
}

let autoScrollIntervalId = null;

function startAutoScroll() {
  if (window.autoScrollIntervalId) {
    return; // If already scrolling, do nothing
  }
  window.autoScrollIntervalId = setInterval(() => {
    window.scrollBy(0, 80); // Scroll down by 10 pixels
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      // If the window has reached the bottom of the page
      stopAutoScroll();
    }
  }, 300); // Every 200 milliseconds
}

function stopAutoScroll() {
  if (window.autoScrollIntervalId) {
    clearInterval(window.autoScrollIntervalId);
    window.autoScrollIntervalId = null; // Reset the interval ID
  }
}

function selectAll(amount) {
  console.log('Executing content script');

  function checkLinks() {
    console.log('Executing content script');
    let count = 0;
          // Add more debug logs to trace the flow of execution
          const keywords = ["stock", 'getty', 'imago', '123rf', 'fotolia', 'deposit', 'dreamstime', 'alamy'];
          console.log('Keywords:', keywords);
      
          const boxes = document.querySelectorAll('.wrapper.wrapper-content .ibox.result-set');
          console.log('Found boxes:', boxes.length);
      
          boxes.forEach(box => {
            const links = box.querySelectorAll('a[href]');
            console.log('Found links:', links.length);
      
            links.forEach(link => {
              const href = link.getAttribute('href');
              console.log('Checking link:', href);
      
              const containsKeyword = keywords.some(keyword => href.toLowerCase().includes(keyword.toLowerCase()));
              console.log('Contains keyword:', containsKeyword);
      
              if (containsKeyword) {
                let whitelist = link.closest('.hit-row').querySelector('a.btn.btn-white.btn-sm[data-type="whitelist"]');
                if (whitelist) {
                  console.log('Clicking whitelist:', whitelist);
                  whitelist.click();
                }
                count++;
              }
            });
          });
  }

  function checkDuplicateImageNames() {
    console.log('Executing content script');
    let duplicateCount = 0;
    const boxes = document.querySelectorAll('.wrapper.wrapper-content .ibox.result-set');
    console.log('Found boxes:', boxes.length);
  
    boxes.forEach(box => {
      const imageNames = new Map(); // Map to track occurrences of image names
  
      // Find all rows that contain image names
      const rows = box.querySelectorAll('tr');
      rows.forEach(row => {
        const th = row.querySelector('th');
        if (th && th.textContent.trim() === 'Imagename:') {
          const td = row.querySelector('td');
          if (td) {
            const imageName = td.childNodes[0].textContent.trim();
            console.log('Found image name:', imageName);
  
            if (imageNames.has(imageName)) {
              imageNames.set(imageName, imageNames.get(imageName) + 1);
            } else {
              imageNames.set(imageName, 1);
            }
          }
        }
      });
  
      imageNames.forEach((count, imageName) => {
        if (count > 1) {
          console.log(`Found ${count} occurrences of image name: ${imageName}`);
          let occurrences = 0;
  
          rows.forEach(row => {
            const th = row.querySelector('th');
            if (th && th.textContent.trim() === 'Imagename:') {
              const td = row.querySelector('td');
              if (td) {
                const name = td.childNodes[0].textContent.trim();
                if (name === imageName) {
                  occurrences++;
                  if (occurrences > 1) {
                    /*let checkbox = row.closest('.hit-row').querySelector('input.hit-checkbox[type="checkbox"]');
                    if (checkbox) {
                      console.log('Checking checkbox for duplicate image name:', checkbox);
                      checkbox.click();
                    }*/
                    let whitelist = row.closest('.hit-row').querySelector('a.btn.btn-white.btn-sm[data-type="whitelist"]');
                    if (whitelist) {
                      console.log('Clicking whitelist:', whitelist);
                      whitelist.click();
                    }
                    duplicateCount++;
                  }
                }
              }
            }
          });
        }
      });
    });
  }

  setTimeout(()=>{
    checkLinks();
  },2000)

  setTimeout(()=>{
    checkDuplicateImageNames();
  },2000)

  const boxes = document.querySelectorAll('.wrapper.wrapper-content .ibox.result-set');
  boxes.forEach(box => {
    let checkbox = box.querySelector('input.hit-checkbox');
    checkbox.click();
  })

  function submitClaim(amount) {
    console.log('Selecting "Submit claim" and submitting form');
    // Select the dropdown menu
    const selectElement = document.getElementById('mass-action-select');
  
    // Log the available options for debugging
    const options = selectElement.querySelectorAll('option');
  
    // Set the dropdown value to 'claim' by finding the correct option
    const claimOption = Array.from(options).find(option => option.dataset.type === 'claim');
  
    if (claimOption) {
      selectElement.value = claimOption.value;
  
      // Manually trigger the change event to simulate user selection
      const event = new Event('change', { bubbles: true });
      selectElement.dispatchEvent(event);
    }
    const submitButton = document.querySelector('.mass-action-btn');
    if (!submitButton) {
      console.error('Submit button not found');
      return;
    }
    submitButton.click();

    setTimeout(() => {
      const inputField = document.querySelector('.post-license-input input.form-control');
      if (inputField) {
        inputField.value = amount;

        // Manually trigger the input event to ensure value is set
        const inputEvent = new Event('input', { bubbles: true });
        inputField.dispatchEvent(inputEvent);
        console.log('Input field value set to 350');
      } else {
        console.error('Number input field not found within .post-license-input');
        return;
      }
    }, 300);
    // Locate and enable the CONFIRM CALCULATION button    
    setTimeout(()=>{
      const confirmButton = document.querySelector('#submit_calculator');
      if (confirmButton) {
        confirmButton.click();
        console.log('CONFIRM CALCULATION button clicked');
      } else {
        console.error('CONFIRM CALCULATION button not found');
        return;
      }
    }, 500);

    // Wait for 0.5 seconds before clicking the final submit button
    setTimeout(() => {
      // Locate and enable the final submit button
      const finalSubmitButton = document.querySelector('button[type="submit"].btn-danger');
      if (finalSubmitButton) {
        //finalSubmitButton.click();
        console.log('Final submit button clicked');
      } else {
        console.error('Final submit button not found');
      }
    }, 3000);
  }
  

  setTimeout(() => {
    submitClaim(amount)
  }, 500);
  
}

function jumpToSelectedHit() {
  console.log('Executing jump to selected hit');
  const selectedCheckboxes = document.querySelectorAll('.hit-checkbox:checked');
  
  if (selectedCheckboxes.length === 0) {
    console.log('No checkboxes are selected');
    return;
  }

  // Get the current index from a data attribute on the body, or initialize to -1
  let currentSelectionIndex = parseInt(document.body.dataset.currentSelectionIndex || '-1');

  // Increment the index and wrap around
  currentSelectionIndex = (currentSelectionIndex + 1) % selectedCheckboxes.length;

  // Store the new index back in the data attribute
  document.body.dataset.currentSelectionIndex = currentSelectionIndex.toString();

  const selectedCheckbox = selectedCheckboxes[currentSelectionIndex];

  const hitRow = selectedCheckbox.closest('.hit-row');
  if (hitRow) {
    hitRow.scrollIntoView({ behavior: 'auto', block: 'center' });
    console.log(`Scrolled to selected hit ${currentSelectionIndex + 1} of ${selectedCheckboxes.length}`);
  } else {
    console.log('Could not find the parent hit row');
  }
}

function checkDuplicateImageNames() {
  console.log('Executing content script');
  let duplicateCount = 0;
  const boxes = document.querySelectorAll('.wrapper.wrapper-content .ibox.result-set');
  console.log('Found boxes:', boxes.length);

  boxes.forEach(box => {
    const imageNames = new Map(); // Map to track occurrences of image names

    // Find all rows that contain image names
    const rows = box.querySelectorAll('tr');
    rows.forEach(row => {
      const th = row.querySelector('th');
      if (th && th.textContent.trim() === 'Imagename:') {
        const td = row.querySelector('td');
        if (td) {
          const imageName = td.childNodes[0].textContent.trim();
          console.log('Found image name:', imageName);

          if (imageNames.has(imageName)) {
            imageNames.set(imageName, imageNames.get(imageName) + 1);
          } else {
            imageNames.set(imageName, 1);
          }
        }
      }
    });

    imageNames.forEach((count, imageName) => {
      if (count > 1) {
        console.log(`Found ${count} occurrences of image name: ${imageName}`);
        let occurrences = 0;

        rows.forEach(row => {
          const th = row.querySelector('th');
          if (th && th.textContent.trim() === 'Imagename:') {
            const td = row.querySelector('td');
            if (td) {
              const name = td.childNodes[0].textContent.trim();
              if (name === imageName) {
                occurrences++;
                if (occurrences > 1) {
                  /*let checkbox = row.closest('.hit-row').querySelector('input.hit-checkbox[type="checkbox"]');
                  if (checkbox) {
                    console.log('Checking checkbox for duplicate image name:', checkbox);
                    checkbox.click();
                  }*/
                  let whitelist = row.closest('.hit-row').querySelector('a.btn.btn-white.btn-sm[data-type="whitelist"]');
                  if (whitelist) {
                    console.log('Clicking whitelist:', whitelist);
                    whitelist.click();
                  }
                  duplicateCount++;
                }
              }
            }
          }
        });
      }
    });
  });
}






