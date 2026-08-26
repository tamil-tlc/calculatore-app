FROM eclipse-temurin:17-jre

WORKDIR /calculator-app

COPY target/*.jar calculator-app.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "calculator-app.jar"]