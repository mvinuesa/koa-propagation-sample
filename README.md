# Koa Propagation Sample

This project show how propagate custom headers.
In example/api.js custom headers are added.
This example propagates three headers:

* Authorization
* X-B3-TraceId
* X-B3-SpanId

This example exposes this endpoints:

* /request
* /response
* /health

## How can I run the application?

This sample call to /request endpoint, this endpoint call to another 
microservice in port 3000 and /response endpoint.

You can run either with the code of the application or
with a dockerfile:

With the code:

```
npm install
```
```
npm start
```

testing using curl:

```
curl -i http://localhost:3000/request
```

with docker run two processes:

```
docker build -t {username}/koa-propagation-sample .
```

```
sudo docker run -p 4000:4000 -p 3000:3000 -d {username}}/koa-propagation-sample
```

testing using curl:

```
curl -i http://{dockerIp}:4000/request
```
