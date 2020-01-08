#!/bin/bash
# raspberry
# npm run build
# scp -r /Users/chao.wang1/code/ng/dd-web-ng/dist/* pi@192.168.2.226:/home/pi/
# ssh pi@192.168.2.226 "sudo rm -rf /home/usbdisk/dd_web && sudo mv /home/pi/dd_web /home/usbdisk"
scp -P 6000 /Users/chao.wang1/code/ng/dd-web-ng/dist/dd-web.tar.gz pi@47.75.55.94:/home/pi/docker
