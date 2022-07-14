type SuccessCallback = (result: unknown) => unknown;
type FailCallback = () => void;

export class Promise {
    result: unknown;
    status: 'pending' | 'fulfilled' | 'rejected';
    successCallback?: SuccessCallback;

    constructor(fn: (resolve: SuccessCallback, reject: FailCallback) => void) {
        this.status = 'pending';

        fn(this.resolve.bind(this), () => {});
    }

    handleResolve() {
        if (this.successCallback) {
            this.status = 'fulfilled';

            this.successCallback(this.result);
        }
    }

    resolve(result: unknown) {
        this.result = result;

        this.handleResolve();
    }

    then(callback: SuccessCallback) {
        this.successCallback = callback;

        if (this.result) {
            this.handleResolve();
        }
    }
}
