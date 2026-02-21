let userLocation;
let map;
let markerLayer;

navigator.geolocation.getCurrentPosition((pos) => {
  userLocation = pos.coords;
  loadMosques();
  initMap();
});

function login() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
}

function showCreate() {
  document.getElementById("createTab").style.display = "block";
  document.getElementById("checkTab").style.display = "none";
}

function showCheck() {
  document.getElementById("createTab").style.display = "none";
  document.getElementById("checkTab").style.display = "block";
  loadMilads();
}

function loadMosques() {
  fetch(`https://overpass-api.de/api/interpreter?data=[out:json];node["amenity"="place_of_worship"]["religion"="muslim"](around:5000,${userLocation.latitude},${userLocation.longitude});out;`)
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("mosqueList");
    data.elements.forEach(m => {
      let opt = document.createElement("option");
      opt.value = m.tags.name;
      opt.text = m.tags.name;
      list.appendChild(opt);
    });
  });
}

function saveMilad() {
  const mosque = document.getElementById("mosqueList").value || document.getElementById("customMosque").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const desc = document.getElementById("desc").value;

  db.collection("milads").add({
    mosque,
    date,
    time,
    desc,
    lat: userLocation.latitude,
    lng: userLocation.longitude,
    likes: 0
  });

  alert("Milad Posted!");
}

function loadMilads() {
  db.collection("milads").get().then(snapshot => {
    const listDiv = document.getElementById("miladList");
    listDiv.innerHTML = "";
    snapshot.forEach(doc => {
      const data = doc.data();
      listDiv.innerHTML += `
        <div onclick="showOnMap(${data.lat},${data.lng})">
          <h4>${data.mosque}</h4>
          <p>${data.date} - ${data.time}</p>
          <button onclick="likePost('${doc.id}')">Like (${data.likes})</button>
        </div>
      `;
    });
  });
}

function likePost(id) {
  const ref = db.collection("milads").doc(id);
  ref.update({ likes: firebase.firestore.FieldValue.increment(1) });
  loadMilads();
}

function initMap() {
  map = L.map('map').setView([userLocation.latitude, userLocation.longitude], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  markerLayer = L.layerGroup().addTo(map);
}

function showOnMap(lat, lng) {
  markerLayer.clearLayers();
  L.marker([lat, lng]).addTo(markerLayer);
  map.setView([lat, lng], 15);
}