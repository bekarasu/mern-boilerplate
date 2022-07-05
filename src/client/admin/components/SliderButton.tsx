import { Button } from '@material-ui/core';
import React from 'react';
import { ISliderButtonProps, ISliderButtonState } from '../types/components';

class SliderButton extends React.Component<ISliderButtonProps, ISliderButtonState> {
  constructor(props) {
    super(props);
    this.state = {
      activeButton: props.activeButton,
    };
  }

  triggerPageChange = (page: number) => {
    this.props.buttonClickHandler(page);
    this.setState({ activeButton: page });
  };

  render = () => {
    const paginationButtons = [];
    // TODO previous button 1 ... 4 5 not working
    // TODO handle the page length change active button
    for (let i = 1; i <= this.props.buttonCount; i++) {
      switch (i) {
        case this.state.activeButton:
          paginationButtons.push(
            <Button
              onClick={() => {
                this.triggerPageChange(i);
              }}
              color="primary"
              key={i}
            >
              {i}
            </Button>,
          );
          break;
        case this.state.activeButton + 1:
        case this.state.activeButton - 1:
        case this.props.buttonCount:
        case this.props.buttonCount - 1:
          paginationButtons.push(
            <Button
              onClick={() => {
                this.triggerPageChange(i);
              }}
              key={i}
            >
              {i}
            </Button>,
          );
          break;
        case this.state.activeButton + 2:
          paginationButtons.push(
            <Button
              onClick={() => {
                this.triggerPageChange(i + 2);
              }}
              key={i}
            >
              ...
            </Button>,
          );
          break;
        default:
          // don't need other buttons
          // paginationButtons.push(<Button onClick={(e) => { this.triggerPageChange(i) }} key={i} style={{ display: "none" }}>{i}</Button>)
          break;
      }
    }
    return paginationButtons;
  };
}

export default SliderButton;
