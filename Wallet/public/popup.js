const elmUrl = document.getElementById("url");

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const url = tabs[0].url;
  console.log("url=", url);
  elmUrl.innerText = url;
});