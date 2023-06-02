let json = window.localStorage.getItem("Usuario");
const usuario = JSON.parse(json);
authorization=usuario.authorization.type;
identification=usuario.identification;

console.log(usuario);
console.log(authorization);
console.log(identification);


const rectanguloCards = document.getElementById("RectanguloCards");

const agregarBTN = document.getElementById('AgregarBTM');
const zonasBTN = document.getElementById('ZonasBTM');
const usuariosBTN = document.getElementById('UsuariosBTM');
const textoMaster = document.getElementById('textoMaster');

if(authorization=="MASTER"){
    agregarBTN.style.display = 'block';
    zonasBTN.style.display = 'block';
    usuariosBTN.style.display = 'block';
    textoMaster.style.display = 'block';

    zonasBTN.disabled = true;
    zonasBTN.style.opacity = '0.9'; // Reduce la opacidad
    zonasBTN.style.cursor = 'not-allowed'; // Cambia el cursor
    zonasBTN.style.backgroundColor = '#D5D3D0';

    
    async function getZones(){
        let response = await fetch("http://localhost:8080/zones/all",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'identification': usuario.identification
            }
        });
        let json = await response.json();
        console.log(json);

        json.forEach(zones => {
            let zone = new Zone(zones).render();
            console.log(zone);
            rectanguloCards.appendChild(zone);
        });
    }
    getZones();

    const usuarios = (event) => {
        event.preventDefault(); // Evita el comportamiento predeterminado del botón
        window.location.href = 'usuarios.html';
    };
    
    usuariosBTN.addEventListener('click', usuarios);

}else if(authorization=="USER"){
    agregarBTN.style.display = 'none';
    zonasBTN.style.display = 'none';
    usuariosBTN.style.display = 'none';
    textoMaster.style.display = 'none';


}




