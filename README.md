# Weather app for ISA

## Introduction

This is a weather app I made for the ISA module. It has been created using simple HTML, CSS, JavaScript and PHP. This prototype is a major upgrade over the previous prototype. Browsing caching has been implemented to speed up the page loading process improving the page load time and reduces browsing costs.

<img width="419" alt="image" src="https://user-images.githubusercontent.com/92678280/192135996-9f6891d7-f246-4acd-801d-6e9462f99524.png">

## Strength of the website

<img width="395" alt="image" src="https://user-images.githubusercontent.com/92678280/192136057-62c97205-4c04-4745-ae86-e463b92b6c00.png">

First, the use of Basic CSS (Cascading Style Sheet) makes the page look more appealing. A search bar has been implemented to help user search the weather of any other city/country instead of just the given one. This website displays the searched city or country's temperature, humidity, pressure, and wind speed along with its direction. In order to fill up empty areas, a random quote generator has also been added, making the website more pleasing to use. The animated icons vary according to the weather and are animated themselves, giving the user a visual representation. When the page is reloaded, the background also changes based on the input city's weather and city. The page fetches data from localhost server which speeds up the access time and saves bandwidth. Since, the database only updates every 30 mins, Last Updated detail has been added to let user know when the information they are viewing was updated. The country code is now also displayed to eliminate confusion regarding which city has been fetched.

<img width="467" alt="image" src="https://user-images.githubusercontent.com/92678280/192136078-614ae1b4-abad-4f71-b99c-cbf76a2a006d.png">

Loading screen has also been added to display fully loaded website to hide annoying partially loaded website.

On the PHP server-side, database and tables are automatically created if it does not exist. Duplication of data is avoided as the old weather data is overwritten by new data. This helps to reduce the size of the database but might hamper if the page ever has to show old weather details. The data are selected via search_query instead of city to get better expected result. Example: searching for Trafford, GB now returns the weather data of Trafford, GB instead of Trafford, US.

## Weakness of the website

In addition to its strengths, this website has many weaknesses. It just displays the current day's weather, so there is no way to view weather details of any other day. The page is likewise unable to calculate day and night cycle and does not display the time of the given city/country. Additionally, the website is responsive in part but not entirely, so how it appears will depend on the width and height of the device. Additionally, all weather conditions are not displayed on the page. The weather app only displays the data in metric units and is currently unable to convert into any other units. Also, the weather app still does not completely work offline. Locally stored weather data does show when network is interrupted, quotes and authors are also stored locally and there is a default background when there is no internet connection.
