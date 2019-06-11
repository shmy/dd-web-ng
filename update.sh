#!/bin/bash
npm run build
scp -r /Users/chao.wang1/code/ng/dd-web-ng/dist/* root@47.75.55.94:/root/projects/dd-web/dist/
