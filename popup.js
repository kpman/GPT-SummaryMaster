const prefixInput = document.getElementById('prefix');
const captureButton = document.getElementById('capture');
const captureOnlyButton = document.getElementById('capture-only');

chrome.storage.local.get('lastPrefix', (data) => {
  prefixInput.value = data.lastPrefix || '';
});

captureButton.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: 'captureContent' },
      (content) => {
        const prefix = prefixInput.value;
        const fullContent = `${prefix}:\n${content}`;

        chrome.storage.local.set({ lastPrefix: prefix });

        navigator.clipboard.writeText(fullContent).then(() => {
          const url = 'https://chat.openai.com/chat';
          chrome.tabs.create({ url });
        });
      }
    );
  });
});

captureOnlyButton.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: 'captureContent' },
      (content) => {
        const prefix = prefixInput.value;
        const fullContent = `${prefix}:\n${content}`;

        chrome.storage.local.set({ lastPrefix: prefix });

        navigator.clipboard.writeText(fullContent);

        const originalText = captureOnlyButton.textContent;

        captureOnlyButton.textContent = 'Copied!';

        setTimeout(() => {
          captureOnlyButton.textContent = originalText;
        }, 2000);
      }
    );
  });
});
