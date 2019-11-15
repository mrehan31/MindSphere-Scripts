# 01_helloworld

## Push the app:

First login to MindSphere CloudFoundry with your MindSphere credentials.

Change to directory of this application.

Then push the application:

```
cf push
```

## Create and register the application in MindSphere Developer Cockpit

### 1. Step: Login to your MindSphere tenant

### 2. Step: Open the app "Developer Cockpit"

#### Create the application

Click on "*Create new application*"

* Name: **myhelloworld**
* Display Name: **My HelloWorld**
* Version: **1.0**
* Icon: choose the file **hello-world.png** from this directory
* Components
  * Name: **helloworld**
  * Cloud Foundry Direct URL
    * enter the URL from the end of push command in the line that starts with "routes:" (for example: helloworld-word1-word2.apps.eu1.mindsphere.io)
  * Click on the Add endpoint icon (+) 
    * enter /** as Path

Click on button *Save*

### 3. Step: Add the Core Roles

Click on *Back to Overview*

Click on *Authorization Management*

* Select your application in the list
* Click *Create Scope*
* In the dialog Add application scope
  * enter **all** as Scope Name
  * Click both USER and ADMIN checkboxes
  * Click *save*

### 4. Step: Register the application

Click on *Dashboard*

Click on your application icon

Click on button *Register* (upper right corner)

## Add the application to your user
Go back the MindSphere Launchpad

Go to *Settings* application

Choose your user from  the list od users

Click on *Edit role assignment*

Under *Available roles* search for your application name and assign user and admin role to your user (move it from the left side to right side with the arrow to the right)

## Test the application
Open your application via the application icon
