import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

const BuggyComponent = () => {
  throw new Error("I crashed!");
};
const BugFreeComponent = () => {
  return (
    <div
      style={{
        backgroundColor: "red",
        color: "white",
        padding: 20,
        borderRadius: 10,
      }}
    >
      Hello there
    </div>
  );
};

const App2 = () => {
  return (
    <div>
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>
      <BugFreeComponent />
    </div>
  );
};

export default App2;
