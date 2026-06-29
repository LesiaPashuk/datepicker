import { Component, ErrorInfo } from 'react';

import { Props, State } from '../types/types';

import styles from './ErrorBoundary.module.scss';

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReload = () => {
    const updateState: State = { hasError: false };

    this.setState(updateState);

    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <article className={styles.errorContainer}>
          <p>Something went wrong.</p>
          <button onClick={this.handleReload} className={styles.reload}>
            ↻
          </button>
        </article>
      );
    }

    return this.props.children;
  }
}
