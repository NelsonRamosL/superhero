$(document).ready(function () {
  // Función para paginación  
  let paginacion = (nroPagina) => {
    let previous =
      '<li class="page-item"><a class="page-link">Previous</a></li>';
    let next = '<li class="page-item"><a class="page-link">Next</a></li>';
    let pagination = $(".pagination").html("");
    pagination.append(previous);
    let pagina = "";
    for (let i = 1; i <= nroPagina; i++) {
      pagina += `<li class="page-item ${i==1 ?'active': ""}"><a class="page-link" data-pagina="${i}">${i}</a></li>`;
    }
    pagination.append(pagina);
    pagination.append(next);
  };

  //Función para cargar los graficos
  let cargarGraficos = () => {
    let chart = new CanvasJS.Chart("chartContainer", {
      title: {
        text: "Prueba de Graficos",
      },
      data: [
        {
          // Change type to "doughnut", "line", "splineArea", etc.
          type: "splineArea",
          dataPoints: [
            { label: "apple", y: 10 },
            { label: "orange", y: 15 },
            { label: "banana", y: 25 },
            { label: "mango", y: 30 },
            { label: "grape", y: 28 },
            { label: "Parchita", y: 78 },
          ],
        },
      ],
    });
    chart.render();
  };

  //Función para cargar los datos mediante Ajax
  let cargarDatos = (url) => {
    $.ajax({
      type: "get",
      url: url,
      dataType: "json",
      success: function (response) {
        let tbody = $("tbody").html("");
        paginacion(response.total_pages);

        response.data.forEach((item) => {
          let template = `
                        <tr>
                            <th scope="row">${item.id}</th>
                            <td>${item.first_name}</td>
                            <td>${item.last_name}</td>
                            <td>${item.email}</td>
                            <td><img src=${item.avatar}></td>
                        </tr>
                        `;
          tbody.append(template);
        });
        //llamar la función
        cargarGraficos();

        //Agregando evento click al paginador
        $("a").click(function () {
          if (typeof $(this).data().pagina !== "undefined") {
            cargarDatos(
              `https://reqres.in/api/users?page=${$(this).data().pagina}`
            );
          }
        });
      },
      error: function (response) {
          console.log(response)
      },
    });
  };

  cargarDatos("https://reqres.in/api/users");

//   let array = [];

//   data = [
//     {
//       id: 1,
//       email: "george.bluth@reqres.in",
//       first_name: "George",
//       last_name: "Bluth",
//       avatar: "https://reqres.in/img/faces/1-image.jpg",
//     },
//     {
//       id: 2,
//       email: "janet.weaver@reqres.in",
//       first_name: "Janet",
//       last_name: "Weaver",
//       avatar: "https://reqres.in/img/faces/2-image.jpg",
//     },
//     {
//       id: 3,
//       email: "emma.wong@reqres.in",
//       first_name: "Emma",
//       last_name: "Wong",
//       avatar: "https://reqres.in/img/faces/3-image.jpg",
//     },
//     {
//       id: 4,
//       email: "eve.holt@reqres.in",
//       first_name: "Eve",
//       last_name: "Holt",
//       avatar: "https://reqres.in/img/faces/4-image.jpg",
//     },
//     {
//       id: 5,
//       email: "charles.morris@reqres.in",
//       first_name: "Charles",
//       last_name: "Morris",
//       avatar: "https://reqres.in/img/faces/5-image.jpg",
//     },
//     {
//       id: 6,
//       email: "tracey.ramos@reqres.in",
//       first_name: "Tracey",
//       last_name: "Ramos",
//       avatar: "https://reqres.in/img/faces/6-image.jpg",
//     },
//   ];

//   data.forEach(function (item) {
//     let dato = {
//       label: item.last_name,
//       y: item.id,
//     };
//     array.push(dato);
//   });

//   console.log(array);
});
