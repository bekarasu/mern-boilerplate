import { Router } from 'express';
import multer from 'multer';
import ResourceController from '../http/controllers/admin/api/ResourceController';

const replaceAll = (text: string, find: string, replace: string): string => {
  return text.replace(new RegExp(find, 'g'), replace);
};

export const toURLConverter = (text: string): string => {
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
};

export const generateResourceRouteGroup = (router: Router, group: string, controller: ResourceController, multer: multer.Multer): void => {
  router.route(`/${group}/grid`).get(controller.all);
  router.route(`/${group}/create`).get(controller.create);
  router.route(`/${group}/:id`).delete(controller.delete).get(controller.get);
  router.route(`/${group}`).get(multer.any(), controller.list).post(multer.any(), controller.insert).put(multer.any(), controller.update);
};
