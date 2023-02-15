# React Video Ask hook

#### Easily manage video ask on react

With this custom hook, you can easily use and customize the behavior of any [videoask](https://www.videoask.com/) video!

## Features

- [Installation](#installation)
- [How to use](#how-to-use)
- [Example](#example)

## Installation

```bash
$ yarn add react-videoask-hook
# or
$ npm install react-videoask-hook
```

## How to use

### Basic usage

```tsx
import { VideoAskProvider } from 'react-videoask-hook';

const App = () => {
  const videoAskConfig = {
    kind: 'widget',
    url: 'https://www.videoask.com/fi0hni2lr',
    options: {
      widgetType: 'VideoThumbnailWindowTall',
      position: 'bottom-left',
    },
  };

  return (
    <VideoAskProvider config={config}>
      <p>My awesome app</p>
    </VideoAskProvider>
  );
};
```

### With custom callbacks

```tsx
import { VideoAskProvider } from 'react-videoask-hook';

const App = () => {
  const videoAskConfig = {
    kind: 'widget',
    url: 'https://www.videoask.com/<video-id>',
    options: {
      widgetType: 'VideoThumbnailWindowTall',
      position: 'bottom-left',
    },
  };

  return (
    <VideoAskProvider
      config={config}
      callbacks={{
        onMessage(params) {
          console.log(params);
        },
        onLoadModal() {
          console.log('on-load-modal');
        },
        onCloseModal(removeWidget) {
          console.log('on-close-modal');
        },
      }}
    >
      <p>My awesome app</p>
    </VideoAskProvider>
  );
};
```

### Hook usage

```tsx
import { useVideoAsk } from 'react-videoask-hook';

const MyComponent = () => {
  const { showWidget, hideWidget } = useVideoAsk();

  return (
    <>
      <button onClick={showWidget}>Show video ask</button>
    </>
  );
};
```

## API

Todo |
