import * as mainCtrl from 'src/build/myapp/main.js';

describe('main controller', () => {
    before(() => {        
        sinon.stub(ESPA.loadResource, 'css').resolves('css loaded');
    });

    after(() => {
        ESPA.loadResource.css.restore();
    });

    beforeEach(function() {
        console.log("\n");
        console.log("=====================================================================");
        console.log("| STARTED: " + this.currentTest.title);   
        console.log("=====================================================================");      
        
        //remove old elements first
        var el = document.getElementById('main-container');
        el && document.body.removeChild(el);
        el = document.getElementById('main-content');
        el && document.body.removeChild(el);
        el = document.getElementById('loader');
        el && document.body.removeChild(el);
        // create elements for testing (simulate what inside index.html)
        el = document.createElement('div');
        el.id = 'main-container';
        document.body.appendChild(el);
        el = document.createElement('div');
        el.id = 'main-content';
        document.body.appendChild(el);
        el = document.createElement('div');
        el.id = 'loader';
        document.body.appendChild(el);  
    });

    afterEach(function() {
        console.log("=====================================================================");
        console.log("| FINISHED: " + this.currentTest.title);   
        console.log("=====================================================================");
        console.log("\n");
    });

    it('should navigate to wizard-container', () => {
        sinon.spy(ESPA, 'navigate');

        mainCtrl.main();
        ESPA.navigate.should.have.been.calledWith('wizard-container');            
        ESPA.navigate.restore();            
    });
});