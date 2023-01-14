import React, { ErrorInfo } from 'react';

interface IState {
  hasError: boolean;
  error: Error | null;
  info: ErrorInfo | null;
}

interface IProps {
  children: JSX.Element;
}

class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: IProps | Readonly<IProps>) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ hasError: true, error, info });
  }

  render() {
    const error = this.state.error;
    if (this.state.hasError) {
      return (
        <div className="container">
          <div className="errors-block">
            <h1>Error occurred!</h1>
            {error && (
              <>
                <h3>{error.name}</h3>
                <p>{error.stack}</p>
                <p>{error.message}</p>
              </>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
