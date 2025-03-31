# nestjs

Repo contains two folders backend and frontend

:: In backend :: 
1) npm install
2) npm start
    <br/>
    Backend must run on port 3000.
    <br/>
    Url setting :: http://localhost:3000/
3) Now run test if you want
    use : npm test
    <br/>
    <img src="https://i.imgur.com/fAmoOpT.png" width="900" height="400" />


:: In frontend ::
1) npm install
2) npm start
3)  Now run test if you want
    use : npm test
    <br/>
    <img src="https://i.imgur.com/N7HB4YT.png" width="900" height="400" />


<p>If cache data is avilable on refresh or first load
<img src="https://i.imgur.com/11g1YZR.png" width="900" height="400" /></p>

<p>When team name is good enough then
<img src="https://i.imgur.com/ChYVWxL.png" width="900" height="400" /></p>

<p>Team is added
<img src="https://i.imgur.com/pBTnSKV.png" width="900" height="400" /></p>

<p>When any error
<img src="https://i.imgur.com/kNHBcZ6.png" width="900" height="400" />
<img src="https://i.imgur.com/eQSexW0.png" width="900" height="400" /></p>

<p>There is also <code><App/></code> to fetch users from github</p>
<p>Added two test cases for <code><App/></code></p>


<h2>Explanation of your migration approach from Rails to NestJS.</h2>

<b>Controller Mapping</b>
<p>Use various decorators[like @post, @get] to hadle of HTTP requests</p>
<p>Add get method to send cachedData when page is refreshed or new loded</p>

<b>Services</b>
<p>API url settings are here</p>
<p>services handles CacheManager and cachedData</p>

<b>Resposnse</b>
<p>{data:{},message:{},error:0|1}</p>

<b>Validation[Data Transfer Object (DTO)]</b>
<p>Validate request input like min or max length</p>
