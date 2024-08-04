let weather ={
    apiKey: "05d7433b9a26d612435ffd298e2ff1e2",
    fetchWeather: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=metric&appid=" 
            + this.apiKey
        )
            .then((response)=> response.json())
            .then((data)=> this.displayWeather(data))
            .catch((error) => console.error('Error:',error));
    },
    displayWeather: function(data) {
        //if(data,weather && data.weather.length> 0){
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        //console.log(name,icon,description,temp,humidity,speed);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = 
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");

        console.log("Description: ",description);
        this.changeBackgroundImage(description);
    //} else {
    //    console.error('Invalid weather data:',data);
    //}
    },

    changeBackgroundImage: function(description){
        let imageUrl = "";
        description = description.toLowerCase();
        if(description.includes("clear sky") || description.includes("clear")){
            imageUrl ="https://plus.unsplash.com/premium_photo-1674920908291-3c5ffb36c2dc?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        } else if (description.includes("few clouds")){
            imageUrl = "https://images.unsplash.com/photo-1519752447979-d8e8fb81a74f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        } else if (description.includes("scattered clouds")){
            imageUrl = "https://images.unsplash.com/photo-1594044752113-41567712f52f?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        } else if (description.includes("broken clouds") || description.includes("overcast clouds")){
            imageUrl = "https://images.unsplash.com/photo-1597815472125-87a341ec63b7?q=80&w=2023&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        } else if (description.includes("clouds")){
            imageUrl = "https://images.unsplash.com/photo-1520038569969-98da7959fcbd?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        } else if (description.includes("shower rain")){
            imageUrl = "https://images.unsplash.com/photo-1559047838-d2ceb47b6ce9?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        } else if (description.includes("rain")){
            imageUrl = "https://images.unsplash.com/photo-1456400761117-a768c370cd6d?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        } else if(description.includes("thunderstorm")){
            imageUrl = "https://media.istockphoto.com/id/1331379659/photo/rain-a-wooden-fishing-boat-under-a-dark-cloudy-sky.jpg?s=2048x2048&w=is&k=20&c=gvKv5FLfzEg06Ms1Bag_9Tq6P9NbFYgmusL_A-qv2Ts=";
        } else if (description.includes("snow")){
            imageUrl = "https://images.unsplash.com/photo-1551582045-6ec9c11d8697?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        } else if (description.includes("mist") || description.includes("fog")){
            imageUrl = "https://images.unsplash.com/photo-1575143356756-40baf33e5375?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        } else {
            imageUrl = "https://images.unsplash.com/photo-1504893524553-b855bce32c67?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        }
        document.body.style.backgroundImage = "url('" + imageUrl + "')";
    },
    showError: function(error){
        document.querySelector(".city").innerText = "City not found. Please try again.";
        document.querySelector(".icon").src = "";
        document.querySelector(".description").innerText = "";
        document.querySelector(".temp").innerText = "";
        document.querySelector(".humidity").innerText = "";
        document.querySelector(".wind").innerText = "";
        document.querySelector(".weather").classList.add("loading");
        console.error('Error: ',error);
    },
    search: function(){
        //this.fetchWeather(document.querySelector(".search button").value);
        const city = document.querySelector(".search-bar").value;
        if(city){
            this.fetchWeather(city);
        }else{
            console.error('City name is empty');
        }
    }
};

document
    .querySelector(".search button")
    .addEventListener("click",function () {
       weather.search(); 
    }); 

document
    .querySelector(".search-bar")
    .addEventListener("keyup",function(event) {
        if (event.key == "Enter"){
            weather.search();
        }
    });

weather.fetchWeather("Azamgarh");