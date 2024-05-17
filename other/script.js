function loadData() {
  // Tampilkan spinner saat tombol ditekan
  document.querySelector('.spinner').style.display = 'block';

  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      // Proses pembaruan data dari JSON
      const sortedData = data.sort((a, b) => new Date(b.Date) - new Date(a.Date));
      const contentDiv = document.getElementById('content');
      contentDiv.innerHTML = '';
      sortedData.forEach(item => {
        contentDiv.innerHTML += `
          <div class="content-item">
          <h2>Nama: ${item.nama}</h2>
            <img src="${item.foto}" alt="Foto" style="width: 100%; border-radius: 10px;">
<span id="like-value-${item.id}" style="font-size: 10px;">
  <i class="fas fa-eye"></i> ${item.like}
</span>
<button onclick="increaseLike('${item.id}')" id="likeButton-${item.id}" style="color: white;">
  <i class="fas fa-thumbs-up"></i>
</button>
            <p>Pesan: ${item.pesan}</p>
            <p>
              ${item.facebook !== "none" ? `<a href="${item.facebook}" target="_blank" class="social-link"><i class="fab fa-facebook-square social-icon"></i></a>` : `<i class="fas fa-exclamation-circle social-icon"></i>`}
              ${item.Instagram !== "none" ? `<a href="${item.Instagram}" target="_blank" class="social-link"><i class="fab fa-instagram social-icon"></i></a>` : `<i class="fas fa-exclamation-circle social-icon"></i>`}
              ${item.Tiktok !== "none" ? `<a href="${item.Tiktok}" target="_blank" class="social-link"><i class="fab fa-tiktok social-icon"></i></a>` : `<i class="fas fa-exclamation-circle social-icon"></i>`}
              ${item.WhatsApp !== "none" ? `<a href="https://${item.WhatsApp}" target="_blank" class="social-link"><i class="fab fa-whatsapp social-icon"></i></a>` : `<i class="fas fa-exclamation-circle social-icon"></i>`}
              ${item.Twitter !== "none" ? `<a href="${item.Twitter}" target="_blank" class="social-link"><i class="fab fa-twitter social-icon"></i></a>` : `<i class="fas fa-exclamation-circle social-icon"></i>`}
            </p>
          </div>`;
      });
      
      // Sembunyikan spinner setelah data dimuat
      document.querySelector('.spinner').style.display = 'none';
    })
    .catch(error => console.error('Error:', error));
}
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
function scrollToInfo() {
    var infoElement = document.getElementById('info'); // Perubahan kelas menjadi ID
    infoElement.scrollIntoView({ behavior: 'smooth' });
  }

  function toggleContent() {
    var content = document.getElementById('content'); // Perubahan kelas menjadi ID
    var room = document.getElementById('room'); // Perubahan kelas menjadi ID

    if (content.style.display === 'none') {
content.style.display = 'block';
      room.style.display = 'none';
    } else {
      content.style.display = 'none';
      room.style.display = 'block';
    }
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

function addHttps(url) {
    if (!url.includes("http")) {
        return "https://" + url;
    }
    return url;
}

function saveData(nama, pesan, fotoUrl, facebook, instagram, tiktok, whatsapp, twitter) {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            var alamat = data.ip;
            var kritikData = {
                "id": generateUniqueId(8),
                "nama": nama,
                "pesan": pesan,
                "foto": fotoUrl,
                "facebook": facebook ? addHttps(facebook) : "None",
                "instagram": instagram ? addHttps(instagram) : "None",
                "tiktok": tiktok ? addHttps(tiktok) : "None",
                "whatsapp": whatsapp ? addHttps(whatsapp) : "None",
                "twitter": twitter ? addHttps(twitter) : "None",
                "date": new Date(),
                "address": alamat,
                "like": 0 // Menambahkan properti like dengan nilai awal 0
            };

            var jsonData = JSON.stringify([kritikData]);

            // Menyimpan data JSON ke dalam file baru
            var blob = new Blob([jsonData], { type: "application/json" });
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = 'data.json';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);

            // Bersihkan formulir
            document.getElementById('kritikForm').reset();
            alertCustom('Berhasil')
        })
        .catch(error => console.error('Error:', error));
}
        function showSecret() {
            var overlay = document.getElementById('overlay');
            var formContainer = document.getElementById('formContainer');
            overlay.style.display = 'block';
            formContainer.style.display = 'block';
        }

        function closePopup() {
            var overlay = document.getElementById('overlay');
            var formContainer = document.getElementById('formContainer');
            overlay.style.display = 'none';
            formContainer.style.display = 'none';
        }
        function scrollToFormContainer() {
    var formContainer = document.querySelector('.form-container');
    if (formContainer) {
        formContainer.scrollIntoView({ behavior: 'smooth' });
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
