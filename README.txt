Manual for Copytrack Photo Comparison Script
Author: Li Shing Hei
Date: 8/8/2024

1. How to load the package in Chrome:
- Open your chrome and click 'Manage extension', then turn on the 'Developer mode' in the top right corner.
- Click 'Load unpacked' and choose 'C:\Users\User\Documents\CopytrackPhotoMatchingApp' this file.
- Turn on this extension and pin it on the bar.

Introducing the functions in the extension:
1. 'Start scrolling' and 'STOP': For auto scrolling down the website and stop scrolling.
2. 'Illegal all hits greater than 5': Choosing 'Illegal' for claims that have more than 5 hits in a claim.
3. 'Whitelist stock image links': Whitelisting claims that contain names of stock image organizations in the link.
4. 'Whitelist duplicate hits': Whitelisting hits that are duplicate, but it will leave the first hit in the claim.
5. 'Image comparison': Check hits using machine learning. Using this function, you need to open the 'start-server'
in 'C:\Users\User\Documents\CopytrackPhotoMatchingApp\server'.
6. 'Jump to selected hit': Scroll the window to the hits that are selected instantly.

Introducing the code of this application:
1. The app is located in 'C:\Users\User\Documents\CopytrackPhotoMatchingApp'
2. 
- 'popup.html' is for the UI and structure of the extension
- 'popup.js' is basically the javescript file for the EventListener for the HTML, eg. receiving clickings in the
extension, calling the functions in 'content.js' and responding.
- 'content.js' is containing all the functions for the extension. You should edit in here if you want to change the
function(except the comparePhotos function in 'popup.js').

Tips:
If you want to change some function, just copy all the code to ChatGPT and ask it to edit for you, then paste in
in the script. MAKE SURE THAT YOU HAVE SAVED A COPY BEFORE DOING ANYTHING.