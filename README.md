TODO: 
- lettertype kleiner
- plaats tussen blokken (mobiel)
- font

- add to page (copy source instead of src attribute):
    - https://raw.githubusercontent.com/liabru/matter-js/master/build/matter.min.js
    - https://raw.githubusercontent.com/jonobr1/two.js/dev/build/two.min.js

- add required elements to page:
  - `<button id="start-matter">Start</button>`
    - ID is important
  - `<div id="matter" style="width: 100%; height: 450px"></div>`
    - ID is important
    - Size/position of this element is important

- add script to page
  - fr: https://cdn.jsdelivr.net/gh/DriesCruyskens/techlink-matter@main/installtomorrow-techlink.matter.fr.min.js
  - nl: https://cdn.jsdelivr.net/gh/DriesCruyskens/techlink-matter@main/installtomorrow-techlink.matter.nl.min.js
(info: these files have .min at the end. This does not exist in the repository but jsdeliver picks this up and automatically minifies these files. Remove the '.min' to get the original file)

- (optional)
  - purge cache: https://www.jsdelivr.com/tools/purge
  