import React from 'react';

class Temporizador extends React.Component {
  state = {
    timer: 30,
    stop: false,
    timerExact: 0,
  }

  componentDidMount() {
    const segundo = 1000;
    setInterval(() => {
      const { timer } = this.state;
      const { state } = this.props;
      if (state === 'stop' ) {
        this.setState({ timerExact: timer });
        this.setState({
          timer: 31,
          stop:true,
        });
      }  else if (state === 'reset' ) {
        this.setState ({
        timer: 30,
        stop:false,
        });
      }
      else {
        this.setState ({
        stop:false,})
      }
      if (timer === 0 ) {
        this.setState({
          timer: 30,
        });
      } else {
        this.setState((prevState) => ({ timer: prevState.timer - 1 }));
      }
    }, segundo);
  }

  render() {
      
      return (
          <span>{ this.state.timer }</span>
      ) ;
  }
}

export default Temporizador;

