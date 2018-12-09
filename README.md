# espa-wizard-example

use the following curl to pull an id_token;
```
curl -X POST \
  https://p7identityserver4.azurewebsites.net/connect/token \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Postman-Token: 10103925-fb6f-4847-a5d9-d958cf78d4e4' \
  -H 'cache-control: no-cache' \
  -d 'grant_type=arbitrary_identity&client_id=arbitrary-resource-owner-client&client_secret=secret&scope=offline_access%20a%20b%20c%20d%20e&arbitrary_claims=%7B%0A%09%22preferred_username%22%3A%20%5B%22ted%40ted.com%22%5D%2C%0A%09%22name%22%3A%20%5B%22ted%40ted.com%22%5D%0A%7D&subject=PorkyPig&access_token_lifetime=3600&arbitrary_amrs=%5B%22agent%3Ausername%3Aagent0%40supporttech.com%22%2C%22agent%3Achallenge%3AfullSSN%22%2C%22agent%3Achallenge%3AhomeZip%22%5D&arbitrary_audiences=%5B%22cat%22%2C%22dog%22%5D&custom_payload=%7B%0A%09%22a%22%3A%20%7B%0A%09%09%220%22%3A%20%7B%0A%09%09%09%22Street1%22%3A%20%220%20Montana%20Ave%22%2C%0A%09%09%09%22Street2%22%3A%20null%2C%0A%09%09%09%22Street3%22%3A%20null%2C%0A%09%09%09%22Zip%22%3A%20%2290403%22%2C%0A%09%09%09%22City%22%3A%20%22Santa%20Monica%22%2C%0A%09%09%09%22State%22%3A%20%22California%22%2C%0A%09%09%09%22Country%22%3A%20%22USA%22%0A%09%09%7D%2C%0A%09%09%221%22%3A%20%7B%0A%09%09%09%22Street1%22%3A%20%221%20Montana%20Ave%22%2C%0A%09%09%09%22Street2%22%3A%20null%2C%0A%09%09%09%22Street3%22%3A%20null%2C%0A%09%09%09%22Zip%22%3A%20%2290403%22%2C%0A%09%09%09%22City%22%3A%20%22Santa%20Monica%22%2C%0A%09%09%09%22State%22%3A%20%22California%22%2C%0A%09%09%09%22Country%22%3A%20%22USA%22%0A%09%09%7D%0A%09%7D%0A%7D&undefined='
```

Copy the id_token and enter it into the first page of the wizard;

Wizard page makes a fetch call mimicing the following;
```
curl -X POST \
  https://wizardappapi.azurewebsites.net/api/Identity/bind \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Postman-Token: 714149d8-1b32-40d1-9dd2-2eb1d5548043' \
  -H 'cache-control: no-cache' \
  -d 'id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6Imh0dHBzOi8vcDdrZXl2YWx1dC52YXVsdC5henVyZS5uZXQva2V5cy9QN0lkZW50aXR5U2VydmVyNFNlbGZTaWduZWQvOGJkZDYxODA3NWQwNGEwZDgzZTk4NmI4YWE5NGQ3YjIiLCJ0eXAiOiJKV1QifQ.eyJuYmYiOjE1NDQzODk5MTEsImV4cCI6MTU0NDM5MDIxMSwiaXNzIjoiaHR0cHM6Ly9wN2lkZW50aXR5c2VydmVyNC5henVyZXdlYnNpdGVzLm5ldCIsImF1ZCI6WyJhcmJpdHJhcnktcmVzb3VyY2Utb3duZXItY2xpZW50IiwiY2F0IiwiZG9nIl0sImlhdCI6MTU0NDM4OTkxMSwiYXRfaGFzaCI6IndHRUxqWVFzQUV4NWFQWTVWUkFpaUEiLCJzdWIiOiJQb3JreVBpZyIsImF1dGhfdGltZSI6MTU0NDM4OTkxMSwiaWRwIjoibG9jYWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ0ZWRAdGVkLmNvbSIsIm5hbWUiOiJ0ZWRAdGVkLmNvbSIsImNsaWVudF9uYW1lc3BhY2UiOiJEYWZmeSBEdWNrIiwiYW1yIjpbImFyYml0cmFyeV9pZGVudGl0eSIsImFnZW50OnVzZXJuYW1lOmFnZW50MEBzdXBwb3J0dGVjaC5jb20iLCJhZ2VudDpjaGFsbGVuZ2U6ZnVsbFNTTiIsImFnZW50OmNoYWxsZW5nZTpob21lWmlwIl0sImN1c3RvbV9wYXlsb2FkIjp7ImEiOnsiMCI6eyJTdHJlZXQxIjoiMCBNb250YW5hIEF2ZSIsIlN0cmVldDIiOm51bGwsIlN0cmVldDMiOm51bGwsIlppcCI6IjkwNDAzIiwiQ2l0eSI6IlNhbnRhIE1vbmljYSIsIlN0YXRlIjoiQ2FsaWZvcm5pYSIsIkNvdW50cnkiOiJVU0EifSwiMSI6eyJTdHJlZXQxIjoiMSBNb250YW5hIEF2ZSIsIlN0cmVldDIiOm51bGwsIlN0cmVldDMiOm51bGwsIlppcCI6IjkwNDAzIiwiQ2l0eSI6IlNhbnRhIE1vbmljYSIsIlN0YXRlIjoiQ2FsaWZvcm5pYSIsIkNvdW50cnkiOiJVU0EifX19fQ.H5ZSlfQ5IZXpkxgwi7sZ25C9t37LG7mHRWR3LYNR4ls7g6PDbq3MMRLbL5p4VcV6WnexFPxru-_0K-3bBQmg5nmbDNQ0jSPXQu9c9JPIJyUuD9BfZaDPlLDBBrZzOodoBAYn0R09U50NW2J5pJUKq6hkBT6JvRknisOt_LjHEvDPi1Li30O32k_oILrkHVXPU_WBApSTFKnCfuTeUQ6LruJ2WEODlty6QcoWA2drk4ZWNhRVrsU9tiljUmFjjpnlK81RLmKZW-DPSuyPATqSZSA7NTlh985Z94G4-NddZE1bbEMHLSoJGmbKGAMJRZjp11Dm42L3cRw6lPPSB3keAw&undefined='
```

