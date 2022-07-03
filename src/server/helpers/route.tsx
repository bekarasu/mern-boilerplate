import './string';

export const toURLConverter = (text: string) => {
  text = text.toLowerCase();
  text = text.replaceAll('ü', 'u');
  text = text.replaceAll(' ', '-');
  text = text.replaceAll('ö', 'o');
  text = text.replaceAll('ı', 'i');
  text = text.replaceAll('ş', 's');
  text = text.replaceAll('ğ', 'g');
  text = text.replaceAll('ç', 'c');
  text = encodeURI(text); // ensure for uncoverted parts
  return text;
};
