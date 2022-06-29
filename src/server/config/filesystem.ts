import path from 'path';
import { IConfigFileSystem } from '../../../@types/server/IConfigFileSystem';

export const fileSystem: IConfigFileSystem = {
  assetUrl: '/static',
  publicUrl: '/',
  publicPath: path.join(__dirname, 'public'),
  uploadPath: path.join(__dirname, 'public', 'assets'),
  imagesPath: path.join(__dirname, 'public', 'assets', 'images'),
};
