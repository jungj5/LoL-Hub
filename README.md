# LoL-Hub
League of Legends content, all visible from one location

### Running Locally
* Client
  * `cd` into `client/`
  * `npm run build` and then `npm run start`
* Server
  * `cd` into `server/`
  * `npm run build` and then `npm run start`

### CI/CD
  * Nothing formal in place yet. At the moment, this project uses [Keel](https://keel.sh/v1/guide/index.html) for updating k8s resources upon new images being pushes to [Dockerhub](https://hub.docker.com/r/jungj5/lol-hub).
  * Basic Flow: `docker push` -> `new image on Dockerhub` -> `Keel receives webhook from Dockerhub` -> `Keel updates relevant resources on cluster`