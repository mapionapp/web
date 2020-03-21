# w27-front


- [Development](#development)
  - [Shell](#shell)
  - [Work](#work)

## Development
1. Install [Docker](https://www.docker.com/)
2. Start Docker application
3. Run `docker-compose up`

> This will start a local development server on port 8080 in the Docker container.

### Shell
To e.g. install npm packages inside the Docker container and in your project, you have to start a shell in the Docker container with: `docker-compose exec <service> <command>`.

> `<service>` can be found in the "docker-compose.yml" file. Currently the service name is "ui".

If you want to install the "moment" npm package:
- `docker-compose exec ui yarn add moment`

If you want to have a persistent shell:
- `docker-compose exec ui sh`
- `yarn add moment`

### Work
- You can track your work in our [Project](https://github.com/wirvsvirus-27/w27-front/projects/1) 
- You can open Pull Requests as early as possible. Leave a comment that it's work in progress. This way others can give hints early on. 
- Focus on mobile first
- You can take inspriation from this [parking app]('http://www.motoparking.club/')
