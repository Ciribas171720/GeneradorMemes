document.addEventListener("DOMContentLoaded", function() {

  function cargar(src) {
    return new Promise((rs, rj) => {
        const imagen = new Image();
        imagen.addEventListener("load", function() {
          document.getElementById("imageContainer").style.backgroundRepeat = "round";
          if (imagen.width <= 500 && imagen.height <= 500) {
            document.getElementById("imageContainer").style.width = imagen.width;
            document.getElementById("imageContainer").style.height = imagen.height;
	  } else {
            if (imagen.width > imagen.height) {
               document.getElementById("imageContainer").style.width = "500px";
               document.getElementById("imageContainer").style.height = 500.0 / (imagen.width / imagen.height);
            } else {
               document.getElementById("imageContainer").style.height = "500px";
               document.getElementById("imageContainer").style.width = 500.0 / (imagen.height / imagen.width);
            }
          }
          document.getElementById("imageContainer").style.backgroundSize = document.getElementById("imageContainer").style.width + " " + document.getElementById("imageContainer").style.height;
          document.getElementById("imageAndTextContainer").style.width = "fit-content";
          document.getElementById("imageAndTextContainer").style.height = "fit-content";
          document.getElementById("divtextosuperior").style.maxWidth = document.getElementById("imageContainer").style.width;
          document.getElementById("divtextoinferior").style.maxWidth = document.getElementById("imageContainer").style.width;
          rs();
        });
        imagen.addEventListener("error", function() {
          alert("¡Error cargando imagen!");
	  rj();
	});
        imagen.src = src;
    });
  }

  document.getElementById("url").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      cargar(document.getElementById("url").value).then(() => document.getElementById("imageContainer").style.backgroundImage = "url('" + document.getElementById("url").value + "')");
    }
  });

  document.getElementById("mensajesuperior").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
       document.getElementById("textosuperior").innerHTML = document.getElementById("mensajesuperior").value;
    }
  });

  document.getElementById("mensajeinferior").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
       document.getElementById("textoinferior").innerHTML = document.getElementById("mensajeinferior").value;
    }
  });

  document.getElementById("generar").addEventListener("click", function() {
      cargar(document.getElementById("url").value).then(() => {
        document.getElementById("imageContainer").style.backgroundImage = "url('" + document.getElementById("url").value + "')";
        downloadMeme();
      });
      document.getElementById("textosuperior").innerHTML = document.getElementById("mensajesuperior").value;
      document.getElementById("textoinferior").innerHTML = document.getElementById("mensajeinferior").value;
  });




