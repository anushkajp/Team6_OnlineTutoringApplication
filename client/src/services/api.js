import React, { useEffect, useState } from 'react';

export function fetchFromAPI(route) {
  return fetch(`http://localhost:8000/${route}`)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Request failed with status: ' + response.status);
      }
    });
}
