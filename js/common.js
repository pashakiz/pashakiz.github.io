function enableStylesheet (node) {
  node.disabled = false;
}

function disableStylesheet (node) {
  node.disabled = true;
}

document
  .querySelectorAll('link[rel=stylesheet].alternate')
  .forEach(disableStylesheet);