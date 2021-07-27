# vaccination-exercise

## Project setup
```
you need installed node.js
npm install
```
### server login information will be sent upon request by email.
```
before running next step, you need to change server info in 
db_connection.js file:

const con = mysql.createConnection({
      host: '217.23.6.9',
      port: '3306',
      user: '********', <--- login in email attachment
      password: '*********', <--- password in email attachment
      database: 'user2617_shopBD'
    });
```
### Compiles and hot-reloads for development
```
node db_connection.js
npm run serve
```

### Test running happen by commnad
```
npm test
```

### Compiles and minifies for production
```
npm run build
```
### You also can change REST API request to your own server
### Need to test it, but might work well
### RESP API request you can find in STORE.ACTIONS
