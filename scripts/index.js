//Declaraciones.
const Identification = document.getElementById('Identification');
const Password = document.getElementById('Password');
const ConfirmPassword = document.getElementById('ConfirmPassword');
const UserName = document.getElementById('UserName');
const AccessKey = document.getElementById('AccessKey');
const RegButton = document.getElementById('RegButton');
//GET Request


const register = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del botón

    if (Password.value === ConfirmPassword.value) {
        let userObj = {
            identification: Identification.value,
            password: Password.value,
            username: UserName.value,
            authorization: {value: AccessKey.value}

        };
        console.log(JSON.stringify(userObj));
        //post
        //let xhr = new XMLHttpRequest();
        //response
        //xhr.addEventListener('readystatechange', () => {
          //  console.log(xhr.responseText);
        //});
        //xhr.open('post', '');
        //xhr.send(JSON.stringify(userObj));//toJson 
        const formData = new URLSearchParams();
        formData.append('identification', Identification);
        formData.append('username', UserName);
        formData.append('password', Password);
        fetch('http://192.168.56.7:8080/users/register', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userObj)
        });


    } else{
        alert(" Porfavor verifique la contraseña")

    }
};





RegButton.addEventListener('click', register);

const login =() => {
    let userObj = {
        Identification: Identification.value,
        Password: Password.value,
    };
    console.log(JSON.stringify(userObj));
    //post
    let xhr = new XMLHttpRequest();
    //response
    xhr.addEventListener('readystatechange', () => {
        console.log(xhr.responseText);
    });
    xhr.open('post', '');
    xhr.send(JSON.stringify(userObj));//toJson 

}
    






//RegButton.addEventListener('click', register);


//Arrow function
/*const register = () => {
    var userObj ={

        Identification: Identification.value,
        Password: Password.value,
        UserName: UserName.value,
        AccessKey: AccessKey.value,


    }
    console.log(userObj);
}*/

/*async function getCourses() {
    let response = await fetch("http://localhost:8080/courses/all");
    let json = await response.json();
    console.log(json);
    json.forEach(course => {
        let card = new Card(course).render();
        cursoContainer.appendChild(card);
    });
    cursoContainer.innerHTML = divContent;
}*/

//POST Request

/*RegButton.addEventListener('click', e => {
    e.preventDefault();
    let course = {
        name: nameInput.value,
        program: proramInput.value,
        teacher: {
            id: teacherInput.value
        }
    };

    let json = JSON.stringify(course);

    fetch("http://localhost:8080/courses/create", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: json
    })
})*/


