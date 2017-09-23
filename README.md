# my-webpack-config
This is a boilerplate project working as a starter using webpack.

Here are some guidelines on how to put this project into use.

To get started, cd into the project root directory, then `npm install` to install dependencies.

_**For development**_, run
```
npm start
```
Launch the browser of your choice and visit **localhost:9000**.

_**For production**_, run
```
npm run build
```
Afterwards, all you need is the _dist_ folder for deployment.

ps: Notice that the index.html is also generated into the _dist_ folder.

Basically, this project makes use of the following webpack features:

#### In development mode
* Hot module replacement (HMR)
* Source map
* Injecting inline styles into the \<head> tag
* Serving bundled assets from memory

#### In production mode
* Extracting css into a seperate file
* Generating index.html according to a template
* Injecting \<script> and \<link> tag into index.html

It is worth noting that webpack2 is used to enable tree shaking, which tremendously reduces the size of bundled assets.

