// CONFIGURAÇÕES
// Preencha os campos abaixo quando tiver os links reais.

const COURSE_CONFIG = {
    checkoutUrl: "",
    presentationVideoUrl: "videos/video-site.mp4",
    contactUrl: ""
};

// JANELA DE AVISOS
const dialog = document.querySelector("#notice");

function showNotice(title, copy) {
    document.querySelector("#notice-title").textContent = title;
    document.querySelector("#notice-copy").textContent = copy;

    dialog.showModal();
}

// BOTÃO DE INSCRIÇÃO
document.querySelectorAll(".checkout").forEach((button) => {
    button.addEventListener("click", () => {
        if (COURSE_CONFIG.checkoutUrl) {
            window.location.assign(COURSE_CONFIG.checkoutUrl);
            return;
        }

        showNotice(
            "Inscrições em preparação",
            "R$ 57 é o valor promocional desta página. O checkout ainda será conectado; nenhum pagamento está sendo realizado aqui."
        );
    });
});

// VÍDEO DE APRESENTAÇÃO
document.querySelector("#play-video").addEventListener("click", () => {
    if (!COURSE_CONFIG.presentationVideoUrl) {
        showNotice(
            "Vídeo de apresentação",
            "Este espaço está pronto para receber o vídeo de apresentação da Vivian. A imagem exibida é a referência visual enviada para o projeto."
        );

        return;
    }

    const video = document.querySelector("#presentation-video");

    video.src = COURSE_CONFIG.presentationVideoUrl;
    video.hidden = false;

    document.querySelector("#play-video").hidden = true;

    // Caso o navegador bloqueie a reprodução automática,
    // o usuário poderá iniciar o vídeo pelos controles.
    video.play().catch(() => {});
});

// FECHAR A JANELA PELOS BOTÕES
document.querySelectorAll(".close, .dismiss").forEach((button) => {
    button.addEventListener("click", () => {
        dialog.close();
    });
});

// FECHAR AO CLICAR FORA DA JANELA
dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) {
        return;
    }

    const rect = dialog.getBoundingClientRect();

    const clickedOutside =
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom;

    if (clickedOutside) {
        dialog.close();
    }
});

// INFORMAÇÕES DO RODAPÉ
const info = {
    terms: [
        "Termos de Uso",
        "As condições de compra, acesso e uso do curso serão publicadas antes da abertura das inscrições."
    ],

    privacy: [
        "Política de Privacidade",
        "Esta versão não possui formulário de cadastro. A política completa será publicada junto às integrações usadas na venda do curso."
    ],

    contact: [
        "Contato",
        "O canal de atendimento da Vivian será adicionado aqui."
    ]
};

// BOTÕES DO RODAPÉ
document.querySelectorAll("[data-info]").forEach((button) => {
    button.addEventListener("click", () => {
        const selectedInfo = button.dataset.info;

        if (
            selectedInfo === "contact" &&
            COURSE_CONFIG.contactUrl
        ) {
            window.location.assign(COURSE_CONFIG.contactUrl);
            return;
        }

        showNotice(...info[selectedInfo]);
    });
});