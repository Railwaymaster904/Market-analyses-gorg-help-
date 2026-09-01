const CONFIG = {
  APP_NAME: "Nexus AI",
  // Backend proxy URL — Railway / Render / localhost
  // Example: "https://your-app.up.railway.app/api/analyze"
  API_ENDPOINT: "/api/analyze",

  // true = offline demo signals (no API). false = real backend
  DEMO_MODE: true,

  MAX_IMAGE_MB: 10,

  MARKETS: [
    // Forex
    { id: "EURUSD", name: "EUR/USD", type: "forex" },
    { id: "GBPUSD", name: "GBP/USD", type: "forex" },
    { id: "USDJPY", name: "USD/JPY", type: "forex" },
    { id: "USDCHF", name: "USD/CHF", type: "forex" },
    { id: "AUDUSD", name: "AUD/USD", type: "forex" },
    { id: "USDCAD", name: "USD/CAD", type: "forex" },
    { id: "NZDUSD", name: "NZD/USD", type: "forex" },
    { id: "EURGBP", name: "EUR/GBP", type: "forex" },
    { id: "EURJPY", name: "EUR/JPY", type: "forex" },
    { id: "GBPJPY", name: "GBP/JPY", type: "forex" },
    { id: "AUDJPY", name: "AUD/JPY", type: "forex" },
    { id: "CADJPY", name: "CAD/JPY", type: "forex" },
    { id: "CHFJPY", name: "CHF/JPY", type: "forex" },
    { id: "EURAUD", name: "EUR/AUD", type: "forex" },
    { id: "EURCAD", name: "EUR/CAD", type: "forex" },
    { id: "GBPAUD", name: "GBP/AUD", type: "forex" },
    { id: "GBPCAD", name: "GBP/CAD", type: "forex" },
    { id: "AUDCAD", name: "AUD/CAD", type: "forex" },
    { id: "AUDNZD", name: "AUD/NZD", type: "forex" },
    { id: "NZDJPY", name: "NZD/JPY", type: "forex" },
    // Crypto
    { id: "BTCUSD", name: "BTC/USD", type: "crypto" },
    { id: "ETHUSD", name: "ETH/USD", type: "crypto" },
    { id: "SOLUSD", name: "SOL/USD", type: "crypto" },
    { id: "XRPUSD", name: "XRP/USD", type: "crypto" },
    { id: "BNBUSD", name: "BNB/USD", type: "crypto" },
    { id: "ADAUSD", name: "ADA/USD", type: "crypto" },
    { id: "DOGEUSD", name: "DOGE/USD", type: "crypto" },
    { id: "DOTUSD", name: "DOT/USD", type: "crypto" },
    { id: "AVAXUSD", name: "AVAX/USD", type: "crypto" },
    { id: "LINKUSD", name: "LINK/USD", type: "crypto" },
    { id: "MATICUSD", name: "MATIC/USD", type: "crypto" },
    { id: "LTCUSD", name: "LTC/USD", type: "crypto" },
    // OTC-style
    { id: "EURUSD_OTC", name: "EUR/USD OTC", type: "otc" },
    { id: "GBPUSD_OTC", name: "GBP/USD OTC", type: "otc" },
    { id: "USDJPY_OTC", name: "USD/JPY OTC", type: "otc" },
    { id: "AUDUSD_OTC", name: "AUD/USD OTC", type: "otc" },
    { id: "USDCAD_OTC", name: "USD/CAD OTC", type: "otc" },
    { id: "USDCHF_OTC", name: "USD/CHF OTC", type: "otc" },
    { id: "EURGBP_OTC", name: "EUR/GBP OTC", type: "otc" },
    { id: "EURJPY_OTC", name: "EUR/JPY OTC", type: "otc" },
    { id: "GBPJPY_OTC", name: "GBP/JPY OTC", type: "otc" },
    { id: "BTCUSD_OTC", name: "BTC/USD OTC", type: "otc" },
    { id: "ETHUSD_OTC", name: "ETH/USD OTC", type: "otc" },
    { id: "USDARS_OTC", name: "USD/ARS OTC", type: "otc" },
    { id: "USDMXN_OTC", name: "USD/MXN OTC", type: "otc" },
    { id: "USDTRY_OTC", name: "USD/TRY OTC", type: "otc" },
    { id: "USDINR_OTC", name: "USD/INR OTC", type: "otc" },
    { id: "USDBRL_OTC", name: "USD/BRL OTC", type: "otc" },
    { id: "USDZAR_OTC", name: "USD/ZAR OTC", type: "otc" },
    { id: "USDPKR_OTC", name: "USD/PKR OTC", type: "otc" },
    { id: "USDBDT_OTC", name: "USD/BDT OTC", type: "otc" },
    { id: "EURTRY_OTC", name: "EUR/TRY OTC", type: "otc" },
    { id: "AUDCAD_OTC", name: "AUD/CAD OTC", type: "otc" },
    { id: "NZDUSD_OTC", name: "NZD/USD OTC", type: "otc" }
  ]
};
