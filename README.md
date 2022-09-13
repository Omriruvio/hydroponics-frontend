
# Hydroponics Network - Frontend

User data management system for Hydroponics Network.

Users submit crop related data for their hydroponic crops such as temperature, electric conductivity, ph, and raw images of their crops via Whatsapp and receive AI based feedback for improving their crop's health.

Data representation is also available via user and admin dashboards.


## Installation

** Environment variables must be set prior to deployment **

To install this project run


```bash
  git clone https://github.com/Omriruvio/hydroponics-frontend.git
```
```bash
  cd hydroponics-frontend
  npm install
  npm run build
```
    
## Deployment
Requires backend deployment - see here: 
https://github.com/Omriruvio/hydroponics-backend

#### Local deployment:
```bash
  npm run dev  
```

The frontend will be available at http://localhost:3000 (by default)

#### Server deployment:
```bash
  npm run build
  npm run start
```

The frontend will be avilable http://localhost:3001 (by defaault)


## Tech Stack

**Client:** NextJS, React, Styled Components

**Server:** Node, Express, MongoDB, Twilio


## Environment Variables

To run this project, you will need to add the following environment variables to your .env.local file

`NEXT_PUBLIC_MAIN_API_URL_DEV=http://localhost:{your-local-port}`

`NEXT_PUBLIC_MAIN_API_URL_PROD=http://{your-dev-server}:{your-dev-port}`


## Author - contact

- [Github - Omri Ruvio](https://www.github.com/omriruvio)
- [Twitter - @omriruvio](https://twitter.com/omriruvio)
- [LinkedIn](www.linkedin.com/in/omri-ruvio)

