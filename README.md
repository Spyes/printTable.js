#printTable.js

Print HTML tables correctly via Javascript across all browsers.
This breaks the tables up correctly to fit printed paper.

##Usage

```html
<table class='table-for-printing'>
...
</table>
```
```javascript
$(".table-for-printing").printTable(options)
```

##Options
* **`orientation`**: (string) the page orientation: "landscape" or "portrait". (default: "portrait")
* **`repeat_header`**: (boolean) repeat header of table in each page. (default: true)
* **`print`**: (boolean) set to true to print automatically, false returns the print document only. (default: true)
* **`max_page_height`**: the printed page height. Leave deafult unless you know exactly what size you need. (default: 780)
