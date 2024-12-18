This is repository was created by Noel Ly for personal use only


# Disclaimer

This repository is for personal use only. The content and code within this repository are provided "as is," without warranty of any kind, express or implied. The author is not responsible for any consequences or damages resulting from the use of this repository. Use at your own risk.

**Note**: This repository is not intended for commercial use or redistribution. Please respect the terms of use and refrain from copying, distributing, or modifying the content for any commercial purposes.


**Playwright Version:**
v1.48.2

**Node Version:**
v23.4.0

**NPM Version:**
v10.5.2
  
## Set Up
- Clone git repository
- run `npm install`

## Check and update node version with NVM

- node -v
- nvm install 23.4.0
- nvm use 23.4.0
- nvm alias default 23.4.0

## Update with latest dependencies

- npx playwright install --with-deps

## How to allow Safari browser testing

Choose Safari > Preferences, and on the Advanced tab, select “Show Develop menu in menu bar.” For details, see Safari Help. Choose Develop > Allow Remote Automation.

1. RUNNING TESTS

### Run a single test

a. Motortrend
- npm run MT-test tests/Web/homepage.spec.ts    // headed  
- npm run MT-spec tests/Web/homepage.spec.ts   // headless



### Run a suite

a. Motortrend
- npm run mt // headed  
- npm run MT // headless


### See the report generated from the last run

- npm run report


### Docker 

1) Build Container

Make a build of our container based on the dockerfile configuration

 - docker build -t pw-container-test . 

2) Check if the image was properly created

 - docker images

 3) Run the image

 - docker run -it pw-container-test

 4) Run a test from inside the image

- npm run spec articleCreate

5) To exit from the image

- Control + d