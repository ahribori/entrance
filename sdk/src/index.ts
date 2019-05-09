import SDK from './SDK';

export {};

declare global {
  interface Window {
    Entrance: {
      init: (sdkKey:string) => SDK;
      sdk?: SDK;
    };
  }
}

enum PropertyName {
  SDK = 'sdk',
}

Object.defineProperty(window, 'Entrance', {
  enumerable: false,
  configurable: false,
  writable: false,
  value: {
    init: (sdkKey: string) => {
      Object.defineProperties(window.Entrance, {
        [PropertyName.SDK]: {
          enumerable: false,
          configurable: false,
          writable: true,
          value: new SDK(sdkKey),
        },
      });
      return window.Entrance.sdk;
    }
  },
});
