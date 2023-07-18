# React Native Amplify Starter

Starter for building a React Native mobile app using AWS Amplify for authentication.

It contains skeleton screens and a reasonable navigation flow that covers:

- Coaching screens
- Registering an account
- Logging in
- Logging out
- Updating your profile

The UI Kitten components based on the Eva design system are used, but feel free to use your own. The idea here
is Amplify integration rather than UI components. The components are hacked quite a bit and do not leverage
the design system (e.g. mapping.json). Shout out to Tyrone and Paul from codesource.co.za for some of the UI bits!

## Usage

### Environment

Install the latest:

- Node LTS
- Xcode
- Android Studio

### Amplify

Amplify is a CLI tool from AWS that helps provision and configure services needed for app development quickly and easily.

To install Amplify, run

```
npm install -g @aws-amplify/cli
```

Or refer to the [docs](https://docs.amplify.aws/cli/start/install) for more detailed instructions.

Once the CLI is installed, connect your AWS account by running

```
amplify configure
```

Once you're connected, initialize your amplify project by running

```
amplify init
```

Choose the defaults or customize the setup.

Once the project is created, it's time to create authentication. Run

```
amplify add auth
```

to set up the user pool. Use the below options when asked. For those not mentioned, _default to 'no'_ or choose
your own.

- User Sign-Up, Sign-In, connected with AWS IAM controls
- Don't enable unauthenticated logins
- Don't enable 3rd party authentication
- Choose 'Email' sign in
- Don't add user pool groups
- Don't add an 'admin queries API'
- Don't add MFA
- Enabled 'Email based user registration/forgot password'
- Password security:
  - Minimum 8 character(s)
  - Contains at least 1 number
  - Contains at least 1 special character
  - Contains at least 1 uppercase letter
  - Contains at least 1 lowercase letter
- Attributes required for signing in:
  - Email
  - Family Name
  - Given Name
  - Phone Number
  - Profile
- Specify user attributes to read and write; add other capabilities etc etc: No and none

Now Amplify is configured locally. Push it to set up the new resources in the cloud:

```
amplify push
```

One last thing. The CLI doesn't allow us to create custom attributes, so let's create that using the console.

In the AWS console, go to Cognito and the region you chose (e.g. US East N.Virginia us-east-1). In the user pool section,
click 'Sign-up experience', click 'Add custom attributes' and enter the attribute `company` and save.

### Running the app

Now that the back-end is configured and connected, let's run the app.

For iOS, run

```
npm run ios:dev
```

For Android, run

```
npm run android:dev
```

These will open emulators in the respective platform with the app running and responding to local file changes.

If Expo Go is more your thing, go ahead and install that.

If you're ready for a production build, go through the [Expo docs](https://docs.expo.dev/build/setup/).

### Next steps

Continue to build out the back-end with Amplify by adding other services, such as an REST or GraphQL API
with:

- `amplify add api`
- `amplify add storage`
- `amplify add function`

I prefer to manage my AWS resources with [Serverless](https://serverless.com/), and have a follow-up tutorial
about how to tack that on in the pipeline.