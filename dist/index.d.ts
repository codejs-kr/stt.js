declare class STT {
    recognition: any;
    isRecognizing: boolean;
    constructor({ language }: {
        language?: string;
    });
    start(): void;
    stop(): void;
    onStart(): void;
    onResult(): void;
    onError(): void;
    initialize(): void;
}
export default STT;
