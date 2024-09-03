## About

Circa is *your living dictionary*. With Circa, you'll understand and apply new
words, not just memorize them. 

## Overview
* Add the words you're trying to learn in the **Dictionary** tab, and Circa will
  automatically fetch their definitions
* Use your voice to approximate definitions of your target words
* Using NLP, Circa evaluates how well you understand a word from the definition,
  and adjusts your understanding if necessary
* Spaced repetition makes words **stick**: just remember to come back and
  practice!

## Development/Usage
#### Initially:
* Download pnpm if you don't already have it installed with `npm install -g pnpm`
* Install dependencies using `pnpm install`

#### Each time:
* Begin the server with `pnpm dev`
* To enable database interactions, the backend server must be running
  concurrently and the IP address of connection configured in MongoDB Atlas
* To enable cookies & login sessions, visit the frontend at
  http://127.0.0.1:3000, not localhost
  