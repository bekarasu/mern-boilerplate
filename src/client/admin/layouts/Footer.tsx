import { Grid } from '@material-ui/core';
import React from 'react';

export default class Footer extends React.Component {
  render = () => {
    return (
      <footer className="z-999">
        <Grid container direction="row">
          <Grid item md={7}>
            <p>Copyright 2022 © bekarasu.com. Tüm hakları saklıdır</p>
          </Grid>
          <Grid item md={5}>
            <p>
              Env:{' '}
              <span>
                <strong>{process.env.NODE_ENV}</strong>
              </span>
            </p>
          </Grid>
        </Grid>
      </footer>
    );
  };
}
