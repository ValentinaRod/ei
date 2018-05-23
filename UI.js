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
                    
                  })
                  
                
                 
               
             

            
            //pin edificio humana
               /*var iconBase = 'https://lh3.googleusercontent.com/HSp_F6YirGIOwhQDV3FZrCgEIcD9FvyVRfNQxUmu82iVZtUSh9mrrDS4IUHSM3dlKc4Hpr8=s48';
               let marker = new google.maps.Marker({
                    position: {lat: -33.5225992, lng: -70.66488930000003},
                    map: this.mapa,
                    icon: iconBase
               // Crear infoWindow
               })*/
               let infoWindow = this.crearInfoWindow(imagen, nombre, direccion,tipo);
               let infoWindowHumana = new google.maps.InfoWindow({
                  
                });
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
          let icono = 'https://lh3.googleusercontent.com/HSp_F6YirGIOwhQDV3FZrCgEIcD9FvyVRfNQxUmu82iVZtUSh9mrrDS4IUHSM3dlKc4Hpr8=s48';
               let marker_humana = new google.maps.Marker({
                   position: this.latLng,
                   map: this.mapa,
                   icon: icono
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
                        <span class="cuadroInfo1"><span><i class="fas fa-home"></i></span> Dirección: ${direccion}</span></i>
                        <br>
                        <span class="cuadroInfo2"><span><i class="far fa-address-card"></i></span> Razón Social: ${tipo}</span></i>
                </div>
                `;
          let infoWindow = new google.maps.InfoWindow({
               content: contenido
          });
          return infoWindow;
     }

     // Obtiene las sugerencias de la REST API
     obtenerSugerencias(busqueda) {
          this.api.obtenerDatos()
               .then(datos => {
                    // Obtener los resultados
                    const resultados = datos.respuestaJSON.lugares;

                    // Enviar el JSON y la busqueda al Filtro
                    this.filtrarSugerencias(resultados, busqueda);
               })
     }

     // Filtrar las sugerencias de busqueda
     filtrarSugerencias(resultados, busqueda) {
          const filtro = resultados.filter( filtro => filtro.direccion.indexOf(busqueda) !== -1 );

          // Iniciar el mapa
          this.inicializarMapa();

          // Mostrar pines del Filtro
          this.mostrarMapa(filtro);
     }
}
