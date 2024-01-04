function copyLink(observer) {
  const originalCopyLinkElement = document.querySelector('div.TaskPaneToolbar-copyLinkButton');
  const newCopyLinkElement = document.querySelector('div.TaskPaneToolbar-copyLinkButton--hyperlink');
  if (!originalCopyLinkElement || newCopyLinkElement) return;
  
  const hyperlinkCopyLinkElement = originalCopyLinkElement.cloneNode(true)

  originalCopyLinkElement.style.display = 'none';
  hyperlinkCopyLinkElement.removeEventListener('click', null);
  hyperlinkCopyLinkElement.removeAttribute('class');
  hyperlinkCopyLinkElement.classList.add('TaskPaneToolbar-copyLinkButton--hyperlink');
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

  const css = `
    .TaskPaneToolbar-copyLinkButton--hyperlink {
      margin: 0px 0px 0px 8px;
      cursor: pointer;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
    }
    
    .TaskPaneToolbar-copyLinkButton--hyperlink:hover {
      background-color: #2E3031;
    }
    
    .TaskPaneToolbar-copyLinkButton--hyperlink:hover > svg {
      fill: #fff;
    }
   `
  const style = document.createElement('style');
  style.appendChild(document.createTextNode(css));
  document.getElementsByTagName('head')[0].appendChild(style);
}

const observer = new MutationObserver(mutationList =>
  mutationList.filter(m => m.type === 'childList').forEach(m => {
    copyLink(observer);
  }));
observer.observe(document.body, {childList: true, subtree: true});

