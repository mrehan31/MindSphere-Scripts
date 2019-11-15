1. Log into your MindSphere tenent:

`https://[tenantname].[eu#].mindsphere.io`

2. Naviagate to your Settings Application
3. Click on `Create user` and fill out: 
    * E-mail
    * Global user
    * Assign roles (Developer)
4. Check the new user's e-mail. There should be a link to access the tenant. From here: Create a new Webkey
5. Check your new user's e-mail again and confirm your e-mail's validity
6. Check to make sure you can access your MindSphere tenant
7. Navigate to `https://login.cf.eu1.mindsphere.io/passcode` Enter your new user's webkey and password
8. Copy the passcode for the temporary passcode

**On Command Prompt**

9. Log out of your CF account `cf logout`
10. Log into your new user account (Note: This is where you create the username here): `cf login -o <tenantname> -s <newuseraccount> --sso-passcode <temporarypasscode>`
11. Take note of the user. It should be in a e-mail address format. Log out of the new user account.
12. Log into an account that has `OrgManager` as a role.
13. Create space for user (Optional) `cf create-space <spacename>`
14. Assign the space role to the new user `cf set-space-role <user> <org/tenantname> <spacename> <SpaceDeveloper>`

Note: 
* SpaceManager manages who adminsiter a space with an org
* SpaceDeveloper develops application and services in a space
yopmail