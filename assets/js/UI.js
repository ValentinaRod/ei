class UI {
      constructor() {
           // Instanciar la API
           this.api = new API();
 
           // Iniciar el mapa
           this.inicializarMapa();
      }
 
      inicializarMapa() {
           // Inicializar y obtener la propiedad del mapa
           this.latLng = {lat:  -33.524133, lng: -70.655700};
            
           this.mapa = new google.maps.Map(document.getElementById('mapa'), {
                center: this.latLng,
                zoom: 17
           });
      }
 
      // Mostrar Establecimientos de la api
      mostrarEstablecimientos() {
           this.api.obtenerDatos()
                     .then(datos =>  {
                          const resultado = datos.respuestaJSON.lugares;
                         
                          // Muestra los pines en el Mapa
                          this.mostrarMapa(resultado);
                          console.log(resultado[0].latitude);
                     } )
      }   
     
      // Muestra los pines
      mostrarMapa(datos) {
           // Almacena InfoWindow Activo
           let infoWindowActivo;
 
           // Recorrer establecimientos
           datos.forEach(dato => {
                // Destucturing 
                let {direccion, imagen, latitude, longitude, nombre, tipo} = dato;
 
                // Crear objeto con latitud y longitud
                let latLng = {
                     lat: Number( latitude ),
                     lng: Number( longitude)
                }
 
                // Agregar el Pin
                let marker = new google.maps.Marker({
                     position: latLng,
                     map: this.mapa,
                     zIndex: 0
                     
            })

                let icono = 'https://lh3.googleusercontent.com/HSp_F6YirGIOwhQDV3FZrCgEIcD9FvyVRfNQxUmu82iVZtUSh9mrrDS4IUHSM3dlKc4Hpr8=s48';
                let humana = new google.maps.Marker({
                  position: {lat:  -33.524250, lng: -70.655700},
                  map: this.mapa,
                  icon: icono,
                  zIndex: 1

            });
            //Contenido imagen humana
            let contenidoHumana = `
                  <div>
                        <h4 style="color: black;">Edificio Humana</h4>
                              <div>
                                    <img src="https://geo0.ggpht.com/cbk?panoid=qp57MsUQ0Iu_PEJi7JuNCw&output=thumbnail&cb_client=search.TACTILE.gps&thumb=2&w=408&h=200&yaw=358.9573&pitch=0&thumbfov=100" alt="Edificio Humana">
                                    <br>
                                    <span class="cuadroInfo1"><span><i class="fas fa-home"></i></span><strong> Dirección:</strong><br>Av. Fernández Albano 424</span></i>
                                    <br>
                                    <span class="cuadroInfo2"><span><i class="far fa-address-card"></i></span><strong> Razón Social:</strong><br>Departamento</span></i>
                              </div>
                  </div>
            `
            let infoWindowhumana = new google.maps.InfoWindow({
                  content: contenidoHumana,
                  maxWidth:200
              })
            // Mostrar InfoWindow al hacer click
            google.maps.event.addListener(humana, 'click', function(){
		      infoWindowhumana.open(this.mapa,humana);
	      });
            //Crear infoWindow
             let infoWindow = this.crearInfoWindow(imagen, nombre, direccion,tipo);
             
                // Mostrar InfoWindow al hacer click
                marker.addListener('click', () => {
                     // Cerrar infoWindowActivo
                     if(infoWindowActivo) {
                          infoWindowActivo.close();
                     }
 
                     // Mostrarlo
                     infoWindow.open(this.mapa, marker);
 
                     // Asignarlo a activo
                     infoWindowActivo = infoWindow;
                })
 
           })
           
              

      }
      // Crear el infowindow
      crearInfoWindow(imagen, nombre, direccion,tipo) {
           // Crear InfoWindow
           let contenido = `
                  
                  
                  <div>
                         <h4 style="color: #000;">${nombre}</h4>
                                <div>
                                        <img class="img-cuadrado" src="${imagen}" style="width: 280px;"</img>
                                  </div>
                         <br>
                         <span class="cuadroInfo1"><span><i class="fas fa-home"></i></span><strong> Dirección:</strong><br> ${direccion}</span></i>
                         <br>
                         <span class="cuadroInfo2"><span><i class="far fa-address-card"></i></span><strong> Razón Social:</strong><br> ${tipo}</span></i>
                 </div>
                 `;

            
           let infoWindow = new google.maps.InfoWindow({
                content: contenido,
                maxWidth:200
           });
           
           return infoWindow;
          
      }
}
