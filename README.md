# LearningTesting2022Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## GH pages deployment

### Dependency

npm i angular-cli-ghpages --save-dev

### Steps

ng build --prod --base-href "https://GitHubUserName.github.io/GitHubfolderName/"

angular-cli-ghpages --dir=dist/learning-testing-2022-frontend

or use script: `npm run deploy:gh`

### To do

- [ ] better error handling (interceptor, error pages)
- [ ] separate sign-out page (?)
- [ ] signout view
  - [ ] email uniqueness checked only on submit
  - [ ] separate "show password" buttons for "password" and "password confirmation"
  - [ ] password mismatch error visible only under password confirmation
- [ ] tickets
  - [x] tickets resolver
  - [x] disabled author field in "create ticket" modal filled with currently signed-in user's name
  - [x] editing existing tickets
  - [x] enable table pagination
  - [ ] include ticket id in details modal when updating
  - [ ] removing tickets - design needed (should "Done" and "Cancelled" be hidden?)
  - [ ] implement sorting tickets table (by default sort by createdAt desc)
  - [ ] correctly sort tickets by position (if not null) or by createdAt date
  - [ ] store new tickets positions in the Database
  - [ ] comments visible under corresponding tickets
  - [ ] adding new comments
  - [ ] editing (only) own comments
  - [ ] adding attachments to tickets (uploads)
  - [ ] adding attachments to comments (uploads) (?)
  - [ ] WYSIWYG editor in ticket description
  - [ ] WYSIWYG editor in comment field
  - [ ] board view
  - [ ] adding/removing tickets categories
  - [ ] move inline styles to scss files
- [ ] users
  - [x] users resolver
  - [ ] editing users data, changing role and active state
  - [ ] adding users
  - [ ] deleting users (soft delete)
  - [ ] move inline styles to scss files
- [ ] implement authorisation/roles management
- [ ] events logging (audit)
- [ ] sending messages between users
- [ ] SSO with Gmail?
- [ ] use websockets
  - [ ] show user online status
