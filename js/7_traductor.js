function traductor(){
  let $traductor = document.querySelector("#traductor");
  let $inputTexto = document.querySelector("#inputTexto");

  
// let traductor = function  (){
//   let $traductor = document.querySelector("#traductor");
//   let $inputTexto = document.querySelector("#inputTexto");
//   $traductor.addEventListener("click", hablar);
//   function hablar() {
//     let texto = $inputTexto.value;
//     speechSynthesis.speak(new SpeechSynthesisUtterance(texto))
//   };
// }
// funcion de flecha 
// let traductor = () =>{
//   let $traductor = document.querySelector("#traductor");
//   let $inputTexto = document.querySelector("#inputTexto");
//   $traductor.addEventListener("click", hablar);
//   function hablar() {
//     let texto = $inputTexto.value;
//     speechSynthesis.speak(new SpeechSynthesisUtterance(texto))
//   };
// }
// las funciones de arriba funcionan de una con las voz que esta ya cargada por default
  $traductor.addEventListener("click", hablar);
  function hablar() {
    let texto = $inputTexto.value;
    // Obtener la lista de voces disponibles hay 25 voces en la primera carga no van a haber voces entonces entra en el caso contrario esperera a que cargen las voces y vuelve a llamar a la voz de hablar
    let vocesDisponibles = window.speechSynthesis.getVoices();

    if(vocesDisponibles.length > 0){
      // Elegir una voz específica (por ejemplo, la primera voz disponible)
      // let voz = vocesDisponibles[24];
      // let voz = vocesDisponibles[10];
      let voz = vocesDisponibles[5];
  
      // Crear un objeto SpeechSynthesisUtterance con el texto y la voz elegidos
      let mensaje = new SpeechSynthesisUtterance(texto);
      mensaje.voice = voz;
  
      // Hablar el mensaje
      window.speechSynthesis.speak(mensaje);
  
      // Borrar el contenido del campo de entrada despues de reproducirse el sonido
      // $inputTexto.value = '';
    }else{
      // de esta forma espera a que carguen las voces
    window.speechSynthesis.onvoiceschanged = function() {
      hablar();
    };
    }
  };
// -----api del navegador para mostrar en texto lo que se hable---------------------------------------------------------------------------------------------------

  let recognition;
  const $botonReconocimiento = document.getElementById('botonReconocimiento');
  const $inputParaElTexto = document.getElementById('inputVozTexto');
  // if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  //   // Configurar las opciones del reconocimiento de voz
  //   recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  //   recognition.lang = 'es-ES';
  //   recognition.interimResults = true;


  //     // Manejar clic en el botón de reconocimiento
  //     $botonReconocimiento.addEventListener('mousedown', function () {
  //       // Configurar el evento de resultado para mostrar texto mientras se habla
  //       recognition.onresult = function (event) {
  //           const result = event.results[0][0].transcript;
  //           $inputParaElTexto.value = result;
  //       };

  //       // Iniciar el reconocimiento de voz
  //       recognition.start();
  //   });
  //   // Manejar el evento de soltar el botón
  //   $botonReconocimiento.addEventListener('mouseup', function () {
  //       // Detener el reconocimiento de voz
  //       if (recognition && recognition.state !== 'inactive') {
  //           recognition.stop();
  //       }
  //   });
    
  // } else {
  //     console.error('getUserMedia no está soportado en este navegador.');
  // }

  // // evento al pinchar el boton de grabar la voz ---------------------------------------
  let mediaRecorder;
  let chunks = [];

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Configurar las opciones del reconocimiento de voz
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'es-ES';
        recognition.interimResults = true;
      $botonReconocimiento.addEventListener('mousedown', function () {
        // Configurar el evento de resultado para mostrar texto mientras se habla
        recognition.onresult = function (event) {
          const result = event.results[0][0].transcript;
          $inputParaElTexto.value = result;
        };
        // Iniciar el reconocimiento de voz
        recognition.start();

        // Iniciar grabación de audio
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function (stream) {
                mediaRecorder = new MediaRecorder(stream);

                // Configurar el evento de dataavailable para grabar los fragmentos de audio
                mediaRecorder.ondataavailable = function (e) {
                    if (e.data.size > 0) {
                        chunks.push(e.data);
                    }
                };

                // Comenzar la grabación
                mediaRecorder.start();
            })
            .catch(function (err) {
                console.error('Error al acceder al micrófono:', err);
            });
        });

      // evento al soltar el boton ----------------------------------------------------------
      $botonReconocimiento.addEventListener('mouseup', function () {
        // Detener la grabación y el reconocimiento
        if (mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
        }

        if (recognition && recognition.state !== 'inactive') {
            recognition.stop();
        }
            // Configurar el evento de parada del MediaRecorder para mostrar los resultados
            mediaRecorder.addEventListener('stop', function () {
              // Convertir los fragmentos de audio en un Blob
              const audioBlob = new Blob(chunks, { type: 'audio/wav' });
          
              // Crear un enlace para descargar el archivo de audio
              const audioUrl = URL.createObjectURL(audioBlob);
          
              // Reproducir el audio grabado
              const audioElement = new Audio(audioUrl);
              audioElement.play();
          
              // Reiniciar para futuras grabaciones
              chunks = [];
              });
                // Iniciar el reconocimiento de voz al detectar nuevos resultados
              mediaRecorder.addEventListener('dataavailable', function () {
                if (recognition) {
                    recognition.start();
                }
              });
      });

      } else {
      console.error('getUserMedia no está soportado en este navegador.');
      }
}
export default traductor;
