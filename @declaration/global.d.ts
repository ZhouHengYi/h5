interface Window {
    control: {
        [key: string]: (...args: any[]) => any;
    };
    webkit: {
        messageHandlers: {
            [key: string]: {
                postMessage: (message: any) => void;
            };
        };
    };
    _czc:any;
}
