import { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { cn } from "../../utils/cn";
import Button from "../Button/Button";
import styles from "./ErrorBoundary.module.css";

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showDetails?: boolean;
  resetOnPropsChange?: boolean;
  resetKeys?: Array<string | number>;
  homeUrl?: string;
  /** When true, adds a 3D-style shadow (bottom and right) to the error card. */
  threeD?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
    this.props.onError?.(error, errorInfo);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const { resetKeys, resetOnPropsChange } = this.props;
    const { hasError } = this.state;

    if (hasError && resetOnPropsChange && resetKeys) {
      const hasResetKeyChanged = resetKeys.some(
        (key, index) => key !== prevProps.resetKeys?.[index]
      );
      if (hasResetKeyChanged) {
        this.handleReset();
      }
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleGoHome = () => {
    window.location.href = this.props.homeUrl ?? "/";
  };

  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const showDetails = this.props.showDetails ?? false;
      const { error, errorInfo } = this.state;

      return (
        <div className={styles.background}>
          <div className={cn(styles.card, this.props.threeD && "solstice-ui-3d")}>
            <div className={styles.iconBg}>
              <AlertTriangle className={styles.icon} />
            </div>

            <div className={styles.content}>
              <h1 className={styles.title}>Something went wrong</h1>
              <p className={styles.description}>
                We&apos;re sorry, but something unexpected happened. Please try
                one of the options below.
              </p>

              {showDetails && error && (
                <details className={styles.details}>
                  <summary className={styles.detailsSummary}>
                    Error Details
                  </summary>
                  <div className={styles.detailsContent}>
                    <div>
                      <strong>Error:</strong> {error.message}
                    </div>
                    {errorInfo && (
                      <div>
                        <strong>Component Stack:</strong>
                        <pre className={styles.detailsPre}>
                          {errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              )}

              <div className={styles.actions}>
                <Button
                  onClick={this.handleReset}
                  variant="primary"
                  icon={RefreshCw}
                >
                  Try Again
                </Button>
                <Button
                  onClick={this.handleRefresh}
                  variant="ghost"
                  icon={RefreshCw}
                >
                  Refresh Page
                </Button>
                <Button onClick={this.handleGoHome} variant="ghost" icon={Home}>
                  Go Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
