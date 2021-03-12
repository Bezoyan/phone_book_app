# Phonebook Application

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development

### Prerequisites
Ensure you have these setup on your machine
- NodeJS - Server environment for running javascript
- Postgres - Database used
- Sequelize CLI - Object relational mapper for running migrations etc

### Setting up
1. Clone this repository to your directory locally like so `git clone git@github.com:ekundayo-ab/phonebook.git`
2. Rename the `.env.sample` file in the root of the project directory to `.env` and change the `DB_USER`, `DB_NAME` and `DB_PASS` as it applies to you.
3. From the terminal `cd` into the project directory and run `npm install`
4. Run the model migrations with `sequelize db:migrate`
**For Development**
5. Open two terminals and enter `npm run server-dev` on one and `npm run client-dev` on another
**For Production**
5. Open two terminals and enter `npm run server-prod` on one and `npm run client-prod` on another
6. Navigate to url provided in the terminal for the `client-dev` to see the application or access through the url provided by your production hosting platform.