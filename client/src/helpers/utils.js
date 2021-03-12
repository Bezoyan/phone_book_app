const notify = (message, color, time) => {
  const notifyContainer = document.createElement('DIV');

  notifyContainer.classList.add('lead');
  notifyContainer.style.cssText = `background-color: ${color ? color : 'gray'}; color: #fff; margin: 20px; padding: 10px 10px; position: fixed; right: 72px; top: 0; z-index: 9999;`;

  const textnode = document.createTextNode(message);
  notifyContainer.appendChild(textnode);
  document.body.appendChild(notifyContainer);

  setTimeout(() => {
    document.body.removeChild(notifyContainer);
  }, time);
};

export {
  notify
};