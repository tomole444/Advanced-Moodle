var video_item = document.querySelector("video");
var download_link = video_item.getAttribute('src');
var div_right = document.querySelector('div.text-right.zm-col.zm-col-8');
var download_hyper = document.createElement('a');

download_hyper.setAttribute('href', download_link);
download_hyper.appendChild(document.createTextNode("Right-click -> Save link as"));
div_right.appendChild(download_hyper);
document.addEventListener("contextmenu", event => event.stopPropagation(), true);