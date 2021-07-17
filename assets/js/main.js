$(document).ready(function () {
  // Funciones

  function tarjetas(heroArray) {
    // console.log("targeta", heroArray);

    // Ocupar la propiedad Join para crear un sting con los datos del array aliases 
    let aliases = heroArray.biography.aliases.join("  ");

    // card de boostrap con los datos del objeto heroArray
    // <div class="card mb-3 d-flex justify-content-center" style="max-width: 540px;">

    let contenido = `
      <div class="card mb-3 justify-content-center bg-dark text-white">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src="${heroArray.image.url}" width="95%"  alt="${heroArray.name}">
          </div>
           <div class="col-md-8">
            <div class="card-body">
              <h2 class="card-title">Nombre : ${heroArray.name}</h2>
              <p class="card-text">Conecciones :  <small class="text-muted">${heroArray.connections['group-affiliation']}</small></p>
              <p class="card-text">Publicado por : <small class="text-muted">${heroArray.biography.publisher}</small></p>
              <p class="card-text">Ocupacion : <small class="text-muted">${heroArray.work.occupation}</small></p>
              <p class="card-text">Primera aparicion : <small class="text-muted">${heroArray.biography['first-appearance']}</small></p>
              <p class="card-text">altura : <small class="text-muted">${heroArray.appearance.height[0]} ${heroArray.appearance.height[1]}</small></p>
              <p class="card-text">Peso : <small class="text-muted">${heroArray.appearance.weight[0]} ${heroArray.appearance.weight[1]}</small></p>
              <p class="card-text">alianzas : <small class="text-muted">${aliases}</small></p>
            </div>
           </div>
        </div>
       </div>
       `;

    // poner titulo en el id encontrado y cargar la card en el id ficha 
    $('#encontrado').html(`Super Heroe ${heroArray.name} Encontrado`);
    $('#ficha').html(contenido);

  }

  //
  function cargarGraficos(heroes) {
    console.log(heroes);
    let contador = 0;
    arregloSuper = [];
    let heroesArreglo = Object.entries(heroes);

    heroesArreglo.forEach(function (number) {
      if (number[1] != "null") {
        let dato = {
          y: number[1],
          label: number[0]
        };
        arregloSuper.push(dato);
        contador++;
      }

    });

    console.log(arregloSuper);
    if (contador == 0) {
      arregloSuper = [
        { y: 100, label: "Sin Poder" }
      ]
    }

    let chart = new CanvasJS.Chart("chartContainer", {
      theme: "dark2", // "light1", "light2", "dark1", "dark2"
      exportEnabled: true,
      animationEnabled: true,
      title: {
        text: "Poder del Hero"
      },
      data: [{
        type: "pie",
        startAngle: 25,
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: arregloSuper

      }]
    });

    // realizar renderizado del gratico
    chart.render();
  }


  //Función para cargar los datos mediante Ajax
  const heroArray = function (url) {

    $.ajax({
      type: "GET",
      url: url,
      dataType: "json",
      success: function (data) {

        // llamada a las funciones que contienen la card y el grafico
        tarjetas(data);
        cargarGraficos(data.powerstats);
      },
      error: function (data) {
        console.log(data)
        // alerta de errores en la coneccion ajax
        $('#errornum').addClass('alert');
        $('#errornum').addClass('alert-danger');
        $('#errornum').html("Conexion con el Servidor Fallida - vuelve a intentar!!!!")

      }


    });

  }



  // main  


  $('#boton').click(function (e) {

    let numero = $('#numHero').val();
    // limpiar mensajes de error
    $('#errornum').html("")
    $('#errornum').removeClass('alert');
    $('#errornum').removeClass('alert-danger');

    // Validar ingreso de numero entre 1 y 732. no permite digitos ni letras 
    if (numero < 1 || numero >= 732) {
      $('#errornum').addClass('alert');
      $('#errornum').addClass('alert-danger');
      $('#errornum').html("Ingrese un valor Entre 1 y 732")
      $('#numHero').focus();

    } else {

      e.preventDefault();
      // console.log("dentro del click")
      heroArray(`https://superheroapi.com/api.php/10226740132508658/${numero}`)

    }

  });


});
