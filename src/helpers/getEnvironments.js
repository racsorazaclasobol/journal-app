//La funcion de este archivo es el manejo de las Variables de Entorno

export const getEnvironments = () => {

    import.meta.env;

  return { 
    ...import.meta.env
  }
}
