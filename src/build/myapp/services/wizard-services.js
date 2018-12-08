export class WizardPage {

    onNext() {
        throw new Error('You must implement this method');
    }
    onBack() {
        throw new Error('You must implement this method');
    }
    onCancel() {
        throw new Error('You must implement this method');
    }
}
export class WizardBarListener {

    onStateChange(state) {
        throw new Error('You must implement this method');
    }

}
class WizardEngine {
    constructor(year, month, day) {
        this.state = {};
    }
    registerStateListener(stateListener) {
        this.state.stateListener = stateListener;
    }
    getCurrentState() {
        return this.state;
    }
    setCurrentState(state) {
        /*
        {
        currentPage: new PageAccessCodeWizardPage(),
        back: false,
        next: true,
        cancel:true
    }*/
        this.state.currentPage = state.currentPage;
        this.state.nextPage = state.nextPage;
        this.state.backPage = state.backPage;
        this.state.back = state.back;
        this.state.next = state.next;
        this.state.finish = state.finish;
        this.state.cancel = state.cancel;

        if (this.state.stateListener) {
            this.state.stateListener.onStateChange(this.state);
        }
    }

    OnNextWizardPage() {
        if (this.state.currentPage) {
            return this.state.currentPage.onNext();
        } else {
            return new Promise(function (resolve, reject) {
                resolve(false);
            });
        }
        return true;
    }
    OnBackWizardPage() {
        var ok = this.state.currentPage.onBack();
        return ok;
    }
    OnCancelWizardPage() {
        var ok = this.state.currentPage.onCancel();
        return ok;
    }
}
export var wizardEngine = new WizardEngine();