# Dockerfile
FROM mcr.microsoft.com/playwright:v1.53.2-jammy

USER root

# Install Java (for Allure)
RUN apt-get update && apt-get install -y openjdk-17-jdk

# Recommended: confirm java works
RUN java -version