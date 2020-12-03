declare class STT {
    private recognition;
    private isRecognizing;
    private finalTranscript;
    constructor({ lang, continuous, interimResults, maxAlternatives }: {
        lang?: string;
        continuous?: boolean;
        interimResults?: boolean;
        maxAlternatives?: number;
    });
    on(eventName: string, listener: () => void): void;
    off(eventName: string, listener: () => void): void;
    start: () => void;
    stop: () => void;
    abort: () => void;
    onStart: () => void;
    onEnd: () => void;
    onResult: (event: any) => boolean;
    onError: (event: any) => void;
    getIsRecognizing: () => boolean;
    getRecognition: () => any;
}
export default STT;
