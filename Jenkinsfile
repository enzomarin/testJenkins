pipeline {
  agent none 
  stages {
    stage('Checkout, Test & Build') {
        agent {
          docker {
            image 'node:14-alpine'
            args '-p 3001:3000'
          }
        }
        environment {
          HOME = '.'
        }
        stages {
          stage('Install') {
            steps {
              sh 'npm install'
            }
          }
          stage('Test') {
            steps {
              sh './jenkins/scripts/test.sh'
            }
          }
          stage('Build') {
            steps {
              sh './jenkins/scripts/build.sh'
            }
          }
          stage('Archive') {
            steps {
              archiveArtifacts 'build/**'
            }
          }
        }
    }
    stage('Deploy') {
      agent {
        label 'master'
      }
      options {
        skipDefaultCheckout()
      }
      steps {
        sh 'rm -rf /var/www/valrepuestos'
        sh 'mkdir /var/www/valrepuestos'
        sh 'cp -Rp build/** /var/www/valrepuestos'
        sh 'docker stop valrepuestos || true && docker rm valrepuestos || true'
        sh 'docker run -dit --name valrepuestos -p 8009:80 -v /var/www/valrepuestos/:/usr/local/apache2/htdocs/ httpd:2.4'
      }
    }
  }
}