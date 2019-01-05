import * as pageForestCtrl from 'src/build/plugins/forest/controllers/page-forest.js';
import * as wizardappapi from "src/build/plugins/forest/services/wizardappapi-client-services.js";

describe('main controller', () => {
    const idTokenResult = {
        "response": {
            status: 200
        },
        "json": {
            "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IkZENkFGOTIyQTAyNTM4NzE5RjhBQjVBRTM0NjdCMjA1MEU2QUExMkUiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJfV3I1SXFBbE9IR2Zpcld1TkdleUJRNXFvUzQifQ.eyJuYmYiOjE1NDY2NDczMDAsImV4cCI6MTU0OTIzOTMwMCwiaXNzIjoiaHR0cHM6Ly9wN2lkZW50aXR5c2VydmVyNC5henVyZXdlYnNpdGVzLm5ldCIsImF1ZCI6WyJhcmJpdHJhcnktcmVzb3VyY2Utb3duZXItY2xpZW50IiwiY2F0IiwiZG9nIl0sImlhdCI6MTU0NjY0NzMwMCwiYXRfaGFzaCI6IjhGZGZxT3NfSjVFMnl6UUYwcTZxVGciLCJzdWIiOiJQb3JreVBpZyIsImF1dGhfdGltZSI6MTU0NjY0NzMwMCwiaWRwIjoibG9jYWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwb3JreUBwaWcuY29tIiwibmFtZSI6InBvcmt5QHBpZy5jb20iLCJjbGllbnRfbmFtZXNwYWNlIjoiRGFmZnkgRHVjayIsImFtciI6WyJhcmJpdHJhcnlfaWRlbnRpdHkiLCJhZ2VudDp1c2VybmFtZTphZ2VudDBAc3VwcG9ydHRlY2guY29tIiwiYWdlbnQ6Y2hhbGxlbmdlOmZ1bGxTU04iLCJhZ2VudDpjaGFsbGVuZ2U6aG9tZVppcCJdLCJjdXN0b21fcGF5bG9hZCI6eyJiIjpbImNhdCIsImRvZyJdLCJhIjp7IjAiOnsiU3RyZWV0MSI6IjAgTW9udGFuYSBBdmUiLCJTdHJlZXQyIjpudWxsLCJTdHJlZXQzIjpudWxsLCJaaXAiOiI5MDQwMyIsIkNpdHkiOiJTYW50YSBNb25pY2EiLCJTdGF0ZSI6IkNhbGlmb3JuaWEiLCJDb3VudHJ5IjoiVVNBIn0sIjEiOnsiU3RyZWV0MSI6IjEgTW9udGFuYSBBdmUiLCJTdHJlZXQyIjpudWxsLCJTdHJlZXQzIjpudWxsLCJaaXAiOiI5MDQwMyIsIkNpdHkiOiJTYW50YSBNb25pY2EiLCJTdGF0ZSI6IkNhbGlmb3JuaWEiLCJDb3VudHJ5IjoiVVNBIn19fX0.Y-G014qJNQCcDuYz7maGBv2Drn_4-sbPRkEvW6ATffNEbyS4z4nv2FKGYSAkB3MNyGx-7RpWe0dZ1fP6VpLVsC5it_vsIbaFZ-K23Q5zOI1Cf2Km4T4pDKCU4kExLuLrDV-DdbRxWz91aSt1LacqR5l5WcK6Bme9wV0oXDk7IL6Q8oZA3V8C5c_dbDG3caal6g_f-VnC3SPcHLKqHP_2t1pvY-FjwCi2cVvR19zgA_-gYXo0zXDkC6a0CJf-j8rGjbFXzQaZ5Hj_-TiqybWkXllJiXIBnDhkbaDUIh597e0fvNfreE9mCi2r1megWFiKET2q2d7iYZEqzkzCu2xsTA",
            "access_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IkZENkFGOTIyQTAyNTM4NzE5RjhBQjVBRTM0NjdCMjA1MEU2QUExMkUiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJfV3I1SXFBbE9IR2Zpcld1TkdleUJRNXFvUzQifQ.eyJuYmYiOjE1NDY2NDczMDAsImV4cCI6MTU0NjY1MDkwMCwiaXNzIjoiaHR0cHM6Ly9wN2lkZW50aXR5c2VydmVyNC5henVyZXdlYnNpdGVzLm5ldCIsImF1ZCI6WyJodHRwczovL3A3aWRlbnRpdHlzZXJ2ZXI0LmF6dXJld2Vic2l0ZXMubmV0L3Jlc291cmNlcyIsIndpemFyZCIsImNhdCIsImRvZyJdLCJjbGllbnRfaWQiOiJhcmJpdHJhcnktcmVzb3VyY2Utb3duZXItY2xpZW50Iiwic3ViIjoiUG9ya3lQaWciLCJhdXRoX3RpbWUiOjE1NDY2NDczMDAsImlkcCI6ImxvY2FsIiwicHJlZmVycmVkX3VzZXJuYW1lIjoicG9ya3lAcGlnLmNvbSIsIm5hbWUiOiJwb3JreUBwaWcuY29tIiwiY2xpZW50X25hbWVzcGFjZSI6IkRhZmZ5IER1Y2siLCJzY29wZSI6WyJ3aXphcmQiXSwiYW1yIjpbImFyYml0cmFyeV9pZGVudGl0eSIsImFnZW50OnVzZXJuYW1lOmFnZW50MEBzdXBwb3J0dGVjaC5jb20iLCJhZ2VudDpjaGFsbGVuZ2U6ZnVsbFNTTiIsImFnZW50OmNoYWxsZW5nZTpob21lWmlwIl0sImN1c3RvbV9wYXlsb2FkIjp7ImIiOlsiY2F0IiwiZG9nIl0sImEiOnsiMCI6eyJTdHJlZXQxIjoiMCBNb250YW5hIEF2ZSIsIlN0cmVldDIiOm51bGwsIlN0cmVldDMiOm51bGwsIlppcCI6IjkwNDAzIiwiQ2l0eSI6IlNhbnRhIE1vbmljYSIsIlN0YXRlIjoiQ2FsaWZvcm5pYSIsIkNvdW50cnkiOiJVU0EifSwiMSI6eyJTdHJlZXQxIjoiMSBNb250YW5hIEF2ZSIsIlN0cmVldDIiOm51bGwsIlN0cmVldDMiOm51bGwsIlppcCI6IjkwNDAzIiwiQ2l0eSI6IlNhbnRhIE1vbmljYSIsIlN0YXRlIjoiQ2FsaWZvcm5pYSIsIkNvdW50cnkiOiJVU0EifX19fQ.eTzBQtA5fK0Ng5icnPOI69taOWkmN7LA340quwfvuxwOJAnpAsAf5urZxzmGxQV4aEt7Ihh76DsLLuv8GsxLaKU6Q9AmHZoNbj3EjQ35KHFGCvcJzOH6SVdh8zB7dXrQI9TK-KuIN7-mjzwJ2hqoQpgTt8sS3vkRMAPvFxdRT4spCc5m2qAQFMz6mY0_Vt1f-8aou3f5sYE5uL5uI-ZfFDqktcveDI6t-sk2owb5x_atkZ0tOBWUxR7Ab8y8USpfb7XMiCiG3TTWsgfn_p4f6JEHLb4NZak3kZLwOl7nPHqztx01KqxdBsrJD8Ya7ovZ49GmRVxrOTdQ-nde1c0_2A",
            "expires_in": 3600,
            "token_type": "Bearer"
        },
        "error": null
    }

    const viewData = {
        wizardState: {
            "page-harvest": {
              "radioId": "rad1",
              "pluginKey": "forest"
            },
            "prevPage": "page-harvest",
            "page-forest": {
              "id_token": "",
              "backPage": "page-harvest"
            }
        }
    }

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
        el = document.getElementById('wizard-content');
        el && document.body.removeChild(el);
        el = document.getElementById('loader');
        el && document.body.removeChild(el);
        // create elements for testing (simulate what inside index.html)
        el = document.createElement('div');
        el.id = 'main-container';
        document.body.appendChild(el);
        el = document.createElement('div');
        el.id = 'wizard-content';
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

    it('should display is_token', () => {
        sinon.stub(wizardappapi, 'fetchIdToken').resolves(idTokenResult);

        return pageForestCtrl._registerRouteCallback(viewData)
        .then(() => {
            var el = document.getElementById('wizard-content');            
            expect(el.innerHTML).that.does.include(idTokenResult.json.id_token);
            wizardappapi.fetchIdToken.restore();
        });
    });
});