//Using this method for error handling: https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="alert alert-warning" role="alert">
          <h1>
            Oops, something went wrong.
          </h1>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary