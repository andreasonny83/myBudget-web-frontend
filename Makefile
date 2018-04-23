.PHONY: init\
	build\
	plan\
	apply\
	build-dist\
	deploy

build:
	docker build \
	--build-arg AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
	--build-arg AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
	--rm --tag terraform:mybudget --no-cache .

build-dist:
	npm run build

init:
	docker run -it --rm -v ${PWD}:/app -v ${HOME}/.aws:/home/.aws terraform:mybudget init

plan:
	docker run -it --rm -v ${PWD}:/app -v ${HOME}/.aws:/home/.aws terraform:mybudget plan

apply:
	docker run -it --rm -v ${PWD}:/app -v ${HOME}/.aws:/home/.aws terraform:mybudget apply

deploy: build-dist
	aws s3 sync dist/ s3://mubudget.com/
