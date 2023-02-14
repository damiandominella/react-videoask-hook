import React, {
  createContext,
  ReactNode,
  useContext,
  useRef,
  useState,
} from 'react';

type VideoAskConfig = {
  kind: 'widget';
  url: string;
  options: {
    widgetType:
      | 'VideoThumbnailWindowTall'
      | 'VideoThumbnailExtraLarge'
      | 'VideoThumbnailJumbo';
    text: string;
    backgroundColor?: string;
    position?: 'bottom-left' | 'top-right' | 'top-left' | 'bottom-left';
    dismissible: boolean;
  };
};

type VideoAskCallbacks = {
  onLoadModal?: () => void;
  onCloseModal?: (removeWidget: () => void) => void;
  onMessage?: (param?: { type: string }) => void;
  onCloseWidget?: () => void;
};

declare global {
  interface Window {
    videoask?: {
      loadEmbed: (
        config: VideoAskConfig,
        callbacks?: VideoAskCallbacks
      ) => Promise<void>;
      onCloseWidget: (callbacks?: any) => void;
    };
  }
}

const VideoAskContext = createContext<{
  showWidget: () => void;
  hideWidget: () => void;
}>({
  showWidget: () => {},
  hideWidget: () => {},
});

export const VideoAskProvider: React.FC<{
  children: ReactNode;
  config: VideoAskConfig;
  callbacks?: VideoAskCallbacks;
}> = props => {
  const [widget, setWidget] = useState<any>(null);
  const widgetRef: any = useRef();
  widgetRef.current = widget;

  const removeWidget = () => {
    widget?.remove?.();
    widgetRef?.current?.remove?.();
    setWidget(null);
  };

  const showWidget = () => {
    if (!widget) {
      window.videoask
        ?.loadEmbed(props.config, {
          ...props.callbacks,
          onCloseModal: () => {
            props.callbacks?.onCloseModal?.(removeWidget);
          },
        })
        .then(el => setWidget(el));
    }
  };

  const hideWidget = () => {
    removeWidget();
  };

  return (
    <VideoAskContext.Provider
      value={{
        showWidget,
        hideWidget,
      }}
    >
      {props.children}
    </VideoAskContext.Provider>
  );
};

export const useVideoAsk = () => {
  const context = useContext(VideoAskContext);

  if (!context) {
    throw new Error('useVideoAsk must be used within VideoAskProvider');
  }

  return context;
};
