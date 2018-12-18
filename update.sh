#!/bin/bash
ng build --prod
scp -r /Users/shmy/code/angular/dd-web/dist/dd-web/* root@47.75.55.94:/root/projects/dd-web/dist
