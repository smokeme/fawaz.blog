---
title: Cracking Django JWT
date: "2020-10-16T22:40:32.169Z"
description: SECRET_KEY is important when it comes to Django, but why?.
---

Welcome to my first blog post!

I will talk about something you Django developers might tend to forget or ignore.

The `SECRET_KEY` and how it's important.

### DRF 

Django Rest-Framework is a godsend when it comes to creating API endpoints quickly

Personally when authenticating any API endpoint I tend to use JWT `JSON Web Token`

Some of you might have even used JWT or are currently using it

So what does all of this have to do with `SECRET_KEY` ?

Well as it happens  to create a JWT token you need some kind of a secret key `password` if you may say to generate this JWT token

And when it comes to Django, the go-to password for encryption operations  is the `SECRET_KEY`

### Generate a JWT Token 

I've a Django project ready on a github repository that you can use to recreate this test

[Github](https://github.com/smokeme/weakjwt)

After installing the `reqs.txt` requirements and running the server you can navigate to `http://localhost:8000/api/token/` to generate your token

I would recommend creating a superuser first by typing `python manage.py createsuperuser` then using those credentials to generate a token

### Hashcat

Now that we have the JWT token you can start by installing hashcat if you haven't already [Here](https://github.com/hashcat/hashcat)

And maybe even get two more things that will help us in cracking your JWT token, first is the wordlist `rockyou.txt` which can be found [Here](https://github.com/brannondorsey/naive-hashcat/releases/download/data/rockyou.txt)

And `OneRuleToRuleThemAll` from [Here](https://raw.githubusercontent.com/NotSoSecure/password_cracking_rules/master/OneRuleToRuleThemAll.rule)

So what's gonna happen is we have a JWT token, we will first try and crack it using hashcat and the rockyou wordlist, if that fails we can then use hashcat rules, you can read about them more [Here](https://hashcat.net/wiki/doku.php?id=rule_based_attack)

Basically rules will alter the password at every attempt, for example it will add a number to the end of the password or a question mark etc...


### Release The Kraken

Now everything should be ready, go to your hashcat folder and create a new file `nano jwt.txt` and paste the JWT token that your Django application generated there 

And make sure both `rockyou.txt` and `OneRuleToRuleThemAll.rule` are both with in the same folder structure

Then we start with the normal version of cracking by typing:

```bash
hashcat jwt.txt -m 16500 -a 0 rockyou.txt
```

This will make hashcat try to crack the `jwt.txt` file, while giving it the mode of `16500` which means JWT and an attack mode of `0` which means bruteforce and finally a wordlist, which is `rockyou.txt`

If you haven't changed the `secret_key` yet it should find it within seconds if not instantly 

### Let's make it difficult

Let's change the `SECRET_KEY` to something more difficult, for example `hardPassw0rd!` ?

Generate a new token and re-do the same steps we did previously with the exception of the command that we will use

Because now we will be using the rule-based attack by typing:

```bash
hashcat jwt.txt -m 16500 -a 0 rockyou.txt -r OneRuleToRuleThemAll.rule
```

Give it a few moments and it should crack the password!

### What does that mean?

Well since you just cracked the JWT token you can realistically generate new JWT tokens using that same `SECRET_KEY` and trick the website into authenticating you as another user!

You can take a look at information that this JWT holds by using something like [https://jwt.io](https://jwt.io) and pasting the JWT there, you can see that we have a `user_id` that we can change and have access to different users but we must have the same `SECRET_KEY` used first

### Thank you

Thank you for reading this far. Hope you enjoyed it! 

For any questions you can contact me via email at `Fawaz [at] hey [dot] com` or via Twitter at `@Q8fawazo`

Have a nice day!
