function copyLink(observer) {
  const originalCopyLinkElement = document.querySelector('div.TaskPaneToolbar-copyLinkButton');
  const newCopyLinkElement = document.querySelector('div.TaskPaneToolbar-copyLinkButton--hyperlink');
  if (!originalCopyLinkElement || newCopyLinkElement) return;
  
  const hyperlinkCopyLinkElement = originalCopyLinkElement.cloneNode(true)

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
        document.querySelector('a.Hyperlink')?.remove();

        const hyperlink = document.createElement('a');
        hyperlink.classList.add('Hyperlink');
        hyperlink.href = link;
        hyperlink.textContent = taskTitle;
        document.body.appendChild(hyperlink);

        const html = document.querySelector('a.Hyperlink');
        const range = document.createRange();
        range.selectNode(html);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        document.execCommand('copy');

        hyperlink.style.display = 'none';
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
      background: linear-gradient(
        90deg,
        rgba(255, 0, 0, 1) 0%,
        rgba(255, 154, 0, 1) 10%,
        rgba(208, 222, 33, 1) 20%,
        rgba(79, 220, 74, 1) 30%,
        rgba(63, 218, 216, 1) 40%,
        rgba(47, 201, 226, 1) 50%,
        rgba(28, 127, 238, 1) 60%,
        rgba(95, 21, 242, 1) 70%,
        rgba(186, 12, 248, 1) 80%,
        rgba(251, 7, 217, 1) 90%,
        rgba(255, 0, 0, 1) 100%
      );
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

