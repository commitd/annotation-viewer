pipeline {
  agent {
    docker {
      image 'node:lts'
      args '--network $DOCKER_NETWORK --volumes-from $MAVEN_CACHE'
    }
  }
  environment {
    NEXUS_PASSWORD = credentials('NEXUS_PASSWORD')
    NEXUS_AUTH = credentials('NEXUS_AUTH')
    SONAR_PASSWORD = credentials('SONAR_PASSWORD')
  }
  stages {
    stage('install') {
      steps {
        sh 'yarn install'
      }
    }
    stage('build') {
      steps {
        sh 'yarn build'
      }
    }
    stage('test') {
      steps {
        sh 'yarn test'
      }
    }
  }
}
