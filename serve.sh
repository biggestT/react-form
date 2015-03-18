#!/bin/bash

NAME="wacky"
PWD="$(pwd)"

docker run \
       --name ${NAME} \
       -v ${PWD}:/usr/share/nginx/html:ro \
       -p 1337:80 \
       -d \
       nginx