// document.getElementById("generar").addEventListener("click", function() {
//   cargar(document.getElementById("url").value).then(() => {
//     document.getElementById("imageContainer").style.backgroundImage = "url('" + document.getElementById("url").value + "')";
//     return new Promise(resolve => setTimeout(resolve, 500)); // Add a delay to ensure the image is loaded
//   }).then(() => {
//     document.getElementById("textosuperior").innerHTML = document.getElementById("mensajesuperior").value;
//     document.getElementById("textoinferior").innerHTML = document.getElementById("mensajeinferior").value;
//     downloadMeme(); 
//   });
// });


  function filters(filter, value, add) {
    let filtros = document.getElementById("imageContainer").style.filter;
    //console.log(filtros);
    if (filtros.includes(filter)) {
	let p = filtros.indexOf(filter + "(");
        let pp = filtros.indexOf(")", p);
        let c = filtros.substring(p, pp);
        let cc = filtros.replace(c, filter + "(" + value + add);
        document.getElementById("imageContainer").style.filter = cc;
    } else {
	document.getElementById("imageContainer").style.filter += " " + filter + "(" + value + add + ")";
    }
  }

  document.getElementById("brillo").addEventListener("input", function(e) {
    filters("brightness", 1 + (e.target.value / 100.0), "");
  });

  document.getElementById("opacidad").addEventListener("input", function(e) {
    filters("opacity", 1 - (e.target.value / 100.0), "");
  });

  document.getElementById("contraste").addEventListener("input", function(e) {
    filters("contrast", 1 + (e.target.value / 100.0), "");
  });

  document.getElementById("desenfoque").addEventListener("input", function(e) {
    filters("blur", e.target.value, "px");
  });

  document.getElementById("escalagrises").addEventListener("input", function(e) {
    filters("grayscale", (e.target.value / 100.0), "");
  });

  document.getElementById("sepia").addEventListener("input", function(e) {
    filters("sepia", (e.target.value / 100.0), "");
  });

  document.getElementById("hue").addEventListener("input", function(e) {
    filters("hue-rotate", e.target.value, "deg");
  });

  document.getElementById("saturado").addEventListener("input", function(e) {
    filters("saturate", 1 + (e.target.value / 100.0), "");
  });

  document.getElementById("negativo").addEventListener("input", function(e) {
    filters("invert", (e.target.value / 100.0), "");
  });

  document.getElementById("colorFondo").addEventListener("input", function(e) {
    document.getElementById("imageContainer").style.backgroundColor = e.target.value;
  });

  document.getElementById("colorTexto").addEventListener("input", function(e) {
    document.getElementById("textosuperior").style.color = e.target.value;
    document.getElementById("textoinferior").style.color = e.target.value;
  });

  document.getElementById("selecttexto").addEventListener("change", function(e) {
    document.getElementById("textosuperior").style.fontFamily = e.target.value;
    document.getElementById("textoinferior").style.fontFamily = e.target.value;
  });

  document.getElementById("colorFondoTexto").addEventListener("input", function(e) {
    document.getElementsByClassName("texto")[0].style.backgroundColor = e.target.value;
    document.getElementsByClassName("texto")[1].style.backgroundColor = e.target.value;
  });

  document.getElementById("checktransparente").addEventListener("click", function(e) {
    if (e.target.checked) {
      document.getElementsByClassName("texto")[0].style.backgroundColor = "transparent";
      document.getElementsByClassName("texto")[1].style.backgroundColor = "transparent";
    } else {
      document.getElementsByClassName("texto")[0].style.backgroundColor = document.getElementById("colorFondoTexto").value;
      document.getElementsByClassName("texto")[1].style.backgroundColor = document.getElementById("colorFondoTexto").value;
    }
  });

  document.getElementById("checksuperior").addEventListener("click", function(e) {
    if (e.target.checked) {
      document.getElementById("divtextosuperior").style.display = "none";
    } else {
      document.getElementById("divtextosuperior").style.display = "block";
    }
  });

  document.getElementById("checkinferior").addEventListener("click", function(e) {
    if (e.target.checked) {
      document.getElementById("divtextoinferior").style.display = "none";
    } else {
      document.getElementById("divtextoinferior").style.display = "block";
    }
  });

  document.getElementsByClassName("font-size-input")[0].addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
       document.getElementById("textosuperior").style.fontSize = document.getElementsByClassName("font-size-input")[0].value;
       document.getElementById("textoinferior").style.fontSize = document.getElementsByClassName("font-size-input")[0].value;
    }
  });

  document.getElementById("espaciado").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
       document.getElementById("textosuperior").style.letterSpacing = document.getElementById("espaciado").value;
       document.getElementById("textoinferior").style.letterSpacing = document.getElementById("espaciado").value;
    }
  });

  document.getElementById("interlineado").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
       document.getElementById("textosuperior").style.lineHeight = document.getElementById("interlineado").value;
       document.getElementById("textoinferior").style.lineHeight = document.getElementById("interlineado").value;
    }
  });

  document.getElementById("align-left").addEventListener("click", function() {
     document.getElementById("textosuperior").style.textAlign = "left";
     document.getElementById("textoinferior").style.textAlign = "left";
  });

  document.getElementById("align-center").addEventListener("click", function() {
     document.getElementById("textosuperior").style.textAlign = "center";
     document.getElementById("textoinferior").style.textAlign = "center";
  });

  document.getElementById("align-right").addEventListener("click", function() {
     document.getElementById("textosuperior").style.textAlign = "right";
     document.getElementById("textoinferior").style.textAlign = "right";
  });

  document.getElementById("boton-ninguno").addEventListener("click", function() {
     document.getElementById("textosuperior").style.textShadow = "";
     document.getElementById("textoinferior").style.textShadow = "";
  });

  document.getElementById("boton-claro").addEventListener("click", function() {
     document.getElementById("textosuperior").style.textShadow = "1px 1px 1px rgb(255, 204, 255), 1px 1px 1px rgb(255, 204, 255)";
     document.getElementById("textoinferior").style.textShadow = "1px 1px 1px rgb(255, 204, 255), 1px 1px 1px rgb(255, 204, 255)";
  });

  document.getElementById("boton-oscuro").addEventListener("click", function() {
     document.getElementById("textosuperior").style.textShadow = "1px 1px 1px rgb(0, 0, 0), 1px 1px 1px rgb(0, 0, 0)";
     document.getElementById("textoinferior").style.textShadow = "1px 1px 1px rgb(0, 0, 0), 1px 1px 1px rgb(0, 0, 0)";
  });

  document.getElementById("restablecer").addEventListener("click", function(e) {
    document.getElementById("imageContainer").style.filter = "";
    document.getElementById("brillo").value = 0.0;
    document.getElementById("opacidad").value = 0.0;
    document.getElementById("contraste").value = 0.0;
    document.getElementById("desenfoque").value = 0.0;
    document.getElementById("escalagrises").value = 0.0;
    document.getElementById("sepia").value = 0.0;
    document.getElementById("hue").value = 0.0;
    document.getElementById("saturado").value = 0.0;
    document.getElementById("negativo").value = 0.0;
  });

  document.getElementById("imagenLink").addEventListener("click", function() {
    document.getElementsByClassName("seleccion imagenSeleccion")[0].style.display = "flex";
    document.getElementsByClassName("seleccion textoSeleccion")[0].style.display = "none";
  });

  document.getElementById("textoLink").addEventListener("click", function() {
    document.getElementsByClassName("seleccion imagenSeleccion")[0].style.display = "none";
    document.getElementsByClassName("seleccion textoSeleccion")[0].style.display = "flex";
  });

  document.getElementById("changeLink").addEventListener("click", function() {
    if (document.getElementById("changeLink").innerHTML === "Modo oscuro") {
      document.getElementById("changeLink").innerHTML = "Modo claro";
    } else {
      document.getElementById("changeLink").innerHTML = "Modo oscuro";
    }
    document.body.classList.toggle("dark-theme");
  });

  document.getElementById("selectimagen").addEventListener("change", function(e) {
    document.getElementById("imageContainer").style.backgroundBlendMode = e.target.value;
  });

});

