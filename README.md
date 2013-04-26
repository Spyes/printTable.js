#printTable.js

Print HTML tables correctly via Javascript across all browsers.
This breaks the tables up correctly to fit printed paper.

##Usage

```javascript
$(".table-for-printing").printTable(options)
```

##Options
* **`split_class`**: table class to split. (default: "splitTable")
* **`repeat_header`**: repeat header of table in each page. (default: true)
* **`max_page_height`**: the printed page height. Leave deafult unless you know exactly what sizey ou need. (default: 550)
