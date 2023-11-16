import React, { useEffect, useState } from "react";

export function postToAPI(route, data) {
  return fetch(`http://localhost:8000/${route}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error("Request failed with status: " + response.status);
    }
  });
}

export function fetchFromAPI(route) {
  return fetch(`http://localhost:8000/${route}`).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error("Request failed with status: " + response.status);
    }
  });
}
