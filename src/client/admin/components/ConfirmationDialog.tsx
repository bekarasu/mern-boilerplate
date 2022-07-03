import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React from 'react';
import { IConfirmationDialogProps } from '../../../../@types/client/admin/components';

class ConfirmationDialog extends React.Component<IConfirmationDialogProps> {
  render = () => {
    return (
      <Dialog
        open={this.props.opened}
        onClose={this.props.closeFunction}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Confirmation'}</DialogTitle>
        {/** TODO localization */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{'Are You Sure?'}</DialogContentText>
          {/** TODO localization */}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.closeFunction} color="primary">
            {'No'}
          </Button>
          {/** TODO localization */}
          <Button onClick={this.props.actionFunction} color="primary" autoFocus>
            {'Yes'}
          </Button>
          {/** TODO localization */}
        </DialogActions>
      </Dialog>
    );
  };
}

export default ConfirmationDialog;
