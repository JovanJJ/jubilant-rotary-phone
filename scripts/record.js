let marker = null;
        let circle = null;
        let polyline;
        let watchId;
        let lastPosition = null;
        let totalDistanceInKm = 0;
        let lastUpdateTime = null;

        const defaultLocation = [43.981270, 21.257441];
        const defaultZoom = 13;

        const map = L.map('map').setView(defaultLocation,defaultZoom);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        //polyline code
        polyline = L.polyline([],{
          color: 'blue',
          weight: 5,
          opacity: 0.8
        }).addTo(map);

        

        function watchingLocation(){
        if("geolocation" in navigator) {
            watchId = navigator.geolocation.watchPosition( //function provided by javascript we give to finction position, error and options
            (position) => {//position call back runs every time browser gets new position.
              //Code for calculating metrics
              const currentTime = new Date(position.timestamp);
              const timeDifferenceInMs = currentTime - lastUpdateTime;


              const {latitude, longitude, accuracy} = position.coords;
              const userLocation = [latitude, longitude];

              if(marker){
                marker.setLatLng(userLocation);
                circle.setLatLng(userLocation);
                circle.setRadius(accuracy);
              }
              else{
                marker = L.marker(userLocation).addTo(map)
                .bindPopup("You are here").openPopup();


                circle = L.circle(userLocation, {
                radius: accuracy,
                color: 'black',
                fillColor: 'black'}).addTo(map);
              }

              

              polyline.addLatLng(userLocation);
              map.setView(userLocation, map.getZoom());

              if(lastPosition !== null){
                const distanceChunk = getDistanceInKm(
                  lastPosition.latitude,
                  lastPosition.longitude,
                  latitude,
                  longitude
                );
                totalDistanceInKm += distanceChunk;

                
                const timeDifferenceInMs = currentTime - lastUpdateTime;
                if(timeDifferenceInMs > 0){
                  const timeDifferenceInHours = timeDifferenceInMs / (1000 * 60 *60);
                  const speedInKmPerHour = distanceChunk / timeDifferenceInHours;

                  const timeDifferenceInMinutes = timeDifferenceInMs / (1000 * 60);
                  const paceInMinPerKm = timeDifferenceInMinutes / distanceChunk;

                        console.log("----------------------------------");
                        console.log(`Total Distance: ${totalDistanceInKm.toFixed(2)} km`);
                        console.log(`Speed: ${speedInKmPerHour.toFixed(2)} km/h`);
                        console.log(`Pace: ${paceInMinPerKm.toFixed(2)} min/km`);
                        console.log("----------------------------------");
                }
              }

              lastPosition = {latitude, longitude};
              lastUpdateTime = currentTime;

            },
            (error) => {
              console.error("Could not get location");
            },
            (options) => {

            }

            
          );
        } else{
          console.log("Your browser does not support geolocation");
        }
        }

        

        watchingLocation();

        //stopWatchLocation();
        function stopWatchLocation(){
          if(watchId){
            navigator.geolocation.clearWatch(watchId);
          }
        }


        //function to clear polyLine
        function clearPolyline(){
          polyline.setLatLngs([]);
        }
        
        ///////////////////////////////////////////////////////////////////////////////////


        function getDistanceInKm(lat1, lon1, lat2, lon2){
          const earthRadius = 6371;
          const dLat = (lat2 - lat1) * Math.PI / 180;
          const dLon = (lon2 - lon1) * Math.PI / 180;
          const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          return earthRadius * c;  

        }
        
       radius = getDistanceInKm();