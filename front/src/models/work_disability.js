const API_URL =
  process.env.NODE_ENV == "production"
    ? "https://incapacidad-temporal-optima.herokuapp.com/"
    : "http://localhost:5000";

export const allDiseases = () => (
  fetch(`${API_URL}/all-diseases`).then(r => r.json())
)

export const allAgeRage = () => (
  fetch(`${API_URL}/all-age-rage`).then(r => r.json())
)

export const allGenderRage = () => (
  fetch(`${API_URL}/all-gender-rage`).then(r => r.json())
)

export const allOcupation = () => (
  fetch(`${API_URL}/all-ocupation`).then(r => r.json())
)

// export const optimalTime = (data,) => {
//   var self = this;

//   var xhr = new XMLHttpRequest();
//   xhr.withCredentials = false;

//   xhr.addEventListener("readystatechange", function() {
//     if (this.readyState === 4) {
//       self.setState({ result: JSON.parse(this.responseText).result });
//     }
//   });

//   xhr.open("POST", `${API_URL}/optimal-time`);
//   xhr.setRequestHeader("content-type", "application/json");
//   xhr.setRequestHeader("cache-control", "no-cache");

//   xhr.send(data);
// }
