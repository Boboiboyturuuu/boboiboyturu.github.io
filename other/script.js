import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
var likeCounts = {};

function increaseLike(photoId) {
  var currentLikeCount = likeCounts[photoId] || 0;
  var newLikeCount = currentLikeCount + 1;
  likeCounts[photoId] = newLikeCount;
  var likeCountElement = document.getElementById('like-value-' + photoId);
  likeCountElement.innerHTML = '<i class="fas fa-eye"></i> ' + newLikeCount;
  var button = document.getElementById('likeButton-' + photoId);
  button.style.color = 'blue';
}
// Panggil loadData() saat halaman dimuat
window.onload = loadData;
const audio = document.getElementById('audio');
      document.addEventListener('click', () => {
  audio.play();
});
      function updateInfo() {
    const date = new Date();

    // Tanggal hari ini
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const dayName = days[date.getDay()];
    const formattedDate = dayName + ', ' + date.toLocaleDateString();
    document.getElementById('today').textContent = formattedDate;

    // Waktu terkini
    const time = date.toLocaleTimeString();
    document.getElementById('time').textContent = time;
    navigator.getBattery().then(function(battery) {
        document.getElementById('battery').textContent = Math.floor(battery.level * 100) + '%';
    });
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('ip').textContent = data.ip;
        });
}
setInterval(updateInfo, 1000);
updateInfo();


//batasan iklan
const advertisements = [
    "Welcome To MY WebPage",
    "Kunjungi Lha Berbagai Fitur Yg Tersedia",
    "Jangan Lupa Ikuti Sosial Media Saya",
    "Cek Story Di Ponsel",
    "Jangan Lupa Tambah ceritamu DiSini",
    "Web Masih Dalam Perkembangan",
    "Hubungi Saya Bila Ada Keperluan"
];

const advertisementContainer = document.querySelector(".advertisement-container");

function addAdvertisement(message) {
    const advertisementMessage = document.createElement("span");
    advertisementMessage.classList.add("advertisement-message");
    advertisementMessage.textContent = message;
    advertisementContainer.appendChild(advertisementMessage);
    setTimeout(() => {
        advertisementMessage.remove();
    }, 5000); 
}

function displayAdvertisements() {
    let index = 0;
    setInterval(() => {
        addAdvertisement(advertisements[index]);
        index = (index + 1) % advertisements.length;
    }, 5000);
}

displayAdvertisements();
  
  //Formulir Post
  document.getElementById('kritikForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Mengambil data dari formulir
    var nama = document.getElementById('nama').value;
    var pesan = document.getElementById('pesan').value;
    var foto = document.getElementById('foto').files[0]; // Mengambil file gambar
    var facebook = document.getElementById('facebook').value;
    var instagram = document.getElementById('instagram').value;
    var tiktok = document.getElementById('tiktok').value;
    var whatsapp = document.getElementById('whatsapp').value;
    var twitter = document.getElementById('twitter').value;

    if (!foto) {
        foto = "https://telegra.ph/file/51f9c76cb82e27d600ebb.jpg";
        saveData(nama, pesan, foto, facebook, instagram, tiktok, whatsapp, twitter);
    } else {
        var formData = new FormData();
        formData.append("image", foto);

        fetch('https://api.imgbb.com/1/upload?key=3f874203e7e81bc1c1ae7ed879944e98', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            var fotoUrl = data.data.url;
            saveData(nama, pesan, fotoUrl, facebook, instagram, tiktok, whatsapp, twitter);
        })
        .catch(error => console.error('Error:', error));
    }
});

function generateUniqueId(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
const firebaseConfig = {
    apiKey: "AIzaSyAS1AnLgCPgLflmO-bXPNs-BL0TCKGvBeQ",
    authDomain: "poststory-194bc.firebaseapp.com",
    projectId: "poststory-194bc",
    storageBucket: "poststory-194bc.appspot.com",
    messagingSenderId: "143551455491",
    appId: "1:143551455491:web:2a96134aeabc017e018936",
    measurementId: "G-DB9TTD2Y33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

function addHttps(url) {
    if (!url.startsWith("http")) {
        return "https://" + url;
    }
    return url;
}

function formatSocialMediaUrl(username, platform) {
    if (username && !username.includes("http")) {
        switch(platform) {
            case 'facebook':
                return addHttps('www.facebook.com/' + username);
            case 'instagram':
                return addHttps('www.instagram.com/' + username);
            case 'tiktok':
                return addHttps('www.tiktok.com/@' + username);
            case 'whatsapp':
                return addHttps('wa.me/' + username);
            case 'twitter':
                return addHttps('twitter.com/' + username);
            default:
                return username;
        }
    }
    return username;
  }
async function saveData(nama, pesan, fotoUrl, facebook, instagram, tiktok, whatsapp, twitter) {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const alamat = data.ip;

        const kritikData = {
            "id": generateUniqueId(8),
            "nama": nama,
            "pesan": pesan,
            "foto": fotoUrl,
            "facebook": formatSocialMediaUrl(facebook, 'facebook'),
            "instagram": formatSocialMediaUrl(instagram, 'instagram'),
            "tiktok": formatSocialMediaUrl(tiktok, 'tiktok'),
            "whatsapp": formatSocialMediaUrl(whatsapp, 'whatsapp'),
            "twitter": formatSocialMediaUrl(twitter, 'twitter'),
            "date": new Date(),
            "address": alamat,
            "like": 0 // Menambahkan properti like dengan nilai awal 0
        };

        await addDoc(collection(db, "kritik"), kritikData);
        alert('Data berhasil disimpan!');
        document.getElementById('kritikForm').reset();
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat menyimpan data.');
    }
    }
let visitorData = [];

        function updateVisitorCount(ip) {
            const visitorIndex = visitorData.findIndex(visitor => visitor.ip === ip);
            if (visitorIndex !== -1) {
                visitorData[visitorIndex].count++;
            } else {
                visitorData.push({ ip: ip, count: 1 });
            }
            const totalCount = visitorData.reduce((total, visitor) => total + visitor.count, 0);
            document.getElementById('visitors').textContent = totalCount;
        }

        fetch('https://ipinfo.io/json')
            .then(response => response.json())
            .then(data => {
                const ip = data.ip;
                document.getElementById('ip').textContent = ip;
                updateVisitorCount(ip);
            })
            .catch(error => console.error('Error fetching visitor data:', error));
            function alertCustom(message) {
    const alertBox = document.createElement("div");
    alertBox.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: #4CAF50; color: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 20px rgba(0, 0, 0, 0.5); z-index: 9999;">
            <p style="margin: 0;">${message}</p>
        </div>`;
    document.body.appendChild(alertBox);
    setTimeout(() => {
        alertBox.remove();
    }, 3000);
}
