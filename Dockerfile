FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY . .

RUN npm install

EXPOSE 3000

# postgres
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=abcd1234
ENV POSTGRES_DB=moviesdb

RUN apt-get update && \
    apt-get install -y postgresql && \
    rm -rf /var/lib/apt/lists/*

# make the 'moviesdb' database the default
USER postgres
RUN /etc/init.d/postgresql start && \
    psql --command "CREATE DATABASE moviesdb;" && \
    /etc/init.d/postgresql stop

USER root

CMD [ "npm", "run", "start" ]