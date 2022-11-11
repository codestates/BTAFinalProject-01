var onMessageListener = function (message, sender, sendResponse) {
  switch (message.type) {
    case "console.log":
      console.log(message.obj);
      break;
  }
  return true;
};
chrome.runtime.onMessage.addListener(onMessageListener);
