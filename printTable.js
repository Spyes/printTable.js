/** Dependencies: JQuery, underscore (or lodash) **/

function printTable(splitClass) {
  var about = {
    Version: 0.1,
    Author: "Lewis Nitzberg",
    Created: "April 2013",
    Updated: "25 Apr 2013"
  },
    max_page_height = 550,  // change to get dynamically
    splits,  // how many times to split the table
    table_height,
    tr_sum,
    $t,
    $cbody,
    $tr,
    $br,
    copy;

  if (splitClass) {
    if (typeof splitClass === "string") {
      table_height = $('table.' + splitClass).height();

      if (table_height > max_page_height) {
        splits = Math.ceil(table_height / max_page_height);

        _.times(splits - 1, function () {
          tr_sum = 0;
          $t = $('table.' + splitClass);

          // clone the original table
          copy = $t.clone();
          copy.find('tbody > tr').remove();
          $cbody = copy.find('tbody');
          $t.removeClass(splitClass);
          $('tbody tr', $t).each(function () {
            $tr = $(this);
            tr_sum = tr_sum + $tr.height();
            if (tr_sum >= max_page_height) {
              $tr.detach().appendTo($cbody);
            }
          });

          $br = $('<div></div>')
            .css('page-break-before', 'always');
          $br.insertAfter($t);
          $t.addClass('printTable');
          copy.insertAfter($br);
        });
      }
    }
  } else {
    return about;
  }
}