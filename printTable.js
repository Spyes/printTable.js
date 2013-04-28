/** Dependencies: jQuery, underscore (or lodash) **/

(function($) {
  var defaults = { print: true,
                   repeat_header: true,
                   orientation: 'portrait',
                   max_page_height: 780 },
    settings = {};

  function Iframe() {
    var iframeStyle = 'border:0;position:absolute;width:0px;height:0px;left:0px;top:0px',
      iframe;

    try {
      iframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      $(iframe).attr({style: iframeStyle});
      iframe.doc = null;
      iframe.doc = iframe.contentDocument ? iframe.contentDocument : (iframe.contentWindow ? iframe.contentWindow.document : iframe.document);
    } catch (e) {
      throw e + ". iframes may not be supported in this browser.";
    }

    if (iframe.doc === null) {
      throw "Cannot find document.";
    }

    return iframe;
  }

  $.fn.printTable = function (options) {
    var about = {
      Version: 0.5,
      Author: "Lewis Nitzberg",
      Created: "April 2013",
      Updated: "27 Apr 2013"
    },
      table_height,
      tr_sum,
      page_count = 1,
      $t,
      $cbody,
      $chead,
      $tr,
      $br,
      f,
      writeDoc,
      printWindow,
      copy;

    $.extend(settings, defaults, options);
    f = new Iframe();
    writeDoc = f.doc;
    printWindow = f.contentWindow || f;
    $("<style media='print'> @page {size: " + settings.orientation + ";}</style>").appendTo(writeDoc.getElementsByTagName('head')[0]);
    if (settings.orientation === 'landscape') {
      settings.max_page_height = 550;
    }

    _.each($(this), function (table) {
      $t = $(table);
      table_height = $t.height();
      if (table_height > settings.max_page_height) {
        tr_sum = 0;
        copy = $t.clone();
        copy.find('tbody > tr').remove();
        table_height = $t.height();
        $cbody = copy.find('tbody');
        $('tbody tr', $t).each(function () {
          $tr = $(this);
          if ((tr_sum + $tr.height()) > settings.max_page_height) {
            tr_sum = 0;

            // move old table to iframe
            if (page_count > 1) {
              copy.css('page-break-before', 'always');
            }
            copy.appendTo(writeDoc.body);
            page_count = page_count + 1;

            // create a new table
            copy = $t.clone();
            if (!settings.repeat_header) {
              copy.find('thead').remove();
            }
            copy.find('tbody > tr').remove();
            $cbody = copy.find('tbody');
          } else {
            tr_sum = tr_sum + $tr.height();
            $tr.clone().appendTo($cbody);
            $cbody.appendTo(copy);
          }
        });
      }
    });

    if (settings.print) {
      printWindow.focus();
      printWindow.print();
    } else {
      return printWindow;
    }
  }
})(jQuery);