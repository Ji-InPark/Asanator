function copyLink(observer) {
  const originalCopyLinkElement = document.querySelector('div.TaskPaneToolbar-copyLinkButton');
  if (!originalCopyLinkElement) return;

  observer.disconnect();
  const hyperlinkCopyLinkElement = originalCopyLinkElement.cloneNode(true)

  originalCopyLinkElement.style.display = 'none';
  hyperlinkCopyLinkElement.removeEventListener('click', null);
  hyperlinkCopyLinkElement.removeAttribute('class');
  hyperlinkCopyLinkElement.classList.add('TaskPaneToolbar-copyLinkButton--hyperlink');
  hyperlinkCopyLinkElement.style.margin = '10px';
  hyperlinkCopyLinkElement.style.cursor = 'pointer';
  originalCopyLinkElement.parentElement.insertBefore(hyperlinkCopyLinkElement, originalCopyLinkElement);
  hyperlinkCopyLinkElement.addEventListener('click', () => {
    const taskTitle = document.querySelector('div.TitleInput-objectName > textarea').textContent;
    originalCopyLinkElement.click();
    navigator.clipboard
      .readText()
      .then((link) => {
        const tempDiv = document.createElement('div');
        const hyperlink = document.createElement('a');
        hyperlink.classList.add('Hyperlink');
        hyperlink.href = link;
        hyperlink.textContent = taskTitle;
        hyperlink.style.display = 'none';
        tempDiv.appendChild(hyperlink);
        document.body.appendChild(tempDiv);

        const HTML = document.querySelector("a.Hyperlink").outerHTML;
        const TYPE = "text/html";
        const BLOB = new Blob([HTML], {type: TYPE});
        navigator.clipboard.write([new ClipboardItem({[TYPE]: BLOB})])
      });
  });
}

const observer = new MutationObserver(mutationList =>
  mutationList.filter(m => m.type === 'childList').forEach(m => {
    copyLink(observer);
  }));
observer.observe(document.body, {childList: true, subtree: true});

