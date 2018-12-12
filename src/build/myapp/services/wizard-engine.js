const state = {
    currentPage: null,
    nextPage: null,
    backPage: null,
    back: null,
    next: null,
    finish: null,
    cancel: null,
    stateListener: null
};
export var navigationDirective = {
    Cancel: -1,
    Back: 1,
    Next: 2,
    Finish: 3
};

export function getCurrentState() {
    return state;
}
export function setCurrentState(wizard) {
    state.currentPage = wizard.currentPage;
    state.nextPage = wizard.nextPage;
    state.backPage = wizard.backPage;
    state.back = wizard.back;
    state.next = wizard.next;
    state.finish = wizard.finish;
    state.cancel = wizard.cancel;

    if (state.stateListener) {
        //if onStateChange defined, then fire it
        state.stateListener.onStateChange && state.stateListener.onStateChange(state);
    }
}

export function registerStateListener(stateListener) {
    state.stateListener = stateListener;
}

export function onNextWizardPage() {
    if (state.currentPage) {
        return state.currentPage.onNext();
    } else {
        return Promise.reject("currentPage not defined");
    }
}

export function onBackWizardPage() {
    if (state.currentPage) {
        return state.currentPage.onBack();
    } else {
        return Promise.reject("currentPage not defined");
    }
}

export function onCancelWizardPage() {
    if (state.currentPage) {
        return state.currentPage.onCancel();
    } else {
        return Promise.reject("currentPage not defined");
    }
}