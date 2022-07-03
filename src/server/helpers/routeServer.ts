const replaceAll = (text: string, find: string, replace: string): string => {
  return text.replace(new RegExp(find, 'g'), replace);
};

export function toURLConverter(text: string): string {
  text = text.toLowerCase();
  text = replaceAll(text, 'ü', 'u');
  text = replaceAll(text, ' ', '-');
  text = replaceAll(text, 'ö', 'o');
  text = replaceAll(text, 'ı', 'i');
  text = replaceAll(text, 'ş', 's');
  text = replaceAll(text, 'ğ', 'g');
  text = replaceAll(text, 'ç', 'c');
  text = encodeURI(text);
  return text;
}
