.PHONY: run

run-server:
	cd server && yarn run dev
run-web:
	cd client && npm run start
