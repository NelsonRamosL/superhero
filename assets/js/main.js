$(document).ready(function () {

  // Funciones


  function tarjetas(heroArray) {
    console.log("targeta", heroArray);

    let contenido = `
<div class="card mb-3" style="max-width: 540px;">
  <div class="row no-gutters">
    <div class="col-md-4">
      <img src="${heroArray.image.url}" width="100%" alt="${heroArray.name}">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">Nombre :${heroArray.name}</h5>
        <p class="card-text">Conecciones :  <small class="text-muted">${heroArray.connections['group-affiliation']}</small></p>
        <p class="card-text">Publicado por : <small class="text-muted">${heroArray.biography.publisher}</small></p>
        <p class="card-text">Ocupacion : <small class="text-muted">${heroArray.work.occupation}</small></p>

        <p class="card-text">Primera aparicion : <small class="text-muted">${heroArray.biography['first-appearance']}</small></p>

        
      <p class="card-text">altura : <small class="text-muted">${heroArray.appearance.height[0]} ${heroArray.appearance.height[1]}</small></p>
      <p class="card-text">Peso : <small class="text-muted">${heroArray.appearance.weight[0]} ${heroArray.appearance.weight[1]}</small></p>
 
      <p class="card-text">alianzas : <small class="text-muted">${heroArray.biography.aliases[0]}</small></p>
     
      </div>


    </div>
  </div>
</div>
`;


    $('#encontrado').html(`Super Heroe ${heroArray.name} Encontrado`);
    $('#ficha').html(contenido);

  }


  //Función para cargar los graficos
  let cargarGraficos = (heroArray) => {
    let dataArreglo2 = [];

    Object.keys(heroArray).forEach((item, index, array) => {
      let dato = {
        label: item,
        y: heroArray[item],
      };
      dataArreglo2.push(dato);
      console.log(dataArreglo2)
    });

    console.log("arreglo para el grafico",dataArreglo2);


    let chart = new CanvasJS.Chart("chartContainer", {

      title: {
        text: "Prueba de Graficos",
      },
      
      data: [
        {
          type: "column",
          dataPoints: dataArreglo2,
        }
      ]


    });
    console.log(chart);
    chart.render();

  };




  //Función para cargar los datos mediante Ajax
  const heroArray = function (url) {
    console.log("dentro del Ajax");
    $.ajax({
      type: "GET",
      url: url,
      //  data: "data",
      dataType: "json",
      success: function (data) {
       
        tarjetas(data);
        cargarGraficos(data.powerstats);
      },
      error: function (data) {
        console.log(data)
        $('#errornum').addClass('alert');
        $('#errornum').addClass('alert-danger');
        $('#errornum').html("Conexion con el Servidor Fallida - vuelve a intentar!!!!")

      }


    });

  }









  // main  


  $('#boton').click(function (e) {

    // Validar
    let numero = $('#numHero').val();
    $('#errornum').html("")
    $('#errornum').removeClass('alert');
    $('#errornum').removeClass('alert-danger');

    if (numero < 1 || numero >= 732) {
      $('#errornum').addClass('alert');
      $('#errornum').addClass('alert-danger');
      $('#errornum').html("Ingrese un valor Entre 1 y 732")
      $('#numHero').focus();

    } else {

      e.preventDefault();
      console.log("dentro del click")
      heroArray(`https://superheroapi.com/api.php/10226740132508658/${numero}`)



    }

  });


});
