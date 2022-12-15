PS4='> '
set -ex

docker buildx build --platform linux/amd64 -t dokku/team-fe:latest .
docker save dokku/team-fe:latest | bzip2 | ssh leha@lambdateam "docker load"
ssh leha@lambdateam "dokku git:from-image team-fe dokku/team-fe && dokku cleanup && dokku ps:rebuild team-fe"

