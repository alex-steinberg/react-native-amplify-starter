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
- Specify user attributes to read and write:
  - Email
  - Family Name
  - Given Name
  - Phone Number
  - Profile

### Running the app

To build and run the app, refer to the [Expo docs](https://docs.expo.dev/build/setup/).
