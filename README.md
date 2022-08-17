# ApgarScore

Manage your goals

## Description

A goal tracking application

Front end is React
API is Spring Boot
DB is MySQL

## Getting Started

### Dependencies

Java 11

https://docs.aws.amazon.com/corretto/latest/corretto-11-ug/downloads-list.html

```
export JAVA_HOME=/Library/Java/JavaVirtualMachines/amazon-corretto-11.jdk/Contents/Home
```

## React App

### Installing

* How/where to download your program
* Any modifications needed to be made to files/folders

### Executing program

* Run the program in dev mode
* Step-by-step bullets
```
npm start
```
Build a package for deployment

```
npm run build
```

## Spring Boot App

### Executing program

* Run application
```
mvn spring-boot:run
```

* Check your API is up and running

```
http://localhost:8080/actuator/health
```
* You should see
```
{"status":"UP"}
```
* Run unit tests
```
mvn test
```


## Authors


## Version History

* 0.1
    * Initial Release
