docker build -t frontend .
docker create -ti --name dummy frontend bash
docker cp dummy:/app/build/ ./
docker rm -f dummy