function downloadMeme(){

  var memeResult= document.getElementById("memeResult");
  
  html2canvas(memeResult, {
    proxy: "https://corsproxy.io/"
  }).then(function(canvas) {

    let c = document.createElement("canvas");
    c.width = canvas.width;
    c.height = canvas.height;
    let cc = c.getContext("2d");
    cc.filter = document.getElementById("imageContainer").style.filter;
    cc.drawImage(canvas, 0, 0);
    
  var image= c.toDataURL("image/jpg"); 
  
  var downloadLink=document.createElement("a");
  downloadLink.href=image;
  downloadLink.download="meme.jpg";
  downloadLink.click();
  
  });
  }

// function downloadMeme() {
//   var memeResult = document.getElementById("imageAndTextContainer");

//   CropTarget.fromElement(memeResult).then((tr) => {
//     navigator.mediaDevices.getDisplayMedia({ preferCurrentTab: true }).then((w) => {
//       const [c] = w.getVideoTracks();
//       c.cropTo(tr).then(() => {
//         const v = document.createElement("canvas");
//         const vv = document.createElement("video");
//         vv.srcObject = w;
//         vv.play().then(() => {
//           v.width = vv.videoWidth;
//           v.height = vv.videoHeight;
//           v.getContext("2d").drawImage(vv, 0, 0);
//           v.toBlob((r) => {
//             saveAs(r, "t.png");
//             c.stop();
//           });
//         });
//       });
//     });
//   });
// }
