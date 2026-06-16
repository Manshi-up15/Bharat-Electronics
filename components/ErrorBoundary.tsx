"use client";
import React from "react";

type Props = { children: React.ReactNode };

export default class ErrorBoundary extends React.Component<Props, { hasError: boolean }> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    console.error("ErrorBoundary caught: ", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="m-8 rounded-lg border p-6">
          <h2 className="text-xl font-semibold">Something went wrong.</h2>
          <p>Please try refreshing the page or contact support.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
