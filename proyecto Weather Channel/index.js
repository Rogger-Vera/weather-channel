

let input = document.querySelector("input")

function mensaje(mensaje, clase) {

    let divMensaje = document.createElement("div")
    divMensaje.classList.add(clase)
    divMensaje.appendChild(document.createTextNode(mensaje))

    let titulo = document.querySelector("h1")

    titulo.insertBefore(divMensaje, null)

    setTimeout(() => {
        document.querySelector(`.${clase}`).remove();
    }, 2000);

}  

function cargarCiudad() {

    if (!input.value) {
        mensaje("Ingresa una ciudad", "error")
    } else {

        let ciudad = input.value

        input.value = ""
        

        $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + ciudad +"&units=metric&appid=95176c8edea30e33338e0eaddd53a916"
        , function(data) {
            
            document.querySelector(".container").style.visibility = "visible"
            let ciudad = document.querySelector("#ciudad")
            let temperatura = document.querySelector("#temperatura")
            let wicon = document.querySelector("#wicon")
            let descripcion = document.querySelector("#descripcion")

            ciudad.textContent = data.name
            temperatura.innerHTML = data.main.temp+"<sup>°C</sup>"
            wicon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png")
            descripcion.textContent = data.weather[0].description


        }).fail(function (jqXHR) {
            if (jqXHR.status === 404) {
                mensaje("Ciudad no encontrada", "error")
            } else if (jqXHR.status === 500) {
                mensaje("Error interno", "error")
            } else {
                mensaje("Error desconocido: " + jqXHR.responseText, "error")
            }
        })

        
        
    }

    
    
}

let boton = document.querySelector("button")


boton.addEventListener("click", cargarCiudad )


    
    

