// Instanciar ambas clases

const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
     ui.mostrarEstablecimientos();
})

// Habilitar búsqueda en vivo.

/*const buscador = document.querySelector('#buscar input');


buscador.addEventListener('input', () => {
     // Si es mayor a 5, buscar sugerencias
     console.log(buscador.value);
     if(buscador.value.length > 3) {
         // Obtener sugerencias que sean parte de la busqueda
         ui.obtenerSugerencias(buscador.value);
     } else if(buscador.value.length === 0) {
          // Reiniciar el mapa
          ui.inicializarMapa();
          // Mostrar los pines
          ui.mostrarEstablecimientos();
     };
}); */

//Formulario 
//onblur function
function requiredField(input) {
    if (input.value.length < 1) {
      //red border
        input.style.borderColor = "#e74c3c";
      
    } else if (input.type == "email") {
      //console.log("este es un emal");
      //Validacion
        if (input.value.indexOf("@") != -1 && input.value.indexOf(".") != -1) {
          //green border
          input.style.borderColor = "#2ecc71";
        } else {
          //red border
          input.style.borderColor = "#e74c3c";
        }
      
    } else {
      //green border
        input.style.borderColor = "#2ecc71";
    }
}


/**https://codepen.io/merb/pen/qZavOG */

var createAllErrors = function() {
        var form = $( this ),
            errorList = $( "ul.errorMessages", form );

        var showAllErrorMessages = function() {
            errorList.empty();

            // Find all invalid fields within the form.
            var invalidFields = form.find( ":invalid" ).each( function( index, node ) {

                // Find the field's corresponding label
                var label = $( "label[for=" + node.id + "] "),
                    // Opera incorrectly does not fill the validationMessage property.
                    message = node.validationMessage || 'Invalid value.';

                errorList
                    .show()
                    .append( "<li><span>" + label.html() + "</span> " + message + "</li>" );
            });
        };

        // Support Safari
        form.on( "submit", function( event ) {
            if ( this.checkValidity && !this.checkValidity() ) {
                $( this ).find( ":invalid" ).first().focus();
                event.preventDefault();
            }
        });

        $( "input[type=submit], button:not([type=button])", form )
            .on( "click", showAllErrorMessages);

        $( "input", form ).on( "keypress", function( event ) {
            var type = $( this ).attr( "type" );
            if ( /date|email|month|number|search|tel|text|time|url|week/.test ( type )
              && event.keyCode == 13 ) {
                showAllErrorMessages();
            }
        });
    };
    
    $( "form" ).each( createAllErrors );
