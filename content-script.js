chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'captureContent') {
    const documentClone = document.cloneNode(true);
    const readability = new Readability(documentClone);
    const article = readability.parse();

    if (article && article.textContent) {
      sendResponse(article.textContent.replace(/\s{2,}/g, ' '));
    } else {
      sendResponse('Fail to parse the web content');
    }
  }
});
