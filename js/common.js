function enableStylesheet (node) {
    node.disabled = false;
}

function disableStylesheet (node) {
    node.disabled = true;
}

var themelight = document.getElementById('light');
var themedark = document.getElementById('dark');
disableStylesheet(themelight);

function toggleStylesheets() {
    if (themelight.disabled) {
        disableStylesheet(themedark);
        enableStylesheet(themelight);
    } else {
        disableStylesheet(themelight);
        enableStylesheet(themedark);
    }
}