The bind call returns an access_token and refresh_token,
At this point the client has what it needs to make authorized calls and to refresh tokens to keep going.

```
curl -X GET \
  https://wizardappapi.azurewebsites.net/api/Identity/closed \
  -H 'Authorization: Bearer   eyJhbGciOiJSUzI1NiIsImtpZCI6Imh0dHBzOi8vcDdrZXl2YWx1dC52YXVsdC5henVyZS5uZXQva2V5cy9QN0lkZW50aXR5U2VydmVyNFNlbGZTaWduZWQvOGJkZDYxODA3NWQwNGEwZDgzZTk4NmI4YWE5NGQ3YjIiLCJ0eXAiOiJKV1QifQ.eyJuYmYiOjE1NDQzOTQ5OTksImV4cCI6MTU0NDM5ODU5OSwiaXNzIjoiaHR0cHM6Ly9wN2lkZW50aXR5c2VydmVyNC5henVyZXdlYnNpdGVzLm5ldCIsImF1ZCI6WyJodHRwczovL3A3aWRlbnRpdHlzZXJ2ZXI0LmF6dXJld2Vic2l0ZXMubmV0L3Jlc291cmNlcyIsIndpemFyZCJdLCJjbGllbnRfaWQiOiJhcmJpdHJhcnktcmVzb3VyY2Utb3duZXItY2xpZW50Iiwic3ViIjoiUG9ya3lQaWciLCJhdXRoX3RpbWUiOjE1NDQzOTQ5OTksImlkcCI6ImxvY2FsIiwicm9sZSI6WyJhcHBsaWNhdGlvbiIsImxpbWl0ZWQiXSwiY2xpZW50X25hbWVzcGFjZSI6IkRhZmZ5IER1Y2siLCJzY29wZSI6WyJ3aXphcmQiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsiYXJiaXRyYXJ5X3Jlc291cmNlX293bmVyIl19.FOlfK6BEzE3l_k-hXzgtZ_JpJ9FbNsEPu-Y-DMJGOLqEtJkZUWU1ltNLCmOol_HxvAR2NQAOL_07xsK7Q87CT2KX18Q2nkmqxauDWfuLvKj-iZRE-O5q8Wt5StSCTWkHID-3lD9thkgEd5R-J68gKmT7bq__ce0GzdVziyIzmImVjCAKTzmyIWcSxtD_4QIniH1Z5Kd2mSnuA7yIr5l-uHYuxUhCGEcaew6FWnfsegSPt5neAr_jMplVwmfFRnx-P1a8raHlWBdw6MHeSEF4-NRz9_JVfLCxrL72aPcDH7WKSPxShkpTunIrnG7q9mJlBa4_yuUCAtxJMXr8Zt6f-Q' \
  -H 'Postman-Token: 0d7d8974-ad7f-43b1-b24f-bab20bec93a3' \
  -H 'cache-control: no-cache' \
  -H 'x-authScheme: One'
```


 
