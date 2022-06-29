import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { StyledComponentProps, withStyles } from '@material-ui/core';
import React from 'react';
import { FieldItem, IReduxFormProps } from '../../../../../@types/client/admin/form';
import { adminApiURL } from '../../../resources/strings/apiURL';

class WYSIWYG extends React.Component<IReduxFormProps & FieldItem & StyledComponentProps> {
  render() {
    const {
      input: { onChange },
    } = this.props; // redux form props
    return (
      <div className={this.props.classes.editor + ' ' + localStorage.getItem('admin:theme')}>
        <CKEditor
          editor={ClassicEditor}
          data={this.props.initialValue}
          onReady={(editor) => {
            /** trigger the redux form for not sending empty content */
            onChange(editor.getData());
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            onChange(data);
          }}
          config={{
            extraPlugins: [CKUploadAdapterPlugin],
          }}
        />
      </div>
    );
  }
}

const styles = (theme) => ({
  editor: {
    color: theme.palette.editor.contrastText,
  },
});

export default withStyles(styles)(WYSIWYG);

function CKUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = function (loader) {
    return new CKUploadAdapter(loader);
  };
}

class CKUploadAdapter {
  loader: any;
  url: string;
  xhr: any;
  constructor(props) {
    // CKEditor 5's FileLoader instance.
    this.loader = props;
    // URL where to send files.
    this.url = `${adminApiURL}/uploadFile`; // TODO it must be dynamic url
  }

  // Starts the upload process.
  upload() {
    return new Promise((resolve, reject) => {
      this._initRequest();
      this._initListeners(resolve, reject);
      this._sendRequest();
    });
  }

  // Aborts the upload process.
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  // Example implementation using XMLHttpRequest.
  _initRequest() {
    const xhr = (this.xhr = new XMLHttpRequest());

    xhr.open('POST', this.url, true);
    xhr.responseType = 'json';
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('admin:accessToken'));
  }

  // Initializes XMLHttpRequest listeners.
  _initListeners(resolve, reject) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = "Couldn't upload file:" + ` ${loader.file.name}.`;

    xhr.addEventListener('error', () => reject(genericErrorText));
    xhr.addEventListener('abort', () => reject());
    xhr.addEventListener('load', () => {
      const response = xhr.response;
      if (!response || response.error) {
        return reject(response && response.error ? response.error.message : genericErrorText);
      }
      // If the upload is successful, resolve the upload promise with an object containing
      // at least the "default" URL, pointing to the image on the server.
      resolve({
        default: response.data.url,
      });
    });

    if (xhr.upload) {
      xhr.upload.addEventListener('progress', (evt) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  // Prepares the data and sends the request.
  _sendRequest() {
    const data = new FormData();

    this.loader.file.then((result) => {
      data.append('file', result);
      this.xhr.send(data);
    });
  }
}
