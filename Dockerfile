# this file will create a custom image 
# the image can come from the dockerhub, my repo etc

# node image is our base image here in this project
# specify the node:<version>
FROM node:15

# setting the work directory 
# so that any command which runs, runs from this directory 
# this will automatically set hte working directory 
# it will also by default send hte files to this directory 
WORKDIR /app

# copy the package.json file to this Dockerfile
COPY package.json .
# this will copy the package.json to /app/
# this . ( dot ) indicates the currecut working directory for hte dockerfile 
# which is /app 

# isntalling node packages 
# RUN npm install 
# no need to run : npm install 
# we are deciding which command to run based on the environment below

# importing the NDOE_ENV argument from docker-compose.dev.yml or docker.compose.prod.yml file
ARG NODE_ENV
# if the NODE_ENV is development, 
# then run npm install ( which will install the dev dependencies as well )
# else, in production, run npm install --only=production
# which will not install any dev dependencies ( such as nodemon )
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only=production; \
        fi

# copy the rest of the files into our docker image 
COPY . ./
# this will take all the files and folders from the currenct directory 
# of the local host, which is learn-docker
# to ./ ( which is /app of the dockerfile )

# for every operation ( or layer ), FROM , WORKDIR, COPY, RUN , COPY 
# it will copy keep caching the files 
# means that, if there is changed, in hte localhost files 
# then it saves the new files in the cache
# so that, it is faster 
# if no new changes are there, then it takes the files from the 
# previous cache  ( the cache  wont be updated )

# expose the server to port 3000
# EXPOSE 3000
# for ENV ( environment variable )
ENV PORT 3000

# EXPOSE the port
EXPOSE $PORT



# this is the command that will be assigned too the container 
# when we will run the container
# this is not hte build command, this is the runtime command
ENTRYPOINT ["npm" , "run"]

