export default function initFetchBitcoin() {
  const urlBitcoin = "https://blockchain.info/ticker";
  const valorBitcoin = document.querySelector(".btc-preco");

  async function fetchBitcoin(url) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Erro ao buscar dados da API");
      }

      const bitcoinJSON = await response.json();
      const quantidadeBitcoin = 100 / bitcoinJSON.BRL.buy;

      valorBitcoin.innerText = `R$ 100,00 para comprar ${quantidadeBitcoin.toFixed(6)} BTC`;
    } catch (error) {
      console.log(error);
      valorBitcoin.innerText = "Erro ao carregar valor do Bitcoin";
    }
  }

  fetchBitcoin(urlBitcoin);

  setInterval(() => {
    fetchBitcoin(urlBitcoin);
  }, 30000);
}

initFetchBitcoin();
