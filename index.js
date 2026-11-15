import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// ==========================================
// FIREBASE
// ==========================================

const firebaseConfig = {
  apiKey: "SUA_API_KEY_COMPLETA",
  authDomain: "guiando-vidas.firebaseapp.com",
  projectId: "guiando-vidas",
  storageBucket: "guiando-vidas.firebasestorage.app",
  messagingSenderId: "1010811994229",
  appId: "1:1010811994229:web:ee6be12d019f746e68b83c",
  measurementId: "G-62DQVEZ5SX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// ==========================================
// EMAILJS
// ==========================================

emailjs.init("WN2ktGPak3G8IfXQx");


// ==========================================
// PRÉ-CADASTRO
// ==========================================

window.enviarWhats = async function (e, tipo) {

  e.preventDefault();

  if (tipo !== "pre") return;

  try {

    const nome = document.getElementById("nome_pre").value;
    const idade = document.getElementById("idade_pre").value;
    const resp = document.getElementById("resp_pre").value;
    const tel = document.getElementById("tel_pre").value;

    await addDoc(collection(db, "pre_cadastros"), {
      nome,
      idade,
      responsavel: resp,
      telefone: tel,
      tipo: "Aula Experimental",
      data: new Date()
    });

    await emailjs.send(
      "service_9lewbvr",
      "template_zljebrt",
      {
        nome,
        telefone: tel,
        idade,
        responsavel: resp,
        endereco: "-",
        tipo: "Pré-cadastro Aula Experimental"
      }
    );

    alert("Pré-cadastro enviado com sucesso!");

    document.getElementById("nome_pre").value = "";
    document.getElementById("idade_pre").value = "";
    document.getElementById("resp_pre").value = "";
    document.getElementById("tel_pre").value = "";

  } catch (erro) {

    console.error("Erro no pré-cadastro:", erro);
    alert("Erro ao enviar pré-cadastro.");

  }

};


// ==========================================
// CARTEIRINHA
// ==========================================

const formCarteirinha =
  document.getElementById("formCarteirinha");

if (formCarteirinha) {

  formCarteirinha.addEventListener(
    "submit",
    async function (e) {

      e.preventDefault();

      try {

        const nome =
          document.getElementById("nome").value;

        const idade =
          document.getElementById("idade").value;

        const resp =
          document.getElementById("resp").value;

        const tel =
          document.getElementById("tel").value;

        const end =
          document.getElementById("end").value;

        const snapshot =
          await getDocs(collection(db, "alunos"));

        const numeroInscricao =
          snapshot.size + 1;

        const inscricao =
          "GV" +
          String(numeroInscricao)
            .padStart(4, "0");

        await addDoc(collection(db, "alunos"), {

          inscricao,
          nome,
          idade,
          responsavel: resp,
          telefone: tel,
          endereco: end,
          dataCadastro: new Date()

        });

        document.getElementById("numCarteira").innerText =
          inscricao;

        document.getElementById("cardNome").innerText =
          nome;

        document.getElementById("cardIdade").innerText =
          idade;

        document.getElementById("cardResp").innerText =
          resp;

        document.getElementById("cardTel").innerText =
          tel;

        document.getElementById("carteirinhaAluno")
          .style.display = "block";

        alert(
          "Carteirinha gerada com sucesso!"
        );

        formCarteirinha.reset();

      } catch (erro) {

        console.error(
          "Erro na carteirinha:",
          erro
        );

        alert(
          "Erro ao gerar carteirinha."
        );

      }

    }
  );

}


// ==========================================
// DOWNLOAD CARTEIRINHA
// ==========================================

const btnBaixar =
  document.getElementById(
    "baixarCarteirinha"
  );

if (btnBaixar) {

  btnBaixar.addEventListener(
    "click",
    function () {

      const card =
        document.getElementById(
          "carteirinhaAluno"
        );

      html2canvas(card).then(
        (canvas) => {

          const link =
            document.createElement("a");

          link.download =
            "carteirinha-guiando-vidas.png";

          link.href =
            canvas.toDataURL();

          link.click();

        }
      );

    }
  );

}


// ==========================================
// LIGHTBOX
// ==========================================

window.abrir = function (img) {

  const lightbox =
    document.getElementById("lightbox");

  const imgGrande =
    document.getElementById("imgGrande");

  lightbox.style.display = "flex";

  imgGrande.src = img.src;

};

window.fechar = function () {

  document.getElementById("lightbox")
    .style.display = "none";

};

const lightbox =
  document.getElementById("lightbox");

if (lightbox) {

  lightbox.addEventListener(
    "click",
    function (e) {

      if (
        e.target.id === "lightbox"
      ) {

        fechar();

      }

    }
  );

}

console.log(
  "✅ Guiando Vidas carregado com sucesso!"
);
