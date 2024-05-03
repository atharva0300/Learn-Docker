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
RUN npm install 

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
EXPOSE 3000

# this is the command that will be assigned too the container 
# when we will run the container
# this is not hte build command, this is the runtime command
CMD ["npm" , "run" , "dev"]


