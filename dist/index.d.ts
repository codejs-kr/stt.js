declare class STT {
    private recognition;
    private isRecognizing;
    private finalTranscript;
    constructor({ lang, continuous, interimResults }: {
        lang?: string;
        continuous?: boolean;
        interimResults?: boolean;
    });
    on(eventName: string, listener: () => void): void;
    off(eventName: string, listener: () => void): void;
    start: () => void;
    stop: () => void;
    onStart: () => void;
    onEnd: () => void;
    onResult: (event: any) => boolean;
    onError: (event: any) => void;
    getIsRecognizing: () => boolean;
}
export default STT;
