        function simularPeticionAPI(){
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve("Datos recibidos correctamente XD");
                }, 5000);
            });
        }
        async function obtenerDatos() {
            console.log("Iniciando petición a la API...");
            const respuesta = await simularPeticionAPI();
            console.log(respuesta);
        }
        obtenerDatos();