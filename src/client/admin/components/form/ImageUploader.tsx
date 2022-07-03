import { StyledComponentProps, withStyles } from '@material-ui/core';
import React from 'react';
import { IReduxFormProps } from '../../../../../@types/client/admin/form';
import { ITheme } from '../../../../../@types/client/admin/theme';

class ImageUploader extends React.Component<IReduxFormProps & StyledComponentProps> {
  fileObj = [];
  fileArray = [];

  constructor(props: IReduxFormProps & StyledComponentProps) {
    super(props);
    this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this);
  }

  uploadMultipleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.fileObj = [];
    this.fileArray = []; // preview images
    this.fileObj.push(e.target.files);
    for (let i = 0; i < this.fileObj[0].length; i++) {
      this.fileArray.push(URL.createObjectURL(this.fileObj[0][i])); // image preview
    }
  };

  openFileDialog = () => document.getElementById('upload-images').click();

  render = () => {
    const {
      input: { onChange },
      classes,
    } = this.props;
    const buttonStyle: React.CSSProperties = {
      height: '50px',
      width: '100%',
      border: '1px dashed #BBB',
      cursor: 'pointer',
      margin: '20px 0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };
    const inputStyle: React.CSSProperties = {
      height: '0px',
      width: '0px',
      overflow: 'hidden',
    };

    return (
      <>
        <div className="form-group multi-preview">
          {(this.fileArray || []).map((url, key) => (
            <img src={url} alt="..." key={key} />
          ))}
        </div>
        <div className="form-group">
          <div style={buttonStyle} className={classes.imageUploader} onClick={this.openFileDialog}>
            Resim Yükleyin
          </div>

          <div style={inputStyle}>
            <input
              id="upload-images"
              type="file"
              className="form-control"
              multiple
              onChange={(e) => {
                this.uploadMultipleFiles(e);
                onChange(e.target.files);
              }}
            />
          </div>
        </div>
      </>
    );
  };
}

const styles = (theme: ITheme) => ({
  imageUploader: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
});

export default withStyles(styles)(ImageUploader);
