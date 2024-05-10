# Notes

## Commands 
1. Build the docker image 
   ```
   docker build -t node-app-image .
   ```
   here is the . ( dot ) is the path of the Dockerfile

   Note that ,when you run this command the first time, it will install the node images, run all the commands in the dockerfile, will execute the layers. When running the 2nd time, the execution will be much faster since the data is stoed in the cache by docker. This will make it faster

2. List all the docker images 
   ```
   docker image ls
   ```
   This will list all the docker images

3. Removing a docker image 
   ```
   docker image rm IMAGE_ID
   ```
   This will remvoe the docker image.
   Here is the IMAGE_ID is hte id of the docker-image which you want to remoeve

   Stopping the docker container
   ```
   docker stop <CONTAINER ID>
   ```
   or
   ```
   docker stop <CONTAINER NAME>
   ```

4. Create a contianer for the docker image and run it 
   ```
   docker run -p 3000:3000 -d --name node-app <REPOSITORY>
   ```
    Runs the dockeer container on port 3000 
    3000:3000 , means that when the request is sent to localhost:3000 , then it will forward it to hte docker container. < LOCAL SYSTEM PORT NUMBER > : < DOCKER MACHINE PORT NUMBER >
    -d -> means detached execution ,this terminal will not be running contrinuous, which will allow to run more commands i nthe same terminal 
    --name node-app -> this is the name of the container
    <REPOSITORY> -> This is the docker image ( the repo ) 

5. Check if docker container is running 
    ```
    docker ps -a
    ```
    This will list down the docker containers that are up and running

6. Remove the container 
   ```
   docker rm node-app -f
   ```
   Removes teh container ( node-app ) 
   -f -> this means forcefully

