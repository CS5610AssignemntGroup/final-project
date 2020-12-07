# 418 I am a teapot

This is front-end of our food delivery project in ReactJS and TypeJS.

## get start
To start with, install all the dependency by command

```bash
yarn install
```

To start the dev server on your local computer, run
```bash
yarn dev
```
(That's different from common practice `npm start` due to the heroku CI/CD requirement)

To test the prettier, run
```bash
yarn test
```
this command would check the code format using `prettier`


To auto-fix all the formatting problem, run
```bash
prettier --write src/**/*.{tsx,ts,css}
```

## Actions

This project comes with two actions, the first is `CI`, which try to build and test if the existing code is in form of *prettier* format. if the `CI` check is passed and PR get approved, it would be automatically deployed on a heroku server, and the website URL is https://team418-i-am-a-teapot.herokuapp.com/

## Prototype

We build the Prototype based on the UI of Ubereat with some anime elements of Fate series.

https://www.figma.com/file/aANSnp6Z9mdtEZAvFyI9Yd/SaberEats?node-id=0%3A1


