import React from 'react';
import { connect } from 'react-redux';
import { ISidebarProps, ISidebarState } from '../types/layouts';
import { trans } from '../../../shared/resources/lang/translate';
import NestedList from '../components/NestedList';
import ApiRequest from '../libraries/ApiRequest';
const requester = new ApiRequest();

class Sidebar extends React.Component<ISidebarProps, ISidebarState> {
  constructor(props) {
    super(props);
    this.state = {
      listItems: [],
    };
  }

  componentDidMount = async () => {
    let res;
    try {
      res = await requester.get('admin-menu');
    } catch (err) {
      console.log(err);
    }

    this.setState({ listItems: res.data.data });
  };

  render = () => (
    <>
      <p>{trans('sidebar.greetings', { name: this.props.user.name })}</p>
      {this.state.listItems.length > 0 && <NestedList items={this.state.listItems} />}
    </>
  );
}

const mapStateToProps = (state: any) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Sidebar);
