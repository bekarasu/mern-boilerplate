import Alert from '@material-ui/lab/Alert';
import React from 'react';
import { connect } from 'react-redux';
import { store } from '../..';
import { IResultMessageBoxProps } from '../../../../../@types/client/admin/form';
import { setShowedResult } from '../../store/result/actions';

class ResultMessageBox extends React.Component<IResultMessageBoxProps> {
  componentDidMount() {
    if (this.props.result.type != null) {
      /** TODO what is it doing? */
      store.dispatch(setShowedResult(this.props.result.type, this.props.result.message));
    }
  }
  render() {
    const style: React.CSSProperties = {
      margin: '20px 0',
      width: '100%',
    };
    return (
      this.props.result.type && (
        <div style={style}>
          <Alert severity={this.props.result.type}>{this.props.result.message}</Alert>
        </div>
      )
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    result: state.result,
  };
};
export default connect(mapStateToProps)(ResultMessageBox);
