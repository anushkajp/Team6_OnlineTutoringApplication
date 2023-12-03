export function fetchFromAPI(route) {
  return fetch(`http://localhost:8000/${route}`)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('GET failed with status: ' + response.status);
      }
    });
}

export const sendAPIPatchRequest = async (route, dataToUpdate) => {
  try {
    const response = await fetch(`http://localhost:8000/${route}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToUpdate),
    });

    const updatedData = await response.json();
    return updatedData;

  } catch (error) {
    console.error('Error patching data:', error);
    throw error; 
  }
};

export function uploadToAPI(route, data){
  console.log(data)
  data =JSON.stringify(data)
  return fetch(`http://localhost:8000/${route}`, {method:"POST",headers:{"content-type":"application/json"},body:data})
  .then(response=>{
    if (response.status === 201){
      return response.json();
    }else{
      throw new Error('Request failed with status: ' + response.status)
    }
  })
}
