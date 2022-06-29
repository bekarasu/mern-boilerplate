import { response } from 'express';

response.customResponse = function (data: object | null = {}) {
  if (!this.message) {
    this.message = '';
  }

  this.data = { ...this.data, data };
  this.json({ message: this.message, data: data });
  return this;
};

response.setMessage = function (message: object | string) {
  this.message = message;
  return this;
};

response.setRedirect = function (redirectUrl: string) {
  this.customResponse({ redirectUrl: redirectUrl });
  return this;
};