7. Login to the docker container
   ```
   docker exec -it node-app bash
   ```
   This will login the docker container ( node-app )
   Name ofthe container here is -> node-app. It allows to run cli commands in the terminal.

   Use ```exit`` to exit out of the docker file system

8. Bind Volume
   ```
   docker run -v <PATH TO THE FOLDER ON LOCATION ON LOCAL MACHINE>:<PATH TO THE FOLDER ON THE DOCKER CONTAINER> -p 3000:3000 -d --name node-app node-app-image
   ```

   ```
   docker run -v D:\GitHub\Learn-Docker:/app -p 3000:3000 -d --name node-app node-app-image
   ```
   This will sync the file on the local machine to the docker container. Changes made in the file on the local machine will be reflected on the docker container.

   You can reduce the complexity of the command using variables

    * For Windows command shell ( cmd ) 
    ```
    docker run -v %cd%:/app -p 3000:3000 -d --name node-app node-app-image
    ``` 

    * For Windows powershell ( pshell ) 
    ```
    docker run -v %{pwd}:/app -p 3000:3000 -d --name node-app node-app-image
    ```

    * For Bash/Linux/Mac
    ```
    docker run -v ${pwd}:/app -p 3000:3000 -d --name node-app node-app-image
    ```

    However, if the changes are not reflected, it means that the changes have been synced but the server is down. It is because, the node process was stopped ( killed ). Just like how we run node < APP >.js.
    We have to install __nodemon__ to keep the server up and running so that the sync will be made and the server is running. 

    Use __nodemon__

9. View logs
    ```
    docker logs <CONATAINER NAME>
    ```
    Here it is, 
    ```
    docker logs node-app
    ```

10. Telling docker to not sync a folder/file
    ```
    docker run -v ${pwd}:/app -v /app/node_modules -p 3000:3000 -d --name node-app node-app-image
    ```
    It tells docker to not sync the node_modules folder

11. To not allow users to create/delete files in the dokcer filsesystem. 
    ```
    docker run -v ${pwd}:/app:ro -v /app/node_modules -p 3000:3000 -d --name node-app node-app-image
    ```

12. To load data ( enviroment variables ) from .env file
    ```
    docker run -v ${pwd}:/app -v /app/node_modules --env-file ./.env  -p 3000:4000 -d --name node-app node-app-image
    ```

    .env is the name of the environment file
    ```
    docker run -v ${pwd}:/app -v /app/node_modules --env-file <PATH TO THE .ENV FILE> -p 3000:4000 -d --name node-app node-app-image
    ```
    This will add the environment variables 

13. List all the volumns
    ```
    docker volume ls
    ```

14. Running the docker compose 
    ```
    docker-compose up
    ```

    Or running the docker compose in detached mode 
    ```
    docker-compose up -d
    ```

    otherwise
    ```
    docker-compose up
    ```

    for more help
    ```
    docker-compose up --help
    ```

15. Stopping docker-compose
    ```
    docker-compose down
    ```
    This will stop the docker-compose. 
    
    To get some info, run: 
    ```
    docker-compose down -v
    ```
    You will see 2 things get removed 
        - The Container ( in my case : learn-docker-node-app )
        - The Network ( in my case : learn-docker_default )

16. To rebuild the docker image when running docker-compose
    ```
    docker-compose up --build
    ```
    This will update the docker-image. Changes made in the files on your local machine will be reflted in the docker-image. 
  
17. Running docker-compose for development or production environments
    - For development 
        ```
        docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
        ```
        Here the docker-compose.yml file is shared. The docker-compose.dev.yml file is the second file that we are passing. This file will overwrite any shared configuration in the docker-compose.yml file. After this, will run the docker container in detatched mode ( since we have provided -d flag ) 

    - For production 
        ```
        docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
        ```
        Here the docker-compose.yml file is shared. The docker-compose.prod.yml file is the second file that we are passing. This file will overwrite any shared configuration in the docker-compose.yml file. After this, will run the docker container in detatched mode ( since we have provided -d flag ) 

    The output for both of them will be the container in the running state.

18. Shut down docker containers running in development or production environment. 
    - for development
        ```
        docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v  
        ```
    - for production
        ```
        docker-compose -f docker-compose.yml -f docker-compose.prod.yml down -v  
        ```

    With the ( -v ) flag, we are deleting the volumes associated to the container

19. Rebilding the new container for development or production based  on the configurations in .dev.yml or .prod.yml files
    - for development
        ```
        docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
        ```
    - for production
        ```
        docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
        ```

20. To get a detailed information about a container
    ```
    docker inspect <CONTAINER ID>
    ```
    or 
    ```
    docker inspect <CONTAINER NAME>
    ```
    From this you can get the IP Address of the docker container.
    Which I have obtained from and used to connect my mongodb to node-app using mongoose.

11. To get a full information of the network. 
    ```
    docker network ls
    ```
    Obtain the network-id 
    ```
    docker network inspect <NETWORK ID>
    ```
    or 
    ```
    docker network inspect <NETWORK NAME>
    ```
    This will give a detaile  information about the network, like - the containers present in the network, their IP and MAC addresses etc.

# Concepts

1. 
![Docker container, port explaination](images/5756012c3a9da5abaa8f5e144866249852c908fd0705c58ae0e4b318c8c8f276.png)  
Docker container, PORT explaination

2. .dockerignore file -> just like .gitignore , list down the files which we do not need in the docker container. 
![dockerignore](images/ef5a54a1f5c9e988c59f88612e751b33e0eccc9b9d5a7ddf3c83d7c964cb3629.png)  

Enter into the docker file system and type ```ls``` , the .dockerignore file won't be there.

3. Any updates made into hte local machine files ( like index.js ), will not be reflected in real-time in the docker-deployment. This is because, the image will needed to be built again, and re-run. The docker container will have the stale docker image, so re--build, to update it.
```
docker build -t <DOCKER IMAGE> .
```
```
docker run -p 3000:3000 -d --name <DOCKER CONTAINER> <DOCKER IMAGE>
```

To avoid the rebuilding process, we use __Volumes__.

4. if you remove the node_modules folder , run the docker conatainer, the application will crash. This is because , the node_modules file is not there, server will not work without packages. Deleting the node_modules folder will sync this action in the /app as well, so it will delete the node_modules in the docker container as well. So, the docker container will tun into problems as packages are not found. 

5. Everytime you delete your container, it will preserve the node_modules folder ( as we have excluded the node_modules folder from syncing ). Then re-building the container again from the image, will create new volumnes all the time. It will presserve the node_modules fodler in the container .You can manually delete the volume using 
   ```
   docker volume rm <VOLUMNE NAME>
   ```
   This will delete the volume

   ```
   docker rm <CONTAINER> -f
   ```
   This will not delete the volumes associated with the container

   ```
   docekr rm <CONTAINER> -fv
   ```
   This will delete all the volumes associated with the container

   or 

   ``
   docker volume prune

6. Docker-compose : Docker Compose is a tool for defining and running multi-container Docker applications. It allows you to use a YAML file to configure your application's services, networks, and volumes, and then you can create and start all the services from your configuration with a single command. Docker Compose is particularly useful for development environments, testing, and staging environments, where you need to set up multiple containers that work together.

Once the docker-compose is up and running, this will create a container as per the configuration ion the docker-compose.yml file. On running ```docker image ls```, you will see a new image appear, this is in the format of <FODLER NAME>-<DOCKER IMAGE NAME>-<NUMBER>.
In my case, this is ```learn-docker-node-app-1```.
After this run the ```docker ps``` command and see a new container just appeared containing the __learn-docker-node-app-1__ docker image. 
This means you docker container is up and running, so check out the localhost:3000 whichever port is configured.

If the docker compose container is shut down with ```docker-compose down -v```. It will remove the container and the network. After this if we run ```docker-compose up -d```, you can see that docker has skipped the build process. This is because the docker image is already there, so no need to build the image again ( __UNLESS ANY UPDATION IS MADE IN THE FILES__ or __ANY MODIFICATIONS IN THE DOCKER IMAGE__). This will just create a new Network and start a new container. For this run the command number __16__ from the ##Commands

7. I have added a mongo image in the Dockerfile. Now build and run using docker-compose. 
    ```
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build  
    ```
    And the get into the file system of learn-docker-mongo-app-1 which contains the mongo image.
    ```
    docker exec -it learn-docker-mongo-app-1 bash
    ```
    Then login to the mongosh ( mongoshell ) using the credentials given in the Dockerfile
    ```
    mongosh -u "atharva" -p "mypassword"
    ```
    Then type __show dbs__. Create a new database.
    ```
    db.books.insert({
        'name' : 'harry potter'
    })
    ```
    ```
    db.books.find()
    ```
    ```
    show dbs
    ```
    You will find __books__ database in the database entry.
    Exit from the mongosh , then exit from mongo-app container. Now stop the learn-docker-node-app-1 container ( using docker-compose down command ). Then start the learn-docker-node-app-1 container 
    ```
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
    ```
    Do not build. Then get into the mongo-app container and mongosh. Then __show dbs__. You will find that the database __books__ which we had created earlier is lost. This is because when the docker container is started, it pulls a fresh mongo image. So all our dbs get lost im this process. 
    To avoid this, we use __volumes__. Volumes helps in __persisting data__.

    Another thing is that, since I have mentioned the volumes for mongo as __mongo-db__, then when the node-app container is shut down, then this volume does not get erased. After restarting the container, the databases are preserved. But for this be careful, not to add the __-v__ flag in the end. 
    Because, this will delete the attached volumes ( mongo-db ). 
    ```
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml down
    ```

    To restore the running and stopped volumes
    a. Startup the container ( docker-compose up )
    b.
    ```
    docker volumes prune
    ```
    This will delete the volumes that we dont need and keeps other volumes
    c. Again startup the container ( docker-compose up )

8. In the ```index.js``` file, when we are connecting our nodejs app with mongodb using ```mongoose.connect()``` , in the string, we pass _@ip-address of the mongo container_ which we can look up using the ```docker inspect``` command. But instead of passing the hardcoded ip-address, we can pass the container name in the string. This will tell docker to search for the mongo container name and replace the name with the ip-address automatically. It will use DNS to resolve the name of __mongo-app__ and obtain the ip-address automatically
   ```
   docker network ls
   ```
   This gives network details.

   a. Start the node-app container
   b. Get into the file system of the node-app
   c. 
   ```
   ping mongo-app
   ```
   Now you will see that our app is conented to the mongo-app. The container name __mongo-app__ is resolved to the IP-Adress using the DNS ( Domain Naming Service ). This DNS maps the container name to the ip-adress.
   Generally, the command is 
   ```
   ping <CONTAINER NAME>
   ```


9. Here our node-app is now dependent on mongo-app. The mongo-app will spin up before node-app always. We can start a specific container/service using docker-compose up instead of starting off all the containers/services.
    ```
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d node-app
    ```
    or in general
    ```
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d <CONTAINER NAME>
    ```
    This will start the mongoa-app and then the node-app, in the same order. 

    If we only want to spin up node-app, then
    ```
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d node-app --no-deps
    ```
    This does not start any linked services    
    ![--no-deps](images/4735c40de0e2f4873d44a4236e1cc71608b692b93fe51f64d2ca38e5f576ca7f.png)  







## Articles

1. How to Enable Live-reload on docker-based applicaions with docker volumns : https://www.freecodecamp.org/news/how-to-enable-live-reload-on-docker-based-applications/