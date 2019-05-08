enum PropertyName {
  SDK = 'sdk',
}

Object.defineProperty(window, 'Entrance', {
  enumerable: false,
  configurable: false,
  writable: false,
  value: {},
});

Object.defineProperties((window as any).Entrance, {
  [PropertyName.SDK]: {
    enumerable: false,
    configurable: false,
    writable: false,
    value: {},
  },
});
