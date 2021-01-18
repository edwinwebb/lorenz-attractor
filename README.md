# Rect Three Fiber Seed

This project is designed to help you get started on your next three.js project. 

It's a port of my [three-seed](https://github.com/edwinwebb/three-seed) project to react-three-fiber.

### Install with Git
In terminal clone the project into a directory of your choice then delete the git folder to start fresh.

```bash
git clone --depth=1 https://github.com/edwinwebb/react-three-fiber-seed.git my-project
cd my-project
rm -rf .git
npm in
```

## Running the development server
To see the changes you make to the starter project go to the project folder in terminal and type...

```bash
npm start
```

This command will bundle the project code and start a development server at [http://localhost:3000/](http://localhost:3000/). Visit this in your web browser; you should see a rotating island and flower.

## Editing the code
The first file you should open is `./App.js`. In it you will find the three objects comprising the ThreeJS scene represented in your browser. 

## About the models
Both the models are loaded by the GLTFLoader and were sourced from the Google Poly project.

Flower uses a split GLTF and the public folder format.

Island uses a single GLTF file in the /src/ folder.

"[Floating Island](https://poly.google.com/view/eEz9hdknXOi)" by [sirkitree](https://poly.google.com/user/3dVB0GT8oMI) is licensed under CC BY 2.0

"[Flower](https://poly.google.com/view/9znAp0dJiS8)" by [Poly By Google](https://poly.google.com/user/4aEd8rQgKu2) is licensed under CC BY 2.0

## Building the project for the web
Once you are happy with your project you'll be sure to want to show it off. Running `npm run build` in terminal will bundle your project into the folder `./build/`. You can upload this directory to a web server. For more complex results read [this guide](https://webpack.js.org/guides/production/).

## License
[MIT](https://github.com/edwinwebb/react-three-fiber-seed/blob/master/LICENSE)