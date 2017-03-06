###Build Notes

1. Put Raspbian Jessie Light on sd card. Apple Pi baker makes it easy from OSX.
2. add blank file called ssh with no file extension to the boot partition of the card.
3. edit the `etc/wpa_supplicant/wpa_supplicant.conf` file to contain the wifi details.
 e.g.
 ```
 network={
     ssid="The_ESSID_from_earlier"
     psk="Your_wifi_password"
 }
 ```
 4. Connect the pi with peripherals, Boot and login
 5. Obtain ip address with 'ifconfig'
 6. Check network connectivity `ping -c 10 google.co.uk`
 7. Connect over ssh from remote, on remote terminal `ssh pi@IPADDRESS`
 8. Update the package list. `sudo apt-get update`
 9. Update the packages. `sudo apt-get upgrade`
 10. If it has been a long time consider `sudo apt-get dist-upgrade`. But this may bring breaking changes.
 11. Run `sudo raspi-config`.
  - Change the root password;
  - Ensure, Boot to CLI;
  - Expand the file system;
  - Change hostname if necessary;
  - Enable SSH
  - Check the locale details and timezone are correct;
  - Set the memory split to be low for graphics (16MB);
  - Finish and `sudo reboot`;

12. Install git, `sudo apt-get install git`.
13. Install node and npm:
```
cd
git clone https://github.com/audstanley/NodeJs-Raspberry-Pi
cd NodeJs-Raspberry-Pi
chmod +x Install-Node.sh
sudo ./Install-Node.sh
cd .. && rm -R -f NodeJs-Raspberry-Pi/
node -v
```

14. Clone the git repo, `git clone https://github.com/willcook4/Lightwall.git`;

15. Any updates to the code, in terminal move into the folder and `git pull`.

// Checked 3/3/2017


####Cheats
Reboot: `sudo reboot`
Shutdown: `sudo shutdown -h now`
To check free space on the file system: `df -Bm`
Reboot and check the filesystem:`sudo shutdown -rF now`

