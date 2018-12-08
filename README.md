# espa-wizard-example

use the following curl to pull an access_token;
```
curl -X POST \
  https://p7identityserver4.azurewebsites.net/connect/token \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Postman-Token: c2a9eb92-01a3-449b-9f1e-da80c0207682' \
  -H 'cache-control: no-cache' \
  -d 'grant_type=arbitrary_resource_owner&client_id=arbitrary-resource-owner-client&client_secret=secret&scope=offline_access%20wizard&arbitrary_claims=%7B%22top%22%3A%5B%22TopDog%22%5D%2C%22role%22%3A%20%5B%22application%22%2C%22limited%22%5D%2C%22query%22%3A%20%5B%22dashboard%22%2C%20%22licensing%22%5D%2C%22seatId%22%3A%20%5B%228c59ec41-54f3-460b-a04e-520fc5b9973d%22%5D%2C%22piid%22%3A%20%5B%222368d213-d06c-4c2a-a099-11c34adc3579%22%5D%7D&subject=PorkyPig&access_token_lifetime=3600&arbitrary_amrs=%5B%22agent%3Ausername%3Aagent0%40supporttech.com%22%2C%22agent%3Achallenge%3AfullSSN%22%2C%22agent%3Achallenge%3AhomeZip%22%5D&custom_payload=%7B%22some_string%22%3A%20%22data%22%2C%22some_number%22%3A%201234%2C%22some_object%22%3A%20%7B%22some_string%22%3A%20%22data%22%2C%22some_number%22%3A%201234%7D%2C%22some_array%22%3A%20%5B%7B%22a%22%3A%20%22b%22%7D%2C%7B%22b%22%3A%20%22c%22%7D%5D%7D&undefined='
```

Copy the access_token and enter it into the first page of the wizard;

Wizard page makes a fetch call mimicing the following;
```
curl -X GET \
  https://wizardappapi.azurewebsites.net/api/Identity/closed \
  -H 'Authorization: Bearer   eyJhbGciOiJSUzI1NiIsImtpZCI6Imh0dHBzOi8vcDdrZXl2YWx1dC52YXVsdC5henVyZS5uZXQva2V5cy9QN0lkZW50aXR5U2VydmVyNFNlbGZTaWduZWQvOGJkZDYxODA3NWQwNGEwZDgzZTk4NmI4YWE5NGQ3YjIiLCJ0eXAiOiJKV1QifQ.eyJuYmYiOjE1NDQyOTUyNDQsImV4cCI6MTU0NDI5ODg0NCwiaXNzIjoiaHR0cHM6Ly9wN2lkZW50aXR5c2VydmVyNC5henVyZXdlYnNpdGVzLm5ldCIsImF1ZCI6WyJodHRwczovL3A3aWRlbnRpdHlzZXJ2ZXI0LmF6dXJld2Vic2l0ZXMubmV0L3Jlc291cmNlcyIsIndpemFyZCJdLCJjbGllbnRfaWQiOiJhcmJpdHJhcnktcmVzb3VyY2Utb3duZXItY2xpZW50Iiwic3ViIjoiUG9ya3lQaWciLCJhdXRoX3RpbWUiOjE1NDQyOTUyNDQsImlkcCI6ImxvY2FsIiwidG9wIjoiVG9wRG9nIiwicm9sZSI6WyJhcHBsaWNhdGlvbiIsImxpbWl0ZWQiXSwicXVlcnkiOlsiZGFzaGJvYXJkIiwibGljZW5zaW5nIl0sInNlYXRJZCI6IjhjNTllYzQxLTU0ZjMtNDYwYi1hMDRlLTUyMGZjNWI5OTczZCIsInBpaWQiOiIyMzY4ZDIxMy1kMDZjLTRjMmEtYTA5OS0xMWMzNGFkYzM1NzkiLCJjbGllbnRfbmFtZXNwYWNlIjoiRGFmZnkgRHVjayIsInNjb3BlIjpbIndpemFyZCIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJhcmJpdHJhcnlfcmVzb3VyY2Vfb3duZXIiLCJhZ2VudDp1c2VybmFtZTphZ2VudDBAc3VwcG9ydHRlY2guY29tIiwiYWdlbnQ6Y2hhbGxlbmdlOmZ1bGxTU04iLCJhZ2VudDpjaGFsbGVuZ2U6aG9tZVppcCJdLCJjdXN0b21fcGF5bG9hZCI6eyJzb21lX3N0cmluZyI6ImRhdGEiLCJzb21lX251bWJlciI6MTIzNCwic29tZV9vYmplY3QiOnsic29tZV9zdHJpbmciOiJkYXRhIiwic29tZV9udW1iZXIiOjEyMzR9LCJzb21lX2FycmF5IjpbeyJhIjoiYiJ9LHsiYiI6ImMifV19fQ.qatiE55JZ7BkizLVjCAmeTw1jLWA9gkTzMqdj5mR-NuM0zaeW5LkpTvYfo0ciLr9QAvut3M1zsENbrrd73Cl3MX1tMZMjBs2E1tin3dkCp0D9yUwNIaaoPjPWRNeHVhKrw4wMb0HFi3nvOINq4JurU2leobxP904xPxQ_w_ajqLG3zjCWGIWrCszC6gvHZOCIXaWk9xsr9GsmGHZxup2kMe6RnYhEFqfQc3AdziTlzKHY1C9AzWEc2c9Oa0k-xG-Jj7rzurQlFTrWlOsBlvTVpQ4FoMm_CIm2r67VrvqL40v2Jjwc5Cakk4zIsuhdsY-zldKtOgemyIVWRiw9KAoLQ' \
  -H 'Postman-Token: a36de120-3321-4951-8914-16fe454fbb3a' \
  -H 'cache-control: no-cache' \
  -H 'x-authScheme: One'
```

if the call is succesfull, it lets the wizard proceed to the next page.
