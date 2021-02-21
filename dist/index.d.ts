import { ERROR_TYPES } from './types';
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
    onResult: (event: {
        results: any[];
        resultIndex: number;
    }) => void;
    onError: (event: {
        error: string;
    }) => void;
    getIsRecognizing: () => boolean;
    getRecognition: () => any;
}
export { ERROR_TYPES };
export default STT;
