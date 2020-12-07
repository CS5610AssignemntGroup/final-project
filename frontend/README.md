This is front-end of our final project in ReactJS.

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