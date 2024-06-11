## Requirements

Simple web wallet using database.\
Initial launch\
USER FUNCTIONS\
Sign up\
User can sign up by setting email/password and/or referral code\
User will receive email with a verification link on sign up\
Login\
User can login with email/password and 2fa if it is set.\
User account and security\
User can change password\
User can set 2fa\
Wallet dashboard\
User can see wallet balance by each token\
User can see total wallet balance in USD value\
User can send tokens to other users by providing the recipients email address (in-app sending).\
User can receive tokens from other users(in-app)\
Deposit and withdraw\
User can generate a deposit address and deposit USDT (erc20)\
User can generate a deposit address and deposit IQDC (erc20)\
User can withdraw USDT by providing an address (erc20)\
User can withdraw IQDC by providing an address (erc20)\
Swap\
User can swap USDT for IQDC\
User can swap IQDC for USDT\
Referrals\
User can see their referral link and referral code\
ADMIN FUNCTIONS\
User panel\
Admin can see list of users\
Admin can see user details (user info and wallet balance info)\
Admin can disable users 2fa\
Admin can change users email\
Wallet panel\
Admin can see list of transactions\
deposits\
withdraws\
sending between users\
Admin can see total USDT that is in the system\
Admin can see total IQDC that is in the system\
Admin can send balance to users\
Admin can see list of pending withdraws and approve/deny user withdraws\
Referral panel\
Admin can see user tree list\
Swap function\
Admin can set swap buy price for IQDC/USDT\
Admin can set swap sell price for IQDC/USDT\

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
