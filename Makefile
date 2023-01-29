build:
	docker build -t spshan/bot-ui .

run:
	docker run --rm --name bot-ui-instance -p 80:80 -d spshan/bot-ui

kill:
	docker rm bot-ui-instance -f

push:
	docker push spshan/bot-ui

list:
	docker ps -a