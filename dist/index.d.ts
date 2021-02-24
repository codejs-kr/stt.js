import { Handler } from 'mitt';
import { ERROR_TYPES } from './types';
declare class STT {
    private recognition;
    private speechRecognition;
    private isRecognizing;
    private finalTranscript;
    constructor({ lang, continuous, interimResults, maxAlternatives }: {
        lang?: string;
        continuous?: boolean;
        interimResults?: boolean;
        maxAlternatives?: number;
    });
    on<T = any>(eventName: string, listener: Handler<T>): void;
    off<T = any>(eventName: string, listener: Handler<T>): void;
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
