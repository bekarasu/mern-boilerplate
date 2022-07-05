import { Button, Menu, MenuItem, StyledComponentProps, withStyles } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React from 'react';
import { Link } from 'react-router-dom';
import { IActionMenuProps, IActionMenuState } from '../../types/form';
import { trans } from '../../../../shared/resources/lang/translate';
import ApiRequest from '../../libraries/ApiRequest';
import ConfirmationDialog from '../ConfirmationDialog';
class ActionMenu extends React.Component<IActionMenuProps & StyledComponentProps, IActionMenuState> {
  constructor(props) {
    super(props);
    this.state = {
      opened: null,
      dialogOpened: false,
    };
  }

  handleClick = (event: React.MouseEvent<HTMLButtonElement>) => this.setState({ opened: event.currentTarget });

  handleClose = () => this.setState({ opened: null });

  handleDialogShow = () => this.setState({ dialogOpened: true });

  handleDialogClose = () => this.setState({ dialogOpened: false });

  handleDelete = (): void => {
    const apiRequest = new ApiRequest();
    apiRequest.delete(this.props.url).then((res: any) => {
      if (res.status === 200) {
        this.handleDialogClose();
        this.props.actionResult(true);
      }
    });
  };

  render = () => {
    const menuItemStyle: React.CSSProperties = {
      width: '100%',
      padding: '0',
    };
    const buttonStyle: React.CSSProperties = {
      padding: '5px 10px',
      width: '100%',
    };
    const linkStyle: React.CSSProperties = {
      textDecoration: 'none',
    };
    const deleteWrapperStyle: React.CSSProperties = {
      padding: '0px',
      width: '100%',
    };

    return (
      <>
        <Button aria-controls="simple-menu" onClick={this.handleClick}>
          <MoreVertIcon />
        </Button>
        <Menu id="simple-menu" open={Boolean(this.state.opened)} onClose={this.handleClose} anchorEl={this.state.opened} keepMounted>
          {Object.values(this.props.actions).map((action: string, index: number) => {
            return (
              <MenuItem key={index} style={menuItemStyle}>
                {action != 'delete' ? (
                  <Link style={linkStyle} className={this.props.classes.link} to={'/' + this.props.url + '/' + action}>
                    <Button style={buttonStyle}>{trans('resource.' + action)}</Button>
                  </Link>
                ) : (
                  <div style={deleteWrapperStyle}>
                    <Button
                      style={buttonStyle}
                      onClick={() => {
                        this.handleDialogShow();
                        this.handleClose();
                      }}
                    >
                      {trans('resource.' + action)}
                    </Button>
                    <ConfirmationDialog opened={this.state.dialogOpened} closeFunction={this.handleDialogClose} actionFunction={this.handleDelete} />
                  </div>
                )}
              </MenuItem>
            );
          })}
        </Menu>
      </>
    );
  };
}

const styles = (theme) => ({
  link: {
    color: theme.palette.primary.contrastText,
  },
});

export default withStyles(styles)(ActionMenu);
