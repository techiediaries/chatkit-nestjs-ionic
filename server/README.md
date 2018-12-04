# Building a mobile app with Nest.js, Ionic 4 and Chatkit - Part 1: Build the backend


In this first part of a tutorial series to learn how to build a full-stack mobile application with cutting-edge technologies like Ionic 4, Nest.js and Pusher's Chatkit you will be building the back-end of the application with Nest.js.


## Getting Started


### Prerequisites

You need to have a basic understanding of TypeScript and Node.js to follow this tutorial. 

TypeScript is a super-set of JavaScript that adds static types to the language. Both Nest.js and Ionic 4 (based on Angular) requires TypeScript so you need to be familiar with it.

You also need to have Node.js and NPM installed on your machine, if they are not installed on your system, you simply need to head to the [official website](https://nodejs.org/) and grab the binaries for your system or refer to your operating system instructions for installing Node.js via the official package manager of your system.

Next create a folder for your project:

```bash
$ mkdir chatkit-nestjs-ionic
$ cd chatkit-nestjs-ionic
```

Next, clone the repository using

```
git clone https://github.com/techiediaries/nestjs-chatkit-demo.git server

```

Next, navigate inside the project's folder and install the dependenices:

```bash
cd server
npm install
```

Finally, start the development server using:

```bash
npm start
```


## Built With

* [Pusher's Chatkit](https://docs.pusher.com/chatkit) - APIs to enable devs building chat apps
* TypeScript and Nest.js

