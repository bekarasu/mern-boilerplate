/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-unused-vars */
interface String {
  replaceAll(find: string, replace: string): string;
}

String.prototype.replaceAll = function (find, replace): string {
  const str = this;
  return str.replace(new RegExp(find, 'g'), replace);
};
