<img src="https://github.com/JairoCal/TikTokClone/blob/main/WikiImages/Vid-hub.png"/>

[Vid-Hub](https://vid-hub.herokuapp.com/) is a fullstack clone of the viral media app TikTok that allows users to share videos in a social media hub and communicate with others!

*********************
## Technologies Used
* React/Redux
* Flask
* CSS3
* SQLAlchemy
* AWS
* WebSockets

*********************
## About

The two week full-stack project incorporates 4 main MVP features and some bonus features:

**MVPs**
* Uploading videos- The user can upload any video for others to see
* Categories- Users view videos based on the categories they choose to follow on sign-up and videos can be designated a category on video upload.
* Comments on Videos- User can comment on videos as long as they are logged in
* Direct Messaging- The logged in user can communicate with other users through a live chat implementation with WebSockets

**Bonuses**
* Following Users- Users can follow other users by clicking on their username when watching a video through the "View All" videos tab. All followed users videos will then be able to be seen through the "Friends Feed"
* Profile Pages- User can view their own profile page and see what they have upload as well as seeing others profile pages and what they have uploaded
* GIF- The user can comment on any video by using the GIPHY api

*********************
## Uploading Videos
When a user is logged in they can choose to upload a video directly from the Navbar. Upon clicking upload the user will be shown a form to select the title and description of the video. After hitting submit the user will be shown a loading bar meanwhile the video uploads successfuly through the AWS service. After a successful upload the user will be given the option to assign the video to a any categories of their choosing.
<img src="https://github.com/JairoCal/TikTokClone/blob/main/WikiImages/Upload%20Video.png"/>

## Comments and Categories
**Categories** allows users to view videos based only on the categories they follow based on their preference on user signup. Each video will render **comments** on the right Navbar after having clicked on a video. A logged in user will then have the option to comment on the chosen video either through the input box or with a GIF through the use of Giphys api.
<img src="https://github.com/JairoCal/TikTokClone/blob/main/WikiImages/Comments%20and%20Categories.png"/>
