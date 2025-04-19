export {};

declare global {
  interface Global {
    ResizeObserver: typeof ResizeObserver;
  }

  var ResizeObserver: {
    new (callback: ResizeObserverCallback): ResizeObserver;
  };
}
