import React from 'react';

const RenderLink = (
  {
    text
  }: {
    text: string;
  }
) => {
  // remove all html tags from text
  const htmlTagRegex = /<\/?[^>]+(>|$)/g;
  let replacedText = text.replace(htmlTagRegex, '');

  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  replacedText = replacedText.replace(emailRegex, (match) => {
    return `<a class="external-link" href="mailto:${match}">${match}</a>`;
  });

  const phoneRegex = /(\+?\d{1,4}[\s-])?(?:\(?\d{3}\)?[\s-]?)?\d{3}[\s-]?\d{4}/g;
  replacedText = replacedText.replace(phoneRegex, (match) => {
    const telNumber = match.replace(/[\s-]/g, '');
    return `<a class="external-link" href="tel:${telNumber}">${match}</a>`;
  });

  const urlRegex = /(https?:\/\/[^\s]+)/g;
  replacedText = replacedText.replace(urlRegex, (match) => {
    return `<a class="external-link" href="${match}" target="_blank" rel="noopener noreferrer">${match}</a>`;
  });
  return (
    <span dangerouslySetInnerHTML={{ __html: replacedText }}></span>
  );
};

export default RenderLink;