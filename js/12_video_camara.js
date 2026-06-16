//metodo para detectar la camara y audio tiene que estar en true
const d= document,
n= navigator; 
export default function videoCamara(id){
    const $video = d.getElementById(id);
    if(n.mediaDevices.getUserMedia){
        n.mediaDevices.getUserMedia({video:false,audio:false}).then((stream)=>{
        $video.srcObject = stream
        $video.play();
        }).catch((err)=>{
            $video.insertAdjacentHTML('beforebegin', `<p>¿sucedio un error!:<mark>${err}</mark></p>`)
        })
    }
}