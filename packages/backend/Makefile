run:
	@KO_DATA_PATH=cmd/kodata/ SAAS_ADDRESS="http://0.0.0.0:8080" go run cmd/main.go

staging:
	@KO_DATA_PATH=cmd/kodata/ SAAS_ADDRESS="http://72.19.63.78:8080" go run cmd/main.go

prod:
	@KO_DATA_PATH=cmd/kodata/ SAAS_ADDRESS="http://173.239.91.133:8080" go run cmd/main.go

build:
	@cd cmd && go mod tidy && go build -o ../../../release/tea main.go
	@cd ../react-app && yarn && yarn build
	@cd ../react-app && rm -rf ../backend/cmd/kodata  &&  mv build kodata && cp -r kodata ../../release/  && mv kodata ../backend/cmd/kodata 

rel:
	@mkdir -p ../../release/data/keys
	@cp ../../hack/ez_start_WINDOWS.bat ../../release/ez_start_WINDOWS.bat && cp ../../hack/ez_start.sh ../../release/ez_start.sh
	@cd ../react-app && yarn && yarn build
	@cd ../react-app && rm -rf ../backend/cmd/kodata  &&  mv build kodata && cp -r kodata ../../release/kodata  && mv kodata ../backend/cmd/kodata 
	@cd cmd && go mod tidy && GOOS=windows go build -o ../../../release/windows.exe main.go
	@cd cmd && go mod tidy && GOOS=linux go build -o ../../../release/linux main.go
	@cd cmd && go mod tidy && GOOS=darwin go build -o ../../../release/mac main.go
	@cd cmd && go mod tidy && GOOS=linux GOARCH=arm go build -o ../../../release/rpi main.go
	@cd cmd && go mod tidy && GOOS=linux GOARCH=arm64 go build -o ../../../release/rpi64 main.go
	@cd cmd && go mod tidy && GOOS=linux GOARCH=arm GOARM=7 go build -o ../../../release/rpi3 main.go


debug:
	@make build
	@make run

image:
	@make build
	@gcloud builds submit --tag gcr.io/mineonlium/tea
