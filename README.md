# w27-front


- [Development](#development)
  - [Shell](#shell)
  - [Work](#work)

## Development
1. Don't run `npm install` or `yarn install`
2. Install [Docker](https://www.docker.com/)
3. Start Docker application (only on macOS and Windows. On Linux make sure `dockerd` is running)
4. Copy `.env.example` to `.env` and make the appropriate changes (fill in API keys etc.)
5. Run `docker-compose up`

> This will start a local development server on port 8080 in the Docker container.


### Shell

*Install npm packages and run npm scripts*

You have to start a shell in the Docker container: `docker-compose exec <service> <command>`. 

> `<service>` can be found in the "docker-compose.yml" file. Currently the service name is "ui".

Install npm packages e.g. the "moment" npm package:
- `docker-compose exec ui yarn add moment`

Run our npm script to format the project with prettier:
- `docker-compose exec ui yarn run format`

If you want to have a persistent shell:
- `docker-compose exec ui sh`

With a persistent shell you can use your shell like normal
- `yarn add moment`
- `yarn run format`

### Work
- You can track your work in our [Project](https://github.com/wirvsvirus-27/w27-front/projects/1) 
- You can open Pull Requests as early as possible. Leave a comment that it's work in progress. This way others can give hints early on. 
- Focus on mobile first
- You can take inspriation from this [parking app]('http://www.motoparking.club/')
