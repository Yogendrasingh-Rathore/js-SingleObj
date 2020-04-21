pipeline{
  agent any
    stages{
      stage('Deploy'){
        steps{  
              publishHTML (target : [allowMissing: false,
               alwaysLinkToLastBuild: true,
               keepAll: true,
               reportDir: 'reports',
               reportFiles: 'index.html',
               reportName: 'My Reports',
               reportTitles: 'The Report'])
         }
       }
    }
}    
