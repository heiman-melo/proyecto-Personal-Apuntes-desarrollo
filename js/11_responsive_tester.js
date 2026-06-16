const d = document;

export default function responsiveTester(form){
    const $form = d.getElementById(form) // aqui estoy capturano completa la etiqueta 
    let tester;

    d.addEventListener("submit",(e)=>{
        debugger
        if(e.target === $form){ // e.target tambien me da completa la etiqueta, entonces compara etiqueta con etiqueta
            e.preventDefault(); // prevenir el comportamiento natural de los formularios que es 
            tester = window.open(
                $form.direccion.value,
                "tester",
                `innerWidth=${$form.ancho.value},innerHeight=${$form.alto.value}`
            );
        }
    });
    d.addEventListener("click", (e)=>{
        if(e.target === $form.cerrar) tester.close();
    })
}