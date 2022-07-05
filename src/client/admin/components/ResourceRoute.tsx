import React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { IResourceRoute } from '../types/components';
import CreatePage from '../pages/CreatePage';
import ListPage from '../pages/ListPage';
import UpdatePage from './../pages/UpdatePage';
import ShowPage from './../pages/ShowPage';

class ResourceRoute extends React.Component<IResourceRoute, RouteComponentProps<{}>> {
  render = () => {
    return (
      <>
        <Route
          exact
          path={'/' + this.props.link + '/create'}
          component={(props) => <CreatePage serverResource={this.props.serverResource ?? this.props.link} {...props} />}
        />
        <Route
          exact
          path={'/' + this.props.link + '/:id/edit'}
          component={(props) => <UpdatePage serverResource={this.props.serverResource ?? this.props.link} {...props} />}
        />
        <Route
          exact
          path={'/' + this.props.link + '/:id/show'}
          component={(props) => <ShowPage serverResource={this.props.serverResource ?? this.props.link} {...props} />}
        />
        <Route
          exact
          path={'/' + this.props.link + '/list'}
          component={(props) => <ListPage serverResource={this.props.serverResource ?? this.props.link} {...props} />}
        />
      </>
    );
  };
}
export default ResourceRoute;
