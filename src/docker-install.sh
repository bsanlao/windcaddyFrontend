docker stop frontend
docker rm frontend
docker run -d \
  --name frontend \
  -p 80:80 \
  frontend:v1
