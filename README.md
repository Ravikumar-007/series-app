# Web-Series TMDB Ratings based on the Tv id and Series Id


# How to Install the app ?

1. Clone the app into your directory

2. Enter cd series-app and again enter the cd review-app in the terminal

# Now you are in the review-app directory. You can run the following two command to set up the application through docker

1. docker-compose build

2. docker-compose up


# Now your app is running on the localhost:3000

You can check the api and call the Api from postman

http://localhost:3000/api/topEpisodes/{tvId}/{seasonId}
  
For example http://localhost:3000/api/topEpisodes/210/1
  
  '210' is the Tv Series Id and '1' is the season id
  
# For Runnning  the unit test cases please follow the below commands(You can run the application through local also):

1. npm i

2. npm run test  # this is for test case report

3. npm run coverage  # this is for coverage report

For checking the coverage report on the browser please go to the coverage directory and run the index.html







***********Thank You ********************************


