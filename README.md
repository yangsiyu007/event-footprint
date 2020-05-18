# Event Carbon Footprint Calculator


## Build

### Client

#### Set up

Change into the `client` directory.

Delete the `package-lock.json` file and `npm install`.

#### Setting up private npm feed

This is required to use the Wizard component.

Instructions for adding the m365admin feed is at https://dev.azure.com/uifabric/iss/_packaging?_a=connect&feed=m365admin.

In the project `.npmrc`, Make sure to specify the scope of the feed to @m365-admin, not the default registry for everything:
```
@m365-admin:registry=https://pkgs.etc
```

#### Development

In the `client` directory, `npm start`.






## References

https://medium.com/javascript-in-plain-english/full-stack-mongodb-react-node-js-express-js-in-one-simple-app-6cc8ed6de274

https://www.apptic.me/blog/evaluating-mathematical-expression-javascript.php 

