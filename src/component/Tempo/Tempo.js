import React from "react";
import "./Tempo.css";

class Tempo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }

  tick() {
    if (this.state.counter === 7) {
      this.props.playWaitingPads();
      this.setState({
        counter: 0,
      });
    } else {
      this.setState((state) => ({
        counter: state.counter + 1,
      }));
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="container">
        <div>
          <div className="number">{(this.state.counter % 4) + 1}</div>
          <div className="text">STEP</div>
        </div>
        <div className="separation">/</div>
        <div>
          <div className="number"> {parseInt(this.state.counter / 4) + 1}</div>
          <div className="text">BAR</div>
        </div>
      </div>
    );
  }
}

export default Tempo;
