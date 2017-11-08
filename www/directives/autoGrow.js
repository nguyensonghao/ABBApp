app.directive('autoGrow', function() {
    return {
        restrict: 'A',
        link(scope, element, attr) {
            element.on('input change', function () {
                var text = element[0].value;
                var limitRows = parseInt(attr.autoGrow);
                var lines = 1 + (text.match(/\n/g) || []).length;
                if (lines <= limitRows)
                    element[0].rows = lines;
            });
        },
    };
});