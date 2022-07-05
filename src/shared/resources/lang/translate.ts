import { LanguageGroup, TranslateParams } from '../../types/Lang';
import app from '../../config/app.json';
import { localeEN } from './en';
import { localeTR } from './tr';

const locale: LanguageGroup = {
  tr: localeTR,
  en: localeEN,
};

export const trans = (key: string, params?: TranslateParams, lang?: string): string => {
  if (lang == null) lang = app.lang; // if lang is not set, get the default lang in config
  let text: string = index(locale[lang], key);
  if (text == null || text === '') {
    console.log('translation not found: ' + key);
    return key;
  }
  for (const param in params) {
    text = text.replace(':' + param, trans(params[param]));
  }
  return text;
};

const index = (obj: any, key: string | string[]): string => {
  try {
    if (typeof key == 'string') return index(obj, key.split('.'));
    else if (key.length == 0) return obj;
    else return index(obj[key[0]], key.slice(1));
  } catch (e) {
    return '';
  }
};
