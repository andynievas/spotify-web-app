#!/bin/sh

PORT=21222

google-chrome --remote-debugging-port=$PORT

node server -p=$PORT

