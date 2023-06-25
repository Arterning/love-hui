.PHONY: run

run-server:
	docker ps && cd server && yarn run dev
run-web:
	cd client && npm run start
