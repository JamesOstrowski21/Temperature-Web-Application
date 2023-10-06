TODO: Having public API keys and user/passwords hard coded isn't very secure. Figure a way to make it more automatic 

Steps to setup initial docker compose development. 
1) Ensure that docker desktop is running in the background        
2) run: ```docker-compose up -d --build```
3) run docker ps and check that all 4 containers are running
4) Open the web app url and see if the dashboard is there. 
5) Development is now setup for hot reload, so save changes in index.js/index.html and they will show up in the browser right after a webpage reload. 
6) If this doesn't work...... 

To spool down the containers run: ```docker-compose down```

To restart containers run: 
```docker restart \<container name>```. You can view container names by running docker ps

Default Grafana Dashboard url: localhost:3000
- User: admin | Password: admin
- Skip the create new password (we can secure this later)


Default InfluxDB Dashboard url: localhost:8086
- user: root | password: password

Default web app Dashboard url: localhost:5000

---
Most of these following steps are just documentation for how this was initially setup. So these shouldn't need to be worked through. 

If telegraf is in a boot loop, then you must go to InfluxDB and login and create an api token that you will set to INFLUX_API_TOKEN in the .env file.
- Once that is done, go to grafana and login with the user/pass below. Go to "add data source" -> influxdb. 
    - Change the query language to flux,
    - set the http url to influxdb:8086, 
    - deselect "Basic auth", 
    - set the organization to "uiowa", 
    - paste the INFLUX_API_TOKEN value as the password, 
    - and the default bucket to telegraf. 
    - Then press save and test. If that doesn't work. Your're fucked. 
    - If not create a dashboard with the json file found in config/grafana/demo_panel.json


**If telegraf is not starting up**\
check the logs, most of the time it is because the INFLUX_API_TOKEN is not set correctly, if thats the case 
If grafana is not displaying telegraf data from influx\
Log into influx dashboard (localhost:8086)\
Go to load data -> API tokens -> generate API token\ 
Then copy and paste that token into the .env file. 


Logging into Adminer localhost:8080
System: PostgreSQL
Server: db 
Username: root
password: password
Database postgres

In postgres there is a database `numbers` that stores a users name and their phone number

Creating a new table can be done inside Adminer or using the cli. I recommend using adminer. 

When creating new endpoints to see the results of your changes the container needs to be restarted using `docker-compose restart app`. nodemon should be restarting the server automatically but it is not. 